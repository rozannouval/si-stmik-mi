# DECISIONS.md

---

# Core Stack Decisions

* Use Next.js 16 App Router
* Use React 19
* Use Prisma v6 — BUKAN v7
* Use Prisma classic generator (`prisma-client-js`)
* TIDAK menggunakan `prisma.config.ts` — file itu hanya ada di Prisma v7
* Use Neon PostgreSQL
* Use NextAuth v4 — BUKAN v5
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

* Use singleton Prisma client di `lib/prisma.ts`
* Prefer server-side database access
* Avoid database fetching from client
* Use Prisma select optimization
* Add relational indexes for scalability
* Perintah generate: `npx prisma generate` (valid di v6)
* Perintah migrate: `npx prisma migrate dev --name <nama>`

---

# Authentication Decisions

* Use getServerSession pattern
* Use centralized session helper
* Middleware only for route protection
* Authorization must still happen server-side
* Use RBAC architecture (ADMIN, DOSEN, MAHASISWA)
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

* Use shadcn/ui sebagai UI foundation
* Use Tailwind CSS utility-first styling
* Keep UI primitives inside `components/ui`
* Prefer composition over prop-heavy APIs
* Use responsive-first layout strategy

---

# Shadcn/UI Form Decision (PENTING)

* Shadcn versi terbaru TIDAK menggunakan komponen `Form` dengan `FormField`, `FormItem`, `FormLabel`, `FormMessage`
* Komponen tersebut sudah diganti dengan `Field` system
* Install: `npx shadcn@latest add field`
* Pola yang benar:
  - `Controller` dari react-hook-form
  - `Field`, `FieldLabel`, `FieldError` dari `@/components/ui/field`
  - `data-invalid={fieldState.invalid}` pada `<Field>`
  - `aria-invalid={fieldState.invalid}` pada input element
* JANGAN import dari `@/components/ui/form` — file itu tidak ada di versi ini

---

# Reusable Components Decisions

## DataTable
* Use TanStack Table
* Use reusable generic DataTable di `components/data-table/`
* Keep table feature-agnostic
* Feature-specific columns stay inside `features/*/components/columns.tsx`
* Props: `columns`, `data`, `searchKey` (opsional), `searchPlaceholder` (opsional)

## Form Fields
* Semua field menggunakan `useFormContext()` — wajib wrap dengan `FormProvider`
* `InputField` — untuk text, email, password, number
* `SelectField` — menerima `options: { label: string, value: string }[]`
* `TextareaField` — menerima `rows` prop (default 3)
* `SubmitButton` — otomatis disabled + spinner saat `isSubmitting`

---

# Data Table Decisions

* Use TanStack Table
* Use reusable generic DataTable
* Keep table feature-agnostic
* Feature-specific columns stay inside `features/*`
* Use folder namespace naming strategy

---

# Form Decisions

* Use React Hook Form
* Use Zod validation
* Infer types from Zod schemas
* Validate all server actions
* Use reusable form field architecture (sudah ada di `components/form/`)

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

# Prisma Schema — Completed Models

```prisma
model ProgramStudi {
  id        String   @id @default(cuid())
  kode      String   @unique
  nama      String
  jenjang   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("program_studi")
}
```

Model berikutnya yang perlu dibuat (belum ada di schema):
* Mahasiswa (relasi ke ProgramStudi)
* Dosen (relasi ke ProgramStudi)
* MataKuliah (relasi ke ProgramStudi)
* Kelas (relasi ke MataKuliah + Dosen)
* Jadwal (relasi ke Kelas)
* KRS (relasi ke Mahasiswa + Kelas)
* Nilai (relasi ke KRS)

---

# Current Project Phase

## Phase saat ini: Program Studi CRUD

Yang sudah selesai di Program Studi:
* Prisma model + migration ✅
* Types (`features/program-studi/types/index.ts`) ✅
* Get actions (`features/program-studi/actions/get-program-studi.ts`) ✅
* Columns untuk DataTable (`features/program-studi/components/columns.tsx`) ✅

Yang belum selesai (next step langsung kerjakan ini):
* `features/program-studi/schemas/index.ts` — Zod schema
* `features/program-studi/actions/create-program-studi.ts`
* `features/program-studi/actions/update-program-studi.ts`
* `features/program-studi/actions/delete-program-studi.ts`
* `features/program-studi/components/program-studi-form.tsx` — Dialog form create/edit
* `features/program-studi/components/delete-dialog.tsx`

## Next priorities setelah Program Studi selesai:

1. Mahasiswa CRUD
2. Dosen CRUD
3. Mata Kuliah CRUD
4. Generic search/filter system (URL-based search params)
5. Audit logging system
6. Kelas & Jadwal
7. KRS
8. Nilai