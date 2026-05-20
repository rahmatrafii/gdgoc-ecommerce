package usecase

import (
	"context"
	"errors"
	"fmt"

	"ecommerce-backend/internal/domain"
)

type cartUseCase struct {
	cartRepo    domain.CartRepository
	productRepo domain.ProductRepository
}

// NewCartUseCase creates a new cart use case instance.
func NewCartUseCase(cartRepo domain.CartRepository, productRepo domain.ProductRepository) domain.CartUseCase {
	return &cartUseCase{
		cartRepo:    cartRepo,
		productRepo: productRepo,
	}
}

func (u *cartUseCase) GetCart(ctx context.Context, userID string) (*domain.Cart, error) {
	cart, err := u.cartRepo.GetByUserID(ctx, userID)
	if err != nil {
		if errors.Is(err, domain.ErrCartNotFound) {
			// Jika belum punya cart, kembalikan cart kosong (tanpa save)
			return &domain.Cart{
				UserID:      userID,
				Items:       []domain.CartItem{},
				TotalAmount: 0,
			}, nil
		}
		return nil, fmt.Errorf("failed to get cart: %w", err)
	}

	// Secara dinamis melengkapi ImageURL jika kosong (misalnya data keranjang lama di DB)
	for i, item := range cart.Items {
		if item.ImageURL == "" {
			product, err := u.productRepo.GetByID(ctx, item.ProductID)
			if err == nil && len(product.Images) > 0 {
				cart.Items[i].ImageURL = product.Images[0]
			}
		}
	}

	return cart, nil
}

func (u *cartUseCase) AddItem(ctx context.Context, userID string, req *domain.CartItemRequest) (*domain.Cart, error) {
	// 1. Dapatkan detail produk (cek eksistensi dan harga terbaru)
	product, err := u.productRepo.GetByID(ctx, req.ProductID)
	if err != nil {
		if errors.Is(err, domain.ErrProductNotFound) {
			return nil, fmt.Errorf("product not found: %w", domain.ErrProductNotFound)
		}
		return nil, fmt.Errorf("failed to get product: %w", err)
	}

	// 2. Dapatkan cart user
	cart, err := u.GetCart(ctx, userID)
	if err != nil {
		return nil, err
	}

	// 3. Cari apakah item sudah ada di cart
	var existingItem *domain.CartItem
	var existingIndex int = -1
	for i, item := range cart.Items {
		if item.ProductID == req.ProductID {
			existingItem = &cart.Items[i]
			existingIndex = i
			break
		}
	}

	newQuantity := req.Quantity
	if existingItem != nil {
		newQuantity += existingItem.Quantity
	}

	// 4. Validasi stok (hanya mengecek, tidak memotong/reserve)
	if product.Stock < newQuantity {
		return nil, domain.ErrInsufficientStock
	}

	// 5. Update atau Insert item baru di cart array
	var imageURL string
	if len(product.Images) > 0 {
		imageURL = product.Images[0]
	}

	if existingItem != nil {
		cart.Items[existingIndex].Quantity = newQuantity
		cart.Items[existingIndex].Price = product.Price // update harga ke terbaru
		cart.Items[existingIndex].SubTotal = product.Price * float64(newQuantity)
		cart.Items[existingIndex].ImageURL = imageURL
	} else {
		newItem := domain.CartItem{
			ProductID: product.ID,
			Name:      product.Name,
			Price:     product.Price,
			Quantity:  req.Quantity,
			SubTotal:  product.Price * float64(req.Quantity),
			ImageURL:  imageURL,
		}
		cart.Items = append(cart.Items, newItem)
	}

	// 6. Kalkulasi ulang total cart
	u.recalculateTotal(cart)

	// 7. Simpan perubahan ke DB
	err = u.cartRepo.Save(ctx, cart)
	if err != nil {
		return nil, fmt.Errorf("failed to save cart: %w", err)
	}

	return cart, nil
}

func (u *cartUseCase) UpdateItem(ctx context.Context, userID string, productID string, quantity int) (*domain.Cart, error) {
	if quantity <= 0 {
		return u.RemoveItem(ctx, userID, productID)
	}

	// 1. Dapatkan detail produk
	product, err := u.productRepo.GetByID(ctx, productID)
	if err != nil {
		if errors.Is(err, domain.ErrProductNotFound) {
			return nil, fmt.Errorf("product not found: %w", domain.ErrProductNotFound)
		}
		return nil, fmt.Errorf("failed to get product: %w", err)
	}

	// 2. Validasi stok
	if product.Stock < quantity {
		return nil, domain.ErrInsufficientStock
	}

	// 3. Dapatkan cart
	cart, err := u.GetCart(ctx, userID)
	if err != nil {
		return nil, err
	}

	// 4. Update item
	var imageURL string
	if len(product.Images) > 0 {
		imageURL = product.Images[0]
	}
	found := false
	for i, item := range cart.Items {
		if item.ProductID == productID {
			cart.Items[i].Quantity = quantity
			cart.Items[i].Price = product.Price
			cart.Items[i].SubTotal = product.Price * float64(quantity)
			cart.Items[i].ImageURL = imageURL
			found = true
			break
		}
	}

	if !found {
		return nil, domain.ErrItemNotFoundInCart
	}

	u.recalculateTotal(cart)

	err = u.cartRepo.Save(ctx, cart)
	if err != nil {
		return nil, fmt.Errorf("failed to save cart: %w", err)
	}

	return cart, nil
}

func (u *cartUseCase) RemoveItem(ctx context.Context, userID string, productID string) (*domain.Cart, error) {
	cart, err := u.GetCart(ctx, userID)
	if err != nil {
		return nil, err
	}

	newItems := []domain.CartItem{}
	found := false
	for _, item := range cart.Items {
		if item.ProductID == productID {
			found = true
			continue
		}
		newItems = append(newItems, item)
	}

	if !found {
		return nil, domain.ErrItemNotFoundInCart
	}

	cart.Items = newItems
	u.recalculateTotal(cart)

	err = u.cartRepo.Save(ctx, cart)
	if err != nil {
		return nil, fmt.Errorf("failed to save cart: %w", err)
	}

	return cart, nil
}

func (u *cartUseCase) ClearCart(ctx context.Context, userID string) error {
	err := u.cartRepo.DeleteByUserID(ctx, userID)
	if err != nil {
		return fmt.Errorf("failed to clear cart: %w", err)
	}
	return nil
}

// recalculateTotal is a helper to sum all subtotals
func (u *cartUseCase) recalculateTotal(cart *domain.Cart) {
	var total float64
	for _, item := range cart.Items {
		total += item.SubTotal
	}
	cart.TotalAmount = total
}
