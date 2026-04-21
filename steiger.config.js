// ./steiger.config.js
import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // disable the `public-api` rule for files in the Shared layer
    files: ["./src/**"],
    rules: {
      "fsd/segments-by-purpose": "off",
      "fsd/public-api": "off",
      "fsd/no-segmentless-slices": "off",
      "fsd/no-reserved-folder-names": "off",
      "fsd/no-public-api-sidestep": "off",
      "fsd/insignificant-slice": "warn",
    },
  },
]);
