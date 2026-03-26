"use client";
import React from "react";

interface GardenProps {
  completedCount: number;
  completedAll: boolean;
  onMenuClick?: () => void;
}

export default function Garden({ completedCount, completedAll }: GardenProps) {
  const plantPositions = [
    { b: 15, l: 15 },
    { b: 12, l: 30 },
    { b: 18, l: 45 },
    { b: 8, l: 60 },
    { b: 14, l: 75 },
    { b: 20, l: 85 },
    { b: 5, l: 10 },
    { b: 22, l: 25 },
    { b: 10, l: 40 },
    { b: 25, l: 55 },
    { b: 7, l: 70 },
    { b: 28, l: 80 },
    { b: 15, l: 5 },
    { b: 30, l: 35 },
    { b: 5, l: 90 },
  ];

  return (
    <div className="glass-panel rounded-4xl p-8 relative overflow-hidden flex flex-col h-full min-h-[500px] transition-all duration-500">
      <div className="flex justify-center items-center mb-6">
        <h3 className="text-lg  font-black tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">
          Your Garden
        </h3>
      </div>

      <div
        className={`relative flex-1 rounded-[2.5rem] border-2 transition-all duration-1000 overflow-hidden shadow-inner ${
          completedAll
            ? "bg-gradient-to-br from-emerald-100/40 to-teal-100/40 border-emerald-400/50 dark:from-emerald-950/40 dark:to-teal-900/40 dark:border-emerald-500/50"
            : "bg-slate-50/50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800"
        }`}
      >
        <div className="absolute bottom-[-10%] left-0 w-full h-1/2 bg-emerald-500/10 blur-[80px] pointer-events-none opacity-60 dark:opacity-40" />

        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {Array.from({
          length: Math.min(completedCount, plantPositions.length),
        }).map((_, i) => {
          const pos = plantPositions[i % plantPositions.length];
          return (
            <div
              key={i}
              className="absolute animate-bloom"
              style={{
                bottom: `${pos.b}%`,
                left: `${pos.l}%`,
                transform: `scale(${0.9 + (i % 3) * 0.2})`,
                zIndex: Math.floor(pos.b),
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              }}
            >
              <svg
                width="50"
                height="60"
                viewBox="0 0 80 100"
                className="transition-transform hover:scale-110 duration-300"
              >
                <path
                  d="M40 100C40 100 40 60 40 45"
                  stroke={completedAll ? "#059669" : "#10b981"}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M40 60C40 60 15 52 12 35C12 20 40 45 40 45"
                  fill={i % 2 === 0 ? "#34d399" : "#10b981"}
                  className="transition-colors duration-1000"
                />
                <path
                  d="M40 55C40 55 65 48 68 30C68 15 40 40 40 40"
                  fill={i % 2 === 0 ? "#10b981" : "#34d399"}
                  className="transition-colors duration-1000"
                />
              </svg>
            </div>
          );
        })}

        {completedAll && (
          <>
            <div className="absolute inset-0 bg-emerald-400/5 animate-pulse pointer-events-none" />
            {[...Array(25)].map((_, i) => (
              <div
                key={`petal-${i}`}
                className="absolute top-[-10%] animate-fall pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              >
                <div
                  className="w-3 h-4 bg-pink-300/80 dark:bg-pink-400/60 rounded-full rotate-45 shadow-sm"
                  style={{ filter: "blur(0.4px)" }}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div className="mt-8 space-y-2 text-center">
        <h4 className="text-2xl font-black text-slate-800 dark:text-white flex items-center justify-center gap-2">
          {completedAll ? "You've completed Garden!" : "Let's plant some more"}
          <span
            className={`${completedAll ? "animate-bounce" : "animate-pulse"}`}
          >
            {completedAll ? "🌸" : "🌱"}
          </span>
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
         You seeded {completedCount} {completedCount === 1 ? "sprout " : "sprouts "} 
          today.
        </p>
      </div>

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(600px) translateX(60px) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes bloom-in {
          0% {
            opacity: 0;
            transform: scale(0.4) translateY(20px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
        .animate-bloom {
          animation: bloom-in 1.2s cubic-bezier(0.2, 0.8, 0.2, 1.1) forwards;
        }
      `}</style>
    </div>
  );
}
