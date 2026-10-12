import type { StorybookConfig } from "@storybook/nextjs-vite";
const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
};
export default config;
