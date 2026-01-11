import { useMcu } from "react-mcu";

function Home() {
  const { initials, setMcuConfig } = useMcu();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface p-8 text-on-surface">
      <h1 className="text-5xl font-bold">react-mcu + Tailwind v4</h1>

      <p className="max-w-md rounded-lg bg-surface-container px-6 py-4 text-center">
        This example demonstrates react-mcu with Tailwind CSS v4.
      </p>

      <button
        onClick={() => setMcuConfig({ ...initials, source: "#FF5722" })}
        className="rounded-lg bg-primary px-6 py-3 font-medium text-on-primary transition hover:bg-primary-container"
      >
        Change Theme
      </button>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="rounded-lg bg-primary-container px-6 py-4 text-center text-on-primary-container">
          <strong>Primary</strong>
        </div>
        <div className="rounded-lg bg-secondary-container px-6 py-4 text-center text-on-secondary-container">
          <strong>Secondary</strong>
        </div>
        <div className="rounded-lg bg-tertiary-container px-6 py-4 text-center text-on-tertiary-container">
          <strong>Tertiary</strong>
        </div>
      </div>
    </div>
  );
}

export default Home;
