import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { LivesDisplay } from '../components/LivesDisplay';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { QuestionCountDisplay } from '../components/QuestionCountDisplay';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { useGameContext } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';

export function GamePage() {
  const {
    subject = 'math',
    difficulty = 'easy'
  } = useParams<{
    subject: string;
    difficulty: string;
  }>();
  const navigate = useNavigate();
  const { updateKidScore } = useAuth();
  const {
    score,
    lives,
    setLives,
    questionCount,
    totalQuestions,
    setTotalQuestions,
    incrementScore,
    incrementQuestionCount,
    resetGame,
    playSound
  } = useGameContext();

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [customQuestionCount, setCustomQuestionCount] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    resetGame();
    if (difficulty === 'medium') {
      setTotalQuestions(15);
    } else if (difficulty === 'hard') {
      setTotalQuestions(10);
      setLives(3);
    }
    setTimerActive(true);
  }, [difficulty, resetGame, setLives, setTotalQuestions]);

  useEffect(() => {
    if (questionCount >= totalQuestions && totalQuestions > 0) {
      setGameWon(score >= Math.ceil(totalQuestions * 0.6));
      setGameOver(true);
      updateKidScore(subject, difficulty, score);
    }
  }, [questionCount, totalQuestions, score, subject, difficulty, updateKidScore]);

  const handleTimeUp = () => {
    if (gameOver) return;
    playSound('failure');
    setFeedbackMessage("Time is up!");
    if (difficulty === 'hard') {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameOver(true);
        return;
      }
    }
    showFeedbackThenNextQuestion();
  };

  const handleCorrectAnswer = () => {
    if (gameOver) return;
    playSound('success');
    setFeedbackMessage('Correct answer!');
    incrementScore();
    showFeedbackThenNextQuestion();
  };

  const handleWrongAnswer = () => {
    if (gameOver) return;
    playSound('failure');
    setFeedbackMessage('Not quite right.');
    if (difficulty === 'hard') {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameOver(true);
        return;
      }
    }
    showFeedbackThenNextQuestion();
  };

  const showFeedbackThenNextQuestion = () => {
    setTimerActive(false);
    setTimeout(() => {
      setFeedbackMessage(null);
      incrementQuestionCount();
      setTimeout(() => {
        setTimerActive(true);
      }, 100);
    }, 1000);
  };

  const startCustomGame = () => {
    resetGame();
    setTotalQuestions(customQuestionCount);
    setGameStarted(true);
  };

  if (!gameStarted && difficulty === 'easy') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100svh] p-6 text-center bg-[#f7f7f5]">
        <div className="max-w-md w-full bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8]">
          <h1 className="text-3xl font-bold mb-3 text-[#000000] tracking-tight">
            Question Count
          </h1>
          <p className="text-[#666662] mb-6">Choose how many questions to play</p>
          <Character type="rabbit" className="w-24 h-24 mx-auto mb-6" />

          <div className="mb-8">
            <input
              type="range"
              min="1"
              max="20"
              value={customQuestionCount}
              onChange={e => setCustomQuestionCount(Number(e.target.value))}
              className="w-full h-2 bg-[#ebebe8] rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="text-3xl font-bold text-[#000000] mt-3">
              {customQuestionCount}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => navigate(`/difficulty/${subject}`)} variant="secondary" className="w-1/2">
              Back
            </Button>
            <Button onClick={startCustomGame} variant="primary" className="w-1/2">
              Start
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100svh] p-6 text-center bg-[#f7f7f5]">
        <div className="max-w-md w-full bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8]">
          <h1 className="text-4xl font-bold mb-3 text-[#000000] tracking-tight">
            {gameWon ? 'Quest Complete!' : 'Adventure Finished'}
          </h1>
          <Character type={gameWon ? 'rabbit' : 'turtle'} className="w-28 h-28 mx-auto my-6" />

          <div className="bg-[#f7f7f5] rounded-xl p-6 mb-8 border border-[#ebebe8]">
            <h2 className="text-sm font-bold text-[#666662] uppercase tracking-wider mb-1">
              Your Score
            </h2>
            <p className="text-4xl font-bold text-[#000000] mb-2">
              {score} / {totalQuestions}
            </p>
            <p className="text-sm text-[#666662]">
              {gameWon ? "Completed successfully!" : "Keep practicing to improve."}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                resetGame();
                setGameOver(false);
                setGameWon(false);
                if (difficulty === 'easy') {
                  setGameStarted(false);
                } else {
                  setTimerActive(true);
                }
              }}
              variant="primary"
            >
              Play Again
            </Button>
            <Button onClick={() => navigate(`/difficulty/${subject}`)} variant="secondary">
              Choose Different Level
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[100svh] p-6 bg-[#f7f7f5]">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8 pb-2">
          <h1 className="text-2xl font-bold text-[#000000] capitalize tracking-tight">
            {subject} — {difficulty}
          </h1>
          <Button onClick={() => navigate(`/difficulty/${subject}`)} size="small" variant="secondary">
            Exit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <ScoreDisplay />
            {feedbackMessage && feedbackMessage.includes('Correct') && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#bbf697] text-[#000000] font-bold text-xs rounded-full w-6 h-6 flex items-center justify-center border border-black">
                +1
              </div>
            )}
          </div>
          <QuestionCountDisplay />
          {difficulty !== 'easy' && <Timer isActive={timerActive && !gameOver} onTimeUp={handleTimeUp} key={`timer-${questionCount}`} />}
          {difficulty === 'hard' && <LivesDisplay />}
        </div>

        {feedbackMessage && (
          <div className={`text-center mb-4 text-lg font-bold ${feedbackMessage.includes('Correct') ? 'text-[#000000]' : 'text-[#d0106f]'}`}>
            {feedbackMessage}
          </div>
        )}

        <div className="flex justify-center mb-8">
          <QuestionCard
            subject={subject}
            difficulty={difficulty}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            key={`question-${questionCount}`}
          />
        </div>
      </div>
    </div>
  );
}
