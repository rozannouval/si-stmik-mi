# DECISIONS.md

# Core Stack Decisions

* Use Next.js 16 App Router
* Use React 19
* Use Prisma v6 instead of v7
* Use Prisma classic generator
* Use Neon PostgreSQL
* Use NextAuth v4 instead of v5
* Use JWT session strategy
* Use Credentials login only
* Do not use Prisma Adapter

---

# Architecture Decisions

* Use App Router only
* Use React Server Components by default
* Prefer server-first architecture
* Avoid unnecessary client-side rendering
* Prefer modular feature-based structure
* Avoid monolithic architecture
* Prefer Server Actions over REST endpoints

---

# Database Decisions

* Use singleton Prisma client
* Prefer server-side database access
* Avoid database fetching from client
* Use Prisma select optimization
* Add relational indexes for scalability

---

# Authentication Decisions

* Use getServerSession pattern
* Use centralized session helper
* Middleware only for route protection
* Authorization must still happen server-side
* Use RBAC architecture
* Use typed session augmentation

---

# Dashboard Decisions

* Use route groups for dashboard isolation
* Use shared dashboard layout
* Use centralized navigation config
* Sidebar must be role-aware
* Dashboard layout must remain reusable
* Session injection should happen server-side
* Dashboard pages remain Server Components by default
* Mobile sidebar should use Sheet component

---

# UI Decisions

* Use shadcn/ui as UI foundation
* Use Tailwind CSS utility-first styling
* Keep UI primitives inside components/ui
* Prefer composition over prop-heavy APIs
* Use responsive-first layout strategy
* Build dashboard foundation before CRUD

---

# Data Table Decisions

* Use TanStack Table
* Use reusable generic DataTable
* Keep table feature-agnostic
* Feature-specific columns stay inside features/*
* Use folder namespace naming strategy
* Avoid redundant file naming

---

# Form Decisions

* Use React Hook Form
* Use Zod validation
* Infer types from Zod schemas
* Validate all server actions
* Use reusable form field architecture

---

# Academic Structure Decisions

* Focus current system on STMIK / Sekolah Tinggi
* Do not implement Fakultas abstraction yet
* Use Program Studi based structure
* Avoid premature multi-institution architecture
* Prioritize simplicity over premature flexibility

---

# Navigation Decisions

* Navigation must be centralized
* Sidebar navigation must be config-driven
* Avoid hardcoded navigation
* Use pathname-based active navigation

---

# Performance Decisions

* Minimize use client usage
* Prefer Server Components whenever possible
* Avoid unnecessary hydration
* Keep middleware lightweight
* Keep JWT callbacks lightweight
* Use loading boundaries properly

---

# Security Decisions

* Never trust frontend authorization
* Authorization must happen server-side
* Keep sensitive logic server-only
* Never expose sensitive env variables
* Never commit .env

---

# Current Project Phase

Current phase:

* Reusable CRUD Foundation

Next priorities:

1. Reusable DataTable
2. Reusable form system
3. Program Studi CRUD
4. Mahasiswa CRUD
5. Dosen CRUD
6. Mata Kuliah CRUD
7. Generic search/filter system
8. Audit logging system