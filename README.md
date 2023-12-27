# Course management with` Mongoose, Typescript, express` Validation

### [live Server Link](https://course-management-brainic.vercel.app)

## Technology Stack:

### Programming Language: TypeScript

### Web Framework: Express.js

### Object Data Modeling (ODM) and Validation Library: Mongoose for MongoDB

# Models:

## 1. [Course Model](#Create-Course)

## 2. [Paginated and Filter Courses](#Paginated-and-Filter-Courses)

## 3. [Create-Category](#Create-Category)

## 4. [Get-All-Categories](#Get-All-Categories)

## 5. [Review Model](#Create-Review)

## 6. [Update Course (Partial Update with DynamicUpdate)](#Update-Course-Partial-Update-with-Dynamic-Update)

## 7. [Get-Course-by-ID-with-Reviews](#Get-Course-by-ID-with-Reviews)

## 8. [Get-the-Best-Course-by-Average-Review-(Rating)](#Get-the-Best-Course-by-Average-Review-Rating)

## 9. [Validation-with-Zod](#Validation-with-Zod)

Implemented proper error handling throughout the application. Using global error handling middleware to catch and handle errors, providing appropriate error responses with status codes and error messages.

# Endpoints:

# Create-Course

```https
https://course-management-brainic.vercel.app/api/course
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
https://course-management-brainic.vercel.app/api/courses/6579d170c8e9b672f03fa6ba
```

Method: `PUT`
Request Body:

- You can send the partial body data to update the fields you want to update or the full data if you want to update every field of a course. Ensure dynamic updating for both primitive and non-primitive data to prevent the mutation of non-primitive data.

# Get-Course-by-ID-with-Reviews

Method: `GET`
Endpoint:

```https
https://course-management-brainic.vercel.app/api/courses/6579869ce9e7cb12a3eb09e0/reviews
```

# Get-the-Best-Course-by-Average-Review-(Rating)

Method: `GET`
Endpoint:

```https
https://course-management-brainic.vercel.app/api/course/best
```

The response includes details about the course, its average rating, and the total number of reviews

# Validation-with-Zod

Use od to validate incoming data for course, category and review creation and updating operations.
Ensuring that the data adheres to the structure defined in the models.
Handle validation errors gracefully and provide meaningful error messages in the API responses.
