"use client";

import { useEffect, useState } from "react";
import ErrorUI from "@/components/ErrorUI";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState("Something went wrong while planning your day.");

  useEffect(() => {
    // Keep it friendly; still surface a tiny bit for debugging if needed.
    const maybe = (error?.message || "").toString();
    if (maybe) setMessage(maybe.length > 120 ? message : maybe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-app-background px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <ErrorUI title="Plan couldn’t load" message={message} onRetry={reset} />
      </div>
    </div>
  );
}

