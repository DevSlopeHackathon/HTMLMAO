import React, { useEffect, useRef, useState } from "react";

export const HighScore = () => {

  const [score, setScore] = useState(0);



  return(
    <div>
      <div>
        <h1>Leaderboard: {score}</h1>
      </div>
    </div>
  );
}