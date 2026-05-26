const express = require("express");

const Idea = require("../models/Idea");

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
    const newIdea = await Idea.create({
      title,
      content,
      price,
      creator,
    });

    res.status(201).json({
      message: "Idea posted successfully",
      idea: newIdea,
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

    const ideas = await Idea.find({
      sold: false,
    }).sort({ createdAt: -1 });

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

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    res.status(200).json(idea);

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
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

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
    idea.sold = true;

    idea.purchasedBy = purchasedBy;

    await idea.save();

    res.status(200).json({
      message: "Idea purchased successfully",
      idea,
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

    const purchasedIdeas = await Idea.find({
      purchasedBy: req.params.username,
    }).sort({ createdAt: -1 });

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

    const userIdeas = await Idea.find({
      creator: req.params.username,
    }).sort({ createdAt: -1 });

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