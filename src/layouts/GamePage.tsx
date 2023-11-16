import React, { useEffect, useRef, useState } from "react";
import { HighScore } from "../components/HighScore";
import { PlayerScore } from "../components/PlayerScore";

export const GamePage = () => {

  return(
    <div>
      <HighScore />
      <PlayerScore />
    </div>
  );
}