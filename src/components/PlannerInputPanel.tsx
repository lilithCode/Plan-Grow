"use client";
import { Sparkles, RotateCcw, Trash2 } from "lucide-react";

export default function PlannerInputPanel({
  prompt,
  onPromptChange,
  onGenerate,
  onRegenerate,
  onResetDay,
  isPlanning,
}: any) {
  return (
    <div className="glass-panel rounded-[2.5rem] p-8 space-y-6 border-white/40 dark:border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-400/20 rounded-lg">
          <Sparkles
            className="text-yellow-600 dark:text-yellow-400"
            size={20}
          />
        </div>
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-50">
          What's the vibe today?
        </h2>
      </div>

      <div className="relative group">
        <input
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g. Study session, gym, and grocery shopping..."
          className="w-full h-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-6 text-lg text-slate-700 dark:text-white shadow-inner outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={onGenerate}
          disabled={isPlanning}
          className="h-14 px-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-lg shadow-lg shadow-emerald-500/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isPlanning ? "Growing..." : "Generate Plan"}
          <Sparkles size={20} />
        </button>

        <div className="flex-1" />

        <div className="flex gap-2">
          <button
            onClick={onRegenerate}
            className="h-14 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 font-bold border border-transparent dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Regenerate
          </button>

          <button
            onClick={onResetDay}
            className="h-14 px-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
