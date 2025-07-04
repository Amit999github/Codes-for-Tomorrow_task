# API Documentation

This API supports the following features:

- User Signup
- User Login
- Password Reset Flow (Send Link, Verify, Update Password)

## Base URL
```
http://localhost:3000
```

## Signup

**Endpoint:**
```
POST /signup
```

**Description:**  
Registers a new user.

**Request Body:**
```json
{
  "firstname": "amit",
  "lastname": "athiya",
  "email": "amitathiya704@gmail.com",
  "password": "12345678"
}
```

---

## Login

**Endpoint:**
```
POST /login
```

**Description:**  
Logs in a registered user.

**Request Body:**
```json
{
  "email": "amitathiya704@gmail.com",
  "password": "12345678"
}
```

---

## Send Password Reset Link

**Endpoint:**
```
POST /pass-reset-link
```

**Description:**  
Sends a reset password link to the provided email.

**Request Body:**
```json
{
  "email": "amitathiya704@gmail.com"
}
```

---

## Verify Reset Link

**Endpoint:**
```
GET /verify-reset/:abc123?token=abc123
```

**Description:**  
Verifies if the reset password link is valid.

---

## Reset Password

**Endpoint:**
```
POST /reset-password/:abc123?token=abc123
```

**Description:**  
Updates the user's password using the token from the reset link.

**Request Body:**
```json
{
  "email": "amitathiya704@gmail.com",
  "password": "12345678",
  "con_password": "12345678"
}
```