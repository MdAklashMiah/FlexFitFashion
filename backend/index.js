const express = require("express")
require('dotenv').config()
const dbConnection = require("./src/config/dbconfig")
const router = require("./src/route")
const errorHandlingMiddleware = require("./src/utils/errorhandling")
const pathNotFound = require("./src/utils/pathnotfound")
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express()
const port = process.env.PORT || 4000

// Start listening immediately to satisfy Render's port scan
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server is listening on port: ${port}`);
});

// Middlewares
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(compression());
app.use(morgan("dev"));
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.CLIENT_URL?.replace(/\/$/, ''),
            "http://localhost:3000"
        ].filter(Boolean);
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("uploads"))

// Middleware to rewrite localhost image URLs in JSON responses to production SERVER_URL
// This fixes existing database records that were created during local development
if (process.env.SERVER_URL && process.env.SERVER_URL !== 'http://localhost:4000') {
    app.use((req, res, next) => {
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (body) {
                const bodyStr = JSON.stringify(body);
                const fixed = bodyStr.replace(/http:\/\/localhost:4000/g, process.env.SERVER_URL);
                return originalJson(JSON.parse(fixed));
            }
            return originalJson(body);
        };
        next();
    });
}

// Database connection
dbConnection();

// Middleware to ensure DB is connected for every request (useful for serverless)
app.use(async (req, res, next) => {
    try {
        await dbConnection();
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});

// Router middleware
app.use(router)

// Page not found middleware
app.use(pathNotFound)

// Error handling middleware
app.use(errorHandlingMiddleware)

console.log("✅ Server initialization complete");

module.exports = app;