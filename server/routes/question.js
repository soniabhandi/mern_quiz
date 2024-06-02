const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Create a new question
router.post("/", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).send(questions);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
