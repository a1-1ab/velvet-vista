# Velvet Vista - Enterprise Luxury Watch E-Commerce Showcase

> **Architecture:** Strict OOP | **Frontend:** Angular | **Backend:** NestJS | **Infrastructure:** Cloudflare + Supabase

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- npm v10+
- Angular CLI v17+
- NestJS CLI v10+
- Supabase Account
- Cloudflare Account

---

## 📦 Project Structure

```
velvet-vista/
├── backend/                          # NestJS Core API (Cloudflare Workers)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── fuzzy-search/        # Fuzzy search service
│   │   │   │   ├── fuzzy-search.controller.ts
│   │   │   │   ├── fuzzy-search.module.ts
│   │   │   │   └── fuzzy-search.service.ts
│   │   │   ├── products/            # Products module (TODO)
│   │   │   └── mcp/                 # MCP module (TODO)
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── config/
│   │       └── supabase.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── .eslintrc.json
│
├── frontend/                         # Angular Client (Cloudflare Pages)
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── models/
│   │   │   │   └── watch.model.ts
│   │   │   ├── pages/
│   │   │   │   ├── home/
│   │   │   │   │   └── home.component.ts
│   │   │   │   ├── watches/
│   │   │   │   │   └── watches.component.ts
│   │   │   │   ├── watch-detail/
│   │   │   │   │   └── watch-detail.component.ts
│   │   │   │   └── cart/
│   │   │   │       └── cart.component.ts
│   │   │   └── services/
│   │   │       ├── supabase.service.ts
│   │   │       └── theme.service.ts
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   └── styles/
│   │       └── global.scss
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── angular.json
│
├── supabase/                         # Database migrations & seeds
│   ├── migrations/
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_products_table.sql
│   │   ├── 003_create_orders_table.sql
│   │   └── 004_create_cart_table.sql
│   └── seed/
│       └── luxury_watches.sql
│
├── .github/                          # CI/CD
│   └── workflows/
│       └── verify.yml
│
├── docs/                            # Documentation
│   ├── repository-structure.md
│   └── supabase-schema.md
│
├── AGENT.md                         # AI Co-Pilot Ledger
├── README.md                        # This file
└── Velvet_Vista_SRS.pdf             # Software Requirements Specification
```

---

## 🏗️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/a1-1ab/velvet-vista.git
cd velvet-vista
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🗃️ Supabase Setup

1. **Create a Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com/) and create a new project.

2. **Run Migrations**
   - Execute the SQL files in `supabase/migrations/` in order:
     ```bash
     psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f supabase/migrations/001_create_users_table.sql
     psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f supabase/migrations/002_create_products_table.sql
     psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f supabase/migrations/003_create_orders_table.sql
     psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f supabase/migrations/004_create_cart_table.sql
     ```

3. **Seed the Database**
   ```bash
   psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f supabase/seed/luxury_watches.sql
   ```

4. **Update Configuration**
   - Update `backend/src/config/supabase.config.ts` with your Supabase URL and key.
   - Update `frontend/src/environments/environment.ts` with your Supabase URL and key.

---

## ☁️ Cloudflare Deployment

### Backend (Cloudflare Workers)
1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```
2. Configure `wrangler.toml` in the `backend/` directory.
3. Deploy:
   ```bash
   cd backend
   npm run build
   wrangler deploy
   ```

### Frontend (Cloudflare Pages)
1. Configure the project in the Cloudflare Pages dashboard.
2. Deploy:
   ```bash
   cd frontend
   npm run build
   ```

---

## 🔧 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/verify.yml`) runs on every PR to `main`:
- **Backend:** Linting, formatting, and unit tests.
- **Frontend:** Linting, formatting, and unit tests.

---

## 📜 Scripts

### Backend
| Script | Description |
|--------|-------------|
| `npm run start` | Start the NestJS server |
| `npm run start:dev` | Start with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test:unit` | Run unit tests |

### Frontend
| Script | Description |
|--------|-------------|
| `npm start` | Start the Angular dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run Angular lint |
| `npm run format` | Format code with Prettier |
| `npm test` | Run unit tests |

---

## 🎨 Themes

Velvet Vista supports **Dark Mode** (default) and **Light Mode**:
- **Dark Mode:** Deep Obsidian (`#0B0C10`), Royal Velvet (`#4B0082`), Neon Aqua (`#00FFFF`).
- **Light Mode:** Premium Paper White (`#FAFAFA`), Deep Charcoal (`#1C1C1C`), Luxury Emerald (`#00875A`).

Toggle themes using the `ThemeService` in the frontend.

---

## 📜 License

MIT
