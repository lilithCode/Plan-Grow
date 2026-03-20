export type TimeOfDay = "Morning" | "Afternoon" | "Evening";

export type PlanSection = {
  timeOfDay: TimeOfDay;
  tasks: string[];
};

export type PlanAIResponse = {
  motivationalLine: string;
  sections: PlanSection[];
};

function normalizeTimeOfDay(value: string): TimeOfDay | null {
  const v = value.trim().toLowerCase();
  if (v === "morning") return "Morning";
  if (v === "afternoon") return "Afternoon";
  if (v === "evening") return "Evening";
  return null;
}

export function parsePlanAIResponse(raw: unknown): PlanAIResponse | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const motivationalLine = obj["motivationalLine"];
  const sectionsRaw = obj["sections"];
  if (typeof motivationalLine !== "string") return null;
  if (!Array.isArray(sectionsRaw)) return null;

  const sections: PlanSection[] = [];
  for (const s of sectionsRaw) {
    if (!s || typeof s !== "object") continue;
    const sec = s as Record<string, unknown>;
    const time = sec["timeOfDay"];
    const tasks = sec["tasks"];
    if (typeof time !== "string") continue;
    const normalized = normalizeTimeOfDay(time);
    if (!normalized) continue;
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const taskTexts = tasks.filter((t) => typeof t === "string").map((t) => t.trim());
    const nonEmpty = taskTexts.filter(Boolean);
    if (nonEmpty.length === 0) continue;
    sections.push({ timeOfDay: normalized, tasks: nonEmpty.slice(0, 6) });
  }

  if (sections.length === 0) return null;

  // Keep the experience “game-like”: small list, not an essay.
  // Target: ~9-12 tasks; we’ll hard-cap at 12.
  const MAX_TASKS = 12;
  const totalTasks = sections.reduce((acc, s) => acc + s.tasks.length, 0);
  if (totalTasks > MAX_TASKS) {
    let remaining = MAX_TASKS;
    for (let i = 0; i < sections.length; i++) {
      if (remaining <= 0) {
        sections[i] = { ...sections[i], tasks: [] };
        continue;
      }
      const sliceCount = Math.min(sections[i].tasks.length, remaining);
      sections[i] = { ...sections[i], tasks: sections[i].tasks.slice(0, sliceCount) };
      remaining -= sliceCount;
    }
    // Remove any empty sections caused by trimming.
    const cleaned = sections.filter((s) => s.tasks.length > 0);
    return { motivationalLine, sections: cleaned };
  }

  return { motivationalLine, sections };
}

export function getFallbackPlan(prompt: string): PlanAIResponse {
  const p = prompt.toLowerCase();
  const hasSchool = /(school|class|study|homework|home work|assignment)/.test(p);
  const hasGym = /(gym|workout|run|jog|exercise)/.test(p);
  const hasWork = /(work|project|meeting|client|report)/.test(p);
  const hasHome = /(home|chores|laundry|clean|dishes|cook|dinner)/.test(p);

  const focusTasksMorning: string[] = [
    "Take 2 minutes to pick your top 1 thing",
    "Do a quick brain-dump: list what’s on your mind",
    hasSchool ? "Start with the smallest homework step" : "Warm up with something easy first",
  ];
  if (hasGym) focusTasksMorning.push("Light stretch + set your workout intention");
  if (hasWork) focusTasksMorning.push("Pick one work task and timebox it (25 minutes)");

  const afternoon: string[] = [
    hasSchool ? "Work through the hardest part of homework (no perfection)" : "Do the main task you’ve been avoiding",
    hasWork ? "Follow up on one thing you can finish today" : "Break the next task into 3 tiny steps",
    hasHome ? "Tidy for 5 minutes, just to reset your space" : "Take a short reset break (walk or water)",
  ];

  const evening: string[] = [
    hasGym ? "Gentle cool-down + quick shower prep" : "Plan tomorrow’s first step (literally one step)",
    hasHome ? "Finish the last small chore and call it a win" : "Review what you completed and celebrate it",
    "Wind down: 5 minutes of calm focus (breathe + prepare to rest)",
  ];

  const sections: PlanSection[] = [
    { timeOfDay: "Morning", tasks: focusTasksMorning.slice(0, 4) },
    { timeOfDay: "Afternoon", tasks: afternoon.slice(0, 3) },
    { timeOfDay: "Evening", tasks: evening.slice(0, 3) },
  ];

  const motivationalLine = (() => {
    if (hasSchool && hasGym) return "You’ve got this. Let’s make your day feel lighter, one step at a time 🌿";
    if (hasWork) return "Your focus is growing. Small steps today create big results later 💚";
    if (hasHome) return "Even the simple stuff counts. You’re building momentum 🌱";
    return "Nice choice. We’ll keep it human, doable, and satisfying 🌸";
  })();

  return { motivationalLine, sections };
}

