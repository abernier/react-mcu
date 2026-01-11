import { useMcu } from "react-mcu";

function Home() {
  const { initials, setMcuConfig, getMcuColor } = useMcu();

  const handleChangeColor = () => {
    setMcuConfig({ ...initials, source: "#FF5722" });
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--mcu-surface)",
        color: "var(--mcu-on-surface)",
        padding: "2rem",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>
        Welcome to TanStack Start with react-mcu!
      </h1>

      <p
        style={{
          backgroundColor: "var(--mcu-surface-container)",
          color: "var(--mcu-on-surface)",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        This example demonstrates the{" "}
        <span
          style={{
            backgroundColor: "var(--mcu-my-custom-color1)",
            color: "var(--mcu-on-primary)",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          react-mcu
        </span>{" "}
        library integrated with TanStack Router and TanStack Query.
      </p>

      <button
        onClick={handleChangeColor}
        style={{
          backgroundColor: "var(--mcu-primary)",
          color: "var(--mcu-on-primary)",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor =
            "var(--mcu-primary-container)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--mcu-primary)";
        }}
      >
        Change Theme Color
      </button>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--mcu-primary-container)",
            color: "var(--mcu-on-primary-container)",
            padding: "1rem",
            borderRadius: "8px",
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          <strong>Primary</strong>
          <br />
          Container
        </div>
        <div
          style={{
            backgroundColor: "var(--mcu-secondary-container)",
            color: "var(--mcu-on-secondary-container)",
            padding: "1rem",
            borderRadius: "8px",
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          <strong>Secondary</strong>
          <br />
          Container
        </div>
        <div
          style={{
            backgroundColor: "var(--mcu-tertiary-container)",
            color: "var(--mcu-on-tertiary-container)",
            padding: "1rem",
            borderRadius: "8px",
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          <strong>Tertiary</strong>
          <br />
          Container
        </div>
      </div>

      <p style={{ marginTop: "2rem", fontSize: "0.875rem", opacity: 0.7 }}>
        Current primary color (light): {getMcuColor("primary", "light")}
      </p>
    </div>
  );
}

export default Home;
