export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export type LeaderBoard = {
  userId: number;
  userName: string;
  score: number;
};

export type Question = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
};
