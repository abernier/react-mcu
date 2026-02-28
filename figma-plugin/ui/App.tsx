import { cn } from "./lib/cn";

export function App() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div
        className={cn("rounded-xl border bg-white p-6 shadow-sm text-center")}
      >
        <h1 className="text-2xl font-semibold tracking-tight">
          bonjour figma
        </h1>
      </div>
    </div>
  );
}
