import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "../theme/theme"
import { ColorModeProvider } from "../components/ColorModeProvider"

const queryClient = new QueryClient()

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <ColorModeProvider>{children}</ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}