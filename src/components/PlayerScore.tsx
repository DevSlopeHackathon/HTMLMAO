import React, { useEffect, useRef, useState } from "react";

export const PlayerScore = () => {

  const [score, setScore] = useState(0);



  return(
    <div>
      <div>
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
}