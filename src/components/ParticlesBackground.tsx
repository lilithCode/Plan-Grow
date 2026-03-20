"use client";

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-emerald-200/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-200/20 blur-[150px] rounded-full" />

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-sparkle"
          style={{
            width: Math.random() * 3 + 2 + "px",
            height: Math.random() * 3 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDelay: Math.random() * 5 + "s",
            animationDuration: Math.random() * 4 + 4 + "s",
          }}
        />
      ))}

      <div className="absolute -bottom-20 -left-20 opacity-10 rotate-12 text-emerald-800">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <path fill="currentColor" d="M10,90 Q30,40 80,10 Q50,60 10,90" />
        </svg>
      </div>
      <div className="absolute -top-20 -right-20 opacity-10 -rotate-165 text-blue-800">
        <svg width="350" height="350" viewBox="0 0 100 100">
          <path fill="currentColor" d="M10,90 Q30,40 80,10 Q50,60 10,90" />
        </svg>
      </div>
    </div>
  );
}
