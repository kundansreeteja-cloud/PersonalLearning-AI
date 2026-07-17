const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LearnPilot API is running!");
});

app.post("/api/generate-plan", (req, res) => {
  const { topic, level, duration, goal } = req.body;

  res.json({
    planner: `Roadmap for learning ${topic} in ${duration} days.`,
    content: `Content prepared for ${level} level.`,
    quiz: [
      "Question 1",
      "Question 2"
    ],
    resources: [
      "Official Documentation",
      "YouTube"
    ],
    mentor: `Keep practicing to achieve your goal: ${goal}.`
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});