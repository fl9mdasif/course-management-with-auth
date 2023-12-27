# Course management with` Mongoose, Typescript, express` Validation

### [live Server Link](https://course-management-brainic.vercel.app)

### [Postman Api Documentation](https://documenter.getpostman.com/view/27499806/2s9YkuYHnC)

# Models:

## O.O [Project Overview](#Project-Overview)

## 0.1 [Technology Stack](#Technology-Stacks)

## 1. [Register user](#Register-user)

## 2. [Login user](#Login-user)

## 3. [Change password](#Change-password)

## 4. [Course Model](#Create-Course)

## 5. [Get Course with Paginated and Filter](#Paginated-and-Filter-Courses)

## 6. [Create-Category](#Create-Category)

## 7. [Get-All-Categories](#Get-All-Categories)

## 8. [Review Model](#Create-Review)

## 9. [Update Course (Partial Update with DynamicUpdate)](#Update-Course-Partial-Update-with-Dynamic-Update)

## 10. [Get-Course-by-ID-with-Reviews](#Get-Course-by-ID-with-Reviews)

## 11. [Get-the-Best-Course-by-Average-Review-(Rating)](#Get-the-Best-Course-by-Average-Review-Rating)

## 12. [Validation-with-Zod](#Validation-with-Zod)

### Object Data Modeling (ODM) and Validation Library: Mongoose for MongoDB

# Project-Overview

## User Authentication and Authorization

This project focuses on implementing robust user authentication and authorization mechanisms. Key features include:

### User Registration, Login, and Password Change

- **User Registration:** Users can register by providing essential details like username, email, and password.

- **User Login:** Registered users can securely log in, and the system authenticates their identity using JWT (JSON Web Tokens).

- **Password Change:** Users can change their passwords securely, and the system enforces password management best practices.

### JWT-Based Authentication

- **Secure Password Storage:** Passwords are securely stored using hashing to protect user data.

- **JWT-Based Authentication:** JSON Web Tokens are utilized for user authentication during login, ensuring a secure and efficient authentication process.

- **User Roles:** User roles (e.g., user, admin) are defined, and authorization checks are enforced for actions requiring specific roles.

## Documentation

### API Documentation Update

- **Reflecting Changes:** The API documentation is updated to include new endpoints, request/response formats, and query options.

## Query Options for Courses

### Enhanced Course Querying

- **Query Parameters:** Courses can be retrieved based on various query parameters, such as title, price, start date, and more.

- **Pagination and Filtering:** Implemented pagination and filtering options to enhance the precision and efficiency of course retrieval.

## Error Handling

### Robust Error Handling

- **Unauthorized Access:** Implemented appropriate error handling for unauthorized access attempts.

- **Informative Error Messages:** Clear and informative error messages are provided in case of authentication or authorization failures.

## Validation with Zod

### Data Validation with Zod

- **Zod Integration:** Zod is used to validate incoming data for course, category, and review creation and updating operations.

- **Structured Data:** Ensuring that the data adheres to the defined structures in the models.

- **Graceful Error Handling:** Validation errors are handled gracefully, and meaningful error messages are incorporated into the API responses.

---

This project aims to create a secure, well-documented, and efficiently functioning system, incorporating the latest best practices in user authentication, authorization, and data validation.

# Technology-Stacks

- `bcrypt`: Library for securely hashing passwords.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing in Express.
- `dotenv`: Module for loading environment variables from a .env file.
- `express`: Web application framework for Node.js.
- `http`-status: Module for HTTP status codes.
- `jsonwebtoken`: Implementation of JSON Web Tokens (JWT) for user authentication.
- `mongoose`: MongoDB object modeling tool designed for Node.js.
- `ts`-node-dev: TypeScript execution environment with automatic restarts.
- `zod`: Schema declaration and validation library for TypeScript.
- `DevDependencies`
- `eslint`: JavaScript and TypeScript linter tool.
- `prettier`: Code formatter for maintaining consistent code style.
- `typescript`: Superset of JavaScript that adds static types to the language.

### Endpoints:

# register-user

```https
  https://course-management-brainic.vercel.app/api/auth/register
```

Method: POST
Request Body:

```json
{
  "username": "asif1234",
  "email": "asif1234@gmial1.com",
  "password": "123456",
  "role": "user"
}
```

# Login-user

```https
  https://course-management-brainic.vercel.app/api/auth/login
```

Method: POST
Request Body:

- login as user

```json
{
  "username": "asif123",
  "password": "123456a"
}
```

- login as admin

```json
{
  "username": "admin1",
  "password": "123456"
}
```

# Change-password

```https
 https://course-management-brainic.vercel.app/api/auth/change-password
```

Method: POST
Request Body:

- Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThiZDc3MWMzODVlZTA2MjVhNTQ1YTEiLCJ1c2VybmFtZSI6ImFkbWluMTIiLCJlbWFpbCI6ImFkbWluMTJAZ21pYWwxLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMzY5NzE2MiwiZXhwIjoxNzAzNzgzNTYyfQ.5ycNSWYL0UH6K0tzUWyNkbJEEGcnthCi4ZaXYvrptdY

```json
{
  "currentPassword": "123456",
  "newPassword": "123456a"
}
```

# Create-Course

```https
https://course-management-brainic.vercel.app/api/courses
```

Method: POST
Request Body:

- create a course with the json data by postman or any other APi handle softwares

```json
{
  "title": "Deep Learning",
  "instructor": "Master The Nos",
  "categoryId": "657800e835953e43a87bf09c",
  "price": 89.99,
  "tags": [
    {
      "name": "Programming",
      "isDeleted": false
    },
    {
      "name": "Artificial Intelligence ",
      "isDeleted": false
    }
  ],
  "startDate": "2024-02-15",
  "endDate": "2023-05-14",
  "language": "English",
  "provider": "World Tech Academy",
  "details": {
    "level": "Advanced",
    "description": "Detailed description of the course"
  }
}
```

# Paginated-and-Filter-Courses

## Method: GET

Get Endpoint:

```https
https://course-management-brainic.vercel.app/api/courses
```

### Query Parameters for API Requests:

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

- page: Default is 1. Example: ?page=2

- limit: (Optional) Sets the number of items per page. Default is a predefined limit. Example: ?limit=10

- sortBy: (Optional)Only applicable to the following fields: `title`, `price`, `startDate`, `endDate`, `language`, `durationInWeeks`. Example: /courses?sortBy=price

- sortOrder: (Optional) example ?sortOrder=asc ?sortOrder=desc

- minPrice, maxPrice: (Optional) ?minPrice=20&maxPrice=50

- tags: ?tags=Programming

- startDate, endDate: (Optional) Filters results by a date range. Example: ?startDate=2023-01-01&endDate=2023-12-31

- language: (Optional) ?language=English

- provider: (Optional) Filters provider. Example: ?provider=Tech Academy

- durationInWeeks: (Optional) Filters course in weeks. Example: ?durationInWeeks=8

- level: (Optional) Filters results by the difficulty level of the course. Example: ?level=Intermediate

# Create-Category

Endpoint:

```https
 https://course-management-brainic.vercel.app/api/categories
```

Method: `POST`
Request Body:
`create a category via this `

```json
{
  "name": "Programming"
}
```

# Get-All-Categories

Endpoint:

```https
https://course-management-brainic.vercel.app/api/categories
```

Method: `GET`

# Create-Review

Endpoint:

```https
 https://course-management-brainic.vercel.app/api/reviews
```

Method: `POST`
Request Body:

create a review with this

```json
{
  "courseId": "123456789012345678901234",
  "rating": 4,
  "review": "Great course!"
}
```

# Update-Course-(Partial-Update-with-Dynamic-Update)

Endpoint:

```https
https://course-management-brainic.vercel.app/api/courses/658bca15661b6a963e99a224
```

Method: `PUT`
Request Body:

- You can send the partial body data to update the fields you want to update or the full data if you want to update every field of a course. Ensure dynamic updating for both primitive and non-primitive data

# Get-Course-by-ID-with-Reviews

Method: `GET`
Endpoint:

```https
https://course-management-brainic.vercel.app/api/courses/658bca15661b6a963e99a224/reviews
```

# Get-the-Best-Course-by-Average-Review-(Rating)

Method: `GET`
Endpoint:

```https
https://course-management-brainic.vercel.app/api/courses/best
```

The response includes details about the course, its average rating, and the total number of reviews
