const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Topic = require("../models/Topic");

router.post("/select", async (req, res) => {
  try {
    const { userId, topics } = req.body;

    // Validate request body
    if (!userId || !topics || !Array.isArray(topics)) {
      return res.status(400).send("Invalid request data");
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const topicDocs = await Topic.find({ name: { $in: topics } });
    if (topicDocs.length !== topics.length) {
      return res.status(400).send("One or more topics not found");
    }

    user.selectedTopics = topicDocs.map((topic) => topic._id);
    await user.save();

    // Optionally update each topic to include the user in the selectedBy field
    for (const topic of topicDocs) {
      if (!topic.selectedBy.includes(user._id)) {
        topic.selectedBy.push(user._id);
        await topic.save();
      }
    }

    res.status(200).send("Topics selected successfully");
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
