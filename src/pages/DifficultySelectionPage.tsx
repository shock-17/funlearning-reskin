import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Character } from "../components/Character";
import { Button } from "../components/Button";

export function DifficultySelectionPage() {
  const navigate = useNavigate();
  const { subject = "math" } = useParams<{ subject: string }>();

  const difficultyInfo = [
    {
      level: "easy",
      title: "Easy",
      description: "No time limit, choose how many questions",
      character: "rabbit" as const,
      color: "bg-[#bbf697] text-[#000000]"
    },
    {
      level: "medium",
      title: "Medium",
      description: "15 questions, 60 seconds per question",
      character: "turtle" as const,
      color: "bg-[#fed878] text-[#000000]"
    },
    {
      level: "hard",
      title: "Hard",
      description: "10 questions, 60 seconds, 3 lives challenge",
      character: "bear" as const,
      color: "bg-[#97aaf6] text-[#000000]"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] p-6 text-center bg-[#f7f7f5]">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#000000] tracking-tight">
          Choose Difficulty
        </h1>
        <p className="text-xl font-bold mb-10 capitalize text-[#d0106f]">
          {subject} Adventure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {difficultyInfo.map(diff => (
            <button
              key={diff.level}
              className={`${diff.color} rounded-2xl p-6 cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] text-center flex flex-col items-center justify-between h-72 focus:outline-none focus:ring-2 focus:ring-black`}
              onClick={() => navigate(`/play/${subject}/${diff.level}`)}
            >
              <Character type={diff.character} className="w-24 h-24 mb-4" />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-[#000000]">
                  {diff.title}
                </h2>
                <p className="text-sm text-[#111111] opacity-90">{diff.description}</p>
              </div>
            </button>
          ))}
        </div>

        <Button onClick={() => navigate("/subjects")} size="small" variant="secondary">
          Back to Subjects
        </Button>
      </div>
    </div>
  );
}
