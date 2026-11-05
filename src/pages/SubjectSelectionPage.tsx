import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export function SubjectSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100svh] p-6 text-center bg-[#f7f7f5]">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#000000] tracking-tight">
          Choose a Subject
        </h1>
        <p className="text-lg text-[#666662] mb-12">
          Pick your learning quest for today
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-12">
          {/* Math Card */}
          <button
            onClick={() => navigate('/difficulty/math')}
            className="w-full md:w-72 p-8 rounded-2xl bg-[#97aaf6] text-[#000000] text-left transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black flex flex-col justify-between h-80"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/897/897368.png"
                alt="Math calculations"
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1 text-[#000000]">Mathematics</h2>
              <p className="text-base text-[#111111] opacity-90">Numbers, arithmetic, and puzzles</p>
            </div>
          </button>

          {/* English Card */}
          <button
            onClick={() => navigate('/difficulty/english')}
            className="w-full md:w-72 p-8 rounded-2xl bg-[#bbf697] text-[#000000] text-left transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black flex flex-col justify-between h-80"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png"
                alt="Open book with letters"
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1 text-[#000000]">English</h2>
              <p className="text-base text-[#111111] opacity-90">Words, spelling, and rhymes</p>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => navigate('/profile-selection')} size="small" variant="secondary">
            Change Player
          </Button>
          <Button onClick={() => navigate('/kid-profiles')} size="small" variant="primary">
            Parent Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
