import React, { useEffect } from "react";
import { useState } from "react";

export const CountdownTimer = () => {
  const initialTime = 30;
  const [seconds, setSeconds] = useState(initialTime);
   const [timerStart, setTimerStart] = useState(false);

  useEffect(() => {
    if(timerStart){
      setInterval(() => {
        setSeconds(seconds - 1);
  
        if (seconds === 0) {
          setSeconds(initialTime);
        }
      }, 1000);
    }
  });

  return (
    <div>
      {
        <h1>{seconds}</h1>
      }
    </div>
  );
};
