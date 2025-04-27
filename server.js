const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS options
const corOptions = {
  origin: "http://localhost:8081", // frontend URL (must match your frontend port)
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
app.use(cors(corOptions)); // Enable CORS with options
app.use(express.json()); // Built-in middleware to handle JSON requests
app.use(express.urlencoded({ extended: true })); // Handle URL encoded requests
app.use(bodyParser.json()); // Optional, since express.json() also handles JSON (but harmless to leave)
app.use(fileUpload()); // Enable file uploads

// Sequelize DB connection
const db = require("./models"); // Import your models

// Test DB connection
db.sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection failed:", err));

// Optional DB sync (for development only, do not use in production without migrations)
db.sequelize.sync({ force: false, alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Sync failed:", err));

// Routes
// Import and use your routers
app.use("/auth", require("./routes/authRouter")); // Authentication routes (signup/login)
app.use("/api/users", require("./routes/userRouter")); // User profile and role management
app.use("/api/startups", require("./routes/startupRouter")); // Startup routes (add, update, delete startups)
app.use("/api/investors", require("./routes/investorRouter")); // Investor routes (create, get, update investors) // Added this line

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PitchPal API 🚀" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
