import React from "react";
import { useTrivia } from "../Contexts/TriviaProvider";

// this will be the page where the final score is displayed aswell as leaderbaord
const FinalScore = () => {
  const { score } = useTrivia();
  return <div>{score}</div>;
};
