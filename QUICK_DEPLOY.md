# 🚀 Quick Deploy to Render - 5 Steps

Follow these steps to deploy Med-G.AI to Render in under 30 minutes.

---

## Step 1: Prepare MongoDB Database (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a **FREE** cluster
3. Create database user:
   - Username: `medixai_user`
   - Password: Generate a strong password (save it!)
4. Network Access → Add IP: `0.0.0.0/0` (Allow from anywhere)
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<database>` with `medixai`
   
   Example:
   ```
   mongodb+srv://medixai_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medixai?retryWrites=true&w=majority
   ```

✅ **Save this connection string - you'll need it!**

---

## Step 2: Get API Keys (5 minutes)

### Groq API Key (Required)
1. Go to [Groq Console](https://console.groq.com)
2. Sign up/Login
3. Create new API key
4. Copy and save the key

### Cloudinary (Optional - for file uploads)
1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for free account
3. Dashboard → Copy:
   - Cloud Name
   - API Key
   - API Secret

✅ **Save these keys - you'll need them!**

---

## Step 3: Push to GitHub (5 minutes)

```bash
# Navigate to your project
cd d:\MediXAI_Nwe\mediXai

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Create a new repository on GitHub
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/medixai.git
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## Step 4: Deploy Backend (10 minutes)

1. **Go to [Render Dashboard](https://dashboard.render.com)**
   - Sign up/Login with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select your `medixai` repository

3. **Configure Service**
   ```
   Name: medixai-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables** (Click "Advanced")
   
   Copy and paste these, replacing with your actual values:
   
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://medixai_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medixai?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_change_this_to_random_string
   JWT_EXPIRE=7d
   GROQ_API_KEY=your_groq_api_key_here
   FRONTEND_URL=https://medixai-frontend.onrender.com
   ```
   
   Optional (if using Cloudinary):
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Your backend URL: `https://medixai-backend.onrender.com`

6. **Test Backend**
   - Visit: `https://medixai-backend.onrender.com/health`
   - Should see: `{"status":"OK","message":"Server is running"}`

✅ **Backend is live!**

---

## Step 5: Deploy Frontend (5 minutes)

1. **Create Static Site**
   - Click "New +" → "Static Site"
   - Select your `medixai` repository

2. **Configure Site**
   ```
   Name: medixai-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Add Environment Variable**
   ```
   REACT_APP_API_URL=https://medixai-backend.onrender.com/api
   ```
   
   ⚠️ **Important:** Replace `medixai-backend` with your actual backend service name if different!

4. **Deploy**
   - Click "Create Static Site"
   - Wait 5-10 minutes
   - Your frontend URL: `https://medixai-frontend.onrender.com`

5. **Update Backend CORS**
   - Go back to Backend Service
   - Environment → Edit `FRONTEND_URL`
   - Change to: `https://medixai-frontend.onrender.com`
   - Save (backend will auto-redeploy)

✅ **Frontend is live!**

---

## 🎉 You're Done!

Visit your website: `https://medixai-frontend.onrender.com`

### Test Your Deployment

1. ✅ Website loads without errors
2. ✅ Can register a new account
3. ✅ Can login
4. ✅ Dashboard displays
5. ✅ Quiz module works
6. ✅ Chatbot responds
7. ✅ All features functional

---

## 🐛 Quick Troubleshooting

### Backend won't start?
- Check logs in Render Dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend shows errors?
- Check browser console (F12)
- Verify `REACT_APP_API_URL` is correct
- Make sure backend is running

### CORS errors?
- Update backend `FRONTEND_URL` to match frontend URL exactly
- No trailing slashes!

### 502 Bad Gateway?
- Wait 2-3 minutes (backend is starting)
- Free tier spins down after 15 min inactivity
- First request takes 30-60 seconds

---

## 📝 Important URLs to Save

```
Backend:  https://medixai-backend.onrender.com
Frontend: https://medixai-frontend.onrender.com
Health:   https://medixai-backend.onrender.com/health
```

---

## 💡 Pro Tips

1. **Free Tier Limitations**
   - Backend spins down after 15 minutes of inactivity
   - First request after inactivity takes 30-60 seconds
   - 750 hours/month free (enough for one service)

2. **Keep It Running**
   - Use [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes
   - Prevents spin-down
   - Free tier available

3. **Monitor Your App**
   - Check Render Dashboard logs regularly
   - Set up email alerts in Render
   - Monitor MongoDB Atlas metrics

4. **Upgrade When Ready**
   - Starter plan: $7/month (no spin-down)
   - Better for production use
   - Always-on service

---

## 🔄 Update Your App

To deploy updates:

```bash
# Make your changes
git add .
git commit -m "Update feature"
git push origin main

# Render automatically deploys!
```

---

## 📞 Need Help?

- **Full Guide:** See `RENDER_DEPLOYMENT_GUIDE.md`
- **Render Docs:** https://render.com/docs
- **Render Support:** https://render.com/support

---

**Congratulations! Your Med-G.AI is now live on the internet! 🎊**
