import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#7B61FF" },
        },
      },
      radii: {
        xl: { value: "1rem" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: "#ffffff", _dark: "#0b0d10" },
        },
        cardBg: {
          value: { base: "#f4f4f5", _dark: "#1a1d23" },
        },
        text: {
          value: { base: "#111111", _dark: "#ffffff" },
        },
        mutedText: {
          value: { base: "#555555", _dark: "#a0a0a0" },
        },
        border: {
          value: { base: "#e2e8f0", _dark: "#2d3748" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg",
      color: "text",
    },
    "*::selection": {
      bg: "brand.500",
      color: "white",
    },
  },
})

export const system = createSystem(defaultConfig, config)