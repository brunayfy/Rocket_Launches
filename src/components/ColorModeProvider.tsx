import { ThemeProvider, useTheme } from "next-themes"
import { ClientOnly, IconButton } from "@chakra-ui/react"
import { LuMoon, LuSun } from "react-icons/lu"
import type { ThemeProviderProps } from "next-themes"
import type { IconButtonProps } from "@chakra-ui/react"

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="dark"
      {...props}
    />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return {
    colorMode: resolvedTheme,
    toggleColorMode,
    setColorMode: setTheme,
  }
}

export function ColorModeButton(props: IconButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <ClientOnly fallback={<IconButton aria-label="Loading theme" {...props} />}>
      <IconButton
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        variant="outline"
        size="sm"
        {...props}
      >
        {colorMode === "dark" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}
