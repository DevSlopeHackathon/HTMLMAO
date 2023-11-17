import React, { useState } from "react";
import { useTrivia } from "../Contexts/TriviaProvider";
import { Question } from "../Types";

export const TriviaScreen = () => {
  const { questions } = useTrivia();

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

  function getQuestion() {
    if (questions.length !== 0) {
      i = questions.pop();
    }
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h5>{question.question.text}</h5>
          <p>
            {shuffle(
              question.incorrectAnswers.concat(question.correctAnswer)
            ).map((q, id) => (
              <div key={id}>
                <input id="radioB" name={index + ""} type="radio" value={q} />
                <label htmlFor="radioB">{q}</label>
              </div>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};
