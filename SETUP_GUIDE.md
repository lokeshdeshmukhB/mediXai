# PharmAcademy - Complete Setup Guide

This guide will walk you through setting up the PharmAcademy application from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

You'll also need accounts for:
- **MongoDB Atlas** (free tier available) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Groq API** (for AI features) - [Sign up](https://console.groq.com/)
- **Cloudinary** (for file storage) - [Sign up](https://cloudinary.com/)

## Step 1: Get Your API Keys

### MongoDB Atlas
1. Create a free account at MongoDB Atlas
2. Create a new cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

### Groq API
1. Sign up at Groq Console
2. Navigate to API Keys section
3. Create a new API key
4. Copy and save the key securely

### Cloudinary
1. Sign up at Cloudinary
2. Go to Dashboard
3. Note your Cloud Name, API Key, and API Secret

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- bcryptjs
- jsonwebtoken
- groq-sdk
- cloudinary
- multer
- express-validator
- helmet
- express-rate-limit
- pdf-parse

### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Important**: Replace all placeholder values with your actual credentials!

### 2.4 Create Uploads Directory
```bash
mkdir uploads
```

### 2.5 Start Backend Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000 in development mode
```

## Step 3: Frontend Setup

### 3.1 Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- lucide-react
- tailwindcss
- autoprefixer
- postcss

### 3.3 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.4 Start Frontend Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## Step 4: Test the Application

### 4.1 Create an Account
1. Click "Sign Up" on the login page
2. Fill in your details:
   - Full Name
   - Email
   - Password (minimum 6 characters)
   - Role (Student/Professor/Pharmacist)
   - University (optional)
3. Click "Create Account"

### 4.2 Test Features

#### Quiz Module
1. Navigate to Quiz Module from sidebar
2. Select a category (e.g., Pharmacology)
3. Choose difficulty level
4. Wait for AI to generate questions
5. Answer questions and submit

#### AI Chatbot
1. Navigate to AI Assistant
2. Type a pharmacy-related question
3. Get AI-powered responses

#### Paper Summarizer
1. Navigate to Paper Summarizer
2. Upload a PDF research paper (max 10MB)
3. Wait for AI to analyze and summarize
4. View summary and citations

#### Drug Interaction Checker
1. Navigate to Drug Checker
2. Search and add multiple drugs
3. Click "Check Interactions"
4. View interaction results

## Step 5: Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Verify your connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure password doesn't contain special characters that need encoding

**Port Already in Use**
- Change PORT in backend `.env` to another port (e.g., 5001)
- Update REACT_APP_API_URL in frontend `.env` accordingly

**Groq API Errors**
- Verify your API key is correct
- Check if you have API credits/quota remaining
- Ensure no extra spaces in the key

### Frontend Issues

**Can't Connect to Backend**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend `.env`
- Try clearing browser cache

**Tailwind Styles Not Working**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

**Build Errors**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

## Step 6: Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set all environment variables in your hosting platform
2. Change `NODE_ENV` to `production`
3. Update `FRONTEND_URL` to your production frontend URL
4. Deploy the backend folder

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Set `REACT_APP_API_URL` to your production backend URL
3. Deploy the build folder

## Common Commands

### Backend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Never commit `.env` files to version control
- [ ] Use environment variables for all sensitive data
- [ ] Enable CORS only for trusted domains in production
- [ ] Keep dependencies updated
- [ ] Use HTTPS in production

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Groq API Documentation](https://console.groq.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Groq, Cloudinary) are accessible
4. Check the README.md for additional information

## Next Steps

- Customize the UI to match your branding
- Add more quiz categories
- Implement user profiles with avatars
- Add email verification
- Create admin panel
- Add more drug interaction data
- Implement real-time notifications

Happy Learning! 🎓💊
