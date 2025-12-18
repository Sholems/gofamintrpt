# Migration Analysis & Understanding Document
## Vite + React 19 SPA → Next.js App Router Migration

**Date:** December 18, 2025  
**Project:** Royal Priesthood Tabernacle (GOFAMINT)  
**Current Stack:** Vite + React 19 + react-router-dom (HashRouter) + Tailwind CDN  
**Target Stack:** Next.js 15+ App Router + TypeScript + Tailwind (build-time)

---

## 1. CURRENT ARCHITECTURE ANALYSIS

### 1.1 Technology Stack (Current)

| Component | Implementation | Notes |
|-----------|---------------|-------|
| **Build Tool** | Vite 6.2.0 | Fast dev server, ESM-based |
| **Framework** | React 19.2.3 | Latest React with new features |
| **Router** | react-router-dom 7.11.0 | HashRouter mode (#/) |
| **Styling** | Tailwind CDN | Config embedded in index.html |
| **TypeScript** | 5.8.2 | Full TypeScript support |
| **State Management** | localStorage | No Redux/Context - client-side only |
| **Data Layer** | BlogService (localStorage) | CRUD operations for blog posts |

### 1.2 Project Structure (Current)

```
d:\royalpriest/
├── App.tsx                     # Router setup with HashRouter
├── index.html                  # Tailwind CDN config + theme
├── index.tsx                   # React DOM entry point
├── package.json                # Vite scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
│
├── app/                        # Pages (mimics Next.js structure)
│   ├── layout.tsx              # RootLayout (Navbar + Outlet + Footer)
│   ├── page.tsx                # Home page
│   ├── about/
│   │   ├── page.tsx
│   │   └── how-we-started/page.tsx
│   ├── admin/
│   │   ├── layout.tsx          # AdminLayout (sidebar + Outlet)
│   │   ├── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── edit/page.tsx
│   │   └── navigation/page.tsx
│   ├── blog/
│   │   └── page.tsx
│   ├── contact/page.tsx
│   ├── ministries/page.tsx
│   ├── resources/
│   │   ├── page.tsx
│   │   ├── sermons/page.tsx
│   │   └── gallery/page.tsx
│   └── watch-live/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Container.tsx
│   │   └── Footer.tsx
│   ├── nav/
│   │   ├── Navbar.tsx
│   │   ├── DesktopNav.tsx
│   │   ├── MobileNav.tsx
│   │   └── Dropdown.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ComingSoon.tsx
│       ├── Divider.tsx
│       └── Section.tsx
│
└── lib/
    ├── blog-service.ts         # localStorage CRUD for blog posts
    ├── navigation-service.ts   # Dynamic navigation management
    ├── routes.ts               # NavItemConfig + NAV_ROUTES
    └── utils.ts                # Utility functions (cn, etc.)
```

### 1.3 Routing Architecture (Current)

**Router Type:** HashRouter (URLs have `#/` prefix)

**Route Definitions in App.tsx:**

```typescript
// Public Routes (RootLayout with Navbar + Footer)
/                           → app/page.tsx (Home)
/about                      → app/about/page.tsx
/about/how-we-started       → app/about/how-we-started/page.tsx
/resources                  → app/resources/page.tsx
/resources/sermons          → app/resources/sermons/page.tsx
/resources/gallery          → app/resources/gallery/page.tsx
/ministries                 → app/ministries/page.tsx
/watch-live                 → app/watch-live/page.tsx
/blog                       → app/blog/page.tsx
/blog/:slug                 → app/resources/sermons/page.tsx ⚠️ BUG!
/contact                    → app/contact/page.tsx

// Admin Routes (AdminLayout with sidebar)
/admin                      → app/admin/page.tsx
/admin/blog                 → app/admin/blog/page.tsx
/admin/blog/new             → app/admin/blog/edit/page.tsx
/admin/blog/edit/:id        → app/admin/blog/edit/page.tsx
/admin/navigation           → app/admin/navigation/page.tsx
/admin/* (catch-all)        → "Admin Feature coming soon"
```

**⚠️ Known Bug:** Line 26 in App.tsx incorrectly maps `/blog/:slug` to sermons page instead of a proper blog post detail page.

### 1.4 Navigation System

**Primary Navigation (lib/routes.ts):**
```typescript
NAV_ROUTES: NavItemConfig[] = [
  Home
  About Us (dropdown)
    ├─ About Us
    └─ How We Started
  Resources (dropdown)
    ├─ Resources
    ├─ Members Database (external link) ↗
    ├─ Sermons (Coming Soon)
    └─ Gallery (Coming Soon)
  Ministries
  Watch Live
  Blog
  Contact Us
]
```

**Key Features:**
- Dynamic navigation loaded from NavigationService
- Dropdown menus on desktop (Dropdown.tsx)
- Accordion menus on mobile (MobileNav.tsx)
- External links open in new tab
- "Coming Soon" badges for incomplete pages
- Custom event listener for navigation updates

### 1.5 Tailwind Configuration (CDN)

**Current Implementation:** Embedded in `<script>` tag in index.html

**Theme Tokens:**
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4a148c',      // Deep Purple
          primaryLight: '#7b1fa2',
          gold: '#b8860b',          // Crown Gold
          goldLight: '#daa520',
          red: '#e53935',           // Flame Red
          offwhite: '#fafaf9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 1s ease-out forwards'
      },
      keyframes: { /* fadeIn, slideInBottom */ }
    }
  }
}
```

**Custom CSS in index.html:**
- `.text-gradient-gold` with shine animation
- Animation delay utilities (.animate-delay-150, etc.)
- Font smoothing optimizations
- Image rendering enhancements

### 1.6 Blog System Architecture

**Data Storage:** localStorage (key: `rpt_blog_posts`)

**BlogPost Interface:**
```typescript
{
  id: string              // slug-format
  title: string           // "December 2025"
  subtitle: string        // "Our Month of..."
  category: string        // "Prophetic Word"
  date: string           // ISO format
  excerpt: string
  image: string          // Unsplash URL
  scripture: string      // Reference
  scriptureText: string  // Full verse
  points: string[]       // Prophetic declarations
  closing: string        // Closing statement
  isPublished: boolean
}
```

**Default Posts:** 4 prophetic declarations (Dec 2025 → Sep 2025)

**BlogService Methods:**
- `getAllPosts()` - Fetch all from localStorage
- `getPostById(id)` - Find single post by ID
- `savePost(post)` - Create or update
- `deletePost(id)` - Remove post

**Admin Features:**
- Create new posts
- Edit existing posts
- Delete posts
- Publish/unpublish toggle
- Multi-point list editor

### 1.7 Layout System

**RootLayout (app/layout.tsx):**
```tsx
<div>
  <Navbar />
  <main>
    <Outlet />  ← react-router outlet
  </main>
  <Footer />
</div>
```

**AdminLayout (app/admin/layout.tsx):**
```tsx
<div>
  <aside>/* Sidebar with admin nav */</aside>
  <main>
    <header>/* Admin header */</header>
    <div>
      <Outlet />  ← react-router outlet
    </div>
  </main>
</div>
```

**Key Components:**
- Navbar: Sticky header with logo, desktop nav, mobile menu
- Footer: Brand info, links, copyright
- Container: Max-width wrapper with responsive padding

---

## 2. MIGRATION REQUIREMENTS ANALYSIS

### 2.1 Non-Negotiable Constraints

✅ **No Visual Regressions**
- Preserve exact spacing, colors, typography
- Maintain all Tailwind utility classes
- Keep brand tokens (brand-primary, brand-gold, etc.)
- Preserve animations and transitions

✅ **No Content Changes**
- Keep all wording/copy identical
- Maintain page titles and descriptions
- Preserve blog post content

✅ **No Functionality Loss**
- Admin CRUD must work identically
- Blog listing and detail pages
- Navigation dropdowns (desktop + mobile)
- External links behavior
- Coming Soon pages

✅ **Clean URLs**
- No hash routes (#/)
- Proper Next.js routing (/)

### 2.2 Critical Bug Fixes During Migration

**Bug #1: Blog Post Detail Route**
- **Current:** `/blog/:slug` → incorrectly renders sermons page
- **Fix:** Create `app/blog/[slug]/page.tsx` that loads BlogService.getPostById(slug)
- **Handling:** Show "Not Found" state if post doesn't exist

### 2.3 Technology Replacements

| Current | Next.js Equivalent | Notes |
|---------|-------------------|-------|
| `react-router-dom` → `HashRouter` | Next.js App Router | File-based routing |
| `<Link>` (react-router) | `<Link>` (next/link) | Different API |
| `useNavigate()` | `useRouter()` from next/navigation | Different methods |
| `useParams()` | Page props | `params` in page component |
| `useLocation()` | `usePathname()` | From next/navigation |
| `<Outlet />` | `{children}` | Layout pattern |
| Tailwind CDN | Build-time Tailwind | tailwind.config.ts + PostCSS |
| Vite build | Next.js build | npm run build |
| `import.meta.env` | `process.env` | Environment variables |

---

## 3. PHASED MIGRATION STRATEGY

### Phase 1: Next.js Scaffold Setup
**Goal:** Get `next dev` running without breaking existing Vite setup

**Tasks:**
1. Install Next.js dependencies
   ```bash
   npm install next@latest react@latest react-dom@latest
   npm install -D @types/react @types/node
   ```
2. Create `next.config.js` (or .ts)
3. Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint"
     }
   }
   ```
4. Create basic `app/layout.tsx` (Next.js root layout)
5. Create `app/page.tsx` (home page)

**Success Criteria:** `npm run dev` starts Next.js dev server on port 3000

---

### Phase 2: Tailwind Build-Time Setup
**Goal:** Replace CDN Tailwind with proper build system

**Tasks:**
1. Install Tailwind + dependencies
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Create `tailwind.config.ts`:
   ```typescript
   export default {
     content: [
       './app/**/*.{js,ts,jsx,tsx,mdx}',
       './components/**/*.{js,ts,jsx,tsx,mdx}'
     ],
     theme: {
       extend: {
         colors: {
           brand: {
             primary: '#4a148c',
             primaryLight: '#7b1fa2',
             gold: '#b8860b',
             goldLight: '#daa520',
             red: '#e53935',
             offwhite: '#fafaf9'
           }
         },
         fontFamily: {
           sans: ['Inter', 'sans-serif'],
           serif: ['Playfair Display', 'serif']
         },
         animation: {
           'bounce-slow': 'bounce 3s linear infinite',
           'fade-in': 'fadeIn 1s ease-out forwards',
           'slide-in-bottom': 'slideInBottom 1s ease-out forwards'
         },
         keyframes: {
           fadeIn: {
             '0%': { opacity: '0' },
             '100%': { opacity: '1' }
           },
           slideInBottom: {
             '0%': { transform: 'translateY(20px)', opacity: '0' },
             '100%': { transform: 'translateY(0)', opacity: '1' }
           }
         }
       }
     }
   }
   ```
3. Create `app/globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     body {
       font-family: 'Inter', sans-serif;
       background-color: #fafaf9;
       scroll-behavior: smooth;
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;
       text-rendering: optimizeLegibility;
     }
   }

   @layer utilities {
     .text-gradient-gold {
       background: linear-gradient(to right, #b8860b, #daa520, #b8860b);
       background-size: 200% auto;
       -webkit-background-clip: text;
       -webkit-text-fill-color: transparent;
       animation: shine 3s linear infinite;
     }
     
     .animate-delay-150 { animation-delay: 150ms; }
     .animate-delay-300 { animation-delay: 300ms; }
     .animate-delay-500 { animation-delay: 500ms; }
     .animate-delay-700 { animation-delay: 700ms; }
   }

   @keyframes shine {
     to {
       background-position: 200% center;
     }
   }
   ```
4. Add Google Fonts to root layout:
   ```tsx
   import { Inter, Playfair_Display } from 'next/font/google'
   ```

**Success Criteria:** All brand color classes work, animations preserved

---

### Phase 3: File-Based Routing Migration
**Goal:** Replace react-router with Next.js App Router

**Route Mapping:**

| Current Route | Next.js File Path | Component Source |
|--------------|-------------------|------------------|
| `/` | `app/page.tsx` | Current app/page.tsx |
| `/about` | `app/about/page.tsx` | Current app/about/page.tsx |
| `/about/how-we-started` | `app/about/how-we-started/page.tsx` | Current |
| `/resources` | `app/resources/page.tsx` | Current |
| `/resources/sermons` | `app/resources/sermons/page.tsx` | Current |
| `/resources/gallery` | `app/resources/gallery/page.tsx` | Current |
| `/ministries` | `app/ministries/page.tsx` | Current |
| `/watch-live` | `app/watch-live/page.tsx` | Current |
| `/blog` | `app/blog/page.tsx` | Current |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | **NEW** (fix bug) |
| `/contact` | `app/contact/page.tsx` | Current |
| `/admin` | `app/admin/page.tsx` | Current |
| `/admin/blog` | `app/admin/blog/page.tsx` | Current |
| `/admin/blog/new` | `app/admin/blog/new/page.tsx` | Reuse edit page |
| `/admin/blog/edit/[id]` | `app/admin/blog/edit/[id]/page.tsx` | Current |
| `/admin/navigation` | `app/admin/navigation/page.tsx` | Current |

**Layout Structure:**
```
app/
├── layout.tsx              ← Root layout (Navbar + children + Footer)
├── page.tsx                ← Home page
├── blog/
│   ├── page.tsx            ← Blog listing
│   └── [slug]/
│       └── page.tsx        ← Blog post detail (NEW)
└── admin/
    ├── layout.tsx          ← Admin layout (sidebar + children)
    ├── page.tsx
    └── blog/
        ├── page.tsx
        ├── new/page.tsx
        └── edit/[id]/page.tsx
```

**Tasks:**
1. Most pages already exist in correct structure - minimal changes needed
2. Create `app/blog/[slug]/page.tsx` for blog post detail
3. Update layouts to use `{children}` instead of `<Outlet />`
4. Remove all react-router imports

**Success Criteria:** All routes accessible via clean URLs, no 404s

---

### Phase 4: Navigation & Link Updates
**Goal:** Replace all react-router navigation with Next.js equivalents

**Component Updates:**

| File | Changes Needed |
|------|----------------|
| `components/nav/Navbar.tsx` | `Link` from next/link |
| `components/nav/DesktopNav.tsx` | `Link` from next/link, `usePathname()` |
| `components/nav/MobileNav.tsx` | `Link` from next/link, `usePathname()` |
| `components/nav/Dropdown.tsx` | `Link` from next/link |
| `components/layout/Footer.tsx` | `Link` from next/link |
| `app/blog/page.tsx` | `Link` from next/link |
| `app/admin/layout.tsx` | `Link` from next/link, `usePathname()` |
| `app/admin/blog/page.tsx` | `Link` from next/link |
| `app/admin/blog/edit/[id]/page.tsx` | `useRouter()` from next/navigation |

**External Links:** Keep as `<a href>` with `target="_blank"` (Members Database)

**Tasks:**
1. Search and replace imports:
   ```typescript
   // OLD
   import { Link } from 'react-router-dom'
   import { useNavigate, useLocation } from 'react-router-dom'
   
   // NEW
   import Link from 'next/link'
   import { useRouter, usePathname } from 'next/navigation'
   ```
2. Update navigation calls:
   ```typescript
   // OLD
   const navigate = useNavigate()
   navigate('/admin/blog')
   
   // NEW
   const router = useRouter()
   router.push('/admin/blog')
   ```
3. Update location checks:
   ```typescript
   // OLD
   const location = useLocation()
   location.pathname === '/admin'
   
   // NEW
   const pathname = usePathname()
   pathname === '/admin'
   ```

**Success Criteria:** All navigation works, active states show correctly

---

### Phase 5: Blog System (localStorage)
**Goal:** Preserve blog CRUD functionality with client-side rendering

**BlogPost Detail Page (NEW):**

Create `app/blog/[slug]/page.tsx`:
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { BlogService, BlogPost } from '@/lib/blog-service'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const slug = params.slug as string
    const foundPost = BlogService.getPostById(slug)
    
    if (!foundPost) {
      setLoading(false)
      return
    }
    
    setPost(foundPost)
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return (
      <Section className="py-20 text-center">
        <Container>
          <h2 className="text-2xl font-black text-brand-primary font-sans uppercase">
            Post Not Found
          </h2>
          <Link href="/blog">
            <Button variant="primary" className="mt-8">
              Back to Blog
            </Button>
          </Link>
        </Container>
      </Section>
    )
  }

  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Hero Section */}
      <Section className="bg-brand-primary text-white pt-32 pb-20 relative overflow-hidden">
        <Container>
          <Badge variant="gold" className="mb-6">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tighter leading-none mb-6">
            {post.title}: <br/>
            <span className="text-brand-gold italic font-serif normal-case">
              {post.subtitle}
            </span>
          </h1>
          <p className="text-slate-300 text-sm uppercase tracking-widest">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section className="-mt-12 relative z-20 pb-12">
        <Container>
          <div className="rounded-[3rem] overflow-hidden shadow-3xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="pb-20">
        <Container className="max-w-3xl">
          {/* Scripture */}
          <div className="mb-12 p-8 bg-white rounded-3xl border-l-4 border-brand-gold shadow-lg">
            <p className="text-xs font-black uppercase tracking-widest text-brand-gold mb-4">
              {post.scripture}
            </p>
            <p className="text-lg font-serif italic text-slate-700 leading-relaxed">
              "{post.scriptureText}"
            </p>
          </div>

          {/* Points */}
          {post.points && post.points.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-black text-brand-primary uppercase mb-8">
                Prophetic Declarations
              </h3>
              <div className="space-y-6">
                {post.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-lg text-slate-700 leading-relaxed pt-1">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Closing */}
          {post.closing && (
            <div className="p-8 bg-brand-primary/5 rounded-3xl border border-brand-gold/20">
              <p className="text-lg font-semibold text-brand-primary italic text-center">
                {post.closing}
              </p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" className="px-8 py-4">
                ← Back to All Posts
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
```

**Client Component Requirements:**
- All pages using BlogService must have `'use client'` directive
- localStorage only works in browser (not during SSR)
- Use `useEffect` to load data after mount

**Admin Pages:**
- Already using `useEffect` and state - just add `'use client'`
- Form handling remains the same
- Navigation after save uses `router.push()` instead of `navigate()`

**Success Criteria:** 
- Blog listing shows all published posts
- Clicking post card navigates to detail page
- Detail page renders full post content
- Admin CRUD operations work identically

---

### Phase 6: Admin Area Preservation
**Goal:** Keep admin interface 100% functional

**Admin Layout:**
- Already uses correct Next.js nested layout pattern
- Sidebar navigation needs `usePathname()` for active states
- "Back to Website" link needs next/link

**Admin Pages to Verify:**

| Page | Functionality | Client/Server |
|------|--------------|---------------|
| `/admin` | Dashboard overview | Client |
| `/admin/blog` | List all posts with edit/delete | Client |
| `/admin/blog/new` | Create new post form | Client |
| `/admin/blog/edit/[id]` | Edit existing post | Client |
| `/admin/navigation` | Manage nav items | Client |
| Other admin routes | Placeholder "Coming Soon" | Server (static) |

**Tasks:**
1. Add `'use client'` to all admin pages using state/effects
2. Update form submissions to use `router.push()` after save
3. Ensure delete operations trigger state updates
4. Keep sidebar links to unimplemented features (don't remove)

**Success Criteria:**
- Can create new blog post
- Can edit existing post
- Can delete post
- Changes immediately reflect in blog listing
- Sidebar shows active page correctly

---

### Phase 7: Assets, Fonts & SEO
**Goal:** Optimize and prepare for production

**Font Loading:**
```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['700'],
  style: ['normal', 'italic']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

**Image Optimization (Optional):**
- Current: `<img>` tags with Unsplash URLs
- Next.js: Can use `<Image>` from next/image for optimization
- **Risk:** Layout shift if dimensions not specified correctly
- **Decision:** Keep `<img>` to avoid regression, optimize later

**Metadata (Per Page):**
```typescript
// app/page.tsx
export const metadata = {
  title: 'Royal Priesthood Tabernacle | GOFAMINT',
  description: 'Raising believers who are grounded in the Word, transformed by God\'s presence, and established in their royal priesthood in Christ.'
}
```

**Public Assets:**
- Move any static images to `/public`
- Currently using external Unsplash URLs - no local images to migrate

**Success Criteria:**
- Fonts load correctly
- Page titles show in browser tab
- No console warnings about missing metadata

---

### Phase 8: Cleanup & Verification
**Goal:** Remove Vite artifacts and verify complete migration

**Files to Remove:**
1. `vite.config.ts`
2. `index.html` (replaced by Next.js root layout)
3. `index.tsx` (replaced by Next.js entry point)
4. `App.tsx` (routing now in file structure)
5. `tsconfig.json` (replace with Next.js version)

**New Files Created:**
1. `next.config.js` or `.mjs`
2. `tailwind.config.ts`
3. `postcss.config.js`
4. `app/globals.css`
5. `.env.local` (if needed)
6. `.gitignore` updates (add `.next/`)

**Verification Checklist:**

| Category | Test Case | Expected Result |
|----------|-----------|-----------------|
| **Routing** | Navigate to `/` | Home page renders |
| | Navigate to `/about` | About page renders |
| | Navigate to `/blog` | Blog listing shows 4 posts |
| | Click blog post | Detail page shows full content |
| | Navigate to `/admin` | Admin dashboard renders |
| | All nested routes | No 404 errors |
| **Navigation** | Desktop navbar | All links work |
| | Desktop dropdowns | Open/close correctly |
| | Mobile menu | Opens, all links work |
| | Active states | Current page highlighted |
| | External link | Opens in new tab |
| **Blog System** | Create new post | Saves to localStorage |
| | Edit post | Updates successfully |
| | Delete post | Removes from list |
| | View published post | Shows on blog page |
| | View unpublished | Hidden from blog page |
| **Styling** | All pages | Identical to current design |
| | Animations | Work correctly |
| | Responsive | Mobile/tablet/desktop |
| | Brand colors | Render correctly |
| **Build** | `npm run build` | Completes without errors |
| | `npm run start` | Production server works |

---

## 4. TECHNICAL DEBT & KNOWN ISSUES

### 4.1 Issues to Fix During Migration

**CRITICAL:**
1. ✅ Blog post detail route bug (maps to sermons page)

**HIGH:**
2. Missing blog post detail page template
3. No 404 page for invalid slugs

**MEDIUM:**
4. Admin sidebar links to unimplemented pages (keep as placeholders)
5. No image optimization (using external Unsplash URLs)

**LOW:**
6. No error boundaries
7. No loading states for client components (except blog listing)

### 4.2 Post-Migration Opportunities (NOT in Scope)

These should be explicitly excluded from the current refactor:

- Database migration (PostgreSQL, Supabase, etc.)
- Server-side rendering for blog posts
- Static generation for blog posts
- Authentication system for admin
- Image uploads/management
- Search functionality
- Comments system
- Newsletter integration
- Analytics
- Sitemap generation
- RSS feed

---

## 5. RISK ASSESSMENT & MITIGATION

### 5.1 High-Risk Areas

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Tailwind theme not matching** | Visual regression | Copy config exactly, test all brand colors |
| **Navigation dropdowns break** | UX degradation | Test thoroughly on desktop/mobile |
| **localStorage not working** | Admin unusable | Use `'use client'` + useEffect pattern |
| **Dynamic routes fail** | Blog posts inaccessible | Test [slug] pattern early |
| **Layout nesting issues** | Broken page structure | Follow Next.js nested layout docs |

### 5.2 Testing Strategy

**Before Migration:**
1. Screenshot all pages (home, blog, admin, etc.)
2. Test all navigation flows
3. Create test blog post
4. Document localStorage state

**During Migration:**
1. Test each phase independently
2. Keep Vite version running for comparison
3. Use browser DevTools to compare DOM/CSS

**After Migration:**
1. Side-by-side visual comparison
2. Test all user flows (viewing, creating, editing content)
3. Check responsive breakpoints
4. Verify build output

---

## 6. DEPENDENCIES & PACKAGE UPDATES

### 6.1 Current Dependencies (Vite)
```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "react-router-dom": "^7.11.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

### 6.2 Target Dependencies (Next.js)
```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "~5.8.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.1.0"
  }
}
```

**To Remove:**
- `react-router-dom`
- `@vitejs/plugin-react`
- `vite`

**To Add:**
- `next`
- `tailwindcss` + `postcss` + `autoprefixer`
- `eslint-config-next`

---

## 7. MIGRATION EXECUTION PLAN

### 7.1 Recommended Order

1. ✅ **Setup & Scaffold** (Phase 1)
   - Install Next.js
   - Create basic structure
   - Get dev server running
   
2. ✅ **Styling Foundation** (Phase 2)
   - Install Tailwind build system
   - Migrate theme config
   - Test all brand colors

3. ✅ **Core Routing** (Phase 3)
   - File-based routing structure
   - Update layouts (children pattern)
   - Create blog detail page

4. ✅ **Navigation System** (Phase 4)
   - Update all Link imports
   - Fix useNavigate/useLocation
   - Test dropdown menus

5. ✅ **Blog Functionality** (Phase 5)
   - Add 'use client' directives
   - Test CRUD operations
   - Verify blog detail page

6. ✅ **Admin Interface** (Phase 6)
   - Test all admin pages
   - Verify form submissions
   - Check active states

7. ✅ **Polish & Optimize** (Phase 7)
   - Font optimization
   - Add metadata
   - Test images

8. ✅ **Final Cleanup** (Phase 8)
   - Remove Vite files
   - Run full test suite
   - Verify build

### 7.2 Estimated Timeline

- Phase 1: 30 mins
- Phase 2: 45 mins
- Phase 3: 1 hour
- Phase 4: 1 hour
- Phase 5: 1.5 hours
- Phase 6: 45 mins
- Phase 7: 30 mins
- Phase 8: 1 hour

**Total:** ~7 hours (single developer)

---

## 8. SUCCESS CRITERIA

### 8.1 Must-Have (Blockers)

- [ ] All pages render correctly
- [ ] All routes work (no 404s)
- [ ] Navigation menus function (desktop + mobile)
- [ ] Blog CRUD operations work
- [ ] Admin interface fully functional
- [ ] No visual regressions
- [ ] `npm run build` succeeds
- [ ] Production mode works

### 8.2 Nice-to-Have (Non-Blockers)

- [ ] Improved loading states
- [ ] 404 page design
- [ ] Error boundaries
- [ ] TypeScript strict mode
- [ ] ESLint configuration

---

## 9. ROLLBACK PLAN

If migration fails critically:

1. **Keep Vite version intact** in separate branch/folder
2. **Git branches:**
   - `main` - current Vite version
   - `migration/nextjs` - work-in-progress
   - Only merge when 100% verified
3. **Parallel development:**
   - Keep both versions running during migration
   - Test Next.js version thoroughly before switching
4. **Backup localStorage:**
   - Export blog posts before migration
   - Restore if data loss occurs

---

## 10. POST-MIGRATION DOCUMENTATION

After successful migration, update:

1. **README.md:**
   - New dev commands (`next dev` not `vite`)
   - Build process
   - Deployment guide

2. **Contributing guide:**
   - Next.js routing patterns
   - Client vs Server components
   - Tailwind usage

3. **Architecture docs:**
   - App Router structure
   - Layout patterns
   - Data fetching patterns (even if just localStorage)

---

## 11. CONCLUSION

This migration is **technically straightforward** because:

✅ **Pages already follow Next.js structure** (app/ folder)  
✅ **Layouts use appropriate patterns** (RootLayout, AdminLayout)  
✅ **Components are framework-agnostic** (no router-specific logic)  
✅ **No backend dependencies** (localStorage only)  
✅ **TypeScript coverage is good**

**Main challenges:**

⚠️ **Navigation component updates** (links, hooks)  
⚠️ **Client-side data fetching** (localStorage in useEffect)  
⚠️ **Tailwind config migration** (CDN → build-time)  
⚠️ **Testing thoroughness** (ensure no visual regressions)

**Confidence level:** HIGH (85%)

The refactor is low-risk due to:
- Simple data layer (no database)
- Minimal state management
- Clean component architecture
- Good existing structure

**Recommended approach:** Incremental phase-by-phase implementation with verification checkpoints after each phase.
