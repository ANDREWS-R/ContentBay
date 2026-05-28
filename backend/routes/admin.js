const express = require("express");

const pool = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ================================
// ADMIN DASHBOARD STATS
// ================================
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      // TOTAL USERS
      const [usersCount] = await pool.query(
        "SELECT COUNT(*) AS totalUsers FROM users"
      );

      // AVAILABLE IDEAS
      const [ideasCount] = await pool.query(
        "SELECT COUNT(*) AS totalIdeas FROM ideas WHERE sold = false"
      );

      // SOLD IDEAS
      const [soldIdeasCount] = await pool.query(
        "SELECT COUNT(*) AS soldIdeas FROM ideas WHERE sold = true"
      );

      // TOTAL REVENUE
      const [revenueData] = await pool.query(
        "SELECT SUM(price) AS revenue FROM ideas WHERE sold = true"
      );

      res.status(200).json({
        totalUsers: usersCount[0].totalUsers,
        totalIdeas: ideasCount[0].totalIdeas,
        soldIdeas: soldIdeasCount[0].soldIdeas,
        revenue: revenueData[0].revenue || 0,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

  }
);


// ================================
// GET ALL USERS
// ================================
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const [users] = await pool.query(
        "SELECT * FROM users ORDER BY created_at DESC"
      );

      res.status(200).json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

  }
);


// ================================
// GET ALL IDEAS
// ================================
router.get(
  "/ideas",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const [ideas] = await pool.query(
        "SELECT * FROM ideas ORDER BY created_at DESC"
      );

      res.status(200).json(ideas);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

  }
);


// ================================
// DELETE IDEA
// ================================
router.delete(
  "/idea/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      await pool.query(
        "DELETE FROM ideas WHERE id = ?",
        [req.params.id]
      );

      res.status(200).json({
        message: "Idea deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

  }
);


// ================================
// DELETE USER
// ================================
router.delete(
  "/user/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      // PREVENT SELF DELETE
      if (String(req.user.id) === String(req.params.id)) {
        return res.status(400).json({
          message: "You cannot delete your own account",
        });
      }

      // FIND USER
      const [users] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [req.params.id]
      );

      // USER NOT FOUND
      if (users.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userToDelete = users[0];

      // PREVENT ADMIN DELETE
      if (userToDelete.role === "ADMIN") {
        return res.status(403).json({
          message: "Admin accounts cannot be deleted",
        });
      }

      // DELETE USER
      await pool.query(
        "DELETE FROM users WHERE id = ?",
        [req.params.id]
      );

      res.status(200).json({
        message: "User deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

  }
);

module.exports = router;