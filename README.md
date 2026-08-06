# Blog API

A RESTful blog API built with **Node.js**, **Express**, and **MongoDB**. It supports user authentication with email verification, JWT-based authorization, and full CRUD operations on blog posts.

---

## Tech Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Runtime          | Node.js            |
| Framework        | Express v5         |
| Database         | MongoDB + Mongoose |
| Auth             | JWT + bcrypt       |
| Validation       | Joi                |
| Email            | Nodemailer         |
| Input validation | validator.js       |

---

## Project Structure

```
├── server.js              # Entry point — starts HTTP server
├── app.js                 # Express app setup, routes, global middleware
├── config/
│   └── db.js              # MongoDB connection
├── routes/
│   ├── AuthRoutes.js      # /authorize/*
│   └── BlogRoutes.js      # /blogs/*
├── controllers/
│   ├── authorizeController.js
│   └── blogController.js
├── models/
│   ├── userModel.js
│   └── blogModel.js
├── middlewares/
│   ├── authenticate.js    # JWT guard
│   ├── validate.js        # Joi schema validation
│   └── errorMiddleware.js # Global error handler
├── schemas/               # Joi schemas for all routes
├── utils/
│   ├── APIFeatures.js     # Filtering, sorting, pagination
│   ├── catchAsync.js      # Async error wrapper
│   ├── email.js           # Email sender
│   └── ErrorHandlers.js   # Custom error classes
```

---

## API Endpoints

### Auth — `/authorize`

| Method | Endpoint                 | Description                                   | Auth |
| ------ | ------------------------ | --------------------------------------------- | ---- |
| POST   | `/signup`                | Register a new user, sends verification email | No   |
| POST   | `/verification/:token`   | Verify email address                          | No   |
| POST   | `/login`                 | Login, returns JWT                            | No   |
| POST   | `/forget-password`       | Send password reset email                     | No   |
| POST   | `/reset-password/:token` | Reset password using token                    | No   |

### Blogs — `/blogs`

| Method | Endpoint | Description                                     | Auth |
| ------ | -------- | ----------------------------------------------- | ---- |
| GET    | `/`      | Get all blogs (filterable, sortable, paginated) | Yes  |
| POST   | `/`      | Create a new blog post                          | Yes  |
| PUT    | `/:id`   | Update a blog post                              | Yes  |
| DELETE | `/:id`   | Delete a blog post                              | Yes  |

---

## Authentication Flow

1. **Signup** → account created, verification email sent
2. **Verify** → click link in email to activate account
3. **Login** → receive JWT token
4. **Protected routes** → send `Authorization: Bearer <token>` header

Password changes invalidate all previously issued tokens.

---

## Query Features (GET /blogs)

| Parameter | Example                | Description                               |
| --------- | ---------------------- | ----------------------------------------- |
| `sort`    | `?sort=-createdAt`     | Sort by field (prefix `-` for descending) |
| `fields`  | `?fields=title,author` | Select specific fields                    |
| `page`    | `?page=2`              | Page number (default: 1)                  |
| `limit`   | `?limit=10`            | Items per page (default: 20)              |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env   # then fill in the values
```

### Environment Variables

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog
SECRET=your_jwt_secret
EXPIRES_TOKEN_TIME=7d
APP_EMAIL=your@email.com

# Nodemailer SMTP config
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=yourpassword
```

### Run

```bash
# Development (with nodemon)
npm run dev

# Production
node server.js
```

### Health Check

```
GET /health
```

---

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
