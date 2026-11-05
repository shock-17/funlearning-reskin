import React, { useCallback, useState, createContext, useContext } from "react";
type GameContextType = {
  score: number;
  lives: number;
  questionCount: number;
  totalQuestions: number;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setQuestionCount: (count: number) => void;
  setTotalQuestions: (total: number) => void;
  incrementScore: () => void;
  incrementQuestionCount: () => void;
  resetGame: () => void;
  playSound: (type: "success" | "failure") => void;
};
const GameContext = createContext<GameContextType | undefined>(undefined);
export function GameProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const incrementScore = useCallback(() => {
    setScore(prevScore => prevScore + 1);
  }, []);
  const incrementQuestionCount = useCallback(() => {
    setQuestionCount(prevCount => prevCount + 1);
  }, []);
  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setQuestionCount(0);
    setTotalQuestions(10);
  }, []);
  const playSound = useCallback((type: "success" | "failure") => {
    const sound = new Audio(type === "success" ? "https://assets.mixkit.co/sfx/preview/mixkit-game-success-alert-2039.mp3" : "https://assets.mixkit.co/sfx/preview/mixkit-game-show-wrong-answer-buzz-950.mp3");
    sound.play().catch(err => console.error("Sound play error:", err));
  }, []);
  const contextValue = {
    score,
    lives,
    questionCount,
    totalQuestions,
    setScore,
    setLives,
    setQuestionCount,
    setTotalQuestions,
    incrementScore,
    incrementQuestionCount,
    resetGame,
    playSound
  };
  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};