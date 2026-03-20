/* src/components/Garden/Garden.tsx */
"use client";
import { MoreHorizontal, Star } from "lucide-react";

export default function Garden({
  completedCount,
  completedAll,
  onMenuClick,
}: any) {
  // Array to store fixed random positions for the plants
  const plantPositions = [
    { b: 15, l: 20 },
    { b: 12, l: 45 },
    { b: 18, l: 70 },
    { b: 5, l: 30 },
    { b: 7, l: 60 },
    { b: 10, l: 10 },
    { b: 22, l: 35 },
    { b: 20, l: 55 },
    { b: 25, l: 15 },
  ];

  return (
    <div className="glass-panel rounded-4xl p-6 relative overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-700">Your garden</h3>
        <button
          onClick={onMenuClick}
          className="p-1 hover:bg-white/40 rounded-lg transition-colors"
        >
          <MoreHorizontal size={20} className="text-slate-400" />
        </button>
      </div>

      <div className="relative flex-1 aspect-[4/3] rounded-3xl bg-gradient-to-b from-blue-50/40 to-emerald-50/40 border border-white/60 overflow-hidden">
        {/* The Field Surface */}
        <div className="absolute bottom-0 w-full h-1/3 bg-emerald-100/20 blur-xl" />

        {/* Dynamic Plants: One per completed task */}
        {Array.from({ length: completedCount }).map((_, i) => {
          const pos = plantPositions[i % plantPositions.length];
          return (
            <div
              key={i}
              className="absolute animate-bloom transition-all duration-700"
              style={{
                bottom: `${pos.b}%`,
                left: `${pos.l}%`,
                transform: `scale(${0.8 + Math.random() * 0.4})`,
              }}
            >
              <svg width="40" height="50" viewBox="0 0 80 100" fill="none">
                <path
                  d="M40 100C40 100 40 60 40 45"
                  stroke="#65A34E"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M40 60C40 60 15 52 12 35C12 20 40 45 40 45"
                  fill="#A7D397"
                />
                <path
                  d="M40 55C40 55 65 48 68 30C68 15 40 40 40 40"
                  fill="#84BC6F"
                />
              </svg>
            </div>
          );
        })}

        {/* Celebration Overlay */}
        {completedAll && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="text-yellow-300 absolute animate-ping fill-yellow-200"
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-1">
        <h4 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          {completedAll ? "A flourishing garden!" : "Your focus is growing"}
          <span className="text-emerald-500">🍃</span>
        </h4>
        <p className="text-sm text-slate-400 font-medium">
          {completedCount} {completedCount === 1 ? "sprout" : "sprouts"} planted
          today.
        </p>
      </div>
    </div>
  );
}
