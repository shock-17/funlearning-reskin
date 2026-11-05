import React, { useEffect, useState } from "react";

type TimerProps = {
  isActive: boolean;
  onTimeUp: () => void;
  key?: string;
};

export function Timer({
  isActive,
  onTimeUp
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(60);
    }
  }, [isActive]);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | undefined;
    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isActive) {
      onTimeUp();
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timeLeft, isActive, onTimeUp]);

  const getColorClass = () => {
    if (timeLeft > 30) return "text-[#000000]";
    if (timeLeft > 10) return "text-[#d97706]";
    return "text-[#d0106f]";
  };

  return (
    <div className="bg-[#ffffff] rounded-full px-4 py-2 border border-[#ebebe8]">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666662]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={`text-base font-bold ${getColorClass()}`}>
          {timeLeft}s
        </span>
      </div>
    </div>
  );
}
