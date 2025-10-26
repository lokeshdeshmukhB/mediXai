# PharmAcademy - Complete Pharmacy Learning Platform

A comprehensive MERN stack application for pharmacy education featuring AI-powered quiz generation, chatbot assistance, research paper summarization, and drug interaction checking.

## 🚀 Features

- **AI-Powered Quiz Module**: Generate personalized pharmacy quizzes using Groq's Llama model
- **Intelligent Chatbot**: Get instant answers to pharmacy questions with AI assistance
- **Research Paper Summarizer**: Upload and get AI-generated summaries of research papers
- **Drug Interaction Checker**: Check for potential drug interactions and contraindications
- **User Dashboard**: Track your learning progress and statistics
- **Leaderboard**: Compete with other students
- **Secure Authentication**: JWT-based authentication system

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Groq AI (Llama 3.3)** - AI model for chat, quiz generation, and summarization
- **Cloudinary** - File storage for PDFs and images
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Context API** - State management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Groq API key
- Cloudinary account

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd med-AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

-- Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development




# Frontend URL
FRONTEND_URL=http://localhost:3000
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
med-AI/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── groq.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── chat.controller.js
│   │   ├── quiz.controller.js
│   │   ├── summarizer.controller.js
│   │   ├── interaction.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Quiz.model.js
│   │   ├── Chat.model.js
│   │   └── Paper.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── chat.routes.js
│   │   ├── quiz.routes.js
│   │   ├── summarizer.routes.js
│   │   ├── interaction.routes.js
│   │   └── user.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── errorHandler.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Layout.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── AuthPage.js
    │   │   ├── Dashboard.js
    │   │   ├── QuizModule.js
    │   │   ├── Chatbot.js
    │   │   ├── Summarizer.js
    │   │   └── InteractionChecker.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    ├── package.json
    └── tailwind.config.js
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Quiz
- `POST /api/quiz/generate` - Generate AI quiz
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/history` - Get quiz history
- `GET /api/quiz/leaderboard` - Get leaderboard

### Chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat` - Get all chats
- `GET /api/chat/:id` - Get specific chat
- `DELETE /api/chat/:id` - Delete chat

### Summarizer
- `POST /api/summarizer/upload` - Upload and summarize paper
- `GET /api/summarizer/papers` - Get saved papers
- `GET /api/summarizer/papers/:id` - Get specific paper
- `DELETE /api/summarizer/papers/:id` - Delete paper

### Interaction Checker
- `POST /api/interaction/check` - Check drug interactions
- `GET /api/interaction/drug/:name` - Get drug information

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get user statistics
- `POST /api/user/avatar` - Upload avatar
- `GET /api/user/activity` - Get user activity

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Take Quizzes**: Select a category and difficulty to generate AI-powered quizzes
3. **Ask AI**: Chat with the pharmacy assistant for instant answers
4. **Summarize Papers**: Upload research papers to get AI-generated summaries
5. **Check Interactions**: Add multiple drugs to check for potential interactions
6. **Track Progress**: View your statistics and compete on the leaderboard

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- Rate limiting
- CORS configuration
- Helmet security headers

## 🌟 Key Features Explained

### AI Quiz Generation
Uses Groq's Llama 3.1 model to generate contextual pharmacy questions based on:
- Selected category (Pharmacology, Clinical Pharmacy, etc.)
- Difficulty level (Beginner, Intermediate, Advanced)
- Number of questions

### Intelligent Chatbot
Powered by Groq AI with pharmacy-specific context:
- Answers questions about drugs, mechanisms, interactions
- Maintains conversation history
- Provides evidence-based information

### Paper Summarizer
- Extracts text from PDF files
- Generates structured summaries using AI
- Provides citations in APA, MLA, and Chicago formats
- Stores papers in Cloudinary

### Drug Interaction Checker
- Checks multiple drugs simultaneously
- Uses both predefined database and AI analysis
- Provides severity levels and recommendations

## 📝 Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - Token expiration time
- `GROQ_API_KEY` - Groq API key for AI features
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend
- `REACT_APP_API_URL` - Backend API URL

## 🚨 Important Notes

- **API Keys**: Never commit `.env` files to version control
- **Production**: Change JWT_SECRET in production
- **File Size**: PDF uploads limited to 10MB
- **Rate Limiting**: API has rate limiting enabled (100 requests per 15 minutes)

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify all environment variables are set
- Ensure port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in frontend .env
- Clear browser cache and restart

### File upload fails
- Check Cloudinary credentials
- Verify file is PDF and under 10MB
- Ensure uploads directory exists

## 📄 License

This project is for educational purposes.

## 👥 Contributors

- Your Name

## 🙏 Acknowledgments

- Groq AI for the Llama model
- MongoDB Atlas for database hosting
- Cloudinary for file storage
- React and Express.js communities

## 📧 Support

For issues and questions, please open an issue in the repository.
# medi-ai
# medi-ai
# medi-ai
#   m e d i - a i 
 
 #   m e d i - a i 
 
 #   m e d i - a i 
 
 #   m e d i - a i 
 
 # medii-ai
# medii-ai
# medii-ai
# medii-ai
# mediXai
# mediXai
