import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import TriviaProvider from "./Contexts/TriviaProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TriviaProvider>
      <App />
    </TriviaProvider>
  </React.StrictMode>
);
