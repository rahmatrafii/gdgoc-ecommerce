package middleware

import (
	"net/http"

	"strings"

	"github.com/rs/cors"
)

// CORS returns a middleware that handles CORS requests
func CORS(allowedOrigin string) func(http.Handler) http.Handler {
	origins := strings.Split(allowedOrigin, ",")
	for i := range origins {
		origins[i] = strings.TrimSpace(origins[i])
	}

	c := cors.New(cors.Options{
		AllowedOrigins: origins,
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders: []string{"Link"},
		MaxAge:         300,
	})

	return c.Handler
}
