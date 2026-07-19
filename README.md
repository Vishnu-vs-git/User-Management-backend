# User Management API

A RESTful User Management API built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. The project implements secure JWT authentication, password hashing with bcrypt, request validation using Zod, and Dockerized deployment.

---

## Features

- User Registration
- User Login
- JWT Authentication
- HTTP-only Cookie Authentication
- Protected Routes
- Password Hashing using bcrypt
- PostgreSQL Database
- Database Migrations using node-pg-migrate
- Request Validation using Zod
- Docker & Docker Compose Support
- Layered Architecture (Controller → Service → Repository)

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- node-postgres (pg)
- node-pg-migrate
- JWT (jsonwebtoken)
- bcrypt
- Zod
- Docker
- Docker Compose

---

## Project Structure

```
src/
│
├── config/
├── constants/
├── controllers/
├── dto/
├── errors/
├── middlewares/
├── migrations/
├── repositories/
├── routes/
├── schemas/
├── services/
├── types/
├── utils/
└── server.ts
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd backend
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=UserManagement

DATABASE_URL=postgres://postgres:your_password@postgres:5432/UserManagement

JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

ACCESS_TOKEN_MAX_AGE=900000
REFRESH_TOKEN_MAX_AGE=604800000

NODE_ENV=development
```

---

## Running with Docker

Build and start the containers.

```bash
docker compose up --build
```

Stop containers.

```bash
docker compose down
```

---

## Database Migrations

Run migrations.

```bash
npm run migrate:up
```

Rollback migration.

```bash
npm run migrate:down
```

Create a new migration.

```bash
npm run migrate:create
```

---

## Running Locally

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

## API Endpoints

### Register

```
POST /api/auth/register
```

Request

```json
{
  "username": "John",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "Password@123"
}
```

---

### Login

```
POST /api/auth/login
```

Request

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

Returns JWT tokens in HTTP-only cookies.

---

### Get Profile

```
GET /api/auth/me
```

Protected Route

Requires a valid Access Token cookie.

---

## Authentication Flow

1. Register a new user.
2. Login using email and password.
3. Access and Refresh tokens are generated.
4. Tokens are stored as HTTP-only cookies.
5. Protected routes verify the Access Token.
6. Authorized users can access their profile.

---

## Security

- Password hashing using bcrypt
- JWT Authentication
- HTTP-only Cookies
- Input Validation with Zod
- Parameterized PostgreSQL Queries
- Centralized Error Handling

---

## Docker

Start services

```bash
docker compose up --build
```

View running containers

```bash
docker ps
```

View logs

```bash
docker logs -f auth-app
```

Connect to PostgreSQL

```bash
docker exec -it postgres-db psql -U postgres -d UserManagement
```

---

## Future Improvements

- Refresh Token Rotation
- Email Verification
- Password Reset
- Role-Based Authorization
- API Documentation using Swagger
- Unit & Integration Tests
- Rate Limiting
- CSRF Protection

---

## Author

Vishnu V S
