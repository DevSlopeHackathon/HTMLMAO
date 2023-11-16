import React from "react";
import { useTrivia } from "../Contexts/TriviaProvider";
import ActionBtn from "../components/ActionBtn";

export const HomePage = () => {
  const { categories, setCategory, category } = useTrivia();

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
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
        <div>Selected Category: {category}</div>
        <ActionBtn
          disabled={category === ""}
          onClick={() => {
            console.log("Continue to trivia");
          }}
          text="Continue to Trivia"
        />
      </div>
    </div>
  );
};
