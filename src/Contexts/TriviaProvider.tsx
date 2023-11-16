import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Requests } from "../api";
import { Question } from "../Types";

type TriviaContextType = {
  categories: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  questions: Question[];
  fetchQuestions: (category: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

type TriviaProviderProps = {
  children: ReactNode;
};

export const TriviaProvider: React.FC<TriviaProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await Requests.fetchQuestionsByCategory(
        category
      );
      setQuestions(fetchedQuestions);
    } catch (err) {
      setError("Failed to fetch questions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TriviaContext.Provider
      value={{
        categories,
        setCategory,
        category,
        questions,
        fetchQuestions,
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
