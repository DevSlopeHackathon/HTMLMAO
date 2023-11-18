import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { LeaderBoard } from "../Types";
import { Requests } from "../api";

type LeaderBoardContextType = {
  setTopScores: React.Dispatch<React.SetStateAction<LeaderBoard[]>>;
  topScores: LeaderBoard[];
  getLeaderBoard: () => void;
  leaderBoard: LeaderBoard[];
  updateLeaderBoard: (newEntry: LeaderBoard) => void;
};

const LeaderBoardContext = createContext<LeaderBoardContextType | undefined>(
  undefined
);

type LeaderBoardProviderProps = {
  children: ReactNode;
};

export const LeaderBoardProvider: React.FC<LeaderBoardProviderProps> = ({
  children,
}) => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard[]>([]);
  const [topScores, setTopScores] = useState<LeaderBoard[]>([]);

  const getLeaderBoard = async () => {
    try {
      const data = await Requests.fetchLeaderboard();
      setLeaderBoard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score);

  useEffect(() => {
    setTopScores(sortedLeaderBoard.slice(0, 10));
  }, [leaderBoard]);

  useEffect(() => {
    getLeaderBoard();
  }, []);

  const updateLeaderBoard = (newEntry: LeaderBoard) => {
    setLeaderBoard((prevLeaderBoard) =>
      [...prevLeaderBoard, newEntry].sort((a, b) => b.score - a.score)
    );
  };

  return (
    <LeaderBoardContext.Provider
      value={{
        leaderBoard,
        updateLeaderBoard,
        getLeaderBoard,
        topScores,
        setTopScores,
      }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
};

export const useLeaderBoard = () => {
  const context = useContext(LeaderBoardContext);
  if (context === undefined) {
    throw new Error("useLeaderBoard must be used within a LeaderBoardProvider");
  }
  return context;
};
