package usecase

import (
	"context"
	"errors"
	"fmt"
	"time"

	"ecommerce-backend/internal/domain"
	"ecommerce-backend/internal/pkg/hash"
	"ecommerce-backend/internal/pkg/token"
)

type authUseCase struct {
	userRepo      domain.UserRepository
	blocklistRepo domain.BlocklistRepository
	emailService  domain.EmailService
	jwtSecret     string
	jwtExpiredHrs int
}

func NewAuthUseCase(
	ur domain.UserRepository,
	br domain.BlocklistRepository,
	es domain.EmailService,
	jwtSecret string,
	jwtExpiredHrs int,
) domain.AuthUseCase {
	return &authUseCase{
		userRepo:      ur,
		blocklistRepo: br,
		emailService:  es,
		jwtSecret:     jwtSecret,
		jwtExpiredHrs: jwtExpiredHrs,
	}
}

func (uc *authUseCase) Register(ctx context.Context, req *domain.RegisterRequest) (*domain.UserResponse, error) {
	// Cek apakah email sudah terdaftar
	existingUser, err := uc.userRepo.FindByEmail(ctx, req.Email)
	if err != nil && !errors.Is(err, domain.ErrUserNotFound) {
		return nil, fmt.Errorf("userRepo.FindByEmail: %w", err)
	}
	if existingUser != nil {
		return nil, domain.ErrEmailAlreadyExists
	}

	// Hash Password
	hashedPassword, err := hash.HashPassword(req.Password)
	if err != nil {
		return nil, fmt.Errorf("hash.HashPassword: %w", domain.ErrInternal)
	}

	// Set default role for new registrants.
	role := string(domain.RoleCustomer)

	user := &domain.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
		Role:     role,
	}

	if err := uc.userRepo.Create(ctx, user); err != nil {
		return nil, fmt.Errorf("userRepo.Create: %w", err)
	}

	return &domain.UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt.Format(time.RFC3339),
	}, nil
}

func (uc *authUseCase) Login(ctx context.Context, req *domain.LoginRequest) (*domain.TokenResponse, error) {
	user, err := uc.userRepo.FindByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			return nil, domain.ErrInvalidCredentials
		}
		return nil, fmt.Errorf("userRepo.FindByEmail: %w", err)
	}

	if !hash.ComparePassword(req.Password, user.Password) {
		return nil, domain.ErrInvalidCredentials
	}

	accessToken, err := token.GenerateJWT(user.ID, user.Role, uc.jwtSecret, uc.jwtExpiredHrs)
	if err != nil {
		return nil, fmt.Errorf("token.GenerateJWT: %w", domain.ErrInternal)
	}

	return &domain.TokenResponse{
		AccessToken: accessToken,
		User: &domain.UserResponse{
			ID:        user.ID,
			Name:      user.Name,
			Email:     user.Email,
			Role:      user.Role,
			CreatedAt: user.CreatedAt.Format(time.RFC3339),
		},
	}, nil
}

func (uc *authUseCase) ForgotPassword(ctx context.Context, req *domain.ForgotPasswordRequest) error {
	user, err := uc.userRepo.FindByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			// Keamanan: Tetap berikan respons sukses meskipun email tidak ditemukan
			// agar tidak disalahgunakan untuk email enumeration
			return nil
		}
		return fmt.Errorf("userRepo.FindByEmail: %w", err)
	}

	resetToken, err := token.GenerateRandomToken()
	if err != nil {
		return fmt.Errorf("token.GenerateRandomToken: %w", domain.ErrInternal)
	}

	// Token berlaku 15 menit
	expiry := time.Now().Add(15 * time.Minute)

	if err := uc.userRepo.UpdateResetToken(ctx, user.Email, resetToken, expiry); err != nil {
		return fmt.Errorf("userRepo.UpdateResetToken: %w", err)
	}

	// Kirim Email
	if err := uc.emailService.SendResetPasswordEmail(ctx, user.Email, resetToken); err != nil {
		// Walaupun email gagal, proses database sudah berhasil, tapi sebaiknya dicatatkan sebagai error
		return fmt.Errorf("emailService.SendResetPasswordEmail: %w", err)
	}

	return nil
}

func (uc *authUseCase) ResetPassword(ctx context.Context, req *domain.ResetPasswordRequest) error {
	user, err := uc.userRepo.FindByResetToken(ctx, req.Token)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			return domain.ErrInvalidResetToken
		}
		return fmt.Errorf("userRepo.FindByResetToken: %w", err)
	}

	// Cek apakah token sudah expired
	if user.ResetPasswordExpiry == nil || time.Now().After(*user.ResetPasswordExpiry) {
		return domain.ErrInvalidResetToken
	}

	// Hash password baru
	hashedPassword, err := hash.HashPassword(req.Password)
	if err != nil {
		return fmt.Errorf("hash.HashPassword: %w", domain.ErrInternal)
	}

	// Update password & hapus token
	if err := uc.userRepo.UpdatePassword(ctx, user.ID, hashedPassword); err != nil {
		return fmt.Errorf("userRepo.UpdatePassword: %w", err)
	}
	return nil
}

func (uc *authUseCase) Logout(ctx context.Context, tokenString string, expiry time.Time) error {
	// Masukkan token ke blocklist
	if err := uc.blocklistRepo.AddToBlocklist(ctx, tokenString, expiry); err != nil {
		return fmt.Errorf("blocklistRepo.AddToBlocklist: %w", err)
	}
	return nil
}
