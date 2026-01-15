# Vercel Deployment Guide

## ✅ Node.js Version Update

The project has been updated to use **Node.js 24.x** as required by Vercel.

## 📋 Configuration Files Updated

### 1. Root `package.json`
Added `engines` field:
```json
"engines": {
  "node": "24.x"
}
```

### 2. Frontend `package.json`
Added `engines` field for consistency.

### 3. `.nvmrc` file
Created to specify Node.js 24 for local development.

### 4. `vercel.json`
Updated with:
- Node.js 24 configuration
- Proper routing for API and frontend
- Build configuration

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Import your Git repository

2. **Configure Project Settings**
   - **Framework Preset:** Other
   - **Root Directory:** `ECOMMERCE` (or leave blank if deploying from root)
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `frontend/build`
   - **Install Command:** `npm install`

3. **Set Environment Variables**
   Go to Project Settings → Environment Variables and add:
   ```
   NODE_VERSION=24
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=5
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SERVICE=gmail
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_API_KEY=your_stripe_publishable_key
   FRONTEND_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd ECOMMERCE
vercel

# For production deployment
vercel --prod
```

## 🔧 Vercel Configuration Details

### Project Structure
```
ECOMMERCE/
├── backend/          # API server
├── frontend/         # React app
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```

### Routing
- **API Routes:** `/api/*` → `./backend/server.js`
- **Frontend Routes:** `/*` → `./frontend/build/index.html`

### Build Process
1. Install dependencies (root and frontend)
2. Build frontend: `npm run build --prefix frontend`
3. Deploy backend as serverless function
4. Serve frontend static files

## ⚠️ Important Notes

### Environment Variables
- All environment variables must be set in Vercel Dashboard
- Never commit `.env` files to Git
- Use Vercel's environment variable management

### Database Connection
- Use MongoDB Atlas (cloud) for production
- Local MongoDB won't work on Vercel
- Ensure MongoDB Atlas allows connections from Vercel IPs (0.0.0.0/0 for development)

### File Uploads
- Cloudinary is configured for image uploads
- Ensure Cloudinary credentials are set in environment variables

### CORS Configuration
- Frontend URL should be set in `FRONTEND_URL` environment variable
- Backend CORS is configured to allow the frontend domain

## 🐛 Troubleshooting

### Build Fails
1. Check Node.js version is set to 24.x
2. Verify all environment variables are set
3. Check build logs in Vercel dashboard
4. Ensure MongoDB Atlas connection string is correct

### API Routes Not Working
1. Verify routing in `vercel.json`
2. Check that backend server is properly configured
3. Ensure API routes start with `/api/`

### Frontend Not Loading
1. Verify `frontend/build` directory exists
2. Check build command in `package.json`
3. Ensure output directory is correct in Vercel settings

### Environment Variables Not Working
1. Redeploy after adding environment variables
2. Check variable names match exactly (case-sensitive)
3. Verify no typos in variable names

## 📝 Pre-Deployment Checklist

- [ ] Node.js version set to 24.x in `package.json`
- [ ] All environment variables configured in Vercel
- [ ] MongoDB Atlas connection string is valid
- [ ] Frontend build completes successfully locally
- [ ] Backend server starts without errors
- [ ] Cloudinary credentials are set
- [ ] Stripe keys are configured (if using payments)
- [ ] SMTP credentials are set (if using email)
- [ ] `FRONTEND_URL` matches your Vercel domain

## 🔄 Updating Deployment

After making changes:

```bash
# Commit and push to Git
git add .
git commit -m "Update deployment configuration"
git push

# Vercel will automatically redeploy
# Or manually trigger:
vercel --prod
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Version on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Last Updated:** January 2025

