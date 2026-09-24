# Dwarf Frontend

Dwarf is a small, serious URL-shortening frontend built with React. It provides a public shortening interface, email/password authentication screens, a protected dashboard, URL history, copy/open/delete interactions, loading states, error states, and a lightweight ambient background.

The frontend is intentionally separated from the backend. The expected backend is a future Python API.

## Tech stack

- React — UI and application state
- React Router — client-side routing and protected routes
- Tailwind CSS — styling and responsive design
- Axios — centralized HTTP communication
- Vite — development server and production build

## Project structure

```text
src/
├── api/          → Axios instance and backend API functions
├── components/   → reusable UI pieces
├── context/      → authentication state
├── pages/        → route-level screens
├── routes/       → protected routing
├── App.jsx       → application routes
└── main.jsx      → React entry point
```

## Component relationships

```text
App
└── Router
    ├── Home
    ├── Login
    ├── Register
    └── ProtectedRoute
        └── Dashboard
            ├── UrlInput
            ├── UrlCard
            └── Toast
```

## Authentication flow

The frontend expects these endpoints:

```text
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
```

`AuthContext` checks the current session on startup and exposes `authenticated`, `user`, `login`, `register`, and `logout`.

Authentication is designed around secure backend-managed cookies. The frontend does not store passwords or API secrets.

## URL flow

```text
User enters URL
      ↓
UrlInput
      ↓
urlApi
      ↓
Python backend
      ↓
Response
      ↓
Dashboard / result UI
```

Expected URL endpoints:

```text
POST   /urls
GET    /urls
DELETE /urls/:id
```

The exact backend response shape is intentionally not hardcoded beyond a few common field names, so the API layer can be adjusted when the Python backend is finalized.

## API configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then set:

```text
VITE_API_URL=http://localhost:8000
```

Change this when the Python backend is deployed.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production build

Build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Backend integration

This repository contains only the frontend.

The Python backend should provide authentication, URL creation, URL listing, URL deletion, and eventually redirect/analytics functionality. Update `src/api/authApi.js` and `src/api/urlApi.js` if the final endpoint names or response shapes differ.

## Design principles

Dwarf follows a dark-first, restrained visual system and the "drunk grandma" usability principle: important actions should be immediately understandable even when the user is distracted or unfamiliar with the product.

The ambient background is deliberately lightweight and respects `prefers-reduced-motion`.

## Current scope

Included:

- Responsive landing page
- URL shortening interface
- Login
- Registration
- Central authentication state
- Protected dashboard
- URL history
- Copy/open/delete actions
- Loading states
- Error states
- Empty states
- Toast feedback
- Centralized API layer
- Environment configuration
- Accessible form labels and focus states
- Lightweight ambient motion

Not included:

- Python backend
- Fake analytics
- Social login
- Payment systems
- Backend-dependent security guarantees
