import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import ActionBtn from "../components/ActionBtn";

export const HomePage = () => {
  const { categories, setCategory, category } = useTrivia();
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
  };

  const handleContinue = () => {
    console.log("Continue to trivia");
    if (category) {
      navigate("/gamePage");
    }
  };

  return (
    <div>
      <div className="category-container">
        {categories.map((cat) => (
          <div
            key={cat}
            className="categories"
            onClick={() => handleCategoryClick(cat)}
            role="button"
            tabIndex={0}
          >
            {cat}
          </div>
        ))}
      </div>

      <div>
        <div>
          Selected Category: {category ? category : "please select a category"}
        </div>
        <ActionBtn
          disabled={category === ""}
          onClick={handleContinue}
          text="Continue to Trivia"
        />
      </div>
    </div>
  );
};
