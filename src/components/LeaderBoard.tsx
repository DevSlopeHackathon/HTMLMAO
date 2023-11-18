import React, { useEffect } from "react";
import { useLeaderBoard } from "../Contexts/LeaderBoardProvider";

const LeaderBoard = () => {
  const { leaderBoard, updateLeaderBoard } = useLeaderBoard();
  console.log("Leaderboard data:", leaderBoard);

  useEffect(() => {
    getLeaderBoard();
  }, []);

  const getLeaderBoard = async () => {
    try {
      console.log("Leaderboard data:", leaderBoard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderBoard.map((entry, index) => (
          <li key={index}>
            {entry.userId}: {entry.score}
            here
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
