"use client";

export default function PlannerInputPanel({
  prompt,
  onPromptChange,
  onGenerate,
  onRegenerate,
  onResetDay,
  isPlanning,
}: any) {
  return (
    <div className="glass-panel rounded-4xl p-8 space-y-6">
      <h2 className="text-xl font-bold text-slate-700">
        Let's plan your day <span className="text-yellow-400">✨</span>
      </h2>

      <div className="relative">
        <input
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="I have school, gym, and homework"
          className="w-full h-14 rounded-2xl border border-slate-100 bg-white/60 px-6 text-slate-600 shadow-inner outline-none focus:border-sky-200 transition-all placeholder:text-slate-300 font-medium"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onGenerate}
          disabled={isPlanning}
          className="h-12 px-8 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold shadow-lg shadow-sky-200/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isPlanning ? "Planning..." : "Generate plan"}
        </button>

        <div className="flex-1" />

        <div className="flex gap-2">
          <button
            onClick={onRegenerate}
            className="h-12 px-5 rounded-2xl bg-white/70 border border-slate-100 text-slate-400 font-bold hover:bg-white hover:text-slate-600 transition-all text-sm"
          >
            Regenerate plan
          </button>

          <button
            onClick={onResetDay}
            className="h-12 px-5 rounded-2xl bg-white/70 border border-slate-100 text-slate-400 font-bold hover:bg-white hover:text-slate-600 transition-all text-sm"
          >
            Reset day
          </button>
        </div>
      </div>
    </div>
  );
}
