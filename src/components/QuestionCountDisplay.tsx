import React from "react";
import { useGameContext } from "../context/GameContext";

export function QuestionCountDisplay() {
  const { questionCount, totalQuestions } = useGameContext();
  const displayedQuestionNumber = questionCount + 1;
  const progress = totalQuestions > 0 ? (questionCount / totalQuestions) * 100 : 0;

  return (
    <div className="w-full bg-[#ffffff] rounded-full px-4 py-2 border border-[#ebebe8]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-[#000000]">
          Question {displayedQuestionNumber} of {totalQuestions}
        </span>
        <span className="text-sm font-semibold text-[#000000]">
          {Math.floor(progress)}%
        </span>
      </div>
      <div className="w-full bg-[#ebebe8] rounded-full h-2">
        <div
          className="bg-[#000000] h-2 rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
