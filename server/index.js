require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const scoreRoutes = require("./routes/score");
const topicRoutes = require("./routes/topic");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',  // allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.get('/test',(req,res)=>{
  res.send('working')
})

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/topics", topicRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
