
# Mentora Backend API

A simplified backend for a mentorship platform where **parents, students, and mentors interact**.
This project implements the core backend functionality of a mentorship system including authentication, lesson management, bookings, sessions, and an **LLM-based text summarization feature**.

---

# Project Overview

The system supports three user roles:

* **Parent**
* **Student**
* **Mentor**

### Role Responsibilities

**Parent**

* Can register and login
* Can create students
* Can assign students to lessons

**Student**

* Created by parents
* Can attend lessons

**Mentor**

* Can register and login
* Can create lessons
* Can create sessions within lessons

---

# Tech Stack

Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM

Security

* JWT Authentication
* bcrypt password hashing
* Role-based authorization

AI Integration

* Google Gemini API

Other Tools

* Zod validation
* Express Rate Limit
* dotenv for environment variables

---

# Project Architecture

```
src
 ├── config
 │    ├── prisma.js
 │    └── gemini.js
 │
 ├── middleware
 │    ├── auth.middleware.js
 │    ├── role.middleware.js
 │    ├── validate.middleware.js
 │    └── rateLimit.middleware.js
 │
 ├── modules
 │    ├── auth
 │    ├── students
 │    ├── lessons
 │    ├── bookings
 │    ├── sessions
 │    └── llm
 │
 ├── utils
 │
 ├── app.js
 └── server.js
```

Architecture design follows a **Controller → Service → Database pattern**.

---

# Database Design

Main entities:

```
User
 ├─ Parent
 └─ Mentor

Student
 └─ belongs to Parent

Lesson
 └─ belongs to Mentor

Session
 └─ belongs to Lesson

Booking
 └─ connects Student to Lesson
```

---

# Installation

### 1. Clone the Repository

```
git clone https://github.com/Vinaypunani/Mentorship.git
cd mentora-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```
PORT=3000

DATABASE_URL="postgresql://username:password@localhost:5432/mentora"

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

---

# Database Setup

Run Prisma migration:

```
npx prisma migrate dev
```

Generate Prisma client:

```
npx prisma generate
```

Optional: open Prisma Studio

```
npx prisma studio
```

---

# Running the Server

```
npm run dev
```

Server will start on:

```
http://localhost:3000
```

---

# Authentication API

### Signup

```
POST /auth/signup
```

Body

```
{
"name": "John",
"email": "john@example.com",
"password": "123456",
"role": "parent"
}
```

Only **parent** and **mentor** roles are allowed.

---

### Login

```
POST /auth/login
```

Body

```
{
"email": "john@example.com",
"password": "123456"
}
```

Returns JWT token.

---

### Get Current User

```
GET /me
```

Header

```
Authorization: Bearer <token>
```

---

# Students API

Parent only.

### Create Student

```
POST /students
```

Body

```
{
"name": "Alice",
"age": 12
}
```

---

### Get Students

```
GET /students
```

Returns all students belonging to the authenticated parent.

---

# Lessons API

Mentor only.

### Create Lesson

```
POST /lessons
```

Body

```
{
"title": "Math Basics",
"description": "Introduction to algebra"
}
```

---

# Booking API

Parent assigns student to lesson.

```
POST /bookings
```

Body

```
{
"studentId": "uuid",
"lessonId": "uuid"
}
```

Validation rules:

* student must belong to parent
* lesson must exist
* duplicate bookings prevented

---

# Sessions API

Sessions belong to lessons.

### Create Session

```
POST /sessions
```

Body

```
{
"lessonId": "uuid",
"date": "2026-04-20T10:00:00Z",
"topic": "Linear Equations",
"summary": "Introduction to solving equations"
}
```

---

### Get Lesson Sessions

```
GET /sessions/lessons/{lessonId}/sessions
```

---

# LLM Text Summarization

Endpoint:

```
POST /llm/summarize
```

Body

```
{
"text": "Long text to summarize..."
}
```

Response

```
{
"summary": "- bullet point summary",
"model": "gemini-2.5-flash"
}
```

---

# LLM Validation Rules

Input validation:

* Text must exist
* Minimum length: **50 characters**
* Maximum length: **10,000 characters**

Errors:

```
400 → invalid input
413 → text too large
502 → LLM failure
```

---

# Rate Limiting

The LLM endpoint is protected with rate limiting:

```
5 requests per minute
```

This prevents abuse and excessive API usage.

---

# Example cURL Request

```
curl -X POST http://localhost:3000/llm/summarize \
-H "Content-Type: application/json" \
-d '{"text":"Artificial intelligence is transforming industries by enabling automation and improving decision making."}'
```

---

# Security Practices

* Password hashing using **bcrypt**
* Authentication using **JWT**
* Role-based authorization middleware
* Environment variables for secrets
* Rate limiting for LLM endpoint
* Input validation using Zod

---

# Assumptions

* Students cannot sign up directly.
* Students are created by parents.
* Each student belongs to exactly one parent.
* Each lesson belongs to one mentor.
* Bookings prevent duplicate assignments.
* LLM summaries are limited to bullet points.

---

# Evaluation Focus

This project demonstrates:

* Clean code structure
* Clear API design
* Secure authentication
* Database relationships
* External AI integration
* Error handling and validation

---

# Author

Vinay Punani