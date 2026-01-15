# E-Commerce Application

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with features like user authentication, product management, shopping cart, order processing, payment integration (Stripe), and admin dashboard.

## 🚀 Features

- **User Authentication**: Registration, login, password reset via email
- **Product Management**: Browse products, search, filter, view details
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, track order status
- **Payment Integration**: Stripe payment gateway
- **Admin Dashboard**: Manage products, orders, users, and reviews
- **Image Upload**: Cloudinary integration for product images
- **Email Notifications**: Nodemailer for password reset and order confirmations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Ecommerce-app-old/ECOMMERCE
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in `backend/config/` directory:

```bash
cp backend/config/config.env.example backend/config/config.env
```

Edit `backend/config/config.env` and fill in your configuration:

```env
# Server Configuration
PORT=4000
NODE_ENV=DEVELOPMENT

# Database Configuration
DB_URI=mongodb://localhost:27017/ecommerce
# OR use MongoDB Atlas:
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d
COOKIE_EXPIRE=5

# Cloudinary Configuration (for image uploads)
# Sign up at https://cloudinary.com/
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# SMTP Configuration (for email sending)
# For Gmail, you'll need to generate an App Password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here

# Stripe Configuration (for payments)
# Sign up at https://stripe.com/
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_API_KEY=pk_test_your_stripe_publishable_key

# Frontend URL (optional, for password reset links)
FRONTEND_URL=http://localhost:3000
```

### 5. Start MongoDB

**Local MongoDB:**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

**MongoDB Atlas:**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `DB_URI` in `config.env`

### 6. Run the Application

**Development Mode:**

Terminal 1 - Backend:
```bash
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

**Production Mode:**

Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

Start the server:
```bash
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## 📁 Project Structure

```
ECOMMERCE/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── config.env.example
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── catchAsyncError.js
│   │   └── error.js
│   ├── models/
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── orderRoute.js
│   │   ├── paymentRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── utils/
│   │   ├── apiFeatures.js
│   │   ├── errorHandler.js
│   │   ├── jwtToken.js
│   │   └── sendEmail.js
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── actions/
│   │   ├── component/
│   │   ├── constants/
│   │   ├── reducers/
│   │   └── store.js
│   └── package.json
└── package.json
```

## 🔑 Getting API Keys

### Cloudinary (Image Upload)
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### Stripe (Payments)
1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers > API Keys
3. Copy your Publishable Key and Secret Key (use test keys for development)

### Gmail App Password (Email)
1. Enable 2-Step Verification on your Google Account
2. Go to Google Account > Security > App Passwords
3. Generate an app password for "Mail"
4. Use this password in `SMTP_PASSWORD`

## 🧪 Testing the Application

1. **Register a new user** at `/login`
2. **Create an admin user** (you'll need to manually update the user role in MongoDB or add an admin registration endpoint)
3. **Add products** through the admin dashboard
4. **Test the shopping cart** and checkout process
5. **Test payment** using Stripe test card: `4242 4242 4242 4242`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your `DB_URI` connection string
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Change `PORT` in `config.env` to a different port
- Update frontend proxy in `frontend/package.json` if needed

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Email Not Sending
- Verify SMTP credentials
- For Gmail, ensure you're using an App Password, not your regular password
- Check firewall settings

## 📝 Notes

- The frontend build folder is included but should be regenerated for production
- Make sure to never commit `config.env` file (it's in `.gitignore`)
- Use test API keys during development
- The application uses JWT tokens stored in HTTP-only cookies for security

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

