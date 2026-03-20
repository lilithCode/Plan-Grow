"use client";

export type ProgressTrackerProps = {
  completedCount: number;
  totalTasks: number;
  stage: number; // 0..4
  motivationalLine?: string;
};

const STAGE_LABELS = [
  "Seed",
  "Small plant",
  "Bigger plant",
  "Tree",
  "Garden",
];

export default function ProgressTracker({
  completedCount,
  totalTasks,
  stage,
  motivationalLine,
}: ProgressTrackerProps) {
  const pct = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  const safeStage = Math.max(0, Math.min(4, stage));

  return (
    <div className="rounded-3xl bg-app-card p-5 shadow-[0_14px_30px_rgba(148,163,184,0.16)] ring-1 ring-app-card-border backdrop-blur app-reveal">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-base font-semibold text-app-foreground">
            Your focus is growing 💚
          </div>
          <div className="mt-1 text-sm text-app-muted">
            Stage: {STAGE_LABELS[safeStage]} • {completedCount}/{totalTasks} tasks
          </div>
        </div>
        {motivationalLine ? (
          <div className="text-xs text-app-muted sm:max-w-[50%] sm:text-right">
            {motivationalLine}
          </div>
        ) : null}
      </div>

      <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-emerald-50 ring-1 ring-emerald-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-green-300 to-sky-300 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

