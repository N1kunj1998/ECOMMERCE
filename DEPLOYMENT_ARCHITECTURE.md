# Deployment Architecture Guide

## 🏗️ Deployment Options

You have **two main options** for deploying your e-commerce application:

---

## Option 1: Single Vercel Project (Both Frontend + Backend) ✅ Recommended for Simplicity

### Architecture
```
Single Vercel Project
├── Frontend (Static Files) → Served from /frontend/build
└── Backend (Serverless Functions) → Handled by /api/index.js
```

### How It Works
- **Frontend**: Built React app served as static files
- **Backend**: Express app converted to Vercel serverless functions
- **Routing**: 
  - `/api/v1/*` → Backend serverless function
  - `/*` → Frontend React app

### Pros
- ✅ Single deployment
- ✅ No CORS issues (same domain)
- ✅ Easier to manage
- ✅ Free tier covers both
- ✅ Automatic HTTPS

### Cons
- ⚠️ Backend must be serverless-compatible
- ⚠️ Cold starts for serverless functions
- ⚠️ 10-second timeout on free tier (30s on Pro)
- ⚠️ Database connections need pooling

### Setup
The project is already configured for this option:
- `api/index.js` - Serverless entry point
- `vercel.json` - Routing configuration
- Frontend build outputs to `frontend/build`

---

## Option 2: Separate Deployments (Recommended for Production)

### Architecture
```
Frontend (Vercel)
└── API calls → Backend (Separate Service)
    ├── Railway
    ├── Render
    ├── AWS/Google Cloud
    └── Or another Vercel project
```

### How It Works
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on a platform that supports long-running processes
- **Communication**: Frontend makes API calls to backend URL

### Pros
- ✅ Backend can run as traditional server
- ✅ No serverless limitations
- ✅ Better for WebSocket connections
- ✅ More control over backend infrastructure
- ✅ Can handle long-running processes

### Cons
- ⚠️ Need to manage CORS
- ⚠️ Two separate deployments
- ⚠️ Two separate services to manage
- ⚠️ May incur additional costs

### Setup Steps

#### Frontend on Vercel
1. Deploy only frontend folder
2. Set environment variable: `VITE_API_URL=https://your-backend-url.com`

#### Backend on Railway/Render
1. Deploy backend folder
2. Set all environment variables
3. Update frontend API URL

---

## 🔧 Current Configuration (Option 1)

### File Structure
```
ECOMMERCE/
├── api/
│   └── index.js          # Serverless function entry point
├── backend/              # Backend code
│   ├── app.js            # Express app (exported)
│   ├── server.js         # Local dev server (not used on Vercel)
│   └── ...
├── frontend/             # Frontend code
│   └── build/            # Built static files
├── vercel.json           # Vercel configuration
└── package.json
```

### How Requests Are Handled

1. **API Requests** (`/api/v1/*`)
   ```
   Request → Vercel → api/index.js → backend/app.js → Routes
   ```

2. **Frontend Routes** (`/*`)
   ```
   Request → Vercel → frontend/build/index.html → React Router
   ```

### Important Notes

1. **Database Connections**
   - Use connection pooling for MongoDB
   - Reuse connections across invocations
   - Consider MongoDB Atlas connection pooling

2. **Environment Variables**
   - Set all variables in Vercel Dashboard
   - Both frontend and backend use same environment

3. **File Uploads**
   - Cloudinary handles image uploads
   - No file system storage on serverless

4. **Session/Cookies**
   - Cookies work across same domain
   - Set proper cookie domain in production

---

## 🚀 Deployment Steps for Option 1 (Current Setup)

### 1. Prepare for Deployment

```bash
# Build frontend
cd frontend
npm run build
cd ..
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from ECOMMERCE directory)
vercel

# For production
vercel --prod
```

### 3. Set Environment Variables in Vercel Dashboard

Go to: Project Settings → Environment Variables

Add all variables from `backend/config/config.env`:
- `DB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `COOKIE_EXPIRE`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SERVICE`
- `SMTP_MAIL`
- `SMTP_PASSWORD`
- `STRIPE_SECRET_KEY`
- `STRIPE_API_KEY`
- `FRONTEND_URL` (your Vercel domain)

### 4. Update Frontend URL

After deployment, update `FRONTEND_URL` to your Vercel domain:
```
https://your-project.vercel.app
```

---

## 🔄 Switching to Option 2 (Separate Deployments)

If you want to deploy backend separately:

### Step 1: Deploy Backend to Railway/Render

1. **Railway** (Recommended)
   - Connect GitHub repo
   - Select `backend` folder
   - Set environment variables
   - Deploy

2. **Render**
   - Create new Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

### Step 2: Update Frontend

1. Update API base URL in frontend
2. Add CORS configuration in backend
3. Deploy frontend to Vercel

### Step 3: Update Backend CORS

In `backend/app.js`, update CORS:
```javascript
res.header("Access-Control-Allow-Origin", "https://your-frontend.vercel.app");
```

---

## 📊 Comparison

| Feature | Option 1 (Single Vercel) | Option 2 (Separate) |
|---------|-------------------------|---------------------|
| Setup Complexity | ⭐⭐ Simple | ⭐⭐⭐ Moderate |
| Cost | Free tier available | May cost more |
| CORS Issues | None | Need configuration |
| Cold Starts | Yes (serverless) | No (always on) |
| Long Processes | Limited (30s timeout) | Unlimited |
| WebSockets | Limited | Full support |
| Database Connections | Need pooling | Standard |
| Deployment | Single | Two separate |

---

## 🎯 Recommendation

### For Development/Testing
✅ **Use Option 1** (Single Vercel Project)
- Simpler setup
- Free tier sufficient
- Easy to manage

### For Production (High Traffic)
✅ **Use Option 2** (Separate Deployments)
- Better performance
- No cold starts
- More control
- Better for scaling

---

## 🔍 Troubleshooting

### Issue: API Routes Not Working
- Check `vercel.json` routing
- Verify `api/index.js` exists
- Check function logs in Vercel dashboard

### Issue: Database Connection Errors
- Use MongoDB Atlas (not local)
- Enable connection pooling
- Check IP whitelist in Atlas

### Issue: Frontend Can't Reach Backend
- Verify API routes start with `/api/v1`
- Check CORS configuration
- Verify environment variables

### Issue: Build Fails
- Check Node.js version (24.x)
- Verify all dependencies installed
- Check build logs

---

## 📝 Next Steps

1. **Current Setup**: Already configured for Option 1
2. **Deploy**: Follow steps in "Deployment Steps for Option 1"
3. **Test**: Verify API and frontend work
4. **Monitor**: Check Vercel function logs
5. **Optimize**: Add connection pooling if needed

---

**Last Updated:** January 2025

