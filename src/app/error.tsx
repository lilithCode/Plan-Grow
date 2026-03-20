"use client";

import { useEffect, useState } from "react";
import ErrorUI from "@/components/ErrorUI";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState("Something went wrong.");

  useEffect(() => {
    const maybe = (error?.message || "").toString();
    if (maybe) setMessage(maybe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-app-background px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <ErrorUI title="Plan & Grow ran into an issue" message={message} onRetry={reset} />
      </div>
    </div>
  );
}

