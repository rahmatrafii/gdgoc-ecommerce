package api

import (
	"net/http"

	"ecommerce-backend/internal/config"
	deliveryHttp "ecommerce-backend/internal/delivery/http"
	"ecommerce-backend/internal/delivery/http/handler"
	"ecommerce-backend/internal/delivery/http/middleware"
	"ecommerce-backend/internal/delivery/http/router"
	"ecommerce-backend/internal/pkg/mail"
	"ecommerce-backend/internal/pkg/mongodb"
	"ecommerce-backend/internal/pkg/validator"
	mongoRepo "ecommerce-backend/internal/repository/mongo"
	"ecommerce-backend/internal/usecase"
	
	_ "ecommerce-backend/docs"
	httpSwagger "github.com/swaggo/http-swagger"
)

var appHandler http.Handler

func init() {
	// 1. Load Configuration
	cfg := config.Load()

	// 2. Initialize Utilities
	validator.InitValidator()

	// 3. Connect to MongoDB (Menggunakan Singleton yang sudah dibuat)
	dbClient := mongodb.Connect(cfg.MongoURI)
	db := dbClient.Database(cfg.DBName)

	// 4. Initialize Repositories
	userRepo := mongoRepo.NewUserRepository(db)
	blocklistRepo := mongoRepo.NewBlocklistRepository(db)
	categoryRepo := mongoRepo.NewCategoryRepository(db)
	productRepo := mongoRepo.NewProductRepository(db)
	cartRepo := mongoRepo.NewCartRepository(db)
	orderRepo := mongoRepo.NewOrderRepository(db)

	// 5. Initialize Services & UseCases
	emailService := mail.NewSmtpEmailService(
		cfg.SmtpHost,
		cfg.SmtpPort,
		cfg.SmtpUser,
		cfg.SmtpPass,
		cfg.SmtpSenderName,
		cfg.SmtpSenderEmail,
	)

	authUseCase := usecase.NewAuthUseCase(userRepo, blocklistRepo, emailService, cfg.JWTSecret, cfg.JWTExpiredHours)
	categoryUseCase := usecase.NewCategoryUseCase(categoryRepo)
	productUseCase := usecase.NewProductUseCase(productRepo, categoryRepo)
	cartUseCase := usecase.NewCartUseCase(cartRepo, productRepo)
	orderUseCase := usecase.NewOrderUseCase(orderRepo, cartRepo, productRepo)

	// 6. Initialize Handlers
	authHandler := handler.NewAuthHandler(authUseCase)
	categoryHandler := handler.NewCategoryHandler(categoryUseCase)
	productHandler := handler.NewProductHandler(productUseCase)
	cartHandler := handler.NewCartHandler(cartUseCase)
	orderHandler := handler.NewOrderHandler(orderUseCase)

	// 7. Setup Router
	mux := http.NewServeMux()

	// Health check endpoint
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			deliveryHttp.ErrorResponse(w, http.StatusMethodNotAllowed, "Method not allowed", "METHOD_NOT_ALLOWED", nil)
			return
		}
		deliveryHttp.Success(w, http.StatusOK, "Server is healthy", map[string]string{
			"status":      "UP",
			"environment": cfg.Environment,
		})
	})

	// Swagger endpoint
	mux.HandleFunc("/swagger/", httpSwagger.WrapHandler)

	// Register Routes
	router.RegisterAuthRoutes(mux, authHandler, cfg.JWTSecret, blocklistRepo)
	router.RegisterCategoryRoutes(mux, categoryHandler, cfg.JWTSecret, blocklistRepo)
	router.RegisterProductRoutes(mux, productHandler, cfg.JWTSecret, blocklistRepo)
	router.RegisterCartRoutes(mux, cartHandler, cfg.JWTSecret, blocklistRepo)
	router.RegisterOrderRoutes(mux, orderHandler, cfg.JWTSecret, blocklistRepo)

	// 8. Wrap with Middlewares
	var finalHandler http.Handler = mux
	finalHandler = middleware.CORS()(finalHandler)
	finalHandler = middleware.Logging(finalHandler)
	finalHandler = middleware.Recovery(finalHandler)

	appHandler = finalHandler
}

// Handler adalah fungsi yang akan dieksekusi oleh Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	appHandler.ServeHTTP(w, r)
}
