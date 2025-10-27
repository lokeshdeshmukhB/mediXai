# Med-G.AI Quick Start Guide

## 🚀 Getting Started

### 1. Start the Application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

### 2. Access the Application

- **Home Page**: http://localhost:3000/
- **Login Page**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard (after login)

## 🎨 What's New

### Med-G.AI Branding
- New professional medical color scheme (Teal & Blue)
- Updated logo and branding throughout
- Comprehensive home page with company information

### Key Features Showcased
1. **AI-Powered Quiz System** - Test pharmaceutical knowledge
2. **Medical Chatbot** - Get instant AI assistance
3. **Research Paper Summarizer** - Understand complex papers quickly
4. **Drug Interaction Checker** - Ensure patient safety
5. **Smart Learning Modules** - Access curated content
6. **Progress Tracking** - Monitor learning journey

### Security Enhancement
- **5-minute auto-logout timer** for inactive sessions
- **1-minute warning** before logout
- **Activity tracking** to keep sessions alive
- **"Stay Logged In" button** to extend session

## 👥 Team Information

**Founders:**
- **Sayali Dhutadmal** - Founder, PharmD Professional
- **Om Kinhikar** - Co-Founder, PharmD Professional

## 🎯 Mission & Vision

**Vision:** Revolutionize the medical and pharmaceutical ecosystem by merging AI with human intelligence.

**Mission:** Empower healthcare learners and researchers with AI-driven tools, mentorship, and opportunities.

## 🔐 Session Management

### How It Works
1. User logs in successfully
2. 5-minute inactivity timer starts
3. At 4 minutes, warning notification appears
4. User can click "Stay Logged In" to reset timer
5. At 5 minutes, automatic logout occurs
6. Any activity (click, scroll, type) resets the timer

### Tracked Activities
- Mouse clicks
- Keyboard input
- Page scrolling
- Touch events

## 🎨 Color Palette

### Primary Colors
- **Teal**: `#0d9488` to `#14b8a6` - Trust, Healthcare
- **Blue**: `#2563eb` to `#3b82f6` - Technology, Intelligence
- **Cyan**: `#06b6d4` - Accent color

### Usage
- **Gradients**: `from-teal-600 to-blue-600`
- **Backgrounds**: Teal/Blue 50 shades
- **Text**: Teal/Blue 600 shades
- **Hover**: Teal/Blue 700 shades

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with Med-G.AI introduction
- Vision & Mission cards
- 6 Feature cards
- Team section
- Community section
- Footer

### Login Page (`/login`)
- Login/Sign Up toggle
- Email & Password fields
- Role selection (Student/Professor/Pharmacist)
- University field (optional)

### Dashboard (`/dashboard`)
- Welcome message
- 4 Stat cards (Quizzes, Streak, Papers, Score)
- Quick Actions (Quiz, Chatbot, Summarizer, Drug Checker)
- Recent Activity
- Performance Overview

### Other Pages
- `/quiz` - Quiz Module
- `/chatbot` - AI Assistant
- `/summarizer` - Paper Summarizer
- `/interaction` - Drug Interaction Checker

## 🧪 Testing the Auto-Logout

1. Log in to the application
2. Wait 4 minutes without any activity
3. Warning notification should appear
4. Click "Stay Logged In" to reset timer
5. OR wait 1 more minute for automatic logout

## 🔧 Troubleshooting

### Timer Not Working?
- Check browser console for errors
- Ensure `AuthContext.js` is properly imported
- Verify event listeners are attached

### Colors Not Showing?
- Run `npm install` in frontend directory
- Restart the development server
- Clear browser cache

### Routing Issues?
- Ensure all routes in `App.js` are correct
- Check that `Home.js` is properly imported
- Verify navigation links use `/login` not `/`

## 📝 Environment Variables

Ensure your `.env` files are configured:

**Backend (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

## 🎓 User Roles

- **Student** - Access all learning features
- **Professor** - Additional teaching tools
- **Pharmacist** - Professional drug checking tools

## 📞 Support

For issues or questions:
- Check documentation in `/docs` folder
- Review `MED-G-AI_UPDATES.md` for detailed changes
- Contact: Sayali Dhutadmal or Om Kinhikar

---

**Med-G.AI** - Where Medicine Meets Artificial Intelligence 🏥🤖
