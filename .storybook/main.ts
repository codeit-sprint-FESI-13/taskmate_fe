import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "path";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: [
    // 스토리북 파일 경로 설정
    "../src/**/**/*.stories.{js,jsx,ts,tsx}",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],

  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      image: {
        excludeFiles: ["/**/*.svg"],
      },
    },
  },
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins || []),
      svgr({
        include: "**/*.svg",
      }),
    ];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@": path.resolve(__dirname, "../src"),
      },
    };
    return config;
  },
  staticDirs: ["../public"],
};
export default config;
