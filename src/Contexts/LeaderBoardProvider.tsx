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

  const getLeaderBoard = async () => {
    try {
      const response = await Requests.fetchLeaderboard();
      setLeaderBoard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
    setLeaderBoard(response.data);
  };

  const updateLeaderBoard = (newEntry: LeaderBoard) => {
    setLeaderBoard((prevLeaderBoard) =>
      [...prevLeaderBoard, newEntry].sort((a, b) => b.score - a.score)
    );
  };

  return (
    <LeaderBoardContext.Provider
      value={{ leaderBoard, updateLeaderBoard, getLeaderBoard }}
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
