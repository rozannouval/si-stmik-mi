# AGENTS.md

## Project Overview

LMS + SIAKAD platform for university management.

Architecture is optimized for:

* scalability
* server-first rendering
* maintainability
* minimal client-side complexity

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
* pnpm

---

# Core Architecture Rules

## Rendering Strategy

* App Router only
* Server Components by default
* Client Components only when interactivity is required
* Prefer async server pages
* Avoid unnecessary hydration

## Data Fetching

Preferred order:

1. Server Components
2. Server Actions
3. Route Handlers (only if necessary)
4. Client fetching (last resort)

Avoid:

* unnecessary useEffect fetching
* unnecessary API routes

## Database

* Prisma v6 only
* Use `prisma-client-js`
* Use singleton Prisma client
* No Prisma v7 config system
* Prefer select/include optimization
* Add indexes for relational scalability

## Authentication

* NextAuth v4
* JWT session strategy
* Credentials login only
* No Prisma Adapter
* RBAC roles:

  * ADMIN
  * DOSEN
  * MAHASISWA

## Session Rules

* Use `getServerSession`
* Use `lib/session.ts`
* Never trust client-side role checks
* Middleware only for route protection
* Final authorization must happen on server

---

# Folder Structure

app/
components/
features/
lib/
prisma/
types/

Feature modules should scale like:

features/
auth/
dashboard/
mahasiswa/
dosen/
kelas/
jadwal/

---

# Validation Rules

* Use Zod everywhere
* Validate all server actions
* Never trust client input
* Infer types from Zod

Example:

* `z.infer<typeof schema>`

---

# UI Rules

* Use shadcn/ui
* Consistent spacing
* Consistent dashboard layout
* Responsive by default
* Sidebar layout architecture required

## Dashboard Structure

Dashboard pages should follow:

Header
Sidebar
Content container
Page title
Actions
Content

---

# Dashboard Architecture Rules

* Dashboard must use shared layout
* Sidebar must be role-aware
* Navigation config must be centralized
* Session checks must happen server-side
* Dashboard pages must remain Server Components by default
* Avoid client dashboard wrappers
* Dashboard layout should remain reusable
* Prefer route groups for dashboard isolation
* Sidebar navigation must be config-driven
* Header should support user session display
* Logout flow should use NextAuth signOut()

---

# Code Style

## Prefer

* early returns
* small reusable functions
* feature modularization
* server-first architecture

## Avoid

* overengineering
* deep prop drilling
* giant client components
* unnecessary abstractions
* premature optimization

---

# Auth Architecture

## Correct Pattern

auth.ts
→ export authOptions

session.ts
→ getServerSession helper

middleware.ts
→ withAuth()

route.ts
→ NextAuth(authOptions)

## Never Use

* Auth.js v5 syntax
* `auth()` helper from v5
* Prisma Adapter

---

# Security Rules

* Never expose sensitive env variables
* Always hash passwords
* Never trust frontend authorization
* Always validate role on server
* Never commit `.env`

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

IN PROGRESS:

* Dashboard foundation
* Shared dashboard layout
* Sidebar architecture
* Role-based navigation
* Header/Navbar system

NEXT:

* Logout flow
* Role-based dashboard routing
* Dashboard overview pages
* Admin master CRUD
* Generic table system
* Reusable form system

---

# Development Workflow

## Branching

main
→ production/demo branch

dev
→ active development branch

feature/*
→ isolated feature development

## Commit Convention

feat:
fix:
refactor:
style:
chore:

---

# Performance Rules

* Prefer server rendering
* Avoid unnecessary client state
* Keep JWT callback lightweight
* Keep middleware lightweight
* Use loading.tsx
* Use Prisma select optimization
* Avoid unnecessary re-renders
* Avoid unnecessary client providers

---

# Long-Term Architecture Goals

Priority order:

1. Stability
2. Maintainability
3. Scalability
4. Performance
5. UI polish

Never sacrifice architecture quality for temporary speed.