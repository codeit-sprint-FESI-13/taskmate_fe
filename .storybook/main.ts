import type { StorybookConfig } from "@storybook/nextjs-vite";

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
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
};
export default config;
