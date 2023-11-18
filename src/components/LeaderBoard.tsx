import React, { useEffect } from "react";
import { useLeaderBoard } from "../Contexts/LeaderBoardProvider";

const LeaderBoard = () => {
  const { topScores } = useLeaderBoard();

  return (
    <div className="m-auto border border-black w-min ">
      <h1 className="border border-black !text---red">Leaderboard</h1>
      <ul>
        {topScores.map((entry, index) => (
          <li className="border border-b-black" key={index}>
            {entry.userName}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
