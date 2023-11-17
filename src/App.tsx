import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./layouts/HomePage";
import { Categories } from "./layouts/Categories";
import { GamePage } from "./layouts/GamePage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/gamePage" element={<GamePage />} />
      </Routes>
    </Router>
  );
};
