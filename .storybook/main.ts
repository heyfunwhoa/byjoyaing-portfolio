import type { StorybookConfig } from "@storybook/nextjs-vite";
const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
  viteFinal(config) {
    // Next's Storybook SWC plugin emits obsolete `assert` syntax for `with`.
    // Vite already turns JSON into JS modules, so strip the Node-only attribute
    // from this adapter before SWC runs. Keep the source import for Node tests.
    config.plugins = [
      {
        name: "academy-editorial-json-import",
        enforce: "pre",
        transform(code, id) {
          if (!id.endsWith("/lib/academy/verification-editorial.ts")) return;
          return {
            code: code.replace(' with { type: "json" }', ""),
            map: null,
          };
        },
      },
      ...(config.plugins ?? []),
    ];
    return config;
  },
};
export default config;
