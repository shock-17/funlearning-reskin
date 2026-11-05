import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Character } from "../components/Character";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] p-6 text-center bg-[#f7f7f5]">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#000000] tracking-tight">
          Learning Adventures
        </h1>
        <div className="flex justify-center mb-8 gap-4">
          <Character type="fox" className="w-24 h-24" />
          <Character type="bear" className="w-28 h-28" />
          <Character type="rabbit" className="w-24 h-24" />
        </div>
        <p className="text-xl mb-10 text-[#666662] max-w-lg mx-auto">
          Interactive challenges, friendly companions, and math and English quests designed for young minds.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/profile-selection")} size="large" variant="primary">
            Start Playing
          </Button>
          <Button onClick={() => navigate("/kid-profiles")} size="large" variant="secondary">
            Parent Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
