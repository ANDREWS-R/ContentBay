const ideaRoutes = require("./routes/ideaRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  })
  .catch((err) => {
    console.log(err);
  });