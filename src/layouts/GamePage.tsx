import React, { useEffect, useState } from "react";
import { HighScore } from "../components/HighScore";
import { PlayerScore } from "../components/PlayerScore";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import { CountdownTimer } from "../components/CountdownTimer";
import { TriviaScreen } from "../components/TriviaScreen";

export const GamePage = () => {
  const { category, fetchQuestions, loading, error } = useTrivia();
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameStarted) {
      fetchQuestions(category);
    }
  }, [gameStarted, category, fetchQuestions]);

  const startGame = () => {
    setGameStarted(true);
  };

  const handlePrev = () => {
    navigate("/");
  };

  if (!gameStarted) {
    return (
      <div>
        <h2>Selected Category: {category}</h2>
        <ActionBtn onClick={startGame} text="Start Game" />
        <ActionBtn onClick={handlePrev} text="Back to Categories" />
      </div>
    );
  }

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error fetching questions: {error}</p>;

  return (
    <div>
      <CountdownTimer/>
      <HighScore />
      <PlayerScore />
      <TriviaScreen />
      <ActionBtn onClick={handlePrev} text="Back to Categories" />
    </div>
  );
};

{/* {questions[0].correctAnswer} */}

      {/* {questions[0].incorrectAnswers.map((option, index) => (
        <div key={index}>
          <p>{option}</p>
        </div>
      ))} */}
