import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { Requests } from "../api";
import { Question } from "../Types";

type TriviaContextType = {
  currentQuestion: Question | null;
  categories: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  questions: Question[];
  fetchQuestions: (category: string) => Promise<void>;
  loading: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  gameStarted: boolean;
  error: string | null;
};

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

const TriviaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Cache for questions
  const questionCache = useRef(new Map<string, Question[]>()).current;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetch(
          "https://the-trivia-api.com/v2/categories"
        );
        const categories = await categoriesData.json();
        const categoryNames = Object.keys(categories);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchQuestions = async (category: string) => {
    if (questionCache.has(category)) {
      setQuestions(questionCache.get(category)!);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await Requests.fetchQuestionsByCategory(
        category
      );
      questionCache.set(category, fetchedQuestions);
      setQuestions(fetchedQuestions);
    } catch (err) {
      setError("Failed to fetch questions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameStarted && questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions, gameStarted]);

  return (
    <TriviaContext.Provider
      value={{
        currentQuestion,
        categories,
        setCategory,
        category,
        questions,
        fetchQuestions,
        gameStarted,
        setGameStarted,
        loading,
        error,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export const useTrivia = () => {
  const context = useContext(TriviaContext);
  if (context === undefined) {
    throw new Error("useTrivia must be used within a TriviaProvider");
  }
  return context;
};

export default TriviaProvider;
