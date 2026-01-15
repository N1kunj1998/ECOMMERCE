# Quick Setup Guide

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] Git installed

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
# Note: The .npmrc file is configured to handle peer dependency conflicts
cd frontend
npm install
cd ..
```

**If you encounter peer dependency errors**, the `.npmrc` file in the frontend directory is already configured to use `--legacy-peer-deps` automatically. If issues persist, you can manually run:
```bash
cd frontend
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

```bash
# Copy the example config file
cp backend/config/config.env.example backend/config/config.env

# Edit the config.env file with your credentials
# Use your preferred text editor (nano, vim, VS Code, etc.)
```

**Minimum Required Configuration:**

For basic functionality, you need at least:
- `PORT=4000`
- `DB_URI` (MongoDB connection string)
- `JWT_SECRET` (any random string)
- `JWT_EXPIRE=7d`
- `COOKIE_EXPIRE=5`

**Optional but Recommended:**
- Cloudinary (for image uploads)
- Stripe (for payments)
- SMTP (for email notifications)

### 3. Start MongoDB

**Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - Start MongoDB service from Services panel
```

**MongoDB Atlas:**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and add to `DB_URI`

### 4. Run the Application

**Development Mode (Recommended for first run):**

Terminal 1 - Start Backend:
```bash
npm run dev
```

Terminal 2 - Start Frontend:
```bash
cd frontend
npm start
```

The app will open at http://localhost:3000

### 5. Create Your First Admin User

After starting the application:

1. Register a regular user at `/login`
2. Connect to MongoDB and update the user role:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
   
   Or use MongoDB Compass/GUI to manually change the role field to "admin"

## Troubleshooting

### Port Already in Use
- Change `PORT` in `config.env` to a different port (e.g., 4001)
- Update `proxy` in `frontend/package.json` if needed

### MongoDB Connection Failed
- Verify MongoDB is running: `mongosh` or `mongo`
- Check `DB_URI` format in `config.env`
- For Atlas: Ensure IP whitelist includes your IP (0.0.0.0/0 for development)

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm install
cd frontend && npm install && cd ..
```

### Frontend Build Errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## Next Steps

1. **Add Products**: Login as admin and add products via `/admin/product`
2. **Test Shopping Cart**: Add products to cart and test checkout
3. **Configure Payments**: Add Stripe keys for payment processing
4. **Configure Email**: Add SMTP credentials for password reset emails

## Production Deployment

1. Build frontend: `cd frontend && npm run build`
2. Set `NODE_ENV=PRODUCTION` in environment
3. Use a process manager like PM2: `pm2 start backend/server.js`
4. Configure reverse proxy (nginx) if needed

