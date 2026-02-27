import { Button } from "storybook/internal/components";
import { addons, types, useChannel } from "storybook/manager-api";

const ADDON_ID = "export-figma-tokens";
const TOOL_ID = `${ADDON_ID}/tool`;
const EVENT_EXPORT = `${ADDON_ID}/export`;

function ExportFigmaTokensTool() {
  const emit = useChannel({});

  return (
    <Button
      onClick={() => emit(EVENT_EXPORT)}
      size="small"
      variant="ghost"
      ariaLabel="Export Figma tokens"
      tooltip="Export Figma tokens"
    >
      {/* Download / export icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </Button>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Export Figma tokens",
    render: ExportFigmaTokensTool,
  });
});
