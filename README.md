# Blog

## What This Project Includes

- Mocked authentication (login and registration)
- Public and protected routes using Next.js middleware
- Full CRUD operations for blog posts
- Data fetching and caching with TanStack Query
- Global state management with Zustand
- Type‑safe API layer using Axios and TypeScript
- Responsive UI built with Tailwind CSS
- Centralized and user‑friendly error handling

---

## Project Structure

```
src/
├── app/              # App Router pages and layouts
├── components/       # Reusable UI components
├── hooks/            # Custom hooks (auth and posts)
├── services/         # API services and Axios client
├── store/            # Zustand stores
├── types/            # Shared TypeScript types
├── validations/      # Zod schemas
├── providers/        # Application-wide providers
├── utils/            # Helper utilities
└── proxy.ts          # Route protection
```

## Getting Started

### 1. Install Node (using nvm)

```bash
nvm install
nvm use
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run the Development Server

```bash
pnpm dev
```

### 4. Build for Production

```bash
pnpm build
pnpm start
```

---

## Authentication

Authentication in this project is mocked for demonstration and development purposes.

- Any email and password combination works for login
- Registration creates a fake user
- JWT tokens are mocked
- Tokens are stored in HTTP‑only cookies for middleware checks
- Authentication state is managed and persisted using Zustand

### Authentication Flow

1. User submits the login or register form
2. The auth service returns a mocked user and token
3. The token is stored in a cookie and in the Zustand store
4. Middleware protects private routes
5. Auth state is accessible throughout the application

---

## API and Data Fetching

Post data is fetched from **JSONPlaceholder**.

Available endpoints:

- GET /posts
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

### API Features

- Axios client with request and response interceptors
- Automatic token injection
- Centralized API error handling
- Fully typed API responses

---

## Custom Hooks

### Authentication Hook

The `useAuth` hook handles all authentication logic:

- login
- register
- logout
- access to user data
- access to token
- authentication status

### Post Hooks

Post-related hooks are built with TanStack Query:

- usePosts
- usePost
- useCreatePost
- useUpdatePost
- useDeletePost

These hooks provide caching, background refetching, and automatic query invalidation.

---

## State Management

### Zustand

Zustand is used for authentication state management:

- User information
- Auth token
- Login and logout actions
- Cookie synchronization
- Persistent storage

### TanStack Query

- Automatic caching
- Background refetching
- Mutation handling
- Built‑in loading and error states

---

## Form Validation

All forms use Zod for schema validation and are integrated with React Hook Form.

### Authentication Forms

- Email must be valid and is required
- Password must be at least 6 characters
- Registration password must include uppercase letters, lowercase letters, and numbers

### Post Forms

- Title: 3–200 characters
- Body: 10–5000 characters
- User ID is required when creating a post

---

## Styling

- Tailwind CSS with a mobile‑first approach
- Dark mode support
- Reusable UI components
- Utility‑based styling using a class name helper
- Geist Sans and Geist Mono fonts

The layout is fully responsive across mobile, tablet, and desktop devices.

---

## Route Protection

Route protection is implemented using Next.js middleware.

### Public Routes

- /login
- /register

### Protected Routes

- /
- /posts/\*

### Redirect Rules

- Unauthenticated users accessing protected routes are redirected to the login page
- Authenticated users accessing auth pages are redirected to the dashboard

---

## Error Handling

- Global error boundary
- Custom not‑found page
- Centralized API error handler
- Toast notifications for user feedback
- Retry support for failed requests

---

## Developer Experience

- ESLint with Next.js configuration
- Prettier for consistent formatting
- Husky and lint‑staged for pre‑commit checks
- Clean and scalable folder structure
- Strong TypeScript typing throughout the project

### Available Scripts

- pnpm dev – start the development server
- pnpm build – build the application for production
- pnpm start – start the production server
- pnpm lint – run ESLint
- pnpm format – format code with Prettier
- pnpm format:check – check formatting

---
