# 📋 Render Deployment Checklist

Use this checklist to ensure a smooth deployment process.

---

## Pre-Deployment

### Code Preparation
- [ ] All code committed to Git
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] `package.json` files are up to date
- [ ] All dependencies installed locally and working
- [ ] Application tested locally (frontend + backend)

### Accounts Setup
- [ ] GitHub account created
- [ ] Render account created (sign up with GitHub)
- [ ] MongoDB Atlas account created
- [ ] Groq API account created
- [ ] Cloudinary account created (optional)

---

## Database Setup (MongoDB Atlas)

- [ ] Free cluster created
- [ ] Database user created with strong password
- [ ] Password saved securely
- [ ] Network access set to `0.0.0.0/0`
- [ ] Connection string copied
- [ ] Connection string tested locally
- [ ] Database name set to `medixai`

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/medixai?retryWrites=true&w=majority
```

---

## API Keys Collection

### Groq AI (Required)
- [ ] Account created at console.groq.com
- [ ] API key generated
- [ ] API key saved securely
- [ ] API key tested locally

### Cloudinary (Optional)
- [ ] Account created
- [ ] Cloud name copied
- [ ] API key copied
- [ ] API secret copied
- [ ] All credentials saved securely

---

## GitHub Repository

- [ ] Repository created on GitHub
- [ ] Repository is public or Render has access
- [ ] Code pushed to `main` branch
- [ ] All files uploaded successfully
- [ ] `.env` file NOT in repository (check!)

**Push Commands:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/medixai.git
git branch -M main
git push -u origin main
```

---

## Backend Deployment

### Service Creation
- [ ] Logged into Render Dashboard
- [ ] "New Web Service" created
- [ ] GitHub repository connected
- [ ] Correct repository selected

### Service Configuration
- [ ] Name: `medixai-backend` (or your choice)
- [ ] Region selected (closest to users)
- [ ] Branch: `main`
- [ ] Root Directory: `backend`
- [ ] Runtime: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free` (or paid)

### Environment Variables Set
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URI` (your connection string)
- [ ] `JWT_SECRET` (min 32 characters)
- [ ] `JWT_EXPIRE=7d`
- [ ] `GROQ_API_KEY` (your key)
- [ ] `FRONTEND_URL` (will update later)
- [ ] `CLOUDINARY_CLOUD_NAME` (if using)
- [ ] `CLOUDINARY_API_KEY` (if using)
- [ ] `CLOUDINARY_API_SECRET` (if using)

### Deployment
- [ ] "Create Web Service" clicked
- [ ] Build started successfully
- [ ] Build completed without errors
- [ ] Service is "Live"
- [ ] Backend URL noted: `https://______.onrender.com`

### Testing
- [ ] Health endpoint works: `/health`
- [ ] Returns: `{"status":"OK","message":"Server is running"}`
- [ ] No errors in logs
- [ ] Service stays running

---

## Frontend Deployment

### Service Creation
- [ ] "New Static Site" created
- [ ] Same GitHub repository selected

### Service Configuration
- [ ] Name: `medixai-frontend` (or your choice)
- [ ] Branch: `main`
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `build`

### Environment Variables Set
- [ ] `REACT_APP_API_URL` set to backend URL + `/api`
  - Example: `https://medixai-backend.onrender.com/api`
  - ⚠️ Must include `/api` at the end!

### Deployment
- [ ] "Create Static Site" clicked
- [ ] Build started successfully
- [ ] Build completed without errors
- [ ] Site is "Live"
- [ ] Frontend URL noted: `https://______.onrender.com`

### Testing
- [ ] Website loads without errors
- [ ] No console errors (F12)
- [ ] CSS/styling loads correctly
- [ ] Images display properly

---

## Post-Deployment Configuration

### Update Backend CORS
- [ ] Go to Backend Service
- [ ] Edit `FRONTEND_URL` environment variable
- [ ] Set to actual frontend URL (no trailing slash)
- [ ] Save changes
- [ ] Backend redeployed automatically
- [ ] Wait for redeploy to complete

### Final URLs
```
Backend:  https://_________________.onrender.com
Frontend: https://_________________.onrender.com
Health:   https://_________________.onrender.com/health
```

---

## Functionality Testing

### Authentication
- [ ] Can access registration page
- [ ] Can register new user
- [ ] Registration saves to database
- [ ] Can login with credentials
- [ ] JWT token received
- [ ] Redirected to dashboard after login
- [ ] Can logout
- [ ] Session timeout works (1 hour)

### Dashboard
- [ ] Dashboard loads after login
- [ ] User name displays correctly
- [ ] Stats display (even if zero)
- [ ] Quick action buttons work
- [ ] Navigation sidebar works
- [ ] Can navigate between pages

### Quiz Module
- [ ] Can select category
- [ ] Can select difficulty
- [ ] Quiz generates successfully
- [ ] Questions display
- [ ] Can select answers
- [ ] Can submit quiz
- [ ] Results display correctly
- [ ] Score saves to database

### Chatbot
- [ ] Chat interface loads
- [ ] Can type message
- [ ] Can send message
- [ ] AI responds (Groq API working)
- [ ] Messages display correctly
- [ ] Conversation history maintained

### Paper Summarizer
- [ ] Upload interface displays
- [ ] Can select PDF file
- [ ] File uploads successfully
- [ ] AI processes paper
- [ ] Summary generates
- [ ] Summary displays correctly

### Drug Interaction Checker
- [ ] Search interface works
- [ ] Can search for drugs
- [ ] Can select multiple drugs
- [ ] Can check interactions
- [ ] Results display correctly
- [ ] Severity levels show properly

---

## Performance & Monitoring

### Initial Performance
- [ ] Page load time acceptable
- [ ] API response times reasonable
- [ ] No timeout errors
- [ ] Images load quickly
- [ ] No memory issues

### Monitoring Setup
- [ ] Render email alerts enabled
- [ ] UptimeRobot configured (optional)
- [ ] MongoDB Atlas alerts enabled
- [ ] Error tracking set up (optional)

---

## Security Verification

### Environment Variables
- [ ] No secrets in code
- [ ] `.env` file not in repository
- [ ] All secrets in Render dashboard only
- [ ] JWT_SECRET is strong and unique
- [ ] Database password is strong

### CORS Configuration
- [ ] Backend only allows frontend domain
- [ ] No wildcard (`*`) in CORS
- [ ] HTTPS enforced
- [ ] Credentials enabled correctly

### Database Security
- [ ] MongoDB user has limited permissions
- [ ] Strong password used
- [ ] IP whitelist configured
- [ ] Connection uses SSL/TLS

---

## Documentation

- [ ] Backend URL documented
- [ ] Frontend URL documented
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] API endpoints documented
- [ ] Admin credentials saved securely

---

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured
- [ ] CNAME records added
- [ ] SSL certificate issued
- [ ] Custom domain working

### Monitoring
- [ ] UptimeRobot monitoring set up
- [ ] Google Analytics added
- [ ] Error tracking (Sentry) configured
- [ ] Performance monitoring enabled

### Backups
- [ ] MongoDB Atlas backups enabled
- [ ] Backup schedule configured
- [ ] Restore process tested

---

## Troubleshooting Completed

### Common Issues Resolved
- [ ] No CORS errors
- [ ] No 502 Bad Gateway errors
- [ ] No database connection errors
- [ ] No build failures
- [ ] No environment variable issues
- [ ] No API key errors

---

## Launch Preparation

### Pre-Launch
- [ ] All features tested thoroughly
- [ ] All bugs fixed
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Documentation complete
- [ ] Backup plan in place

### Launch
- [ ] Announcement prepared
- [ ] Users notified
- [ ] Support channels ready
- [ ] Monitoring active

### Post-Launch
- [ ] Monitor for errors
- [ ] Check user feedback
- [ ] Address issues quickly
- [ ] Document lessons learned

---

## Success Criteria

Your deployment is successful when:

✅ Backend health check returns 200 OK  
✅ Frontend loads without errors  
✅ Users can register and login  
✅ All features work correctly  
✅ No CORS errors in console  
✅ Database operations succeed  
✅ AI features respond properly  
✅ Performance is acceptable  
✅ No security vulnerabilities  
✅ Monitoring is active  

---

## 🎉 Deployment Complete!

- [ ] All checklist items completed
- [ ] Application is live
- [ ] Users can access the site
- [ ] All features working
- [ ] Monitoring in place
- [ ] Documentation updated

**Congratulations! Your Med-G.AI is successfully deployed! 🚀**

---

## Next Steps

1. Share your live URL with users
2. Monitor performance and errors
3. Gather user feedback
4. Plan future updates
5. Consider upgrading to paid tier
6. Set up automated backups
7. Implement analytics
8. Add more features

---

**Deployment Date:** _______________  
**Backend URL:** _______________  
**Frontend URL:** _______________  
**Deployed By:** _______________
