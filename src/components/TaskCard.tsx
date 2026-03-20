"use client";
import { Check } from "lucide-react";

export default function TaskCard({ text, completed, onToggle }: any) {
  return (
    <button
      onClick={onToggle}
      className="w-full glass-panel !bg-white/40 border-white/80 p-4 rounded-2xl flex items-center gap-4 text-left group transition-all hover:-translate-y-0.5"
    >
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          completed
            ? "bg-emerald-100 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
            : "border-slate-200 group-hover:border-sky-300"
        }`}
      >
        {completed && (
          <Check size={14} className="text-emerald-500 stroke-[3]" />
        )}
      </div>
      <div className="flex-1">
        <p
          className={`text-[15px] font-semibold transition-all ${completed ? "text-slate-400 line-through" : "text-slate-600"}`}
        >
          {text}
        </p>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tight mt-0.5">
          {completed ? "Completed" : "Tap to complete"}
        </p>
      </div>
    </button>
  );
}
