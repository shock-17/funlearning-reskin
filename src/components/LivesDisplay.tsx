import React from "react";
import { useGameContext } from "../context/GameContext";

export function LivesDisplay() {
  const { lives } = useGameContext();

  return (
    <div className="flex items-center bg-[#ffffff] rounded-full px-4 py-2 border border-[#ebebe8]">
      <span className="text-base font-bold mr-2 text-[#d0106f]">Lives:</span>
      <div className="flex">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mx-0.5">
            {i < lives ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d0106f]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c5c5c5]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
