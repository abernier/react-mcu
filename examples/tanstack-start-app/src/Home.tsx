import { useMcu } from "react-mcu";

function Home() {
  const { initials, setMcuConfig } = useMcu();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
      <button
        onClick={() => setMcuConfig({ ...initials, source: "#FF5722" })}
        className="rounded bg-primary px-4 py-2 text-on-primary"
      >
        Change Theme
      </button>
    </div>
  );
}

export default Home;
