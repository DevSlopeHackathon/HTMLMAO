import React, { useEffect, useRef, useState } from "react";
import { useTrivia } from "../Contexts/TriviaProvider";

export const PlayerScore = () => {

  const { score } = useTrivia();



  return(
    <div>
      <div>
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
}