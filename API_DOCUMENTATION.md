# PharmAcademy API Documentation

**AI Model:** Groq Llama 3.3-70B-Versatile

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "university": "University Name"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "university": "University Name",
    "stats": {
      "quizzesCompleted": 0,
      "studyStreak": 0,
      "papersSummarized": 0,
      "totalScore": 0
    },
    "token": "jwt_token_here"
  }
}
```

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Get Current User
**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "stats": { ... }
  }
}
```

---

## Quiz Endpoints

### Generate Quiz
**POST** `/quiz/generate`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "category": "Pharmacology",
  "difficulty": "Intermediate",
  "numberOfQuestions": 5
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "quiz_id",
    "category": "Pharmacology",
    "difficulty": "Intermediate",
    "questions": [
      {
        "question": "What is the mechanism of action of ACE inhibitors?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": 1,
        "explanation": "Explanation text"
      }
    ]
  }
}
```

### Submit Quiz
**POST** `/quiz/submit`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "quizId": "quiz_id",
  "answers": [1, 0, 2, 1, 3],
  "timeTaken": 300
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "result": { ... },
    "score": 40,
    "totalQuestions": 5,
    "percentage": 80
  }
}
```

### Get Quiz History
**GET** `/quiz/history`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "result_id",
      "category": "Pharmacology",
      "difficulty": "Intermediate",
      "score": 40,
      "totalQuestions": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Leaderboard
**GET** `/quiz/leaderboard`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "rank": 1,
      "name": "John Doe",
      "university": "University Name",
      "score": 2450,
      "quizzesCompleted": 24
    }
  ]
}
```

---

## Chat Endpoints

### Send Message
**POST** `/chat/message`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "message": "What are ACE inhibitors?",
  "chatId": "optional_chat_id"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "chatId": "chat_id",
    "message": "AI response here",
    "chat": { ... }
  }
}
```

### Get All Chats
**GET** `/chat`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "chat_id",
      "title": "Conversation title",
      "lastMessage": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Chat
**GET** `/chat/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "chat_id",
    "messages": [
      {
        "role": "user",
        "content": "Message content",
        "timestamp": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Delete Chat
**DELETE** `/chat/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "message": "Chat deleted successfully"
}
```

---

## Summarizer Endpoints

### Upload and Summarize Paper
**POST** `/summarizer/upload`

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:** FormData with `file` field containing PDF

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "paper_id",
    "title": "Paper title",
    "fileUrl": "cloudinary_url",
    "summary": {
      "keyFindings": "...",
      "methodology": "...",
      "conclusions": "...",
      "fullSummary": "..."
    },
    "citations": {
      "apa": "...",
      "mla": "...",
      "chicago": "..."
    }
  }
}
```

### Get Saved Papers
**GET** `/summarizer/papers`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "paper_id",
      "title": "Paper title",
      "category": "Cardiovascular",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Paper
**GET** `/summarizer/papers/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** Same as upload response

### Delete Paper
**DELETE** `/summarizer/papers/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "message": "Paper deleted successfully"
}
```

---

## Interaction Checker Endpoints

### Check Drug Interactions
**POST** `/interaction/check`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "drugs": ["Aspirin", "Warfarin", "Lisinopril"]
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "interactions": [
      {
        "drugs": ["Aspirin", "Warfarin"],
        "severity": "High",
        "description": "Increased risk of bleeding...",
        "recommendation": "Avoid combination..."
      }
    ],
    "totalChecked": 3,
    "hasInteractions": true
  }
}
```

### Get Drug Information
**GET** `/interaction/drug/:name`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": {
    "genericName": "Aspirin",
    "brandNames": ["Bayer", "Ecotrin"],
    "drugClass": "NSAID",
    "mechanism": "...",
    "indications": ["..."],
    "sideEffects": ["..."],
    "contraindications": ["..."],
    "dosing": "..."
  }
}
```

---

## User Endpoints

### Get Profile
**GET** `/user/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "university": "University Name",
    "stats": { ... }
  }
}
```

### Update Profile
**PUT** `/user/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "university": "New University",
  "role": "pharmacist"
}
```

**Response:** Same as get profile

### Get User Statistics
**GET** `/user/stats`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": {
    "stats": { ... },
    "recentQuizzes": [ ... ],
    "averageScore": 85,
    "totalQuizzes": 24
  }
}
```

### Upload Avatar
**POST** `/user/avatar`

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:** FormData with `avatar` field containing image

**Response:**
```json
{
  "status": "success",
  "data": {
    "avatar": "cloudinary_url"
  }
}
```

### Get User Activity
**GET** `/user/activity`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "type": "quiz",
      "title": "Completed Pharmacology Quiz",
      "score": 40,
      "time": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Applies to:** All `/api/*` routes
- **Response when exceeded:**
```json
{
  "status": "error",
  "message": "Too many requests from this IP, please try again later."
}
```
