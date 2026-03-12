# OPSHUB — Claude Development Rules

These rules are non-negotiable and apply to every change made in this repository.

---

## 1. Security — RLS Only

- **Row-Level Security (RLS) is the sole access-control mechanism.** All tables in Supabase must have RLS enabled with explicit policies.
- **No authentication logic lives in application code.** No `if (user.role === ...)` guards, no token inspection, no manual permission checks. The database enforces who sees what.
- A login screen will be added later. Until then, auth state is handled at the infrastructure layer only.
- Never use the Supabase service-role key in client-side code.

---

## 2. Architecture — Modular by Default

- **No giant files.** A single file should do one thing. If a component, hook, or utility is growing beyond ~150 lines, split it.
- File organisation:
  ```
  src/
    components/     # One file per UI component, paired with its CSS module
    hooks/          # Custom React hooks (useProducts, useSuppliers, …)
    services/       # Supabase query functions, one file per domain entity
    styles/         # Shared / global CSS only
    pages/          # Top-level page components (one per route)
  ```
- Components only render. Data fetching and business logic belong in hooks or services.
- Shared UI primitives (buttons, inputs, tables) go in `components/ui/` and are reused everywhere — never duplicated.

---

## 3. Visuals — Consistent Across All Pages

- Every page uses the same layout shell, colour tokens, typography scale, and spacing system.
- CSS custom properties (variables) defined in `src/styles/tokens.css` are the single source of truth for colours, font sizes, border-radii, and spacing. Never hard-code a colour or pixel value that isn't derived from a token.
- Component-level styles use CSS Modules (`.module.css`) scoped to that component. No global class name collisions.
- When adding a new page or component, reference an existing one first and match its visual pattern exactly before diverging.

---

## 4. Database — The Source of Truth

- **The database is king.** All application state that matters lives in Supabase, not in React state, localStorage, or sessionStorage.
- **No blob/JSON columns for structured data.** Every discrete piece of information gets its own typed column. If you need to store a list of related items, use a join table.
- Every table must have:
  - `id uuid primary key default gen_random_uuid()`
  - `created_at timestamptz not null default now()`
  - `updated_at timestamptz not null default now()` (maintained by a trigger)
- Foreign keys are always explicit with `references table(id)` and the appropriate `on delete` behaviour.
- Schema changes are documented in `supabase/migrations/` as timestamped SQL files, never applied ad-hoc.

---

## 5. General Coding Standards

- React functional components and hooks only — no class components.
- No `any` casting or `eslint-disable` comments without a written justification in the same line.
- Environment variables for Supabase credentials stay in `.env` and are never committed.
- New features ship with the minimum code required — no speculative abstractions or future-proofing until the need is real.
