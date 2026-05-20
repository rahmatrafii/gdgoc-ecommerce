package domain

import (
	"context"
	"time"
)

type CartItem struct {
	ProductID string  `json:"product_id" bson:"product_id"`
	Name      string  `json:"name" bson:"name"`
	Price     float64 `json:"price" bson:"price"`
	Quantity  int     `json:"quantity" bson:"quantity"`
	SubTotal  float64 `json:"sub_total" bson:"sub_total"`
	ImageURL  string  `json:"image_url" bson:"image_url"`
}

// Cart represents a user's shopping cart.
type Cart struct {
	ID          string     `json:"id" bson:"_id,omitempty"`
	UserID      string     `json:"user_id" bson:"user_id"`
	Items       []CartItem `json:"items" bson:"items"`
	TotalAmount float64    `json:"total_amount" bson:"total_amount"`
	Version     int64      `json:"version" bson:"version"` // For optimistic locking
	UpdatedAt   time.Time  `json:"updated_at" bson:"updated_at"`
}

type CartItemResponse struct {
	ProductID string  `json:"product_id"`
	Name      string  `json:"name"`
	Price     float64 `json:"price"`
	Quantity  int     `json:"quantity"`
	SubTotal  float64 `json:"sub_total"`
	ImageURL  string  `json:"image_url"`
}

// CartResponse is the DTO for sending the cart to the client.
type CartResponse struct {
	UserID      string             `json:"user_id"`
	Items       []CartItemResponse `json:"items"`
	TotalAmount float64            `json:"total_amount"`
	UpdatedAt   time.Time          `json:"updated_at"`
}

// CartItemRequest represents the payload for adding/updating an item in the cart.
type CartItemRequest struct {
	ProductID string `json:"product_id" validate:"required"`
	Quantity  int    `json:"quantity" validate:"required,min=1"`
}

// UpdateCartItemRequest represents the payload for updating an item's quantity in the cart.
type UpdateCartItemRequest struct {
	Quantity int `json:"quantity" validate:"min=0"`
}

// CartRepository defines the interface for cart data access.
type CartRepository interface {
	GetByUserID(ctx context.Context, userID string) (*Cart, error)
	Save(ctx context.Context, cart *Cart) error
	DeleteByUserID(ctx context.Context, userID string) error
}

// CartUseCase defines the business logic for the shopping cart.
type CartUseCase interface {
	GetCart(ctx context.Context, userID string) (*Cart, error)
	AddItem(ctx context.Context, userID string, req *CartItemRequest) (*Cart, error)
	UpdateItem(ctx context.Context, userID string, productID string, quantity int) (*Cart, error)
	RemoveItem(ctx context.Context, userID string, productID string) (*Cart, error)
	ClearCart(ctx context.Context, userID string) error
}
