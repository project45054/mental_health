# Mental Health App - Backend API Documentation

## 📝 Table of Contents
- [Introduction](#-introduction)
- [Base URL](#-base-url)
- [Authentication](#-authentication)
- [API Endpoints](#-api-endpoints)
  - [Auth Routes](#-auth-routes)
  - [Media Routes](#-media-routes)
  - [User Routes](#-user-routes)
- [Response Format](#-response-format)
- [Error Handling](#-error-handling)
- [Rate Limiting](#-rate-limiting)
- [Data Models](#-data-models)

## 🌟 Introduction
Welcome to the Mental Health App Backend API documentation. This API provides authentication, user management, and media streaming features to support mental wellness through audio/video content.

## 🌍 Base URL
```
http://localhost:5000/api/v1
```

## 🔐 Authentication
All endpoints except `/auth/*` require authentication. Include the JWT token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

## 🔑 Auth Routes

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Shubham",
    "email": "shubham@example.com",
    "password": "mypassword123",
    "role": "student"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully. Please verify your email."
  }
  ```

### Verify Email
- **URL**: `/auth/verify-email`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "shubham@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Email verified successfully."
  }
  ```

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "shubham@example.com",
    "password": "mypassword123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "64b...",
      "name": "Shubham",
      "email": "shubham@example.com",
      "role": "student"
    }
  }
  ```

### Logout
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

## 🎶 Media Routes

### Get All Media
- **URL**: `/media`
- **Method**: `GET`
- **Query Parameters**:
  - `type`: Filter by media type (audio|video|podcast)
  - `category`: Filter by category
  - `language`: Filter by language code (e.g., 'en')
  - `tags`: Comma-separated list of tags
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "64b...",
        "title": "Rain Sounds",
        "type": "audio",
        "category": "rain",
        "url": "https://cloudlink.com/rain.mp3",
        "thumbnail": "https://cloudlink.com/rain.jpg",
        "duration": 300,
        "language": "en",
        "tags": ["calm","sleep"],
        "isPremium": false
      }
    ]
  }
  ```

### Create Media (Admin Only)
- **URL**: `/media`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer <admin_token>
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "title": "Rain Sounds",
    "type": "audio",
    "category": "rain",
    "url": "https://cloudlink.com/rain.mp3",
    "thumbnail": "https://cloudlink.com/rain.jpg",
    "duration": 300,
    "language": "en",
    "tags": ["calm","sleep"],
    "isPremium": false
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": { 
      "id": "64b...", 
      "title": "Rain Sounds" 
    }
  }
  ```

## 👤 User Routes

### Get User Profile
- **URL**: `/users/me`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "64b...",
      "name": "Shubham",
      "email": "shubham@example.com",
      "role": "student",
      "favorites": [],
      "history": []
    }
  }
  ```

### Add to Favorites
- **URL**: `/users/favorites/:mediaId`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Added to favorites"
  }
  ```

## 📄 Response Format
All API responses follow this format:
```json
{
  "success": boolean,
  "message": "string",
  "data": {}
}
```

## ⚠️ Error Handling
Errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

## 🔄 Rate Limiting
- 100 requests per 15 minutes per IP for auth routes
- 1000 requests per hour per user for other routes

## 🗄️ Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'user' | 'admin' | 'therapist';
  isEmailVerified: boolean;
  favorites: string[]; // array of media IDs
  history: Array<{
    mediaId: string;
    playedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

### Media
```typescript
interface Media {
  id: string;
  title: string;
  type: 'audio' | 'video' | 'podcast';
  category: string;
  url: string;
  thumbnail: string;
  duration: number; // in seconds
  language: string; // ISO 639-1 code
  tags: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

For any questions or issues, please contact the development team.
