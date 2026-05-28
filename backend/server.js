const ideaRoutes = require("./routes/ideaRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");

const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


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

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (error) {

    console.log(error);

  }

}

startServer();