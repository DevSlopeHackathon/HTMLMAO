import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import ActionBtn from "../components/ActionBtn";

export const Categories = () => {
  const { categories,setCurrentQuestionIndex, setCategory, category, setGameOn, setScore } = useTrivia();
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
  };

  const handleContinue = () => {
    if (category) {
      setGameOn(true);
      setScore(0);
      setCurrentQuestionIndex(0);
      navigate("/gamePage");
    }
  };

  return (
    <div className="text-center ">
      <div className="title-bar">
        <p className="title">
          Selected Category: {category ? category : "please select a category"}
        </p>
      </div>
      <div className="category-container ">
        {categories.map((cat) => (
          <div
            key={cat}
            className="btn "
            onClick={() => handleCategoryClick(cat)}
            role="button"
            tabIndex={0}
          >
            {cat}
          </div>
        ))}
      </div>

      <div>
        <ActionBtn
          disabled={category === ""}
          onClick={handleContinue}
          text="Start Game"
        />
      </div>
    </div>
  );
};
