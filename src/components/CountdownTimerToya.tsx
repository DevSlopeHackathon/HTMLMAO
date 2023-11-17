import React, { useEffect } from "react";
import { useState } from "react";
import { useCountdown } from "usehooks-ts";
let minutes = 3;
export const CountdownTimer = () => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60 * minutes,
      intervalMs: 1000,
    });

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      alert("Game Over!!");
    }
  }, [count]);

  
     minutes = Math.floor(count/60);
    let seconds = count%60;


  seconds = seconds < 10 ? `0${seconds}` : seconds;
  // seconds = Number(seconds);



  // return <div>{<h1>{count}</h1>}</div>;
  return <div>{<h1>{minutes}:{seconds}</h1>}</div>;
};
