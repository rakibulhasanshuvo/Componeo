# Componeo Elite | Backend Infrastructure Blueprint

## 🌌 Overview
Componeo is a high-performance "Cyber-Luxury" registry for React atomic units. The backend must be as "Elite" as the frontend: zero-latency, secure by default, and technically transparent.

## 🛠️ Technical Stack (Backend)
- **Infrastructure**: Supabase (PostgreSQL 16+)
  - **Project URL**: `https://nafgvyeozilwqxszhvar.supabase.co`
  - **Anon Key**: `sb_publishable_nSFsOPJNJ0zHVVG3qmwZRQ_VjD257YR`
- **Authentication**: Supabase Auth (Google OAuth 2.0 / Email)
- **Logic Layer**: Next.js Server Actions (Type-safe & Zero-Client-JS)
- **Object Storage**: Supabase Storage (for component thumbnails/previews)
- **Caching**: React `cache` + Next.js `revalidatePath`

## 🗄️ Database Schema: [Atomic_Registry]

### Table: `components`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, `gen_random_uuid()` | Unique Unit ID |
| `created_at` | `timestamptz` | `now()` | Fusion Timestamp |
| `title` | `text` | NOT NULL | Unit designation |
| `description` | `text` | | Diagnostic overview |
| `category` | `text` | NOT NULL | (Cursor/Card/Button/etc) |
| `code` | `text` | NOT NULL | The Atomic code snippet |
| `image_url` | `text` | | Refractive thumbnail link |
| `author_id` | `uuid` | FK -> `auth.users.id` | Owner designation |
| `is_public` | `boolean` | DEFAULT `true` | Registry visibility |
| `metadata` | `jsonb` | | Technical diagnostic stats |

### 🛡️ Row Level Security (RLS)
- **Public Access**: `SELECT` where `is_public = true`.
- **Private Access**: `SELECT` where `author_id = auth.uid()`.
- **Modification**: `INSERT`, `UPDATE`, `DELETE` exclusively where `author_id = auth.uid()`.

---

## 🔐 Auth & Security Protocols

### 1. Identity Verification
Use `middleware.ts` to protect the Command Center (Dashboard) and The Forge (Create). Redirect all unauthenticated packets to `/login`.

### 2. Secure Callbacks
Implement `/auth/callback` to handle Supabase Auth sessions and PKCE flow securely.

---

## 🚀 Backend Implementation Roadmap

### Phase 1: Persistence Core
- [ ] Initialize Supabase project & environment variables.
- [ ] Deploy the `components` table in the SQL Editor.
- [ ] Configure RLS policies for public/private separation.
- [ ] Initialize `component-previews` bucket in Supabase Storage.

### Phase 2: Action Synthesis
- [ ] Implement `createComponent` Server Action (Forge connection).
- [ ] Implement `updateComponent` & `deleteComponent` Actions.
- [ ] Implement `uploadComponentImage` logic.
- [ ] Connect `getComponents` to live database (exit Mock Mode).

### Phase 3: Identity & Dashboard
- [ ] Finalize `/login` page HUD visuals.
- [ ] Implement Google/Email Auth connection.
- [ ] Surface user-specific components in the Dashboard hub.

### Phase 4: Verification & Polish
- [ ] Performance audit on database queries.
- [ ] Edge-case handling (empty states, database errors).
- [ ] Global "Elite" toast notification for backend feedback.

Phase 4: Integration
Replace the dummy JSON data with real data fetched from Supabase.
Build the protected /create page for adding new components directly from the UI.
Deploy the application to Vercel.