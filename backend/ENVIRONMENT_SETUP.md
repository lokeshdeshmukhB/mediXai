# Environment Setup Guide

## 🔐 Security Notice
This project uses environment variables to keep sensitive API keys and credentials secure. **Never commit the `.env` file to Git.**

## Setup Instructions

### 1. Create Your Environment File
Copy the example environment file:
```bash
cp .env.example .env
```

### 2. Configure Your API Keys
Open the `.env` file and replace the placeholder values with your actual credentials:

#### Required Configurations:

**MongoDB:**
- Get your connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Replace `MONGODB_URI` value

**Groq API:**
- Sign up at [Groq Console](https://console.groq.com/)
- Generate an API key
- Replace `GROQ_API_KEY` value

**Cloudinary:**
- Sign up at [Cloudinary](https://cloudinary.com/)
- Get your credentials from the dashboard
- Replace `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`

**JWT Secret:**
- Generate a strong random string for production
- Replace `JWT_SECRET` value

### 3. Verify Git Ignore
Ensure `.env` is listed in `.gitignore` to prevent accidental commits:
```bash
# Check if .env is ignored
git check-ignore backend/.env
```

### 4. Check for Exposed Secrets
Before pushing to Git, verify no secrets are tracked:
```bash
git ls-files | findstr .env
```
If this returns any results, remove them:
```bash
git rm --cached backend/.env
git commit -m "Remove .env from tracking"
```

## 🚨 Important Security Tips

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use `.env.example`** - Commit this template file instead
3. **Rotate exposed keys** - If you accidentally commit secrets, rotate them immediately
4. **Use different keys** - Use separate API keys for development and production
5. **Check before pushing** - Always verify no secrets are included before `git push`

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRE` | JWT token expiration time | Yes |
| `GROQ_API_KEY` | Groq AI API key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `FRONTEND_URL` | Frontend application URL | Yes |

## Troubleshooting

### "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### "GROQ_API_KEY is not defined"
Make sure:
1. `.env` file exists in the `backend/` directory
2. `GROQ_API_KEY` is set in `.env`
3. No extra spaces around the `=` sign
4. Server is restarted after changing `.env`

### Git still tracking .env
```bash
git rm --cached backend/.env
git commit -m "Stop tracking .env file"
```
