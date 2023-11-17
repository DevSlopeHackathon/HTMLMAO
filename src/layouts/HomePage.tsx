import React from "react";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";

export const HomePage = () => {
  const { setGameOn } = useTrivia();
  const navigate = useNavigate();

  const handleGameStart = () => {
    setGameOn(true);
    navigate("/categories");
  };

  return (
    <div className="text-center">
      <h1 className="">Welcome to Our Trivia Game</h1>
      <p>Test your knowledge with our fun and challenging trivia questions.</p>
      <ActionBtn
        onClick={() => {
          handleGameStart();
        }}
        text="Start Game"
      />
    </div>
  );
};
