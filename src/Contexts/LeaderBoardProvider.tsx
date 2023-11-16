import React, { useState, useContext, createContext, ReactNode } from "react";
import { LeaderBoard } from "../Types";

type LeaderBoardContextType = {
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

  const updateLeaderBoard = (newEntry: LeaderBoard) => {
    setLeaderBoard((prevLeaderBoard) =>
      [...prevLeaderBoard, newEntry].sort((a, b) => b.score - a.score)
    );
  };

  return (
    <LeaderBoardContext.Provider value={{ leaderBoard, updateLeaderBoard }}>
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
