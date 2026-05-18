.PHONY: run seed build test lint swagger check fmt

# Development
run:
	go run cmd/api/main.go

seed:
	go run cmd/seed/main.go

# Build
build:
	CGO_ENABLED=0 go build -o bin/api cmd/api/main.go

# Testing
test:
	go test ./internal/... -v -race -count=1

test-cover:
	go test ./internal/... -coverprofile=coverage.out
	go tool cover -html=coverage.out -o coverage.html

# Linting
lint:
	go run github.com/golangci/golangci-lint/cmd/golangci-lint@latest run ./...

# Swagger
swagger:
	go run github.com/swaggo/swag/cmd/swag@latest init -g cmd/api/main.go -o docs/swagger --parseInternal --parseDependency

# Format
fmt:
	gofmt -w .
	go run golang.org/x/tools/cmd/goimports@latest -w .

# All checks before push
check: fmt lint test swagger
	@echo "All checks passed! ✅"
