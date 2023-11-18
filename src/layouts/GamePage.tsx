import React, { useEffect, useState } from "react";
import { PlayerScore } from "../components/PlayerScore";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import { CountdownTimer } from "../components/CountdownTimerToya";
import { TriviaScreen } from "../components/TriviaScreen";
import AddScoreToLeaderboard from "../components/AddScoreToLeaderboard";

export const GamePage = () => {
  const {
    category,
    fetchQuestions,
    loading,
    error,
    setGameOn,
    gameOn,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    setScore,
    setQuestions,
    questions,
  } = useTrivia();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameOn) {
      fetchQuestions(category);
    }
  }, [gameOn, category, fetchQuestions]);

  const handleGameStart = () => {
    setGameOn(true);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleGameEnd = () => {
    setGameOn(false);
    setQuestions([]);
  };

  const skip = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      setCurrentQuestionIndex(0);
      handleGameEnd();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    handleGameEnd();
    navigate("/categories");
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error fetching questions: {error}</p>;

  return (
    <div className="text-center ">
      <div className="title-bar">
        <h2 className="title">{category} Trivia</h2>
      </div>
      <CountdownTimer />
      <PlayerScore />
      <TriviaScreen />

      {gameOn ? (
        <>
          <ActionBtn
            onClick={() => {
              handleGameEnd();
            }}
            text="End Game"
          />
          <ActionBtn onClick={skip} text="Skip" />
        </>
      ) : (
        <>
          <AddScoreToLeaderboard />
          <div>
            <ActionBtn
              onClick={() => {
                handleGameStart();
              }}
              text="Restart Game with Same Category"
            />
            <ActionBtn
              onClick={() => {
                handlePrev();
                navigate("/categories");
              }}
              text="Back to Categories"
            />
            <ActionBtn
              onClick={() => {
                handlePrev();
                navigate("/");
              }}
              text="Back Home"
            />
          </div>
        </>
      )}
    </div>
  );
};
