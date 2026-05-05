const mongoose = require("mongoose");

const dbConnection = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const { DB_USERNAME, DB_PASSWORD } = process.env;
        
        // Basic validation
        if (!DB_USERNAME || !DB_PASSWORD) {
            throw new Error("Missing DB_USERNAME or DB_PASSWORD in .env");
        }

        const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.taly7jm.mongodb.net/${DB_USERNAME}?appName=Cluster0`;
        
        
        await mongoose.connect(connectionString);
        console.log(`✅ Database Connected Successfully: ${DB_USERNAME}`);
    } catch (err) {
        console.error("❌ Database Connection Fail:");
        console.error(err.message);
        throw err;
    }
}

// Optional: Monitor connection lifecycle
mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));
mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"));

module.exports = dbConnection;