# Session Timeout Configuration Changes

## Changes Made

### 1. Frontend Session Timeout (AuthContext.js)
**Location:** `frontend/src/context/AuthContext.js`

#### Changed:
- **Inactivity timeout:** 5 minutes → **1 hour**
- **Warning before logout:** 1 minute → **5 minutes**

#### What This Means:
- Users will now be automatically logged out after **1 hour of inactivity**
- A warning will appear **5 minutes before** the automatic logout
- The timer resets whenever the user interacts with the page (mouse, keyboard, scroll, touch, click)

### 2. Auto-Login Prevention
**Location:** `frontend/src/context/AuthContext.js`

#### Changed:
- Added session expiration check on page load
- If the last activity was more than 1 hour ago, the user is logged out
- Users must now sign in again when opening the website if their session expired

#### What This Means:
- When you open the website, if more than 1 hour has passed since your last activity, you'll need to sign in again
- The website will no longer automatically log you in with an expired session

### 3. Backend JWT Token Expiration
**Location:** `backend/.env` (JWT_EXPIRE variable)

#### Current Setting:
- JWT tokens expire after **7 days**
- This is the maximum lifetime of a token, regardless of activity

#### Note:
- The JWT token expiration (7 days) is separate from the frontend inactivity timeout (1 hour)
- The frontend inactivity timeout is more restrictive and will log users out first
- If you want to change the JWT token expiration, update the `JWT_EXPIRE` value in your `.env` file

## How It Works Now

1. **User logs in:** Session starts, timer begins
2. **User is active:** Timer resets with each interaction
3. **User is inactive for 55 minutes:** Warning appears
4. **User is inactive for 1 hour:** Automatic logout
5. **User closes browser and returns after 1+ hour:** Must sign in again
6. **User closes browser and returns within 1 hour:** Session restored, timer continues

## Configuration

If you need to adjust the timeout duration in the future:

### Frontend (Inactivity Timeout)
Edit `frontend/src/context/AuthContext.js`:
```javascript
const TIMEOUT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const WARNING_DURATION = 5 * 60 * 1000; // 5 minutes warning
```

### Backend (JWT Token Expiration)
Edit `backend/.env`:
```env
JWT_EXPIRE=1h  # For 1 hour
JWT_EXPIRE=7d  # For 7 days (current setting)
JWT_EXPIRE=30d # For 30 days
```

## Testing the Changes

1. **Test Inactivity Timeout:**
   - Log in to the application
   - Wait 1 hour without any interaction
   - You should be logged out automatically

2. **Test Session Expiration:**
   - Log in to the application
   - Close the browser
   - Wait more than 1 hour
   - Open the browser and navigate to the site
   - You should be redirected to the login page

3. **Test Session Persistence:**
   - Log in to the application
   - Close the browser
   - Open the browser within 1 hour
   - Navigate to the site
   - You should still be logged in

## Security Benefits

- **Reduced risk of unauthorized access:** Sessions expire after inactivity
- **Better session management:** Old sessions are automatically cleaned up
- **User awareness:** Warning before logout gives users a chance to save work
