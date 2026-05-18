<p align="center">
  <img src="docs/assets/LOGO - GDG On Campus Maliki - Centered .png" width="250" alt="GDGOC UIN Malang Logo"/>
</p>

<h1 align="center">🛒 GDGOC E-Commerce Platform</h1>

<p align="center">
  <strong>Study Jam 2026 — GDG On Campus UIN Maulana Malik Ibrahim Malang</strong>
</p>

<p align="center">
  Full-Stack E-Commerce Platform · Go Backend · React Frontend · MongoDB Atlas
</p>

<p align="center">
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go"/></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License"/></a>
</p>

---

## 📖 About

**GDGOC E-Commerce** adalah proyek full-stack e-commerce platform yang dikembangkan sebagai bagian dari **Study Jam 2026** oleh **Google Developer Groups On Campus (GDGOC) UIN Maulana Malik Ibrahim Malang**.

Proyek ini menggabungkan backend Go murni (tanpa framework berat) dengan arsitektur Clean Architecture 4-Layer, dan frontend React modern untuk pengalaman pengguna yang interaktif. Seluruh tim berkolaborasi mengikuti SOP yang ketat dengan bantuan AI-powered Code Review Graph.

---

## 🚀 Tech Stack

### Backend

| Component | Technology |
|-----------|-----------|
| **Language** | Go (Golang) — Pure `net/http`, tanpa framework berat |
| **Database** | MongoDB Atlas (Cloud) |
| **DB Driver** | Official MongoDB Go Driver (`go.mongodb.org/mongo-driver`) |
| **API Docs** | Swagger via Swaggo (`github.com/swaggo/swag`) |
| **Architecture** | Clean Architecture (4-Layer) |
| **Auth** | JWT (JSON Web Tokens) + bcrypt |
| **Linting** | golangci-lint |
| **Formatting** | gofmt, goimports |

### Frontend

| Component | Technology |
|-----------|-----------|
| **Framework** | React (via Vite) |
| **Language** | JavaScript / TypeScript |
| **Styling** | CSS Modules / Tailwind CSS |
| **HTTP Client** | Axios / Fetch API |
| **Routing** | React Router |
| **State Management** | React Context / Zustand |
| **Linting** | ESLint |
| **Formatting** | Prettier |

### AI & DevOps

| Component | Technology |
|-----------|-----------|
| **AI Code Review** | [Code Review Graph](https://github.com/tirth8205/code-review-graph) (MCP-based) |
| **AI Assistant** | Claude / Gemini via MCP |
| **Local Runtime** | Native Go & Node.js commands |
| **CI/CD** | GitHub Actions |

> ⚠️ **Note**: Prisma Client Go telah **di-archive** sejak 2025. Proyek ini menggunakan **Official MongoDB Go Driver** yang didukung penuh oleh MongoDB Inc.

---

## 🤖 Code Review Graph

Proyek ini menggunakan [**Code Review Graph**](https://github.com/tirth8205/code-review-graph) — sebuah local knowledge graph yang membangun peta struktural dari codebase menggunakan [Tree-sitter](https://tree-sitter.github.io/tree-sitter/). Tool ini terintegrasi dengan AI assistant via [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) sehingga AI hanya membaca file yang relevan saat melakukan review.

### Kenapa Code Review Graph?

| Keunggulan | Penjelasan |
|------------|-----------|
| 🎯 **Blast-Radius Analysis** | Saat file berubah, graph melacak setiap caller, dependent, dan test yang terpengaruh — AI hanya baca file yang benar-benar terdampak |
| ⚡ **Incremental Updates** | Update graph dalam < 2 detik setiap kali commit atau save file |
| 🔍 **6.8× Fewer Tokens** | Mengurangi konsumsi token AI hingga 6.8× pada code review dan 49× pada daily coding tasks |
| 🌐 **23 Languages** | Full Tree-sitter support termasuk Go, JavaScript, TypeScript, dan banyak lagi |
| 📊 **Architecture Overview** | Visualisasi dependency graph, community detection, dan knowledge gaps |

### Setup

```bash
# Install
pip install code-review-graph

# Auto-detect & configure semua AI platforms
code-review-graph install

# Build graph pertama kali
code-review-graph build

# Setelah itu, graph auto-update di setiap commit/save
```

### MCP Tools yang Tersedia

Setelah graph di-build, AI assistant otomatis mendapat akses ke tools seperti:

- `build_or_update_graph_tool` — Build/update graph
- `get_review_context_tool` — Dapatkan konteks review yang minimal
- `get_impact_radius_tool` — Analisis blast radius perubahan
- `get_architecture_overview_tool` — Overview arsitektur codebase
- `semantic_search_nodes_tool` — Semantic search di graph
- `detect_changes_tool` — Deteksi perubahan dengan risk scoring

> 📖 Selengkapnya: [github.com/tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)

---

## 🏛️ Architecture

Backend mengikuti **Clean Architecture** dengan 4 layer:

```
┌─────────────────────────────────────────────┐
│              Layer 4: Handler               │ ← HTTP Delivery (net/http)
├─────────────────────────────────────────────┤
│              Layer 3: Repository            │ ← Data Access (MongoDB)
├─────────────────────────────────────────────┤
│              Layer 2: UseCase               │ ← Business Logic
├─────────────────────────────────────────────┤
│              Layer 1: Domain                │ ← Entities, Interfaces, Errors
└─────────────────────────────────────────────┘
```

**Dependency Rule**: Dependencies hanya mengarah **ke dalam**. Layer luar bergantung pada layer dalam, **tidak pernah** sebaliknya.

---

## 📁 Project Structure

```
GDGOC-Ecommerce/
│
├── backend/                          # 🔧 Go Backend (API Server)
│   ├── cmd/api/
│   │   └── main.go                   # Entry point & Dependency Injection
│   ├── internal/
│   │   ├── config/                   # Configuration management
│   │   ├── domain/                   # 🟢 Layer 1: Entities & Interfaces
│   │   ├── usecase/                  # 🔵 Layer 2: Business Logic
│   │   ├── repository/mongo/         # 🟠 Layer 3: MongoDB Implementation
│   │   ├── delivery/http/            # 🔴 Layer 4: HTTP Handlers
│   │   │   ├── handler/
│   │   │   ├── middleware/
│   │   │   └── router/
│   │   └── pkg/                      # Shared utilities
│   ├── go.mod
│   └── go.sum
│
├── frontend/                         # ⚛️ React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Page-level components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── services/                 # API service layer
│   │   ├── context/                  # React Context providers
│   │   ├── utils/                    # Utility functions
│   │   ├── styles/                   # Global styles & theme
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docs/                             # 📚 Documentation
│   ├── assets/                       # Logo & media assets
│   ├── SOP/                          # Standard Operating Procedures
│   ├── architecture/                 # Architecture documentation
│   ├── features/                     # Feature documentation
│   ├── api/                          # API documentation
│   └── todo/                         # To-do & progress tracking
│
├── .agents/                          # 🤖 AI Agent Skills
├── .gitignore
├── AGENTS.md                         # AI Agent Instructions
├── LICENSE                           # MIT License
├── Makefile
└── README.md                         # You are here
```

---

## 🛠️ Getting Started

### Prerequisites

- **Go** >= 1.22
- **Node.js** >= 18 (untuk frontend)
- **Python** >= 3.10 (untuk Code Review Graph)
- **MongoDB Atlas** account (atau local MongoDB)

### Backend

```bash
cd backend

# Install dependencies
go mod download

# Setup environment
cp .env.example .env
# Edit .env dengan MongoDB URI kamu

# Run server
go run cmd/api/main.go

# Seed sample categories/products for landing page
go run cmd/seed/main.go

# Run tests
go test ./internal/... -v

# Generate Swagger docs
swag init -g cmd/api/main.go -o docs/swagger

# Lint
golangci-lint run
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev

# Build production
npm run build

# Lint
npm run lint
```

### Code Review Graph

```bash
# Install code-review-graph
pip install code-review-graph

# Auto-detect & configure AI platforms
code-review-graph install

# Build graph
code-review-graph build

# Check status
code-review-graph status
```


## 📊 API Documentation

Setelah backend berjalan, akses Swagger UI di:

```
http://localhost:<PORT>/swagger/index.html
```

### API Response Format

```json
// ✅ Success
{
    "success": true,
    "message": "Product retrieved successfully",
    "data": { ... }
}

// ✅ Success List (Paginated)
{
    "success": true,
    "message": "Products retrieved successfully",
    "data": [ ... ],
    "meta": { "page": 1, "per_page": 20, "total": 100, "total_pages": 5 }
}

// ❌ Error
{
    "success": false,
    "message": "Validation failed",
    "error": { "code": "VALIDATION_ERROR", "details": [ ... ] }
}
```

---

## 📋 Features

| Feature | Status |
|---------|--------|
| 🔐 Authentication (Register, Login, JWT) | 📋 Planned |
| 👤 User Management & Profiles | 📋 Planned |
| 📦 Product Catalog (CRUD, Search, Filter) | 📋 Planned |
| 🛒 Shopping Cart | 📋 Planned |
| 📑 Order Management & Status Tracking | 📋 Planned |
| 💳 Payment Integration | 📋 Planned |
| ⭐ Reviews & Ratings | 📋 Planned |
| 🛡️ Admin Panel & Dashboard | 📋 Planned |

---

## 👥 Team & Contributors

<div align="center">

### 🏆 **Core Team — Study Jam GDGOC UIN Malang 2026**

<table>
<tr>
<td align="center">
<img src="https://github.com/Sadamdi.png" width="100px" alt="Sulthan Adam"/>
<br />
<strong>Sulthan Adam Rahmadi</strong>
<br />
<sub>🚀 <strong>Project Manager & Lead</strong></sub>
<br />
<sub>
📋 Project Manager<br/>
⚙️ Backend Developer<br/>
🏗️ System Architect<br/>
</sub>
<br />
<a href="https://github.com/Sadamdi">GitHub</a>
</td>
<td align="center">
<img src="https://github.com/Villhze.png" width="100px" alt="Villhze"/>
<br />
<strong>Villhze</strong>
<br />
<sub>⚡ <strong>Backend Developer</strong></sub>
<br />
<sub>
⚙️ Backend Developer<br/>
🔧 API Development<br/>
🧪 Testing<br/>
</sub>
<br />
<a href="https://github.com/Villhze">GitHub</a>
</td>
</tr>
<tr>
<td align="center">
<img src="https://github.com/rahmatrafii.png" width="100px" alt="Rahmat Rafii"/>
<br />
<strong>Rahmat Rafii</strong>
<br />
<sub>⚡ <strong>Backend Developer</strong></sub>
<br />
<sub>
⚙️ Backend Developer<br/>
🔧 API Development<br/>
🧪 Testing<br/>
</sub>
<br />
<a href="https://github.com/rahmatrafii">GitHub</a>
</td>
<td align="center">
<img src="https://github.com/MFahdKhulloh-221.png" width="100px" alt="M Fahd Khulloh"/>
<br />
<strong>M. Fahd Khulloh</strong>
<br />
<sub>🎨 <strong>UI/UX & Frontend Developer</strong></sub>
<br />
<sub>
🎯 UI/UX Designer<br/>
🎨 Frontend Developer<br/>
⚛️ React Development<br/>
</sub>
<br />
<a href="https://github.com/MFahdKhulloh-221">GitHub</a>
</td>
</tr>
</table>

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Google Developer Groups On Campus (GDGOC)](https://gdg.community.dev/gdg-on-campus-uin-maulana-malik-ibrahim-malang-malang-indonesia/)** — UIN Maulana Malik Ibrahim Malang
- **Study Jam 2026** — Program pembelajaran kolaboratif
- **[Code Review Graph](https://github.com/tirth8205/code-review-graph)** — AI-powered code review knowledge graph
- **[MongoDB](https://www.mongodb.com/)** — Database as a Service
- **[Go Community](https://go.dev/)** — Backend language & ecosystem
- **[React](https://react.dev/)** — Frontend framework

---

<p align="center">
  Made with ❤️ by the <strong>GDGOC E-Commerce Team</strong> — UIN Maulana Malik Ibrahim Malang
</p>
