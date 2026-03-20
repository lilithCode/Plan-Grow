"use client";

export default function ErrorUI({
  title,
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="app-reveal w-full rounded-2xl bg-white/65 p-6 shadow-sm ring-1 ring-app-card-border backdrop-blur">
      <div className="text-sm font-semibold text-app-foreground">{title ?? "Oops—something got tangled."}</div>
      <div className="mt-2 text-sm leading-7 text-app-muted">{message}</div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-app-accent to-app-accent-2 px-5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:shadow-md"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

