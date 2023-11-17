import React, { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";
import { useTrivia } from "../Contexts/TriviaProvider";

export const CountdownTimer = () => {
  const { gameOn, setGameOn, questions, setQuestions } = useTrivia();
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 6 * 1,
      intervalMs: 1000,
    });

  useEffect(() => {
    if (gameOn) {
      startCountdown();
    } else {
      stopCountdown();
    }
  }, [gameOn, startCountdown, stopCountdown]);

  useEffect(() => {
    if (count === 0) {
      setGameOn(false);
      setQuestions([]);
    }
  }, [count, setGameOn, setQuestions]);

  useEffect(() => {
    // Reset the timer when gameOn is switched from true to false
    if (!gameOn) {
      resetCountdown();
    }
  }, [gameOn, resetCountdown]);

  const minutes = Math.floor(count / 60);
  let seconds: number | string = count % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div>
      <h1>
        {minutes}:{seconds}
      </h1>
    </div>
  );
};
