import LoaderUI from "@/components/LoaderUI";

export default function Loading() {
  return (
    <div className="relative min-h-[100dvh] bg-app-background">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-app-accent/10 via-transparent to-app-accent-2/10" />
      </div>
      <div className="relative">
        <LoaderUI message="AI is planning your day..." />
      </div>
    </div>
  );
}

