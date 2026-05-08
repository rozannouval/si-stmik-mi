# AGENTS.md

## Project Overview

LMS + SIAKAD platform for STMIK / Sekolah Tinggi management.

Architecture goals:

* scalability
* maintainability
* server-first rendering
* minimal client complexity
* reusable system design
* enterprise-grade structure

---

# Stack

* Next.js 16
* React 19
* TypeScript strict mode
* Prisma 6.16.3
* Neon PostgreSQL
* NextAuth v4
* Tailwind CSS
* Shadcn/UI
* Radix UI
* TanStack Table
* Zod
* React Hook Form
* Lucide React
* pnpm

---

# Core Architecture Rules

## Rendering Strategy

* App Router only
* React Server Components by default
* Client Components only for interactivity
* Prefer async server pages
* Avoid unnecessary hydration
* Prefer server-first architecture

---

## Data Fetching Rules

Preferred order:

1. Server Components
2. Server Actions
3. Route Handlers
4. Client fetching (last resort)

Avoid:

* unnecessary useEffect fetching
* unnecessary API routes
* unnecessary client state

---

## Database Rules

* Prisma v6 only
* Use prisma-client-js
* Use singleton Prisma client
* No Prisma v7 config system
* Prefer select/include optimization
* Add indexes for scalability
* Prefer server-side Prisma access

---

## Authentication Rules

* NextAuth v4
* JWT session strategy
* Credentials login only
* No Prisma Adapter
* RBAC required

Roles:

* ADMIN
* DOSEN
* MAHASISWA

---

## Session Rules

* Use getServerSession()
* Use centralized lib/session.ts helper
* Never trust frontend authorization
* Final authorization must happen on server
* Middleware only for route protection
* Session injection should happen in layouts/pages

---

# Folder Structure

app/
components/
features/
lib/
prisma/
types/

---

# Feature Structure Rules

Features should scale modularly:

features/
auth/
dashboard/
program-studi/
mahasiswa/
dosen/
mata-kuliah/
kelas/
jadwal/
krs/
nilai/

Each feature may contain:

actions/
components/
schemas/
types/
constants/

---

# Dashboard Architecture Rules

* Dashboard must use shared layout
* Sidebar must be role-aware
* Navigation config must be centralized
* Dashboard pages remain Server Components by default
* Session validation must happen server-side
* Prefer route groups for dashboard isolation
* Sidebar navigation should be config-driven
* Header/Navbar should be shared
* Avoid client dashboard wrappers
* Mobile sidebar should use Sheet component
* Dashboard layout should remain reusable

---

# Data Table Rules

* Use TanStack Table
* DataTable must be reusable
* Keep table generic and type-safe
* Feature-specific columns must stay inside features/*
* Avoid hardcoded business logic in reusable table
* Use folder namespace architecture

Preferred structure:

components/data-table/
  index.tsx
  toolbar.tsx
  pagination.tsx
  search.tsx
  empty-state.tsx
  types.ts

---

# Form Architecture Rules

* Use React Hook Form
* Use Zod validation
* Validate all server actions
* Infer types from Zod
* Never trust client input
* Form fields should be reusable

Preferred structure:

components/form/
  input-field.tsx
  select-field.tsx
  textarea-field.tsx
  submit-button.tsx

---

# Shadcn/UI Rules

* Use shadcn/ui as primary UI system
* Keep primitive UI components inside components/ui
* Do not place business logic inside components/ui
* Prefer composition over prop-heavy abstractions
* Use cn() utility consistently
* Prefer reusable UI primitives

components/ui should only contain:

* button
* card
* dialog
* input
* dropdown-menu
* table
* badge
* avatar
* etc

Never place:

* auth logic
* database logic
* business features
* dashboard-specific logic

inside primitive UI components.

---

# Program Studi Architecture

Current institution target:

* STMIK / Sekolah Tinggi

Current academic structure:

* Program Studi based structure
* No Fakultas abstraction for now
* Avoid premature multi-institution abstraction

Example:

* Teknik Informatika
* Sistem Informasi
* Bisnis Digital

---

# UI Rules

* Responsive by default
* Consistent spacing
* Consistent layout structure
* Sidebar layout architecture required
* Use loading.tsx when appropriate
* Use skeleton loading states
* Avoid layout shift

Dashboard pages should follow:

Header
Sidebar
Content Container
Page Title
Actions
Content

---

# Code Style Rules

## Prefer

* early returns
* reusable functions
* feature modularization
* server-first patterns
* composition over inheritance
* small components

## Avoid

* overengineering
* giant client components
* deep prop drilling
* unnecessary abstractions
* premature optimization

---

# Auth Architecture

Correct structure:

auth.ts
→ authOptions export

session.ts
→ getServerSession helper

middleware.ts
→ route protection only

route.ts
→ NextAuth(authOptions)

Never use:

* Auth.js v5 syntax
* auth() helper from v5
* Prisma Adapter

---

# Security Rules

* Never expose sensitive env variables
* Always hash passwords
* Always validate roles server-side
* Never trust frontend authorization
* Never commit .env
* Keep database access server-only

---

# Performance Rules

* Prefer server rendering
* Avoid unnecessary client state
* Avoid unnecessary client providers
* Keep middleware lightweight
* Keep JWT callback lightweight
* Use Prisma select optimization
* Minimize use client usage
* Use streaming/loading boundaries properly

---

# Development Workflow

## Branching

main
→ production/demo branch

dev
→ active development branch

feature/*
→ isolated feature development

---

## Commit Convention

feat:
fix:
refactor:
style:
chore:

---

# Current Progress

DONE:

* Prisma setup
* Neon setup
* Prisma singleton
* User model
* NextAuth v4 setup
* Credentials login
* JWT auth flow
* Session typing
* Middleware protection
* Login flow testing
* Dashboard foundation
* Shared dashboard layout
* Sidebar system foundation
* TanStack Table installation
* Reusable DataTable structure

IN PROGRESS:

* Reusable DataTable implementation
* Reusable form system
* Program Studi architecture
* CRUD foundation

NEXT:

* Program Studi CRUD
* Mahasiswa CRUD
* Dosen CRUD
* Mata Kuliah CRUD
* Server Action patterns
* Generic search/filter system
* Audit logging system

---

# Long-Term Architecture Goals

Priority:

1. Stability
2. Maintainability
3. Scalability
4. Performance
5. UX polish

Never sacrifice architecture quality for temporary speed.