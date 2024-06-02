const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
});

module.exports = mongoose.model("question", questionSchema);
