import { useMcu } from "react-mcu";

function Home() {
  const { initials, setMcuConfig } = useMcu();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
      <button className="rounded bg-primary px-4 py-2 text-on-primary">
        <input
          type="color"
          defaultValue={initials.source}
          onChange={(e) =>
            setMcuConfig({ ...initials, source: e.target.value })
          }
          className="h-8 w-8 cursor-pointer rounded border-2 border-on-primary"
        />
      </button>
    </div>
  );
}

export default Home;
