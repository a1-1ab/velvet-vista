# AGENT.md - Velvet Vista AI Co-Pilot Ledger

## 1. Executive Architectural Mandates
* **Development Paradigm:** Strict Object-Oriented Programming (OOP) must be maintained across all tiers[cite: 1]. Procedural modules, loose untyped objects, or anonymous functional mutations are strictly forbidden[cite: 1].
* **Backend Core Engine:** NestJS framework running seamlessly on top of a serverless Cloudflare Workers runtime using the `nodejs_compat` layer[cite: 1]. Dependency Injection (DI) and decorators must govern initialization lifecycles[cite: 1].
* **Frontend Client Shell:** Angular application deployed via Cloudflare Pages[cite: 1]. It must leverage strong typing, strict class-based component structures, and decoupled service encapsulation[cite: 1].
* **Persistent Data Layer:** Supabase PostgreSQL instance utilizing strict relational modeling[cite: 1]. All transactions must be securely filtered via PostgreSQL Row-Level Security (RLS) policies[cite: 1].

---

## 2. Global Codebase & Design Conventions

### 2.1 Code Commenting Rules
* **No Inline Visual Clutter:** Line-by-line narrative or redundant comments are strictly restricted[cite: 1]. Code must remain highly self-documenting through clear, explanatory naming conventions[cite: 1].
* **Class Documentation Blocks:** Every core class must feature a standard header detailing its purpose, scope, and encapsulation state[cite: 1].
* **Method Documentation Blocks:** Complex methods must include header blocks defining parameter input types, explicit return outputs, and potential exception pathways[cite: 1].

### 2.2 Class Property Grouping Template
All class attributes and internal states must be grouped vertically by accessibility modifiers first, and functional types second[cite: 1]:
1. **Public Fields / Reactive Signals:** Global touchpoints and interface bindings[cite: 1].
2. **Protected Abstract Structures:** Shared state for internal subclass inheritance models[cite: 1].
3. **Private Operational States:** Encapsulated local properties, infrastructure instances, or singletons[cite: 1].

---

## 3. UI/UX & Design Token Matrix

### 3.1 Luxury Theme Configurations
* **Dark Mode (Default Canvas):** Deep Obsidian (`#0B0C10`), Royal Velvet Contrast (`#4B0082`), Active Neon Aqua Accents (`#00FFFF`), and Secondary Deep Indigo Containers (`#2A2B4D`)[cite: 1].
* **Light Mode (Alternative Canvas):** Premium Paper White (`#FAFAFA`), Deep Charcoal Slate Typography (`#1C1C1C`), and Luxury Emerald Grass Branding Accents (`#00875A`)[cite: 1].

### 3.2 Accessibility (A11y) Enforcement
* **Contrast Thresholds:** All typography and functional iconography must programmatically satisfy a minimum contrast ratio of 4.5:1 to adhere to WCAG 2.1 AA standards[cite: 1].
* **WAI-ARIA Layout Landmarks:** Semantic elements must declare precise accessibility roles (`role="main"`, `aria-live`, `role="status"`)[cite: 1]. Focus trapping directives must handle interactive modal overlays and sliding drawers using physical keyboard arrow key handlers[cite: 1].

---

## 4. Architectural Feature Specifications

### 4.1 Native Fuzzy Logic Search Service
* **Algorithmic Model:** A pure TypeScript utility (`FuzzySearchService`) calculating text variation matrices using the Levenshtein Distance algorithm[cite: 1].
* **Mathematical Function:** For user query $q$ and target database attribute $a$:
  $$Sim(q, a) = 1 - \frac{Lev(q, a)}{\max(|q|, |a|)}$$
* **Matching Constraints:** Products are only returned in localized search arrays if $Sim(q, a) \ge 0.65$[cite: 1].

### 4.2 Edge AI Virtual Assistant
* **Inference Engine:** Interactive context drawer streaming real-time token streams directly via the **Cloudflare Workers AI** ecosystem[cite: 1].
* **Operational Boundary:** Utilizes open-weights edge model execution (e.g., Llama 3) to bypass external billing systems and traditional regional network geo-blocking[cite: 1].

### 4.3 Model Context Protocol (MCP) Node
* **Protocol Schema:** Implementation of an isolated `McpController` inside the NestJS engine[cite: 1]. Exposes inventory scanning capabilities (`list_luxury_watches`) utilizing JSON-RPC 2.0 formatting over Server-Sent Events (SSE) for external AI orchestrators[cite: 1].

---

## 5. Automated DevOps CI/CD Pipeline
The GitHub Actions workflow runner (`.github/workflows/verify.yml`) automatically executes on every incoming Pull Request targeted at the `main` branch to guarantee codebase preservation[cite: 1]:
1. **Dependency Hydration:** Safe restoration of system runtime packages (`npm ci`)[cite: 1].
2. **Quality & ESLint Audit:** Verifies strict compliance with OOP constraints and static analysis rule configurations[cite: 1].
3. **Syntax Formatting Check:** Evaluates code style matrices against rigid Prettier rules[cite: 1].
4. **Unit Context Testing:** Executes the entire isolated domain test suite through Jest[cite: 1].

---

## 6. Project Roadmap & Context Ledger

### 6.1 Status Checklist
- [x] **Phase 0:** Structural System Specifications & Architecture Selection Locked[cite: 1]
- [x] **Phase 1:** Repository Framing & CI/CD Linter Automation Configuration[cite: 1]
- [ ] **Phase 2:** Supabase Relational Migration Schemes & Row-Level Security Enforcements[cite: 1]
- [x] **Phase 3:** NestJS Domain Services, Levenshtein Matrices, & Edge AI Route Handling[cite: 1]
- [x] **Phase 4:** Angular Client Shell & Accessible Interactive Theme Layouts[cite: 1]

### 6.2 Active Task Horizon
* **Phase 2:** Run the Supabase migrations (`001_create_users_table.sql`, `002_create_products_table.sql`, `003_create_orders_table.sql`, `004_create_cart_table.sql`) and seed the database with luxury watch data (`luxury_watches.sql`).
* **Phase 3:** Implement the `ProductsModule` and `McpModule` in the backend.

### 6.3 Next Steps
1. **Set up Supabase:**
   - Run the SQL migrations from `supabase/migrations/`.
   - Seed the database with luxury watch data from `supabase/seed/luxury_watches.sql`.
   - Update `backend/src/config/supabase.config.ts` with your Supabase credentials.

2. **Complete Backend:**
   - Implement the `ProductsModule` to fetch data from Supabase.
   - Develop the `McpModule` for JSON-RPC 2.0 over SSE.
   - Test the `FuzzySearchService` with real data.

3. **Test Frontend:**
   - Run the Angular development server and verify all pages (Home, Watches, Watch Detail, Cart).
   - Test the `SupabaseService` and `ThemeService`.

4. **Deploy to Cloudflare:**
   - Deploy the backend to Cloudflare Workers.
   - Deploy the frontend to Cloudflare Pages.

---

## 7. Documentation Links
- [Repository Structure & Initial Files](docs/repository-structure.md)
- [Supabase Schema & Initial Data](docs/supabase-schema.md)
- [FuzzySearchService Implementation](backend/src/modules/fuzzy-search/fuzzy-search.service.ts)
- [FuzzySearchModule](backend/src/modules/fuzzy-search/fuzzy-search.module.ts)
- [FuzzySearchController](backend/src/modules/fuzzy-search/fuzzy-search.controller.ts)
- [AppModule](backend/src/app.module.ts)
- [Main.ts](backend/src/main.ts)
- [SupabaseService (Frontend)](frontend/src/app/services/supabase.service.ts)
- [ThemeService (Frontend)](frontend/src/app/services/theme.service.ts)
- [Watch Model](frontend/src/app/models/watch.model.ts)
- [Home Component](frontend/src/app/pages/home/home.component.ts)
- [Watches Component](frontend/src/app/pages/watches/watches.component.ts)
- [Watch Detail Component](frontend/src/app/pages/watch-detail/watch-detail.component.ts)
- [Cart Component](frontend/src/app/pages/cart/cart.component.ts)
- [CI/CD Workflow](.github/workflows/verify.yml)

---

## 8. Repository Structure Summary

### Backend (`backend/`)
- **Core:** `app.module.ts`, `main.ts`
- **Modules:** `fuzzy-search/` (controller, module, service)
- **Config:** `supabase.config.ts`
- **Configs:** `package.json`, `tsconfig.json`, `.eslintrc.json`, `jest.config.js`

### Frontend (`frontend/`)
- **Core:** `app.component.ts`, `app.config.ts`, `app.module.ts`, `app.routes.ts`
- **Pages:** `home/`, `watches/`, `watch-detail/`, `cart/`
- **Services:** `supabase.service.ts`, `theme.service.ts`
- **Models:** `watch.model.ts`
- **Configs:** `package.json`, `tsconfig.json`, `angular.json`, `.eslintrc.json`
- **Styles:** `global.scss`
- **Environments:** `environment.ts`, `environment.prod.ts`

### Supabase (`supabase/`)
- **Migrations:** `001_create_users_table.sql`, `002_create_products_table.sql`, `003_create_orders_table.sql`, `004_create_cart_table.sql`
- **Seed:** `luxury_watches.sql`

### CI/CD (`.github/workflows/`)
- **Workflow:** `verify.yml` (Backend + Frontend validation)

### Documentation (`docs/`)
- **Guides:** `repository-structure.md`, `supabase-schema.md`
