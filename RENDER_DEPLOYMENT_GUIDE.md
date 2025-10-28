# Med-G.AI Deployment Guide for Render

This guide will walk you through deploying your Med-G.AI application on Render with separate backend and frontend services.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - For production database (free tier available)
4. **Groq API Key** - For AI features
5. **Cloudinary Account** - For file uploads (optional)

---

## 🗂️ Project Structure

```
mediXai/
├── backend/          # Node.js/Express API
├── frontend/         # React Application
└── RENDER_DEPLOYMENT_GUIDE.md
```

---

## Part 1: Deploy Backend (Web Service)

### Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
cd d:\MediXAI_Nwe\mediXai
git init
git add .
git commit -m "Initial commit for Render deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/medixai.git
git branch -M main
git push -u origin main
```

### Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username/password)
4. Whitelist all IPs: `0.0.0.0/0` (for Render access)
5. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/medixai?retryWrites=true&w=majority
   ```

### Step 3: Deploy Backend on Render

1. **Log in to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `mediXai` repository

3. **Configure Backend Service**
   ```
   Name: medixai-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**
   
   Click "Advanced" → "Add Environment Variable" and add these:

   ```env
   NODE_ENV=production
   PORT=10000
   
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medixai?retryWrites=true&w=majority
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long-change-this
   JWT_EXPIRE=7d
   
   # Groq AI
   GROQ_API_KEY=your-groq-api-key-here
   
   # Cloudinary (if using file uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Frontend URL (will update after frontend deployment)
   FRONTEND_URL=https://medixai-frontend.onrender.com
   ```

5. **Create Service**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Your backend URL will be: `https://medixai-backend.onrender.com`

6. **Test Backend**
   - Visit: `https://medixai-backend.onrender.com/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

---

## Part 2: Deploy Frontend (Static Site)

### Step 1: Update Frontend Configuration

The frontend is already configured to use environment variables. No code changes needed!

### Step 2: Deploy Frontend on Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Select the `mediXai` repository

2. **Configure Frontend Service**
   ```
   Name: medixai-frontend
   Region: Choose closest to your users
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Set Environment Variables**
   
   Add this environment variable:

   ```env
   REACT_APP_API_URL=https://medixai-backend.onrender.com/api
   ```

4. **Create Static Site**
   - Click "Create Static Site"
   - Wait 5-10 minutes for deployment
   - Your frontend URL will be: `https://medixai-frontend.onrender.com`

### Step 3: Update Backend CORS

1. Go back to your **Backend Service** on Render
2. Update the `FRONTEND_URL` environment variable:
   ```env
   FRONTEND_URL=https://medixai-frontend.onrender.com
   ```
3. Click "Save Changes" - backend will redeploy automatically

---

## Part 3: Custom Domain (Optional)

### For Frontend

1. In Render Dashboard → Your Static Site → Settings
2. Scroll to "Custom Domain"
3. Click "Add Custom Domain"
4. Enter your domain: `www.medixai.com`
5. Add the CNAME record to your DNS provider:
   ```
   CNAME www medixai-frontend.onrender.com
   ```

### For Backend

1. In Render Dashboard → Your Web Service → Settings
2. Add custom domain: `api.medixai.com`
3. Add the CNAME record:
   ```
   CNAME api medixai-backend.onrender.com
   ```

4. Update environment variables:
   - Frontend: `REACT_APP_API_URL=https://api.medixai.com/api`
   - Backend: `FRONTEND_URL=https://www.medixai.com`

---

## 🔧 Important Configuration Files

### Backend: `render.yaml` (Optional - for Blueprint)

Create this file in the root directory for automated deployment:

```yaml
services:
  - type: web
    name: medixai-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_EXPIRE
        value: 7d
      - key: GROQ_API_KEY
        sync: false
      - key: FRONTEND_URL
        sync: false

  - type: web
    name: medixai-frontend
    runtime: static
    rootDir: frontend
    buildCommand: npm install && npm run build
    staticPublishPath: build
    envVars:
      - key: REACT_APP_API_URL
        sync: false
```

---

## 🚀 Deployment Checklist

### Before Deployment

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist set to `0.0.0.0/0`
- [ ] Groq API key obtained
- [ ] Cloudinary account set up (if needed)

### Backend Deployment

- [ ] Web Service created on Render
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] Health check endpoint working
- [ ] Backend URL noted

### Frontend Deployment

- [ ] Static Site created on Render
- [ ] Root directory set to `frontend`
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] Site deployed successfully
- [ ] Can access the website
- [ ] Frontend URL noted

### Post-Deployment

- [ ] Backend `FRONTEND_URL` updated with frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test all features (quiz, chatbot, summarizer, etc.)
- [ ] Check browser console for errors
- [ ] Verify API calls are working

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- Check logs in Render Dashboard
- Verify all environment variables are set
- Check MongoDB connection string
- Ensure `npm install` completed successfully

**Problem:** CORS errors
- Verify `FRONTEND_URL` matches your frontend URL exactly
- Check CORS configuration in `server.js`
- Ensure no trailing slashes in URLs

**Problem:** Database connection failed
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has correct permissions

### Frontend Issues

**Problem:** API calls failing
- Check `REACT_APP_API_URL` is set correctly
- Verify backend is running and accessible
- Check browser console for CORS errors
- Ensure API URL includes `/api` at the end

**Problem:** Build fails
- Check Node version compatibility
- Verify all dependencies are in `package.json`
- Check for syntax errors in code
- Review build logs in Render Dashboard

**Problem:** White screen after deployment
- Check browser console for errors
- Verify build completed successfully
- Check if static files are being served
- Ensure `build` directory is set as publish directory

### Common Issues

**Problem:** 502 Bad Gateway
- Backend service might be starting (wait 2-3 minutes)
- Check backend logs for errors
- Verify environment variables

**Problem:** Slow first load
- Render free tier spins down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds
- Consider upgrading to paid tier for always-on service

---

## 💰 Render Pricing

### Free Tier Limitations

**Web Services (Backend):**
- 750 hours/month free
- Spins down after 15 minutes of inactivity
- 512 MB RAM
- Shared CPU

**Static Sites (Frontend):**
- 100 GB bandwidth/month
- Always on
- Global CDN
- Free SSL

### Upgrade Options

**Starter Plan ($7/month per service):**
- Always on
- No spin down
- 512 MB RAM
- Better for production

**Standard Plan ($25/month per service):**
- 2 GB RAM
- Faster performance
- Priority support

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files to Git
   - Use strong, unique values for JWT_SECRET
   - Rotate API keys regularly

2. **Database**
   - Use strong passwords
   - Enable MongoDB Atlas encryption
   - Regular backups

3. **CORS**
   - Only allow your frontend domain
   - Don't use `*` in production

4. **Rate Limiting**
   - Already configured in your backend
   - Monitor for abuse

5. **HTTPS**
   - Render provides free SSL
   - Always use HTTPS URLs

---

## 📊 Monitoring

### Render Dashboard

- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment history
- Set up email alerts

### Application Monitoring

- Check `/health` endpoint regularly
- Monitor error rates
- Track response times
- Set up uptime monitoring (e.g., UptimeRobot)

---

## 🔄 Continuous Deployment

Render automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Render will automatically:
# 1. Detect the push
# 2. Build your application
# 3. Deploy if build succeeds
# 4. Rollback if deployment fails
```

### Disable Auto-Deploy

If you want manual control:
1. Go to Service Settings
2. Scroll to "Auto-Deploy"
3. Toggle off
4. Use "Manual Deploy" button when ready

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **MongoDB Atlas Support:** https://www.mongodb.com/cloud/atlas/support

---

## ✅ Success Indicators

Your deployment is successful when:

1. ✅ Backend health check returns 200 OK
2. ✅ Frontend loads without errors
3. ✅ User can register and login
4. ✅ All features work (quiz, chat, summarizer)
5. ✅ No CORS errors in browser console
6. ✅ Database operations succeed
7. ✅ AI features respond correctly

---

## 🎉 Next Steps

After successful deployment:

1. **Test thoroughly** - Try all features
2. **Set up monitoring** - Use UptimeRobot or similar
3. **Configure custom domain** - For professional look
4. **Enable analytics** - Google Analytics, etc.
5. **Set up error tracking** - Sentry, LogRocket, etc.
6. **Create backups** - Regular MongoDB backups
7. **Document API** - For future development

---

**Congratulations! Your Med-G.AI application is now live! 🚀**
