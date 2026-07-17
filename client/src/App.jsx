import { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");

  const [plan, setPlan] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
  "https://learnpilot-api.onrender.com/api/generate-plan",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      level,
      duration,
      goal,
    }),
  }
);

      const data = await response.json();

      console.log(data);

      setPlan(data);

    } catch (error) {
      console.log(error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>Personalized Learning Assistant</h1>

        <p className="subtitle">
          Generate a personalized learning plan using multiple AI agents
          that work together to support your learning goals.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Learning Topic</label>
          <input
            type="text"
            placeholder="e.g. Python"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          <label>Skill Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <label>Duration (Days)</label>
          <input
            type="number"
            placeholder="30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <label>Learning Goal</label>
          <input
            type="text"
            placeholder="e.g. Crack Interviews"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />

          <button type="submit">
            Generate Learning Plan
          </button>

        </form>


        <div className="info-box">

          <h3>Multi-Agent Workflow</h3>

          <ul>
            <li>📅 Planner Agent creates your study roadmap.</li>
            <li>📚 Content Agent prepares learning material.</li>
            <li>❓ Quiz Agent generates practice questions.</li>
            <li>🔗 Resource Agent recommends useful resources.</li>
            <li>💡 Mentor Agent provides study guidance.</li>
          </ul>

        </div>


        {plan && (
          <div className="result-box">

            <h3>Your Personalized Learning Plan</h3>

            <p>
              <strong>📅 Planner Agent:</strong>
              <br />
              {plan.planner}
            </p>


            <p>
              <strong>📚 Content Agent:</strong>
              <br />
              {plan.content}
            </p>


            <p>
              <strong>❓ Quiz Agent:</strong>
            </p>

            <ul>
              {plan.quiz.map((question, index) => (
                <li key={index}>
                  {question}
                </li>
              ))}
            </ul>


            <p>
              <strong>🔗 Resource Agent:</strong>
            </p>

            <ul>
              {plan.resources.map((resource, index) => (
                <li key={index}>
                  {resource}
                </li>
              ))}
            </ul>


            <p>
              <strong>💡 Mentor Agent:</strong>
              <br />
              {plan.mentor}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;