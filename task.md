
## REFACTOR TO FULL NEXT.JS (NO DESIGN/FUNCTION REGRESSION)

You are inside a repo that is currently a **Vite + React 19 SPA** using **react-router-dom (HashRouter)**, Tailwind via **CDN** (theme config in `index.html`), and a client-side blog system using **localStorage** with an admin interface.

### Goal

Refactor this codebase into a **real Next.js project** using **Next.js App Router**, **TypeScript**, and **Tailwind (proper build setup)**, while preserving:

1. **All current pages and routes**
2. **Navbar + dropdown menus**
3. **Responsive layout and styling**
4. **Admin blog CRUD functionality** (localStorage-based can remain for now)
5. **Blog listing + single post pages**
6. **Coming Soon pages**
7. **No visual regressions** (keep the exact look/feel)

### Non-negotiables

* Do **NOT** redesign anything.
* Do **NOT** change wording/content.
* Keep navigation structure identical (including dropdowns).
* Keep the “admin” area working.
* Preserve Tailwind utility classes and brand tokens (colors, gradients, etc.).
* Replace react-router routing with Next.js routing.
* Ensure clean URLs (no `#/` hash routes).

---

# PHASE 1 — Create Next.js App Router Scaffold (without deleting old code yet)

1. Add Next.js to the repo (or create a `next/` folder and migrate—choose the least risky path).
2. Use Next.js with:

   * App Router (`/app`)
   * TypeScript
   * Tailwind installed (not CDN)
3. Create `app/layout.tsx` with:

   * global `<Navbar />`
   * `{children}`
   * `<Footer />`
4. Copy global styles into `app/globals.css`.

✅ At the end of Phase 1: `next dev` must start successfully.

---

# PHASE 2 — Tailwind Migration (CDN → build-time Tailwind)

Currently Tailwind config exists inside `index.html` as a CDN config object. Convert that into:

* `tailwind.config.ts`
* `postcss.config.js`
* `app/globals.css` with `@tailwind base; @tailwind components; @tailwind utilities;`

### Preserve theme

Map the existing tokens exactly:

* Colors like `brand.primary`, `brand.gold`, `brand.red`, `brand.offwhite`, etc.
* Fonts, animations, boxShadow, spacing, any custom theme extensions

✅ All existing classNames like `text-brand-primary` must continue working.

---

# PHASE 3 — Replace React Router with Next.js Routes

## Route mapping (must match current SPA)

Create these Next.js pages:

* `/` → `app/page.tsx`
* `/about` → `app/about/page.tsx`
* `/about/how-we-started` → `app/about/how-we-started/page.tsx`
* `/resources` → `app/resources/page.tsx`
* `/resources/sermons` → `app/resources/sermons/page.tsx`
* `/resources/gallery` → `app/resources/gallery/page.tsx`
* `/ministries` → `app/ministries/page.tsx`
* `/watch-live` → `app/watch-live/page.tsx`
* `/blog` → `app/blog/page.tsx`
* `/blog/[slug]` → `app/blog/[slug]/page.tsx`
* `/contact` → `app/contact/page.tsx`

Admin routes (keep the same paths):

* `/admin` → `app/admin/page.tsx`
* `/admin/blog` → `app/admin/blog/page.tsx`
* `/admin/blog/new` → `app/admin/blog/new/page.tsx`
* `/admin/blog/edit/[id]` → `app/admin/blog/edit/[id]/page.tsx`
* `/admin/navigation` → `app/admin/navigation/page.tsx`

### Important

* Delete or stop using `HashRouter`, `Routes`, `Route`, `Outlet` from react-router-dom.
* Convert layout logic:

  * Old `RootLayout` becomes `app/layout.tsx` + shared components.
  * Old `AdminLayout` becomes `app/admin/layout.tsx` using nested layout.

✅ At the end of Phase 3: all pages render on their Next routes.

---

# PHASE 4 — Replace Router Links & Navigation

1. Replace all `react-router-dom` usage:

   * `Link` → `next/link`
   * `useNavigate()` → `useRouter()` from `next/navigation`
   * `useParams()` → page params in App Router
   * `useLocation()` → `usePathname()`
2. Ensure Navbar dropdown logic remains identical.
3. External link (Members Database) must still open in new tab:
   `https://forms.gle/2G4e9M5PBAcByBFL9`

✅ No change in UI or behavior.

---

# PHASE 5 — Blog System (Preserve Functionality)

## Keep the BlogService (localStorage) for now

* The current blog posts are stored in localStorage.
* Keep the same API of BlogService so the admin pages still work.

### Blog listing

* `app/blog/page.tsx` should render post cards same as before.

### Blog post page

* Fix the current known issue: `/blog/:slug` incorrectly points to the sermons page in the old code.
* In Next.js:

  * `app/blog/[slug]/page.tsx` must load the post by slug from BlogService.
  * Handle “not found” gracefully:

    * Show a styled Not Found state, or use `notFound()`.

### Client component note

Because localStorage only exists in browser:

* Blog pages that read BlogService must be `"use client"` components, OR
* Use a wrapper that loads data client-side after mount.

✅ Admin CRUD must still function and reflect on blog list and post page.

---

# PHASE 6 — Admin Area (Preserve UX)

1. Create `app/admin/layout.tsx` with the same admin sidebar and layout.
2. Ensure existing admin pages work:

   * create post
   * edit post
   * delete post
   * navigation admin page if present
3. If the sidebar links to pages that don’t exist yet, create placeholder pages to avoid broken navigation (e.g., `/admin/settings`, `/admin/subscribers`, etc.) OR remove those links (prefer placeholders to preserve UX).

✅ No dead links.

---

# PHASE 7 — Assets, SEO, and Deployment Safety

1. Move any static assets into `/public`.
2. Replace `<img>` with `next/image` where safe, without changing layout.
3. Add per-page `metadata` (title/description) placeholders.
4. Ensure build passes:

   * `npm run build`
   * `npm run start`
5. Remove Vite-specific files once stable:

   * Vite config
   * Vite entrypoints

✅ End state is a clean Next.js project.

---

# PHASE 8 — Verification Checklist (Must Pass)

After refactor, confirm:

* Home renders identical
* Navbar dropdowns work on desktop and mobile
* All routes work (no 404s)
* Blog list shows posts
* Blog detail works by slug
* Admin blog create/edit/delete works
* Resources → Members Database opens external link in new tab
* Sermons and Gallery pages show “Coming Soon”
* No design regressions (spacing, colors, typography)

---

# Output Requirements

1. Implement refactor in commits/steps (logical).
2. Update `package.json` scripts for Next.js:

   * `dev`, `build`, `start`, `lint`
3. Provide a short migration summary:

   * what was moved
   * what was replaced
   * what to test

## Proceed now and refactor the codebase accordingly.

