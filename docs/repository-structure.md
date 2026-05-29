# Velvet Vista - Repository Structure & Initial Files

## 📁 Root Directory Structure

```
velvet-vista/
├── backend/                          # NestJS Core API (Cloudflare Workers)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── fuzzy-search/
│   │   │   │   ├── fuzzy-search.module.ts
│   │   │   │   ├── fuzzy-search.service.ts
│   │   │   │   └── fuzzy-search.controller.ts
│   │   │   ├── mcp/
│   │   │   │   ├── mcp.module.ts
│   │   │   │   ├── mcp.controller.ts
│   │   │   │   └── mcp.service.ts
│   │   │   └── products/
│   │   │       ├── products.module.ts
│   │   │       ├── products.service.ts
│   │   │       └── products.controller.ts
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── config/
│   │       ├── cloudflare.config.ts
│   │       └── supabase.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── .eslintrc.json
│
├── frontend/                         # Angular Client (Cloudflare Pages)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── watch-card/
│   │   │   │   ├── search-bar/
│   │   │   │   └── theme-toggle/
│   │   │   ├── services/
│   │   │   │   ├── fuzzy-search.service.ts
│   │   │   │   ├── supabase.service.ts
│   │   │   │   └── theme.service.ts
│   │   │   ├── models/
│   │   │   │   ├── watch.model.ts
│   │   │   │   └── cart.model.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   ├── app.module.ts
│   │   │   └── app.routes.ts
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── themes/
│   │   │       ├── dark-theme.scss
│   │   │       └── light-theme.scss
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   └── styles/
│   │       ├── _variables.scss
│   │       └── global.scss
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── angular.json
│   └── .eslintrc.json
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_products_table.sql
│   │   ├── 003_create_orders_table.sql
│   │   └── 004_create_cart_table.sql
│   └── seed/
│       └── luxury_watches.sql
│
├── .github/
│   └── workflows/
│       └── verify.yml
│
├── README.md
└── .gitignore
```

---

## 📦 Backend - package.json

```json
{
  "name": "velvet-vista-backend",
  "version": "1.0.0",
  "description": "Velvet Vista NestJS Core API",
  "author": "Rori Kari",
  "private": true,
  "license": "MIT",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test:unit": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "@supabase/supabase-js": "^2.39.0",
    "reflect-metadata": "^0.2.1",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@nestjs/schematics": "^10.1.0",
    "@nestjs/testing": "^10.3.0",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.6",
    "@typescript-eslint/eslint-plugin": "^6.17.0",
    "@typescript-eslint/parser": "^6.17.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.2",
    "jest": "^29.7.0",
    "prettier": "^3.1.1",
    "source-map-support": "^0.5.21",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

---

## 📦 Frontend - package.json

```json
{
  "name": "velvet-vista-frontend",
  "version": "1.0.0",
  "description": "Velvet Vista Angular Client",
  "author": "Rori Kari",
  "private": true,
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,scss}\""
  },
  "dependencies": {
    "@angular/animations": "^17.2.0",
    "@angular/common": "^17.2.0",
    "@angular/compiler": "^17.2.0",
    "@angular/core": "^17.2.0",
    "@angular/forms": "^17.2.0",
    "@angular/platform-browser": "^17.2.0",
    "@angular/platform-browser-dynamic": "^17.2.0",
    "@angular/router": "^17.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "rxjs": "~7.8.1",
    "tslib": "^2.6.2",
    "zone.js": "~0.14.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.2.0",
    "@angular/cli": "^17.2.0",
    "@angular/compiler-cli": "^17.2.0",
    "@types/jasmine": "~5.1.2",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.2",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "prettier": "^3.1.1",
    "typescript": "~5.3.3"
  }
}
```

---

## 🔧 Backend - tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["src/*"],
      "@modules/*": ["src/modules/*"],
      "@config/*": ["src/config/*"]
    }
  }
}
```

---

## 🔧 Frontend - tsconfig.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom"],
    "useDefineForClassFields": false
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

---

## 🔧 Backend - jest.config.js

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1'
  }
};
```

---

## 🔧 Backend - .eslintrc.json

```json
{
  "root": true,
  "env": {
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

---

## 🔧 Frontend - .eslintrc.json

```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2022": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

---

## 🚀 GitHub Actions - verify.yml

```yaml
name: Velvet Vista Enterprise Validation Engine

on:
  pull_request:
    branches: [ main ]

jobs:
  verify-backend:
    name: Backend Validation
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Lint Check
        run: npm run lint

      - name: Prettier Format Check
        run: npm run format:check

      - name: Unit Tests
        run: npm run test:unit

  verify-frontend:
    name: Frontend Validation
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Lint Check
        run: npm run lint

      - name: Prettier Format Check
        run: npm run format:check

      - name: Unit Tests
        run: npm run test -- --watch=false --browsers=ChromeHeadless
```

---

## 📄 README.md

```markdown
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

### Installation

#### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend (Angular)
```bash
cd frontend
npm install
npm start
```

### Environment Setup

#### Supabase
1. Create a new project in [Supabase Dashboard](https://app.supabase.com/)
2. Update `backend/src/config/supabase.config.ts` with your credentials
3. Run migrations:
   ```bash
   cd supabase/migrations
   psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f 001_create_users_table.sql
   ```

#### Cloudflare
1. Deploy backend to Cloudflare Workers:
   ```bash
   cd backend
   npm run build
   wrangler deploy
   ```
2. Deploy frontend to Cloudflare Pages:
   ```bash
   cd frontend
   npm run build
   # Configure in Cloudflare Pages dashboard
   ```

## 🏗️ Project Structure

- `/backend`: NestJS Core API
- `/frontend`: Angular Client
- `/supabase`: Database migrations and seeds

## 🔧 CI/CD

GitHub Actions workflow runs on every PR to `main`:
- Linting (ESLint)
- Formatting (Prettier)
- Unit Tests (Jest/Karma)

## 📜 License

MIT
```

---

## 📄 .gitignore

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
*.tsbuildinfo

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/

# Supabase
supabase/.env
```