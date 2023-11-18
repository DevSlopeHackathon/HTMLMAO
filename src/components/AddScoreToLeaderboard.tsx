import React, { useState } from "react";
import { useLeaderBoard } from "../Contexts/LeaderBoardProvider";
import { useTrivia } from "../Contexts/TriviaProvider";
import LeaderBoard from "./LeaderBoard";

const AddScoreToLeaderboard = () => {
  const { topScores, handlePostScore } = useLeaderBoard();
  const { score } = useTrivia();
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false); // New state to track if the score has been submitted

  const handleNameChange = (event) => {
    setName(event.target.value.slice(0, 3));
  };

  const handleSubmit = async () => {
    await handlePostScore(name, score);
    setSubmitted(true); // Set submitted to true after score is posted
  };

  return (
    <div>
      {!submitted && topScores[topScores.length - 1]?.score < score && (
        <div>
          <div>You got in the top 10! Enter your name:</div>
          <input
            className="mx-2"
            type="text"
            placeholder="abc"
            maxLength={3}
            value={name}
            onChange={handleNameChange}
          />
          <button
            className="btn !bg-black !p-0 !m-0 !text-white"
            onClick={handleSubmit}
          >
            Post Score
          </button>
        </div>
      )}

      {submitted && (
        <div>
          <p>Thank you for submitting your score!</p>
        </div>
      )}

      <LeaderBoard />
    </div>
  );
};

export default AddScoreToLeaderboard;
