import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import TriviaProvider from "./Contexts/TriviaProvider";
import { LeaderBoardProvider } from "./Contexts/LeaderBoardProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LeaderBoardProvider>
      <TriviaProvider>
        <App />
      </TriviaProvider>
    </LeaderBoardProvider>
  </React.StrictMode>
);
