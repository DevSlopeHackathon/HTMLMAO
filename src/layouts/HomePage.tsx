import React, { useEffect } from "react";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import { useLeaderBoard } from "../Contexts/LeaderBoardProvider";

export const HomePage = () => {
  const { getLeaderBoard, leaderBoard } = useLeaderBoard();
  const { setGameOn } = useTrivia();
  const navigate = useNavigate();

  useEffect(() => {
    getLeaderBoard();
  }, [leaderBoard]);

  console.log("Leaderboard data:", leaderBoard);

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
