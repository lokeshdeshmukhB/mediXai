# 🔐 Security Checklist - Before Pushing to Git

## ✅ Pre-Push Verification

Run these commands before every `git push`:

### 1. Check if .env is ignored
```bash
git check-ignore backend/.env
```
**Expected output:** `backend/.env`

### 2. Verify no secrets in staged files
```bash
git diff --cached
```
**Action:** Review the output and ensure no API keys or secrets are visible

### 3. Check for accidentally tracked .env files
```bash
git ls-files | findstr .env
```
**Expected output:** Should only show `.env.example` or `.gitignore`, NOT `.env`

### 4. Verify .gitignore is working
```bash
git status
```
**Action:** Ensure `.env` is NOT listed in untracked or modified files

## 🚨 If You Accidentally Committed Secrets

### Step 1: Remove from Git (keep local file)
```bash
git rm --cached backend/.env
git commit -m "Remove .env from tracking"
```

### Step 2: Rotate ALL exposed credentials
- **Groq API Key:** Generate new key at https://console.groq.com/
- **MongoDB:** Rotate password in MongoDB Atlas
- **Cloudinary:** Regenerate API credentials
- **JWT Secret:** Generate new secret key

### Step 3: Update .env with new credentials
```bash
# Edit backend/.env with new values
```

### Step 4: If already pushed to remote
```bash
# Remove from Git history (CAUTION: Rewrites history)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team first!)
git push origin --force --all
```

## ✨ Best Practices

1. **Always use `.env.example`** - Template without real credentials
2. **Never hardcode secrets** - Always use `process.env.VARIABLE_NAME`
3. **Different keys per environment** - Separate dev/staging/production keys
4. **Regular key rotation** - Rotate credentials periodically
5. **Use secret scanning tools** - Consider tools like git-secrets or truffleHog
6. **Review before commit** - Always check `git diff` before committing

## 📋 Current Security Status

✅ `.env` is in `.gitignore`  
✅ `.env.example` template created  
✅ Code uses environment variables  
✅ `.env` is not tracked by Git  

## 🔗 Quick Links

- [Groq Console](https://console.groq.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Dashboard](https://cloudinary.com/console)
- [Environment Setup Guide](backend/ENVIRONMENT_SETUP.md)
