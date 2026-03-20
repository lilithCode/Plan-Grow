"use client";

export default function LoaderUI({ message }: { message?: string }) {
  return (
    <div className="flex w-full items-center justify-center px-4 py-14">
      <div className="relative flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-white/65 p-8 text-center shadow-sm ring-1 ring-app-card-border backdrop-blur">
        <div className="absolute -top-5 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-r from-app-accent/30 to-app-accent-2/30 blur-sm" />
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-app-accent to-app-accent-2 shadow-sm" />
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/60 border-t-white/90" />
        </div>
        <div className="text-sm font-semibold text-app-foreground">
          {message ?? "AI is planning your day..."}
        </div>
        <div className="text-xs text-app-muted">This should only take a moment.</div>
      </div>
    </div>
  );
}

