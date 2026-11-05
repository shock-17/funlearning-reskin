import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ScoreEntry = {
  playerName: string;
  profileId: string;
  scoreId: string;
  subject: string;
  difficulty: string;
  score: number;
  date: string;
};

type ScoreGraphProps = {
  scores: ScoreEntry[];
  activeProfileId?: string;
};

export function ScoreGraph({
  scores,
  activeProfileId
}: ScoreGraphProps) {
  // Process data for the chart
  const chartData = useMemo(() => {
    const groupedByPlayer: Record<string, Record<string, number[]>> = {};
    scores.forEach(entry => {
      if (!groupedByPlayer[entry.playerName]) {
        groupedByPlayer[entry.playerName] = {
          math: [],
          english: []
        };
      }
      if (entry.subject === 'math') {
        groupedByPlayer[entry.playerName].math.push(entry.score);
      } else if (entry.subject === 'english') {
        groupedByPlayer[entry.playerName].english.push(entry.score);
      }
    });

    return Object.keys(groupedByPlayer).map(playerName => {
      const playerData = groupedByPlayer[playerName];
      const mathScores = playerData.math;
      const englishScores = playerData.english;

      const mathAvg = mathScores.length ? mathScores.reduce((sum, score) => sum + score, 0) / mathScores.length : 0;
      const englishAvg = englishScores.length ? englishScores.reduce((sum, score) => sum + score, 0) / englishScores.length : 0;

      const recentMathScore = mathScores.length ? mathScores[mathScores.length - 1] : 0;
      const recentEnglishScore = englishScores.length ? englishScores[englishScores.length - 1] : 0;

      const bestMathScore = mathScores.length ? Math.max(...mathScores) : 0;
      const bestEnglishScore = englishScores.length ? Math.max(...englishScores) : 0;

      return {
        name: playerName,
        mathAvg: Math.round(mathAvg * 10) / 10,
        englishAvg: Math.round(englishAvg * 10) / 10,
        recentMathScore,
        recentEnglishScore,
        bestMathScore,
        bestEnglishScore,
        totalGames: mathScores.length + englishScores.length
      };
    });
  }, [scores]);

  if (chartData.length === 0) {
    return (
      <div className="bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8] text-center">
        <p className="text-[#666662] text-base">
          No score data recorded yet. Play a quest to start tracking progress.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 border border-[#ebebe8]">
      <h3 className="text-2xl font-bold text-[#000000] mb-6 tracking-tight">
        Performance Overview
      </h3>

      <div className="mb-10">
        <h4 className="text-base font-semibold text-[#000000] mb-3">
          Average Scores by Subject
        </h4>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebebe8" />
            <XAxis dataKey="name" stroke="#666662" tickLine={false} />
            <YAxis domain={[0, 10]} stroke="#666662" tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="mathAvg" name="Math Average" fill="#97aaf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="englishAvg" name="English Average" fill="#bbf697" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {chartData.map(player => {
          const isActive = activeProfileId && scores.some(s => s.playerName === player.name && s.profileId === activeProfileId);
          return (
            <div
              key={player.name}
              className={`p-5 rounded-xl border ${isActive ? 'border-[#000000] bg-[#ffffff]' : 'border-[#ebebe8] bg-[#f7f7f5]'}`}
            >
              <h4 className="font-bold text-lg text-[#000000]">{player.name}</h4>
              <p className="text-sm text-[#666662] mb-3">Total Games Played: {player.totalGames}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-[#666662] block">Math Avg:</span>
                  <span className="font-bold text-[#000000]">{player.mathAvg} / 10</span>
                </div>
                <div>
                  <span className="text-[#666662] block">English Avg:</span>
                  <span className="font-bold text-[#000000]">{player.englishAvg} / 10</span>
                </div>
                <div>
                  <span className="text-[#666662] block">Math Best:</span>
                  <span className="font-bold text-[#000000]">{player.bestMathScore}</span>
                </div>
                <div>
                  <span className="text-[#666662] block">English Best:</span>
                  <span className="font-bold text-[#000000]">{player.bestEnglishScore}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
