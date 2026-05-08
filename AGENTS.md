# Project Rules

## Stack
- Next.js 16
- React 19
- Prisma 6.16.3
- Neon PostgreSQL
- NextAuth v4
- pnpm

## Architecture
- App Router only
- Server Components by default
- Server Actions preferred
- No Prisma v7 config system
- Use prisma-client-js generator
- Use singleton Prisma client

## Auth
- JWT session strategy
- Credentials login only
- RBAC roles:
  - ADMIN
  - DOSEN
  - MAHASISWA

## Folder Structure
app/
components/
features/
lib/
prisma/
types/

## Coding Rules
- Avoid unnecessary client components
- Prefer server-side database queries
- Use Zod validation
- Use TypeScript strict mode
- Avoid overengineering

## Current Progress
DONE:
- Prisma setup
- Neon setup
- User model
- NextAuth setup

NEXT:
- Login page
- Middleware protection
- Dashboard