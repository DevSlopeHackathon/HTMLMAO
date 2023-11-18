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
import mouseClickSound from "../assets/sounds/click.mp3";
import startGameSound from "../assets/sounds/game-start.mp3";
import confirmSound from "../assets/sounds/confirm.mp3";
import goBackSound from "../assets/sounds/goBack.mp3";
import gameOverSound from "../assets/sounds/gameOver.mp3";

type TriviaContextType = {
  currentQuestion: Question | null | undefined;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  categories: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  fetchQuestions: (category: string) => Promise<void>;
  loading: boolean;
  setGameOn: React.Dispatch<React.SetStateAction<boolean>>;
  gameOn: boolean;
  error: string | null;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  startGameSound: HTMLAudioElement;
  mouseClickSound: HTMLAudioElement;
  confirmSound: HTMLAudioElement;
  goBackSound: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;
};

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

const TriviaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameOn, setGameOn] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<
    Question | null | undefined
  >(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const questionCache = useRef(new Map<string, Question[]>()).current;
  const soundClick = new Audio(mouseClickSound);
  const soundStart = new Audio(startGameSound);
  const soundConfirm = new Audio(confirmSound);
  const soundGoBack = new Audio(goBackSound);
  const soundGameOver = new Audio(gameOverSound);
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
    if (gameOn && currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, gameOn, score]);

  return (
    <TriviaContext.Provider
      value={{
        currentQuestion,
        categories,
        setCategory,
        category,
        questions,
        fetchQuestions,
        gameOn,
        setQuestions,
        setGameOn,
        loading,
        error,
        score,
        setScore,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        startGameSound: soundStart,
        mouseClickSound: soundClick,
        confirmSound: soundConfirm,
        goBackSound: soundGoBack,
        gameOverSound: soundGameOver,
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
