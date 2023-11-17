import React, { useState, useEffect } from "react";
import { useTrivia } from "../Contexts/TriviaProvider";
import { Question } from "../Types";

export const TriviaScreen = () => {
  const { questions, currentQuestion, setCurrentQuestion, currentQuestionIndex,
     setCurrentQuestionIndex, score, setScore } = useTrivia();
  console.log(questions[0]);
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

  function handleChange(option) {
    if(option===questions[currentQuestionIndex].correctAnswer) {
      setScore(score+1);
    }
    

    setCurrentQuestionIndex(currentQuestionIndex+1);
     
  }


  return (
    <>
      {questions[currentQuestionIndex] && (
        <div>
          <h5>{questions[currentQuestionIndex].question.text}</h5>
          <p>
            {shuffle(
              questions[currentQuestionIndex].incorrectAnswers.concat(
                questions[currentQuestionIndex].correctAnswer
              )
            ).map((option, id) => (
              <div key={id}>
                <input
                  id="radioA"
                  type="radio"
                  key={questions[currentQuestionIndex].id}
                  value={option}
                  name={questions[currentQuestionIndex].id}
                  onClick={() => handleChange(option) }
                />
                <label htmlFor="radioA">{option}</label>
              </div>
            ))}
          </p>
        </div>
      )}
    </>
  );
};
