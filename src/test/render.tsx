import { type ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router-dom"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "../components/ColorModeProvider"

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

type CustomRenderOptions = {
  route?: string
} & Omit<RenderOptions, "wrapper">

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", ...options }: CustomRenderOptions = {}
) {
  const queryClient = createTestQueryClient()

  window.history.pushState({}, "Test page", route)

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
          </ColorModeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    ),
    ...options,
  })
}
