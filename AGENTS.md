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
* Prisma 6.16.3 (BUKAN v7 — jangan gunakan prisma.config.ts atau sintaks v7)
* Neon PostgreSQL
* NextAuth v4
* Tailwind CSS
* Shadcn/UI (versi terbaru — gunakan komponen Field, bukan FormField lama)
* Radix UI
* TanStack Table
* Zod
* React Hook Form
* Lucide React
* pnpm

---

# Critical Notes (Baca Sebelum Generate Kode)

## Prisma
* Gunakan Prisma v6 — BUKAN v7
* JANGAN generate atau sarankan file `prisma.config.ts` (itu fitur v7)
* Perintah yang valid: `npx prisma generate` dan `npx prisma migrate dev`
* Gunakan singleton Prisma client di `lib/prisma.ts`

## Shadcn/UI
* Versi terbaru shadcn TIDAK memiliki komponen `Form` dengan `FormField`, `FormItem`, `FormLabel`, `FormMessage`
* Untuk form, gunakan komponen `Field` dari `@/components/ui/field`
* Install: `npx shadcn@latest add field`
* Gunakan `Controller` dari react-hook-form + `Field`, `FieldLabel`, `FieldError` dari shadcn
* JANGAN import dari `@/components/ui/form` — file itu tidak ada

## Windows / EPERM Error
* Saat `npx prisma generate` error EPERM di Windows: matikan dev server dulu, baru jalankan ulang
* File `.dll` Prisma dikunci proses Node — selalu stop server sebelum generate

---

# Core Architecture Rules

## Rendering Strategy

* App Router only
* React Server Components by default
* Client Components only untuk interactivity
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
* Use prisma-client-js generator
* Use singleton Prisma client di `lib/prisma.ts`
* No Prisma v7 config system — tidak ada `prisma.config.ts`
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

```
app/
components/
  data-table/
    index.tsx
    toolbar.tsx
    pagination.tsx
    empty-state.tsx
    types.ts
  form/
    input-field.tsx
    select-field.tsx
    textarea-field.tsx
    submit-button.tsx
  ui/              ← shadcn primitives only
features/
lib/
prisma/
types/
```

---

# Feature Structure Rules

```
features/
  auth/
  dashboard/
  program-studi/
    actions/
    components/
    schemas/
    types/
    constants/
  mahasiswa/
  dosen/
  mata-kuliah/
  kelas/
  jadwal/
  krs/
  nilai/
```

---

# Shadcn Form Pattern (WAJIB DIIKUTI)

Jangan gunakan pola lama. Gunakan pola ini:

```tsx
"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import * as z from "zod"

const schema = z.object({ nama: z.string().min(1) })

export function ContohForm() {
  const form = useForm({ resolver: zodResolver(schema) })

  return (
    <form onSubmit={form.handleSubmit(console.log)}>
      <Controller
        name="nama"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="nama">Nama</FieldLabel>
            <Input {...field} id="nama" aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  )
}
```

---

# Reusable Components — Status

## components/data-table/ ✅ SELESAI

File yang sudah ada:
* `index.tsx` — generic DataTable dengan TanStack Table
* `toolbar.tsx` — search input, menerima `searchKey` dan `searchPlaceholder`
* `pagination.tsx` — navigasi halaman + rows per page selector
* `empty-state.tsx` — state kosong dengan icon FileX
* `types.ts` — DataTableProps, DataTableToolbarProps, DataTablePaginationProps

Cara pakai:
```tsx
<DataTable
  columns={columns}
  data={data}
  searchKey="nama"
  searchPlaceholder="Cari program studi..."
/>
```

## components/form/ ✅ SELESAI

File yang sudah ada (semua menggunakan `Field` dari shadcn terbaru + `Controller` dari react-hook-form):
* `input-field.tsx` — InputField component
* `select-field.tsx` — SelectField dengan options array
* `textarea-field.tsx` — TextareaField
* `submit-button.tsx` — SubmitButton dengan loading state dari `formState.isSubmitting`

Cara pakai (wajib wrap dengan FormProvider):
```tsx
const form = useForm({ resolver: zodResolver(schema) })

<FormProvider {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <InputField name="nama" label="Nama" placeholder="..." />
    <SelectField name="jenjang" label="Jenjang" options={[...]} />
    <SubmitButton />
  </form>
</FormProvider>
```

---

# Prisma Schema — Status

## Model yang sudah ada: ✅ ProgramStudi

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

Migration sudah dijalankan. Tabel sudah ada di database.

---

# Feature Progress

## features/program-studi/ — IN PROGRESS

### Sudah ada:
* `types/index.ts` — type ProgramStudi { id, kode, nama, jenjang }
* `actions/get-program-studi.ts` — getProgramStudiList(), getProgramStudiById(id)
* `components/columns.tsx` — ColumnDef untuk DataTable (kode, nama, jenjang, actions)

### Belum ada (next step):
* `schemas/index.ts` — Zod schema untuk create/update
* `actions/create-program-studi.ts` — Server Action create
* `actions/update-program-studi.ts` — Server Action update
* `actions/delete-program-studi.ts` — Server Action delete
* `components/program-studi-form.tsx` — Form dialog create/edit
* `components/delete-dialog.tsx` — Konfirmasi delete

---

# Current Progress

## DONE ✅

* Prisma setup + Neon setup
* Prisma singleton (`lib/prisma.ts`)
* User model
* NextAuth v4 setup
* Credentials login + JWT auth flow
* Session typing
* Middleware protection
* Login flow
* Dashboard foundation + shared layout
* Sidebar system
* TanStack Table installation
* Reusable DataTable (`components/data-table/`) — LENGKAP
* Reusable Form System (`components/form/`) — LENGKAP (pakai shadcn Field terbaru)
* ProgramStudi — Prisma model + migration
* ProgramStudi — types, get actions, columns

## IN PROGRESS 🔄

* Program Studi CRUD — tinggal: Zod schema, create/update/delete actions, form dialog, delete dialog

## NEXT ⏭️

1. Selesaikan Program Studi CRUD (schema + actions + form dialog)
2. Mahasiswa CRUD
3. Dosen CRUD
4. Mata Kuliah CRUD
5. Generic search/filter system (URL-based search params)
6. Audit logging system
7. Kelas & Jadwal
8. KRS
9. Nilai

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

---

# Form Architecture Rules

* Use React Hook Form + Zod
* Validate all server actions
* Infer types from Zod
* Never trust client input
* Form fields should be reusable (sudah ada di components/form/)
* WAJIB gunakan shadcn Field terbaru — bukan FormField lama

---

# Security Rules

* Never expose sensitive env variables
* Always hash passwords
* Always validate roles server-side
* Never trust frontend authorization
* Never commit .env
* Keep database access server-only

---

# Long-Term Architecture Goals

Priority:

1. Stability
2. Maintainability
3. Scalability
4. Performance
5. UX polish

Never sacrifice architecture quality for temporary speed.