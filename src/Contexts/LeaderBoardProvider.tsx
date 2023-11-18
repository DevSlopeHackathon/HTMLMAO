import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { LeaderBoard } from "../Types";
import { Requests, fetchLeaderboard } from "../api";

type LeaderBoardContextType = {
  setTopScores: React.Dispatch<React.SetStateAction<LeaderBoard[]>>;
  topScores: LeaderBoard[];
  getLeaderBoard: () => void;
  leaderBoard: LeaderBoard[];
  handlePostScore: (name: string, score: number) => void;
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

  const handlePostScore = async (name: string, score: number) => {
    try {
      await Requests.postLeaderboard(name, score);
      await getLeaderBoard();
    } catch (error) {
      console.error("Error adding to leaderBoard:", error);
    }
  };

  return (
    <LeaderBoardContext.Provider
      value={{
        leaderBoard,
        handlePostScore,
        getLeaderBoard,
        topScores,
        setTopScores,
      }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
};

//make a post function to post to the leaderboard and then update the leaderboard

export const useLeaderBoard = () => {
  const context = useContext(LeaderBoardContext);
  if (context === undefined) {
    throw new Error("useLeaderBoard must be used within a LeaderBoardProvider");
  }
  return context;
};
