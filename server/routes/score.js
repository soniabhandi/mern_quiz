const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

// Create a new score
router.post("/", async (req, res) => {
  try {
    const newScore = new Score(req.body);
    await newScore.save();
    res.status(201).send(newScore);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get scores for a user
router.get("/:userId", async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.params.userId });
    res.status(200).send(scores);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
