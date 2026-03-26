"use client";
import { Check } from "lucide-react";

export default function TaskCard({ text, completed, onToggle }: any) {
  return (
    <button
      onClick={onToggle}
      className={`w-full glass-panel p-5 rounded-2xl flex items-center gap-4 text-left group transition-all hover:-translate-y-1 active:scale-[0.98] ${
        completed ? "opacity-60" : "opacity-100"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
          completed
            ? "bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            : "border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 group-hover:border-emerald-400"
        }`}
      >
        {completed && <Check size={16} className="text-white stroke-[4]" />}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-base font-semibold transition-all truncate ${
            completed
              ? "text-slate-400 dark:text-slate-500 line-through"
              : "text-slate-700 dark:text-slate-100"
          }`}
        >
          {text}
        </p>
        <p
          className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
            completed
              ? "text-emerald-600 dark:text-emerald-500"
              : "text-slate-400 dark:text-slate-400"
          }`}
        >
          {completed ? "Completed" : "Active Task"}
        </p>
      </div>
    </button>
  );
}
