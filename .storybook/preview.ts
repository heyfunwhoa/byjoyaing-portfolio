import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    backgrounds: { options: { paper: { name: "Paper", value: "#f3efe6" }, charcoal: { name: "Charcoal", value: "#1b211d" } } },
  },
  initialGlobals: { backgrounds: { value: "paper" } },
};
export default preview;
