# Template FE App with NextJS
Everytime we start a nextjs app we need to go through some common steps to bootstrap the project. This project is to reduce those common steps. This app is the Bootstrap of a NextJS app withh all the best practices that could be used in different project when get started at the very beggining.

The app was initiated with following command in Windows 11 OS
```powershell
yarn create next-app nextjs-template-app --ts --eslint
```

## Basic Requirements
1. node v22.11.0 or later
2. npm 10.9.0 or later
3. yarn 1.22.22 or later (yarn is prefered strictly)

## App usages
1. NextJS v15
2. Typescript with ESLint and husky
3. Tailwind CSS 
4. App Router
5. Turbopack
6. default import alias
7. zod

## Install dependencies and run local server
```powershell
yarn install
yarn dev
```
The app will be available at http://localhost:3000

## Run production locally
```powershell
yarn build
yarn start
```
This runs the optimized production build locally.

## Linting & testing
```
yarn lint
yarn test
```
## Folder structure
```pgsql
my-app/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx            # public home or landing
│  ├─ login/page.tsx
│  ├─ register/page.tsx
│  ├─ forgot-password/page.tsx
│  ├─ system-admin/page.tsx
│  ├─ pharma-admin/page.tsx
│  └─ pharma-operator/page.tsx
├─ components/
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  └─ Input.tsx
│  ├─ AuthGuard.tsx      # client-side role guard wrapper
│  └─ Header.tsx
├─ context/
│  └─ AuthContext.tsx
├─ hooks/
│  └─ useAuth.ts
├─ lib/
│  ├─ api.ts             # typed fetch wrapper
│  └─ auth.ts            # helpers for token handling, dev mocks
├─ middleware.ts         # edge middleware for route protection
├─ public/
├─ styles/
├─ types/
│  └─ index.d.ts
├─ utils/
│  └─ validators.ts      # zod schemas or runtime validators
├─ tests/
└─ next.config.js
```

## Routing & Role Map Diagram

### File-system-based routing:
```pgsql
app/
├─ layout.tsx           # Main layout
├─ globals.css          # Global styles
├─ page.tsx             # Landing page (public)
├─ login/page.tsx       # Public login
├─ register/page.tsx    # Public register
├─ forgot-password/page.tsx # Public forgot-password
├─ system-admin/page.tsx   # Private, role: system-admin
├─ role-one/page.tsx       # Private, role: role-one
├─ role-two/page.tsx       # Private, role: role-two
├─ not-found.tsx        # 404 page
├─ error.tsx            # Global error boundary

```

### Next.js automatically maps folder names to URL routes:
```pgsql
| File/Folder                | URL                | Type    |
| -------------------------- | ------------------ | ------- |
| `login/page.tsx`           | `/login`           | Public  |
| `register/page.tsx`        | `/register`        | Public  |
| `forgot-password/page.tsx` | `/forgot-password` | Public  |
| `system-admin/page.tsx`    | `/system-admin`    | Private |
| `role-one/page.tsx`        | `/role-one`        | Private |
| `role-two/page.tsx`        | `/role-two`        | Private |
| `page.tsx`                 | `/` (landing page) | Public  |
```

### Routes and access flow
```pgsql
Public Routes (accessible by anyone)
────────────────────────────────────
/                 → Landing page
/login           → Login page
/register        → Register page
/forgot-password → Forgot Password page

Private Routes (role-protected)
────────────────────────────────────
/system-admin    → Only 'system-admin'
/role-one        → Only 'role-one'
/role-two        → Only 'role-two'

Access Control Flow
────────────────────────────────────
1. User navigates to a URL.
2. Middleware runs (server-side):
   - Checks auth_token cookie / token
   - Verifies user role against allowedRoles
   - Redirects to /login if unauthorized
3. Page-level AuthGuard (client-side) checks:
   - useAuth() context for isAuthenticated and role
   - Redirects to /login if unauthorized
4. If all checks pass:
   - Page content is rendered

```

### Visual Flow (simplified)
```pgsql
User navigates → Next.js App Router → Middleware check
                   │
                   │ authorized?
                   ├── No → redirect /login
                   │
                   └── Yes → Page rendered → AuthGuard check
                                 │
                                 ├── Unauthorized → redirect /login
                                 │
                                 └── Authorized → Dashboard content

```

### Public vs Private routes

#### Public routes
* `/login`, `/register`, `/forgot-password`, `/`
* No authentication required.
* Any user can access.

#### Private routes
* `/system-admin`, `/role-one`, `/role-two`
* Require authentication and specific role.
* Protected in two ways:
  1. Client-side (AuthGuard + useEffect)
     - Each private page checks `isAuthenticated` and `user.role` via `useAuth()` or `AuthGuard`.
     - Unauthorized users are redirected to `/login`.
  2. Server-side / Edge middleware (`middleware.ts`)
     - For additional security and SEO, middleware runs before rendering.
     - It reads auth_token cookie (or mock token) and checks the role.
     - Unauthorized users are redirected to `/login` before the page is served.

### About Roles:
In this app, 3 dummy role was used. You might want to remove, update or add role/s. To do that you need to bring change in followings
  - role based folder name
  - `config` inside `middleware.ts` file at the root directory
  - `./constants/roles.ts` and `./constants/routes.ts`