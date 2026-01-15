# Phase 1 Quick Start Guide

## 🎯 Phase 1 Goals
Set up modern development environment with TypeScript, modern build tools, and code quality tools.

## 📋 Phase 1 Checklist

### Week 1: TypeScript & Build Tools

#### Day 1-2: Backend TypeScript Setup
```bash
# Install TypeScript dependencies
cd backend
npm install --save-dev typescript @types/node @types/express @types/cookie-parser @types/bcryptjs @types/jsonwebtoken @types/mongoose @types/nodemailer ts-node nodemon

# Create tsconfig.json
npx tsc --init
```

**Tasks:**
- [ ] Create `backend/tsconfig.json` with strict mode
- [ ] Rename `server.js` → `server.ts`
- [ ] Update imports to use TypeScript
- [ ] Convert `app.js` → `app.ts`
- [ ] Update package.json scripts

#### Day 3-4: Frontend TypeScript Setup
```bash
cd frontend
npm install --save-dev typescript @types/react @types/react-dom @types/node
```

**Tasks:**
- [ ] Create `frontend/tsconfig.json`
- [ ] Convert utility files first (store.js, actions)
- [ ] Convert components incrementally
- [ ] Add type definitions for Redux

#### Day 5: Replace Create React App with Vite
```bash
cd frontend
npm install --save-dev vite @vitejs/plugin-react
npm uninstall react-scripts
```

**Tasks:**
- [ ] Create `vite.config.ts`
- [ ] Update `index.html` (move to root)
- [ ] Update package.json scripts
- [ ] Test build and dev server
- [ ] Update imports (remove relative extensions)

### Week 2: Code Quality & Tooling

#### Day 1-2: ESLint & Prettier Setup
```bash
# Backend
cd backend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier

# Frontend
cd frontend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
```

**Tasks:**
- [ ] Create `.eslintrc.js` for backend
- [ ] Create `.eslintrc.js` for frontend
- [ ] Create `.prettierrc` and `.prettierignore`
- [ ] Add lint scripts to package.json
- [ ] Test linting

#### Day 3: Git Hooks Setup
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

**Tasks:**
- [ ] Initialize Husky
- [ ] Create `.lintstagedrc.json`
- [ ] Test pre-commit hooks
- [ ] Add commit message linting

#### Day 4-5: Documentation & Cleanup
**Tasks:**
- [ ] Update README with new setup instructions
- [ ] Document TypeScript migration progress
- [ ] Clean up unused dependencies
- [ ] Update .gitignore
- [ ] Create development guide

---

## 🛠️ Configuration Files

### backend/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### frontend/vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
```

### .lintstagedrc.json
```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

---

## ✅ Success Criteria

- [ ] Backend compiles with TypeScript without errors
- [ ] Frontend runs with Vite successfully
- [ ] All linting passes
- [ ] Pre-commit hooks work
- [ ] Build times improved
- [ ] Type safety in place

---

## 🚀 Quick Commands

```bash
# Backend
npm run dev          # Run with nodemon + ts-node
npm run build        # Compile TypeScript
npm run start        # Run compiled JS

# Frontend
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Preview production build

# Linting
npm run lint         # Check for errors
npm run lint:fix     # Auto-fix errors
```

---

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [ESLint TypeScript](https://typescript-eslint.io/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

