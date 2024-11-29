# API Documentation

This document outlines the APIs for the backend and provides details on how the frontend should interact with them.

---

## Base URL

All APIs are prefixed with `/users`. For example:

```
http://localhost:8000/users
```

---

## Endpoints

### 1. **Register User**

**Endpoint:**  
`POST /register`

**Description:**  
This endpoint registers a new user in the system.

**Request Body:**  
The frontend needs to send the following data in the request body as JSON:

| Field                | Type   | Required | Description                                    |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| `fullname.firstname` | String | Yes      | The user's first name (min length: 3).         |
| `fullname.lastname`  | String | No       | The user's last name (min length: 3).          |
| `email`              | String | Yes      | The user's email address (valid email format). |
| `password`           | String | Yes      | The user's password (min length: 6).           |

**Example Request Body:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**

- `email` must be a valid email.
- `fullname.firstname` must have at least 3 characters.
- `password` must have at least 6 characters.

**Response:**

| Status Code | Description                   | Response Body                                                                         |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 201         | User successfully registered. | `{ "token": "eyJIXVCJ9...", "user": { ... } }`                                        |
| 400         | Validation error.             | `{ "errors": [ { "msg": "Invalid Email", { "msg": "First name must at..." }, ... } ] }` |

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "63f2d1234abc1234abc5678",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

**Example Error Response (Validation):**

```json
{
  "errors": [
    { "msg": "Invalid Email" },
    { "msg": "First name must at least 3 characters long" },
    { "msg": "Password must be at least 6 characters long" }
  ]
}
```

---

## Notes for the Frontend Developer

1. **CORS:**  
   The backend supports CORS. You can make requests directly without additional configurations on the frontend.

2. **Authentication Token:**

   - The `token` returned upon successful registration is a JSON Web Token (JWT).
   - This token should be stored on the frontend (e.g., in local storage) and sent as a Bearer token in the `Authorization` header for subsequent authenticated requests (future APIs will require it).

3. **Error Handling:**

   - Always check for validation errors in the response when the status code is `400`.
   - Display appropriate error messages based on the `msg` field in the errors array.

4. **Validation:**  
   Ensure the data passed to the API adheres to the validation rules outlined above to avoid unnecessary errors.

---
