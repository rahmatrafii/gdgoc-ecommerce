package mongodb

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Gunakan variabel global untuk menyimpan koneksi agar tidak terus-menerus buka koneksi baru
var clientInstance *mongo.Client

// Connect membuat koneksi ke MongoDB Atlas (Singleton Pattern)
func Connect(uri string) *mongo.Client {
    // Jika koneksi sudah ada, gunakan yang lama!
	if clientInstance != nil {
		return clientInstance
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping database untuk verifikasi koneksi
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	log.Println("Successfully connected to MongoDB!")
    
    // Simpan koneksinya
    clientInstance = client
	return clientInstance
}
