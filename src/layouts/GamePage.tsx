import React, { useEffect, useRef, useState } from "react";
import { HighScore } from "../components/HighScore";
import { PlayerScore } from "../components/PlayerScore";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";

export const GamePage = () => {
  const { category, fetchQuestions, questions, loading, error } = useTrivia();
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
      <HighScore />
      <PlayerScore />
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question.text}</p>
        </div>
      ))}
      <ActionBtn onClick={handlePrev} text="Back to Categories" />
    </div>
  );
};
