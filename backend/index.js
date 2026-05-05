const express = require("express")
require('dotenv').config()
const dbConnection = require("./src/config/dbconfig")
const router = require("./src/route")
const errorHandlingMiddleware = require("./src/utils/errorhandling")
const pathNotFound = require("./src/utils/pathnotfound")
const cors = require("cors");
const app = express()
const port = process.env.PORT || 4000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("uploads"))

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

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is Running Port: ${port}`)
    })
}

module.exports = app;