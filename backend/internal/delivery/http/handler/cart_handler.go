package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	deliveryHttp "ecommerce-backend/internal/delivery/http"
	"ecommerce-backend/internal/domain"
	"ecommerce-backend/internal/pkg/validator"
)

type CartHandler struct {
	cartUseCase domain.CartUseCase
}

func NewCartHandler(uc domain.CartUseCase) *CartHandler {
	return &CartHandler{cartUseCase: uc}
}

// GetCart godoc
// @Summary Get user's cart
// @Description Get the current user's shopping cart
// @Tags cart
// @Produce json
// @Security BearerAuth
// @Success 200 {object} deliveryHttp.Response{data=domain.CartResponse}
// @Failure 401 {object} deliveryHttp.Response
// @Failure 500 {object} deliveryHttp.Response
// @Router /cart [get]
func (h *CartHandler) GetCart(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(domain.CtxKeyUserID).(string)
	if !ok || userID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusUnauthorized, "Unauthorized", "UNAUTHORIZED", nil)
		return
	}

	cart, err := h.cartUseCase.GetCart(r.Context(), userID)
	if err != nil {
		deliveryHttp.ErrorResponse(w, http.StatusInternalServerError, "Failed to get cart", "INTERNAL_ERROR", nil)
		return
	}

	resp := mapCartToResponse(cart)
	deliveryHttp.Success(w, http.StatusOK, "Cart retrieved successfully", resp)
}

// AddItem godoc
// @Summary Add item to cart
// @Description Add a new item or increase quantity of an existing item in the cart
// @Tags cart
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param request body domain.CartItemRequest true "Cart Item Request"
// @Success 200 {object} deliveryHttp.Response{data=domain.CartResponse}
// @Failure 400 {object} deliveryHttp.Response
// @Failure 401 {object} deliveryHttp.Response
// @Failure 404 {object} deliveryHttp.Response
// @Failure 409 {object} deliveryHttp.Response
// @Failure 500 {object} deliveryHttp.Response
// @Router /cart/items [post]
func (h *CartHandler) AddItem(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(domain.CtxKeyUserID).(string)
	if !ok || userID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusUnauthorized, "Unauthorized", "UNAUTHORIZED", nil)
		return
	}

	var req domain.CartItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		deliveryHttp.ErrorResponse(w, http.StatusBadRequest, "Invalid request body", "BAD_REQUEST", nil)
		return
	}

	if err := validator.ValidateStruct(&req); err != nil {
		deliveryHttp.ErrorResponse(w, http.StatusBadRequest, "Validation error", "VALIDATION_ERROR", err.Error())
		return
	}

	cart, err := h.cartUseCase.AddItem(r.Context(), userID, &req)
	if err != nil {
		if errors.Is(err, domain.ErrProductNotFound) {
			deliveryHttp.ErrorResponse(w, http.StatusNotFound, err.Error(), "NOT_FOUND", nil)
			return
		}
		if errors.Is(err, domain.ErrInsufficientStock) {
			deliveryHttp.ErrorResponse(w, http.StatusBadRequest, err.Error(), "INSUFFICIENT_STOCK", nil)
			return
		}
		if errors.Is(err, domain.ErrCartConflict) {
			deliveryHttp.ErrorResponse(w, http.StatusConflict, err.Error(), "CONFLICT", nil)
			return
		}
		deliveryHttp.ErrorResponse(w, http.StatusInternalServerError, "Failed to add item to cart", "INTERNAL_ERROR", nil)
		return
	}

	resp := mapCartToResponse(cart)
	deliveryHttp.Success(w, http.StatusOK, "Item added to cart successfully", resp)
}

// UpdateItem godoc
// @Summary Update item quantity
// @Description Update the quantity of a specific item in the cart
// @Tags cart
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param productId path string true "Product ID"
// @Param request body domain.UpdateCartItemRequest true "Quantity update request"
// @Success 200 {object} deliveryHttp.Response{data=domain.CartResponse}
// @Failure 400 {object} deliveryHttp.Response
// @Failure 401 {object} deliveryHttp.Response
// @Failure 404 {object} deliveryHttp.Response
// @Failure 409 {object} deliveryHttp.Response
// @Failure 500 {object} deliveryHttp.Response
// @Router /cart/items/{productId} [put]
func (h *CartHandler) UpdateItem(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(domain.CtxKeyUserID).(string)
	if !ok || userID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusUnauthorized, "Unauthorized", "UNAUTHORIZED", nil)
		return
	}

	productID := r.PathValue("productId")
	if productID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusBadRequest, "Invalid product ID", "BAD_REQUEST", nil)
		return
	}

	var req domain.UpdateCartItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		deliveryHttp.ErrorResponse(w, http.StatusBadRequest, "Invalid request body", "BAD_REQUEST", nil)
		return
	}

	if err := validator.ValidateStruct(&req); err != nil {
		deliveryHttp.ErrorResponse(w, http.StatusBadRequest, "Validation error", "VALIDATION_ERROR", err.Error())
		return
	}

	cart, err := h.cartUseCase.UpdateItem(r.Context(), userID, productID, req.Quantity)
	if err != nil {
		if errors.Is(err, domain.ErrProductNotFound) || errors.Is(err, domain.ErrItemNotFoundInCart) {
			deliveryHttp.ErrorResponse(w, http.StatusNotFound, err.Error(), "NOT_FOUND", nil)
			return
		}
		if errors.Is(err, domain.ErrInsufficientStock) {
			deliveryHttp.ErrorResponse(w, http.StatusBadRequest, err.Error(), "INSUFFICIENT_STOCK", nil)
			return
		}
		if errors.Is(err, domain.ErrCartConflict) {
			deliveryHttp.ErrorResponse(w, http.StatusConflict, err.Error(), "CONFLICT", nil)
			return
		}
		deliveryHttp.ErrorResponse(w, http.StatusInternalServerError, "Failed to update item quantity", "INTERNAL_ERROR", nil)
		return
	}

	resp := mapCartToResponse(cart)
	deliveryHttp.Success(w, http.StatusOK, "Cart item updated successfully", resp)
}

// RemoveItem godoc
// @Summary Remove item from cart
// @Description Remove a specific item from the cart
// @Tags cart
// @Produce json
// @Security BearerAuth
// @Param productId path string true "Product ID"
// @Success 200 {object} deliveryHttp.Response{data=domain.CartResponse}
// @Failure 400 {object} deliveryHttp.Response
// @Failure 401 {object} deliveryHttp.Response
// @Failure 404 {object} deliveryHttp.Response
// @Failure 409 {object} deliveryHttp.Response
// @Failure 500 {object} deliveryHttp.Response
// @Router /cart/items/{productId} [delete]
func (h *CartHandler) RemoveItem(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(domain.CtxKeyUserID).(string)
	if !ok || userID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusUnauthorized, "Unauthorized", "UNAUTHORIZED", nil)
		return
	}

	productID := r.PathValue("productId")
	if productID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusBadRequest, "Invalid product ID", "BAD_REQUEST", nil)
		return
	}

	cart, err := h.cartUseCase.RemoveItem(r.Context(), userID, productID)
	if err != nil {
		if errors.Is(err, domain.ErrItemNotFoundInCart) {
			deliveryHttp.ErrorResponse(w, http.StatusNotFound, err.Error(), "NOT_FOUND", nil)
			return
		}
		if errors.Is(err, domain.ErrCartConflict) {
			deliveryHttp.ErrorResponse(w, http.StatusConflict, err.Error(), "CONFLICT", nil)
			return
		}
		deliveryHttp.ErrorResponse(w, http.StatusInternalServerError, "Failed to remove item", "INTERNAL_ERROR", nil)
		return
	}

	resp := mapCartToResponse(cart)
	deliveryHttp.Success(w, http.StatusOK, "Item removed from cart successfully", resp)
}

func mapCartToResponse(cart *domain.Cart) domain.CartResponse {
	resp := domain.CartResponse{
		UserID:      cart.UserID,
		TotalAmount: cart.TotalAmount,
		UpdatedAt:   cart.UpdatedAt,
		Items:       make([]domain.CartItemResponse, len(cart.Items)),
	}
	for i, item := range cart.Items {
		resp.Items[i] = domain.CartItemResponse{
			ProductID: item.ProductID,
			Name:      item.Name,
			Price:     item.Price,
			Quantity:  item.Quantity,
			SubTotal:  item.SubTotal,
			ImageURL:  item.ImageURL,
		}
	}
	if len(resp.Items) == 0 {
		resp.Items = []domain.CartItemResponse{}
	}
	return resp
}

// ClearCart godoc
// @Summary Clear user's cart
// @Description Remove all items from the current user's cart
// @Tags cart
// @Produce json
// @Security BearerAuth
// @Success 200 {object} deliveryHttp.Response
// @Failure 401 {object} deliveryHttp.Response
// @Failure 500 {object} deliveryHttp.Response
// @Router /cart [delete]
func (h *CartHandler) ClearCart(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(domain.CtxKeyUserID).(string)
	if !ok || userID == "" {
		deliveryHttp.ErrorResponse(w, http.StatusUnauthorized, "Unauthorized", "UNAUTHORIZED", nil)
		return
	}

	err := h.cartUseCase.ClearCart(r.Context(), userID)
	if err != nil {
		deliveryHttp.ErrorResponse(w, http.StatusInternalServerError, "Failed to clear cart", "INTERNAL_ERROR", nil)
		return
	}

	deliveryHttp.Success(w, http.StatusOK, "Cart cleared successfully", nil)
}
