import React, { useEffect, useState } from "react";
import { HighScore } from "../components/HighScore";
import { PlayerScore } from "../components/PlayerScore";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import { CountdownTimer } from "../components/CountdownTimerToya";
import { TriviaScreen } from "../components/TriviaScreen";

export const GamePage = () => {
  const { category, fetchQuestions,
     loading, error, setGameOn, gameOn, 
     setCurrentQuestionIndex, currentQuestionIndex,
    setScore, setQuestions, questions } =
    useTrivia();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameOn) {
      fetchQuestions(category);
    }
  }, [gameOn, category, fetchQuestions]);

  const handleGameStart = () => {
    setGameOn(true);
  };

  const handleGameEnd = () => {
    setGameOn(false);
    setScore(0);
    setQuestions([]);
  };

  const skip = () => {
    if(currentQuestionIndex>=questions.length-1){
      console.log("I'm in here")
      handleGameEnd();
    }
    else{
      setCurrentQuestionIndex(currentQuestionIndex+1);
    }
  };

  const handlePrev = () => {
    handleGameEnd();
    navigate("/");
  };


  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error fetching questions: {error}</p>;

  return (
    <div>
       <h2>Selected Category: {category}</h2>
      <CountdownTimer />
      {/* <HighScore /> */}
      <PlayerScore />
      <TriviaScreen />
      <ActionBtn
          onClick={() => {
            handleGameStart();
          }}
          text="Start Game"
        />
      <ActionBtn
        onClick={() => {
          handleGameEnd();
        }}
        text="End Game"
      />
      <ActionBtn onClick={skip} text="Skip" />
      <ActionBtn onClick={handlePrev} text="Back to Categories" />
      
    </div>
  );
};

{
  /* {questions[0].correctAnswer} */
}

{
  /* {questions[0].incorrectAnswers.map((option, index) => (
        <div key={index}>
          <p>{option}</p>
        </div>
      ))} */
}
