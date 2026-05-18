package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Port            string
	MongoURI        string
	DBName          string
	JWTSecret       string
	JWTExpiredHours int
	Environment     string
	SmtpHost        string
	SmtpPort        string
	SmtpUser        string
	SmtpPass        string
	SmtpSenderName  string
	SmtpSenderEmail string
}

func Load() *Config {
	_ = godotenv.Load()

	jwtExpiryHoursRaw := getEnv("JWT_EXPIRED_HOURS", "")
	if jwtExpiryHoursRaw == "" {
		// Backward-compatible fallback for older env naming.
		jwtExpiryHoursRaw = getEnv("JWT_EXPIRATION_HOURS", "24")
	}

	jwtExp, err := strconv.Atoi(jwtExpiryHoursRaw)
	if err != nil {
		log.Printf("Invalid JWT_EXPIRED_HOURS, using default 24: %v", err)
		jwtExp = 24
	}

	return &Config{
		Port:            getEnv("PORT", "8080"),
		MongoURI:        getEnv("MONGODB_URI", "mongodb://localhost:27017"),
		DBName:          getEnv("DB_NAME", "ecommerce_db"),
		JWTSecret:       getEnv("JWT_SECRET", "secret"),
		JWTExpiredHours: jwtExp,
		Environment:     getEnv("ENVIRONMENT", "development"),
		SmtpHost:        getEnv("SMTP_HOST", "smtp.mailtrap.io"),
		SmtpPort:        getEnv("SMTP_PORT", "2525"),
		SmtpUser:        getEnv("SMTP_USER", ""),
		SmtpPass:        getEnv("SMTP_PASS", ""),
		SmtpSenderName:  getEnv("SMTP_SENDER_NAME", "E-Commerce Admin"),
		SmtpSenderEmail: getEnv("SMTP_SENDER_EMAIL", "no-reply@ecommerce.com"),
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
