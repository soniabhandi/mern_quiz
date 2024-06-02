const mongoose = require("mongoose");

// Define the schema
const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    selectedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
