import type { StorybookConfig } from "@storybook/nextjs-vite";
const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-mcp"],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
  // The MCP docs toolset reads this manifest. The addon preset also turns it on.
  features: { componentsManifest: true },
  viteFinal(config) {
    // Next's Storybook SWC plugin emits obsolete `assert` syntax for `with`.
    // Vite already turns JSON into JS modules, so strip the Node-only attribute
    // from the lesson and case-summary adapters before SWC runs. Keep the source import for Node tests.
    config.plugins = [
      {
        name: "academy-editorial-json-import",
        enforce: "pre",
        transform(code, id) {
          if (
            !id.endsWith("/lib/academy/verification-editorial.ts") &&
            !id.endsWith("/lib/academy/lesson-editorial.ts") &&
            !id.endsWith("/lib/case-studies/summaries.ts")
          )
            return;
          return {
            code: code.replaceAll(' with { type: "json" }', ""),
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
