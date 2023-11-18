import ActionBtn from "../components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useTrivia } from "../Contexts/TriviaProvider";
import LeaderBoard from "../components/LeaderBoard";

export const HomePage = () => {
  const { setGameOn, startGameSound } = useTrivia();
  const navigate = useNavigate();

  const handleGameStart = () => {
    setGameOn(true);
    navigate("/categories");
    startGameSound.play();
  };

  return (
    <div className='text-center'>
      <h1 className=''>Welcome to Our Trivia Game</h1>
      <p>Test your knowledge with our fun and challenging trivia questions.</p>
      <ActionBtn
        onClick={() => {
          handleGameStart();
        }}
        text='Start Game'
      />
      <LeaderBoard />
    </div>
  );
};
