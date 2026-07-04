# URL Shortener Frontend

This is the frontend for a full-stack URL shortener application built with React, Vite, Redux Toolkit, TanStack Router, Axios, and Tailwind CSS.

It provides a modern interface for:

- creating short links
- logging in and registering users
- persisting auth state across refreshes
- viewing a dashboard of saved links and click counts
- copying short URLs and opening redirects quickly

## Highlights

- Responsive UI built with Tailwind CSS 4
- Authentication state managed with Redux Toolkit
- Route handling with TanStack Router
- API communication through a shared Axios instance
- Token persistence via `localStorage`
- Cookie-based session support with `withCredentials`
- Dashboard view for authenticated users
- Public URL shortening form for guest users
- Optional custom slug input for authenticated users

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Redux
- TanStack Router
- Axios
- Tailwind CSS 4
- lucide-react
- date-fns
- recharts
- qrcode.react

## Project Structure

| Path              | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `src/api/`        | API wrappers for auth and URL endpoints          |
| `src/components/` | Reusable UI sections and forms                   |
| `src/pages/`      | Page-level containers like Login and Dashboard   |
| `src/routing/`    | TanStack Router route definitions                |
| `src/store/`      | Redux store and auth slice                       |
| `src/utils/`      | Shared helpers, Axios config, and runtime config |

## Main Features

### Authentication

- Register and login forms with client-side validation
- JWT token returned by the backend and stored in `localStorage`
- Auth cookie stored by the backend and sent with requests
- Redux state rehydration after page refresh
- Logout support through the backend endpoint

### URL Shortening

- Create short URLs from long links
- Optional custom slug for authenticated users
- Copy short links to clipboard
- Open the original redirect target from the dashboard

### Dashboard

- View all saved URLs for the logged-in user
- See link click counts
- Copy short links from the list
- Open a redirect target directly
- Logout from the dashboard

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- Backend server running on `http://localhost:5000`

### Install Dependencies

```bash
npm install
```

### Run the Dev Server

```bash
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

## Environment

This frontend currently reads its backend URL from:

```js
src / utils / config.js;
```

If you change the backend host or port, update `BACKEND_URL` there.

## API Communication

The frontend uses a shared Axios instance configured with:

- `baseURL: http://localhost:5000`
- `withCredentials: true`
- a response interceptor for consistent error handling

### Auth Requests

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### URL Requests

- `POST /api/url/create`
- `GET /api/url/get`
- `GET /api/url/get/:shortUrl`
- `DELETE /api/url/delete/:shortUrl`

## Auth Persistence Flow

On successful login or registration the app:

1. stores `accessToken` in `localStorage`
2. stores the returned user object in `localStorage`
3. dispatches the user into Redux
4. restores auth state on page load from persisted storage

The backend also sets an `httpOnly` `accessToken` cookie, so both cookie-based and local persistence are supported.

## Notes For Development

- `Login.jsx` handles both login and register screens
- `Dashboard.jsx` expects the authenticated user state to be available in Redux
- `UrlForm.jsx` shows the custom slug field only when the user is authenticated
- The app uses `withCredentials`, so the backend CORS config must allow credentials

## Development Workflow

1. Start the backend first so the API is available on port `5000`.
2. Start the frontend in a second terminal so Vite serves the UI on port `5173`.
3. Sign in or register, then create short links from the main form or dashboard.
4. Refresh the page to verify the auth state is restored from `localStorage`.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Related Backend Project

This frontend is designed to work with the Express API in the `backend/` folder of the same workspace.

For API and server setup details, see the backend README.
