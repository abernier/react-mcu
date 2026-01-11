import { useMcu } from "react-mcu";

function Home() {
  const { initials, setMcuConfig } = useMcu();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
      <input
        type="color"
        defaultValue={initials.source}
        onChange={(e) => setMcuConfig({ ...initials, source: e.target.value })}
        className="h-12 w-12 cursor-pointer rounded border-2 border-outline"
      />
    </div>
  );
}

export default Home;
