const ideaRoutes = require("./routes/ideaRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const helmet = require("helmet");

app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    message: "Too many login attempts. Try again later."
  }
});

// Apply only to authentication routes
app.use("/api/auth", authLimiter);  

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("ContentBay Backend Running");
});


// START SERVER
async function startServer() {

  try {

    const connection = await pool.getConnection();

    console.log("MySQL Connected");

    connection.release();

    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "UP",
        service: "ContentBay Backend",
        timestamp: new Date().toISOString()
      });
    });

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (error) {

    console.log(error);

  }

}

startServer();