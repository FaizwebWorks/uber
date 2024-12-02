# API Documentation

This document outlines the APIs for the backend and provides details on how the frontend should interact with them.

---

# User API Documentation

## Base URL

All User APIs are prefixed with `/users`. For example:

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

| Status Code | Description                   | Response Body                                                                           |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 201         | User successfully registered. | `{ "token": "eyJIXVCJ9...", "user": { ... } }`                                          |
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
    { "msg": "First name must at least 3 characters" },
    { "msg": "Password must be at least 6 characters" }
  ]
}
```

---

### 2. **Login User**

**Endpoint:**  
`POST /login`

**Description:**  
This endpoint logs in an existing user by verifying their email & password.

**Request Body:**  
The frontend needs to send the following data in the request body as JSON:

| Field      | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `email`    | String | Yes      | The user's email address (valid email format). |
| `password` | String | Yes      | The user's password (min length: 6).           |

**Example Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**

- `email` must be a valid email.
- `password` must have at least 6 characters.

**Response:**

| Status Code | Description                | Response Body                                                                           |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------- |
| 201         | Login successful.          | `{ "token": "eyJIXVCJ9...", "user": { ... } }`                                          |
| 400         | Validation error.          | `{ "errors": [ { "msg": "Invalid Email", { "msg": "First name must at..." }, ... } ] }` |
| 401         | Invalid email or password. | `{ "message": "Invalid email or password" }`                                            |

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
    { "msg": "Password must be at least 6 characters" }
  ]
}
```

**Example Error Response (Invalid Login):**

```json
{
  "message": "Invalid email or password"
}
```

---

### 3. **Get User Profile**

**Endpoint:**  
`GET /profile`

**Description:**  
This endpoint retrieves the authenticated user's profile information.

**Request Body:**  
The frontend needs to send the following headers for authentication:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

| Status Code | Description                   | Response Body                                             |
| ----------- | ----------------------------- | --------------------------------------------------------- |
| 200         | User profile retrieved.       | `{ "id": "userId", "fullname": { ... }, "email": "..." }` |
| 400         | Unauthorized (invalid token). | `{ "msg": "Unauthorized"}`                                |

**Example Success Response:**

```json
{
  "_id": "63f2d1234abc1234abc5678",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
}
```

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

## Notes

- Use the Authorization header to send the token.
- Ensure the token is valid and not blacklisted.

---

### 4. **Logout User**

**Endpoint:**  
`GET /logout`

**Description:**  
This endpoint logs out the authenticated user by clearing the authentication cookie and blacklisting the token.

**Headers:**  
The frontend needs to send the following headers for authentication:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

| Status Code | Description                   | Response Body                              |
| ----------- | ----------------------------- | ------------------------------------------ |
| 200         | logout successful.            | `{ "message": "Logged out successfully" }` |
| 401         | Unauthorized (invalid token). | `{ "msg": "Unauthorized"}`                 |

**Example Success Response:**

```json
{
  "message": "Logged out successfully"
}
```

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

## Notes

- Clear any locally stored tokens or session data upon successful logout.
- Ensure the Authorization header is sent for authenticated requests.

if additional APIs require token-based authorization, ensure the token is validated and not blacklisted as demonstrated in the authUser middleware

---

# Captain API Documentation

## Base URL

All Captain APIs are prefixed with `/captains`. For example:

```
http://localhost:8000/captain
```

## Endpoints

### 1. **Register Captain**

**Endpoint:**  
`POST /register`

**Description:**  
This endpoint registers a new captrain in the system with vehicle informataion.

**Request Body:**  
The frontend needs to send the following data in the request body as JSON:

| Field                 | Type   | Required | Description                                   |
| --------------------- | ------ | -------- | --------------------------------------------- |
| `fullname.firstname`  | String | Yes      | Captain's first name (min length: 3).         |
| `fullname.lastname`   | String | No       | Captain's last name (min length: 3).          |
| `email`               | String | Yes      | Captain's email address (valid email format). |
| `password`            | String | Yes      | Captain's password (min length: 6).           |
| `vehicle.color`       | String | Yes      | Vehicle color (min length: 3).                |
| `vehicle.plate`       | String | Yes      | Vehicle plate number (min length: 3).         |
| `vehicle.capacity`    | Number | Yes      | Vehicle capacity (min value: 1).              |
| `vehicle.vehicleType` | String | Yes      | Vehicle type (car, motorcycle or auto).       |

**Example Request Body:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "GJ 21 XY 4631",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

**Validation Rules:**

- `email` must be a valid email.
- `fullname.firstname` must have at least 3 characters.
- `password` must have at least 6 characters.
- `vehicle.color` and `vehicle.plate` must have at least 3 characters.
- `vehicle.capacity` must be atleast 1.
- `vehicle.vehicleType` must be one of `car`, `motorcycle`, or `auto`.

**Response:**

| Status Code | Description                      | Response Body                                       |
| ----------- | -------------------------------- | --------------------------------------------------- |
| 201         | Captain successfully registered. | `{ "token": "eyJIXVCJ9...", "captain": { ... } }`   |
| 400         | Validation or duplicate error.   | `{ "errors": [ { "msg": "Error message" }, ... ] }` |

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "674ce0cdf15f8917c4725asdvf",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "GJ 21 XY 4631",
      "capacity": 3,
      "vehicleType": "car"
    }
  }
}
```

**Example Error Response (Validation):**

```json
{
  "errors": [
    { "msg": "Invalid Email" },
    { "msg": "First name must at least 3 characters" },
    { "msg": "Password must be at least 6 characters" }
  ]
}
```

**Example Error Response (Duplicate):**

```json
{
 "message": "Captain already exists"
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
