// Vercel Serverless Function Entry Point
// This file is used by Vercel to handle all API routes

const app = require("../backend/app");
const cloudinary = require("cloudinary");
const connectDatabase = require("../backend/config/database");

// Initialize database connection (only once per serverless instance)
let dbConnected = false;

// Initialize Cloudinary
if (process.env.CLOUDINARY_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

// Connect to database (with connection pooling for serverless)
// This will reuse connections across invocations
if (!dbConnected) {
    try {
        connectDatabase();
        dbConnected = true;
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// Export the app for Vercel serverless functions
// Vercel will automatically handle Express apps exported this way
module.exports = app;

