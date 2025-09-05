# Express API with TypeScript, JWT & Role-Based Access

This project built with a **modular architecture** and a **Generic Repository Pattern**.  
It provides **JWT authentication**, **role-based access control**, **user profile management**, and **course CRUD operations**.  
---

## Features
- **Authentication** with JWT tokens  
- **Role-based access** (`ADMIN`, `COACH`, `STUDENT`)  
- **Password hashing** with `argon2`  
- **User profile management**  
- **Course CRUD operations**  
- **Generic Repository** with TypeScript Generics  
---

## API Endpoints

### Auth
| Method | Endpoint          | Access  | Description                          |
|--------|------------------|---------|--------------------------------------|
| POST   | `/auth/register` | Public  | Register a new user (default role = STUDENT) |
| POST   | `/auth/login`    | Public  | Authenticate & issue JWT token       |

### Users
| Method | Endpoint        | Access   | Description                                |
|--------|----------------|----------|--------------------------------------------|
| GET    | `/users/me`    | Protected| Get current user profile                   |
| PUT    | `/users/me`    | Protected| Update current user profile                |
| POST   | `/users/coach` | ADMIN    | Create a new COACH user                    |

### Courses
| Method | Endpoint        | Access          | Description                                |
|--------|----------------|-----------------|--------------------------------------------|
| POST   | `/courses`     | COACH / ADMIN   | Create a new course                        |
| GET    | `/courses`     | Public          | Get all courses                            |
| GET    | `/courses/:id` | Public          | Get course by ID                           |
| PUT    | `/courses/:id` | COACH / ADMIN   | Update course                              |
| DELETE | `/courses/:id` | COACH / ADMIN   | Delete course                              |

---

## Roles & Permissions
- **ADMIN**
  - Create `COACH` users  
  - Update/delete any course  

- **COACH**
  - Create, update, delete **own courses**  

- **STUDENT**
  - Default role on register  
  - Can only view courses  

---

## Generic Repository Pattern
A reusable repository class handles CRUD operations --> Both UserRepository and CourseRepository are built using this pattern.

## Error Handling
  - 401 → Unauthorized (missing/invalid token)
  - 403 → Forbidden (wrong role or not owner)
  - 404 → Resource not found
  - 500 → Internal server error

Includes:
  - Global error handler middleware
  - Fallback 404 handler for unknown routes
Copy code

