const express = require("express");

const User = require("../models/User");
const Idea = require("../models/Idea");

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
      const totalUsers = await User.countDocuments();

      // AVAILABLE IDEAS ONLY
      const totalIdeas = await Idea.countDocuments({
        sold: false,
      });

      // SOLD IDEAS
      const soldIdeas = await Idea.countDocuments({
        sold: true,
      });

      // SOLD IDEAS DATA
      const soldIdeasData = await Idea.find({
        sold: true,
      });

      // REVENUE
      const revenue = soldIdeasData.reduce(
        (total, idea) => total + idea.price,
        0
      );

      res.status(200).json({
        totalUsers,
        totalIdeas,
        soldIdeas,
        revenue,
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

      const users = await User.find().sort({
        createdAt: -1,
      });

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

      const ideas = await Idea.find().sort({
        createdAt: -1,
      });

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

      await Idea.findByIdAndDelete(req.params.id);

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
      if (req.user.id === req.params.id) {
        return res.status(400).json({
          message: "You cannot delete your own account",
        });
      }

      const userToDelete = await User.findById(
  req.params.id
);

// USER NOT FOUND
if (!userToDelete) {
  return res.status(404).json({
    message: "User not found",
  });
}

// PREVENT ADMIN DELETE
if (userToDelete.role === "ADMIN") {
  return res.status(403).json({
    message: "Admin accounts cannot be deleted",
  });
}

await User.findByIdAndDelete(req.params.id);

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