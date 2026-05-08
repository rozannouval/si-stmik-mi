# Decisions.md

# Core Stack Decisions

* Prisma v6 instead of v7
* Prisma classic generator
* NextAuth v4 instead of v5
* Neon PostgreSQL
* JWT auth strategy
* Credentials login only
* No Prisma Adapter
* App Router only
* React Server Components by default

---

# Auth Decisions

* Use getServerSession pattern
* Use middleware only for route protection
* Authorization must still happen on server
* Use RBAC architecture
* Use typed session augmentation
* Use JWT-based session strategy

---

# Database Decisions

* Singleton Prisma client
* Prefer server-side Prisma queries
* Avoid client-side database fetching
* Add database indexes for scalability

---

# Architecture Decisions

* Feature-first architecture
* Avoid monolithic lib/actions folders
* Prefer modular feature structure
* Avoid unnecessary API routes
* Prefer Server Actions over REST endpoints

---

# UI Decisions

* Use shadcn/ui
* Dashboard layout first before CRUD
* Responsive-first architecture
* Shared sidebar system

---

# Dashboard Decisions

* Use route groups for dashboard isolation
* Use centralized navigation config
* Use shared dashboard layout
* Use server-side session injection
* Use role-based dashboard architecture
* Sidebar should be config-driven
* Dashboard layout should remain reusable
* Header/Navbar should be shared
* Session validation must happen server-side
* Dashboard pages should remain Server Components by default

---

# Session Decisions

* Session access should use lib/session.ts helper
* Do not access NextAuth directly in many places
* Prefer centralized auth utilities
* Session should be injected from server layouts

---

# Navigation Decisions

* Sidebar navigation should be role-aware
* Navigation config should be centralized
* Avoid hardcoded navigation items
* Sidebar active state should use pathname

---

# Security Decisions

* Never trust frontend authorization
* Role validation must happen server-side
* Middleware is not final authorization layer
* Sensitive data must stay server-side

---

# Current Project Phase

Current phase:

* Dashboard Foundation

Next priorities:

1. Shared dashboard layout
2. Sidebar/Navbar
3. Role-based dashboard routing
4. Logout flow
5. Dashboard overview pages
6. Master data CRUD
7. Generic table system
8. Reusable form system