import React from "react";
import "./App.css";
import { CountdownTimer } from "./components/CountdownTimer";
import { PlayerScore } from "./components/PlayerScore";
import { HighScore } from "./components/HighScore";
import { Fact } from "./components/Fact";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./layouts/HomePage";
import { GamePage } from "./layouts/GamePage";

export const App = () => {
  return (
    <>
      <HomePage />
      <GamePage />
    </>
  );
};
