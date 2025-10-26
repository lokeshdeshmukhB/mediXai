# PharmAcademy Backend API

Backend API for PharmAcademy - A comprehensive pharmacy learning platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required variables (see `.env.example`)

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Required
Most endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Database Models

### User
- name, email, password
- role (student, professor, pharmacist)
- university
- stats (quizzes completed, study streak, papers summarized, total score)

### Quiz
- category, difficulty
- questions with options and correct answers
- AI-generated content

### Chat
- user reference
- messages array (role, content, timestamp)
- conversation history

### Paper
- user reference
- title, file URL
- AI-generated summary
- citations (APA, MLA, Chicago)

## Technologies

- Express.js - Web framework
- MongoDB/Mongoose - Database
- Groq AI - AI model integration
- Cloudinary - File storage
- JWT - Authentication
- Bcrypt - Password hashing
- Multer - File uploads
- PDF-Parse - PDF processing

## Error Handling

All errors return JSON with:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applies to all `/api/*` routes
