import React, { useState, useEffect } from "react";
import { useTrivia } from "../Contexts/TriviaProvider";
import { Question } from "../Types";

export const TriviaScreen = () => {
  const { questions, currentQuestion } = useTrivia();

  //Store from freeCodeCamp
  const shuffle = (array: string[]) => {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }
    return shuffled;
  };

  return (
    <>
      {currentQuestion && (
        <div>
          <h5>{currentQuestion.question.text}</h5>
          <p>
            {shuffle(
              currentQuestion.incorrectAnswers.concat(
                currentQuestion.correctAnswer
              )
            ).map((q, id) => (
              <div key={id}>
                <input
                  id="radioA"
                  type="radio"
                  key={currentQuestion.id}
                  value={q}
                />
                <label htmlFor="radioA">{q}</label>
              </div>
            ))}
          </p>
        </div>
      )}
    </>
  );
};
