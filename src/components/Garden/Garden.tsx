"use client";
import { MoreHorizontal } from "lucide-react";

export default function Garden({
  completedCount,
  completedAll,
  onMenuClick,
}: any) {
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
    <div className="glass-panel rounded-4xl p-6 relative overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="flex justify-center items-center mb-4">
        <h3 className="text-lg font-bold text-green-700 ">YOUR GARDEN</h3>
      </div>

      <div
        className={`relative flex-1 rounded-3xl border-2  transition-colors duration-1000 overflow-hidden ${
          completedAll
            ? "bg-gradient-to-b from-emerald-50/60 to-teal-50/60 border-green-800"
            : "bg-gradient-to-b from-blue-50/40 to-emerald-50/40 border-green-600"
        }`}
      >
        <div className="absolute bottom-0 w-full h-1/3 bg-emerald-100/20 blur-xl " />

        {Array.from({ length: completedCount }).map((_, i) => {
          const pos = plantPositions[i % plantPositions.length];
          return (
            <div
              key={i}
              className="absolute animate-bloom transition-all duration-700 "
              style={{
                bottom: `${pos.b}%`,
                left: `${pos.l}%`,
                transform: `scale(${0.8 + (i % 3) * 0.2})`,
              }}
            >
              <svg width="40" height="50" viewBox="0 0 80 100">
                <path
                  d="M40 100C40 100 40 60 40 45"
                  stroke="#65A34E"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M40 60C40 60 15 52 12 35C12 20 40 45 40 45"
                  fill={i % 2 === 0 ? "#A7D397" : "#84BC6F"}
                />
                <path
                  d="M40 55C40 55 65 48 68 30C68 15 40 40 40 40"
                  fill={i % 2 === 0 ? "#84BC6F" : "#A7D397"}
                />
              </svg>
            </div>
          );
        })}

        {completedAll && (
          <>
            <div className="absolute inset-0 bg-emerald-400/5 animate-pulse " />

            {[...Array(25)].map((_, i) => (
              <div
                key={`petal-${i}`}
                className="absolute top-[-5%] animate-fall pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              >
                <div
                  className="w-2.5 h-3.5 bg-pink-200 rounded-full rotate-45 "
                  style={{ filter: "blur(0.5px)" }}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div className="mt-6 space-y-1">
        <h4 className="text-xl font-bold text-slate-700 flex items-center gap-2 ">
          {completedAll ? "A flourishing garden!" : "Your focus is growing"}
          <span className={completedAll ? "animate-bounce" : ""}>🍃</span>
        </h4>
        <p className="text-sm text-slate-400 font-medium">
          {completedCount} {completedCount === 1 ? "sprout" : "sprouts"} planted
          today.
        </p>
      </div>

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(450px) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
