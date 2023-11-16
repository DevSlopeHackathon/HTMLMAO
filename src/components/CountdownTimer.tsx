import React, { useEffect, useRef } from "react";
import Countdown from "react-countdown";
import { useState } from "react";

export const CountdownTimer = () => {
  const initialTime = 5;
  const [seconds, setSeconds] = useState(initialTime);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds - 1);

      if (seconds === 0) {
        setSeconds(initialTime);
      }
    }, 1000);
  });

  return (
    <div>
      {
        <h1>{seconds}</h1>
      }
    </div>
  );
};
