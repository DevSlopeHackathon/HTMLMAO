import React, { useEffect, useState } from "react";
import { HighScore } from "../components/HighScore";
import { PlayerScore } from "../components/PlayerScore";
import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import { CountdownTimer } from "../components/CountdownTimerToya";
import { TriviaScreen } from "../components/TriviaScreen";
import { useLeaderBoard } from "../Contexts/LeaderBoardProvider";
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
    score,
    setQuestions,
    questions,
    goBackSound,
    confirmSound,
    startGameSound,
    mouseClickSound,
    gameOverSound,
  } = useTrivia();
  const navigate = useNavigate();

  const { topScores } = useLeaderBoard();

  useEffect(() => {
    if (gameOn) {
      fetchQuestions(category);
    }
  }, [gameOn, category, fetchQuestions]);

  const handleGameStart = () => {
    setGameOn(true);
    setScore(0);
    startGameSound.play();
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
    mouseClickSound.play();
  };

  const handlePrev = () => {
    handleGameEnd();
    navigate("/categories");
    goBackSound.play();
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error fetching questions: {error}</p>;

  return (
    <div className='text-center'>
      <div className='title-bar'>
        <h2 className='title'>{category} Trivia</h2>
      </div>
      <CountdownTimer />
      <PlayerScore />
      <TriviaScreen />

      {gameOn ? (
        <>
          <ActionBtn
            onClick={() => {
              handleGameEnd();
              gameOverSound.play();
            }}
            text='End Game'
          />
          <ActionBtn onClick={skip} text='Skip' />
        </>
      ) : (
        <div>
          <AddScoreToLeaderboard />
          <div>
            <ActionBtn
              onClick={() => {
                handleGameStart();
              }}
              text='Restart Game with Same Category'
            />
            <ActionBtn
              onClick={() => {
                handlePrev();
                navigate("/categories");
              }}
              text='Back to Categories'
            />
            <ActionBtn
              onClick={() => {
                handlePrev();
                navigate("/");
              }}
              text='Back Home'
            />
          </div>
        </div>
      )}
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
