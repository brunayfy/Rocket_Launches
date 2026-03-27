import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import LaunchDetailPage from "../pages/LaunchDetailPage"

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

describe("LaunchDetailPage", () => {
  it("renders launch details, rocket and launchpad info", async () => {
    const queryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <MemoryRouter initialEntries={["/launch/launch-1"]}>
            <Routes>
              <Route path="/launch/:id" element={<LaunchDetailPage />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>
    )

    expect(await screen.findByText("Mock Launch")).toBeInTheDocument()
    expect(
      await screen.findByText("This is a mocked launch used in tests.")
    ).toBeInTheDocument()
    expect(await screen.findByText(/Falcon 9/)).toBeInTheDocument()
    expect(await screen.findByText(/KSC LC 39A/)).toBeInTheDocument()
    expect(screen.getByText("Wikipedia")).toBeInTheDocument()
    expect(screen.getByText("YouTube")).toBeInTheDocument()
  })
})
