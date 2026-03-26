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
  },
  globalCss: {
    html: {
      colorPalette: "gray",
    },
    body: {
      bg: "black",
      color: "white",
    },
    "*::selection": {
      bg: "brand.500",
      color: "white",
    },
  },
})

export const system = createSystem(defaultConfig, config)