import React, { useState, useEffect } from "react";
import { useTrivia } from "../Contexts/TriviaProvider";
import { Question } from "../Types";

export const TriviaScreen = () => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    gameOn,
  } = useTrivia();

  const shuffleAnswerChoices = (array: string[]) => {
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

  function handleChange(answerChoice: string) {
    if (answerChoice === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    } else {
      //if answer is incorrect subtract 0.5 from score to prevent spamming
      if (score > 0) {
        setScore(score - 0.5);
      }
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  return (
    <>
      {questions[currentQuestionIndex] && (
        <div  className="text-center ">
         <h5>{questions[currentQuestionIndex].question.text}</h5>
          <p>
            {shuffleAnswerChoices(
              questions[currentQuestionIndex].incorrectAnswers.concat(
                questions[currentQuestionIndex].correctAnswer
              )
            ).map((answerChoice, id) => (
              <div key={id} className="field-row flex justify-center">
                <div
                  className="btn w-1/2"
                  key={questions[currentQuestionIndex].id}
                  
                  onClick={() => handleChange(answerChoice)}
                >
                  {answerChoice}
                  </div>
              </div>
            ))}
          </p>
        </div>
      )}
    </>
  );
};
