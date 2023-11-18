import React, { useEffect } from "react";
import { useLeaderBoard } from "../Contexts/LeaderBoardProvider";

const LeaderBoard = () => {
  const { topScores } = useLeaderBoard();

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {topScores.map((entry, index) => (
          <li key={index}>
            {entry.userName}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
