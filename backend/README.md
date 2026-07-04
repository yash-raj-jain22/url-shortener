# URL Shortener Backend

This is the backend API for the full-stack URL shortener application. It is built with Express, MongoDB, Mongoose, JWT authentication, and cookie-based sessions.

The API handles:

- user registration and login
- logout and current-user lookup
- URL shortening for guest and authenticated users
- redirecting short URLs to their destination
- fetching and deleting user-owned links

## Highlights

- Express 5 API
- MongoDB with Mongoose models
- JWT authentication
- `httpOnly` auth cookies
- CORS configured for the Vite frontend
- Cookie parsing and user attachment middleware
- Click tracking for shortened URLs
- Optional custom slugs for authenticated users
- TTL support for expiring URLs

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- cors
- nanoid
- dotenv

## Project Structure

```text
src/
  config/      Database and cookie configuration
  controller/  Route handlers for auth and URL actions
  dao/         Database access helpers
  middleware/  Authentication middleware
  models/      Mongoose schemas
  routes/      Express route definitions
  services/    Business logic layer
  utils/       Shared helpers and error handling
```

## Core Features

### Authentication

- Register new users
- Login with email and password
- Password hashing with bcrypt
- JWT token generation
- Auth cookie creation
- Current-user lookup with `/api/auth/me`
- Logout with cookie clearing

### URL Shortening

- Create short URLs from long URLs
- Guest shortening without an account
- Authenticated shortening with ownership tracking
- Optional custom slugs for logged-in users
- Redirect short codes to their original URL
- Count clicks on each redirect

### Link Management

- List user-owned URLs
- Fetch a single URL by short code
- Delete a URL owned by the current user

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB connection string

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file in the backend directory with at least:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
APP_URL=http://localhost:5000
NODE_ENV=development
```

## API Overview

### Auth Routes

Base path: `/api/auth`

| Method | Route       | Description                           |
| ------ | ----------- | ------------------------------------- |
| POST   | `/register` | Register a new user                   |
| POST   | `/login`    | Login and issue a token               |
| POST   | `/logout`   | Logout the current user               |
| GET    | `/me`       | Return the current authenticated user |

### URL Routes

Base path: `/api/url`

| Method | Route               | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| POST   | `/create/`          | Create a new short URL                    |
| GET    | `/get`              | Return all URLs owned by the current user |
| GET    | `/get/:shortUrl`    | Return one URL by short code              |
| DELETE | `/delete/:shortUrl` | Delete a URL by short code                |

### Public Redirect Route

| Method | Route      | Description                               |
| ------ | ---------- | ----------------------------------------- |
| GET    | `/:shorty` | Redirect a short code to the original URL |

## Request Flow

### Login and Register

1. The client sends email/password or name/email/password.
2. The server validates credentials.
3. Passwords are hashed before saving.
4. A JWT token is generated.
5. The token is returned in JSON and set as an `httpOnly` cookie.

### Short URL Creation

1. The client posts a long URL to `/api/url/create/`.
2. If a user is attached, the short URL is saved with ownership.
3. A new short code is generated with `nanoid` unless a custom slug is supplied.
4. The short URL is returned as a full redirect URL.

### Redirects

1. A request hits `/:shorty`.
2. The backend finds the matching URL document.
3. The click count is incremented.
4. The response redirects to the original destination.

## Data Models

### User

Fields:

- `name`
- `email`
- `password`
- `avatar`

Important behavior:

- password is hashed before save
- password is hidden in JSON and object output
- avatar defaults to a DiceBear initials URL

### ShortUrl

Fields:

- `fullUrl`
- `shortUrl`
- `clicks`
- `user`
- `expiresAt`
- `createdAt`

Important behavior:

- `shortUrl` is unique and indexed
- `clicks` starts at `0`
- `expiresAt` supports TTL cleanup

## Middleware

- `cookie-parser` reads the auth cookie
- `attachUser` loads the current user from the cookie token when present
- `authMiddleware` protects authenticated routes
- CORS is configured for `http://localhost:5173` with credentials enabled

## Error Handling

The project uses a centralized error handler that standardizes:

- validation errors
- auth failures
- duplicate key errors
- cast errors
- generic server failures

## Development Notes

- The frontend expects the backend to run on port `5000`
- The frontend sends requests with credentials enabled
- If you change the frontend host or port, update the backend CORS origin
- If you change the backend host or port, update the frontend Axios base URL

## Useful Commands

```bash
npm run dev
```

## Related Frontend Project

This backend is designed to work with the React app in the `frontend/` folder of the same workspace.
