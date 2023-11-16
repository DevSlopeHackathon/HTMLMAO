import { wait } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useRef, useState } from "react";

export const Fact = () => {
  const [facts, setFacts] = useState([]);

  const fetchQuestions = async () => {
    const url = `https://the-trivia-api.com/v2/questions`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const questions = await fetch(url, requestOptions);
    if (!questions.ok) {
      throw new Error("Something went wrong");
    }
    const questionsJson = await questions.json();

    setFacts(questionsJson);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      {
      facts.map((fact: any, index) => (
        <div key={index}>{fact.question.text}</div>
      ))
      }
    </div>
  );
};
