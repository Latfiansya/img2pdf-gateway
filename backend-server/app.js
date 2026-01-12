require("dotenv").config();
// Import express
const express = require("express");
// Inisialisasi express app
const app = express();
// Import routes and middlewares
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const adminRoutes = require("./routes/adminRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const logger = require("./utils/logger");
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ message: "Internal error" });
});

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

app.use(express.json());
// Test route
app.get("/", (req, res) => {
    res.send("IMG2PDF Gateway API is running");
});
// Global error handler
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ message: "Internal error" });
});

app.use("/auth", authRoutes);
app.use("/api/v1", apiRoutes);
app.use("/admin", adminRoutes);
app.use("/api/v1/convert-pdf", rateLimiter);
// Admin routes
app.use("/api/v1/admin", require("./routes/adminRoutes"));



module.exports = app;
