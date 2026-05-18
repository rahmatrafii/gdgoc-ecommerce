package main

import (
	"context"
	"log"
	"time"

	"ecommerce-backend/internal/config"
	"ecommerce-backend/internal/pkg/mongodb"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type seedCategory struct {
	Name        string
	Description string
}

type seedProduct struct {
	Name        string
	Description string
	Price       float64
	Stock       int
	Category    string
	Images      []string
}

type categoryDoc struct {
	ID primitive.ObjectID `bson:"_id"`
}

func main() {
	cfg := config.Load()
	client := mongodb.Connect(cfg.MongoURI)

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("warning: failed to disconnect MongoDB client: %v", err)
		}
	}()

	db := client.Database(cfg.DBName)
	categoryCollection := db.Collection("categories")
	productCollection := db.Collection("products")

	now := time.Now()

	categories := []seedCategory{
		{Name: "Streetwear", Description: "Oversized fits, layered essentials, and urban staples."},
		{Name: "Sneakers", Description: "Collector-level silhouettes with daily comfort."},
		{Name: "Luxury Watches", Description: "Precision timepieces with modern craftsmanship."},
		{Name: "Bags", Description: "Structured silhouettes for sharp everyday carry."},
		{Name: "Accessories", Description: "Signature details that complete your look."},
		{Name: "Women Collection", Description: "Editorial-ready pieces for progressive styling."},
		{Name: "Men Collection", Description: "Contemporary tailoring with street luxury attitude."},
	}

	products := []seedProduct{
		{
			Name:        "Night Pulse Limited Hoodie",
			Description: "Limited-drop heavyweight hoodie with reflective trim and relaxed silhouette.",
			Price:       1299000,
			Stock:       28,
			Category:    "Streetwear",
			Images: []string{
				"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Aero Utility Jacket",
			Description: "Cinematic outer layer with weather-resistant shell and modular pockets.",
			Price:       1649000,
			Stock:       17,
			Category:    "Streetwear",
			Images: []string{
				"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Chromaflow Runner X",
			Description: "Performance-inspired sneaker with responsive comfort and bold paneling.",
			Price:       2199000,
			Stock:       31,
			Category:    "Sneakers",
			Images: []string{
				"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Monolith Court High",
			Description: "High-top statement sneaker engineered for all-day urban movement.",
			Price:       1999000,
			Stock:       24,
			Category:    "Sneakers",
			Images: []string{
				"https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Asterion Chronograph",
			Description: "Luxury chronograph with sapphire crystal and brushed steel case.",
			Price:       5899000,
			Stock:       12,
			Category:    "Luxury Watches",
			Images: []string{
				"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Noir GMT Edge",
			Description: "Dual-time luxury watch crafted for global travelers and night styling.",
			Price:       6499000,
			Stock:       9,
			Category:    "Luxury Watches",
			Images: []string{
				"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Metroline Crossbody",
			Description: "Compact premium carry bag with adjustable strap and magnetic closure.",
			Price:       1399000,
			Stock:       34,
			Category:    "Bags",
			Images: []string{
				"https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Obsidian Weekender",
			Description: "Structured weekender bag with modern silhouette and premium hardware.",
			Price:       2499000,
			Stock:       14,
			Category:    "Bags",
			Images: []string{
				"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Silverline Chain Set",
			Description: "Layered accessory set designed to elevate monochrome outfits.",
			Price:       799000,
			Stock:       52,
			Category:    "Accessories",
			Images: []string{
				"https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Lumen Signature Shades",
			Description: "Premium tinted sunglasses with lightweight frame and anti-glare lens.",
			Price:       999000,
			Stock:       41,
			Category:    "Accessories",
			Images: []string{
				"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Aurora Tailored Set",
			Description: "Women collection coordinated set balancing comfort and sharp editorial lines.",
			Price:       1899000,
			Stock:       19,
			Category:    "Women Collection",
			Images: []string{
				"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
			},
		},
		{
			Name:        "Vertex Minimal Suit",
			Description: "Men collection suit with modern cut, breathable fabric, and clean profile.",
			Price:       2299000,
			Stock:       16,
			Category:    "Men Collection",
			Images: []string{
				"https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80",
			},
		},
	}

	categoryIDsByName := make(map[string]string, len(categories))

	for _, category := range categories {
		filter := bson.M{"name": category.Name}
		update := bson.M{
			"$set": bson.M{
				"description": category.Description,
				"updated_at":  now,
			},
			"$setOnInsert": bson.M{
				"created_at": now,
			},
		}

		_, err := categoryCollection.UpdateOne(ctx, filter, update, options.Update().SetUpsert(true))
		if err != nil {
			log.Fatalf("failed seeding category %q: %v", category.Name, err)
		}

		var doc categoryDoc
		if err := categoryCollection.FindOne(ctx, filter).Decode(&doc); err != nil {
			log.Fatalf("failed reading seeded category %q: %v", category.Name, err)
		}

		categoryIDsByName[category.Name] = doc.ID.Hex()
	}

	for _, product := range products {
		categoryID, exists := categoryIDsByName[product.Category]
		if !exists {
			log.Fatalf("missing category %q for product %q", product.Category, product.Name)
		}

		filter := bson.M{"name": product.Name}
		update := bson.M{
			"$set": bson.M{
				"description": product.Description,
				"price":       product.Price,
				"stock":       product.Stock,
				"category_id": categoryID,
				"images":      product.Images,
				"updated_at":  now,
			},
			"$setOnInsert": bson.M{
				"created_at": now,
			},
		}

		_, err := productCollection.UpdateOne(ctx, filter, update, options.Update().SetUpsert(true))
		if err != nil {
			log.Fatalf("failed seeding product %q: %v", product.Name, err)
		}
	}

	categoryCount, err := categoryCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		log.Fatalf("failed counting categories: %v", err)
	}

	productCount, err := productCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		log.Fatalf("failed counting products: %v", err)
	}

	log.Printf("Seeding completed. Categories: %d, Products: %d", categoryCount, productCount)
}
