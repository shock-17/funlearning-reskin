import React, { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";

export function ScoreDisplay() {
  const { score } = useGameContext();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (score > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <div className={`rounded-full px-4 py-2 border border-[#ebebe8] transition-colors duration-200 ${isAnimating ? "bg-[#bbf697]" : "bg-[#ffffff]"}`}>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#000000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <span className={`text-base font-bold text-[#000000] transform transition-transform duration-200 ${isAnimating ? "scale-105" : ""}`}>
          Score: {score}
        </span>
      </div>
    </div>
  );
}
