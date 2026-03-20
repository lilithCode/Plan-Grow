"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 pb-10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-app-muted">
          Made for focus
        </div>
        <div className="text-xs text-app-muted">
          Tip: Always prioritize your main task 🌿
        </div>
      </div>
    </footer>
  );
}

