const express = require("express");

const pool = require("../config/db");

const router = express.Router();


// CREATE IDEA
router.post("/", async (req, res) => {

  try {

    let { title, content, price, creator } = req.body;

    // REMOVE EXTRA SPACES
    title = title?.trim();
    content = content?.trim();
    creator = creator?.trim();

    // VALIDATION
    if (!title || !content || !price || !creator) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // TITLE LENGTH
    if (title.length < 5) {
      return res.status(400).json({
        message: "Title must be at least 5 characters",
      });
    }

    // CONTENT LENGTH
    if (content.length < 20) {
      return res.status(400).json({
        message:
          "Idea content must be at least 20 characters",
      });
    }

    // NEGATIVE PRICE CHECK
    if (Number(price) < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    // INVALID PRICE CHECK
    if (isNaN(price)) {
      return res.status(400).json({
        message: "Invalid price",
      });
    }

    // CREATE IDEA
    const [result] = await pool.query(
      `INSERT INTO ideas 
      (title, content, price, creator) 
      VALUES (?, ?, ?, ?)`,
      [title, content, price, creator]
    );

    // GET CREATED IDEA
    const [newIdea] = await pool.query(
      "SELECT * FROM ideas WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      message: "Idea posted successfully",
      idea: newIdea[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});


// GET ALL IDEAS
router.get("/", async (req, res) => {

  try {

    const [ideas] = await pool.query(
      `SELECT * FROM ideas 
       WHERE sold = false 
       ORDER BY created_at DESC`
    );

    res.status(200).json(ideas);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});


// GET SINGLE IDEA
router.get("/:id", async (req, res) => {

  try {

    const [ideas] = await pool.query(
      "SELECT * FROM ideas WHERE id = ?",
      [req.params.id]
    );

    if (ideas.length === 0) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    res.status(200).json(ideas[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});


// PURCHASE IDEA
router.put("/:id/purchase", async (req, res) => {

  try {

    console.log("PURCHASE ID:", req.params.id);

    // GET IDEA
    const [ideas] = await pool.query(
      "SELECT * FROM ideas WHERE id = ?",
      [req.params.id]
    );

    if (ideas.length === 0) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    const idea = ideas[0];

    // GET BUYER
    const { purchasedBy } = req.body;

    // VALIDATION
    if (!purchasedBy || !purchasedBy.trim()) {
      return res.status(400).json({
        message: "Buyer required",
      });
    }

    // PREVENT BUYING OWN IDEA
    if (idea.creator === purchasedBy) {
      return res.status(400).json({
        message: "You cannot buy your own idea",
      });
    }

    // PREVENT DOUBLE PURCHASE
    if (idea.sold) {
      return res.status(400).json({
        message: "Idea already sold",
      });
    }

    // UPDATE IDEA
    await pool.query(
      `UPDATE ideas 
       SET sold = true, purchasedBy = ?
       WHERE id = ?`,
      [purchasedBy, req.params.id]
    );

    // GET UPDATED IDEA
    const [updatedIdea] = await pool.query(
      "SELECT * FROM ideas WHERE id = ?",
      [req.params.id]
    );

    res.status(200).json({
      message: "Idea purchased successfully",
      idea: updatedIdea[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});


// GET PURCHASED IDEAS OF USER
router.get("/purchases/:username", async (req, res) => {

  try {

    const [purchasedIdeas] = await pool.query(
      `SELECT * FROM ideas 
       WHERE purchasedBy = ?
       ORDER BY created_at DESC`,
      [req.params.username]
    );

    res.status(200).json(purchasedIdeas);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});


// GET IDEAS POSTED BY USER
router.get("/creator/:username", async (req, res) => {

  try {

    const [userIdeas] = await pool.query(
      `SELECT * FROM ideas 
       WHERE creator = ?
       ORDER BY created_at DESC`,
      [req.params.username]
    );

    res.status(200).json(userIdeas);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error,
    });

  }

});

module.exports = router;