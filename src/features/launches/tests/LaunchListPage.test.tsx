// integration test using React Query + Router + MSW
import { render, screen } from '@testing-library/react'
import LaunchListPage from '../pages/LaunchListPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

it('renders mocked launch', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LaunchListPage />
      </BrowserRouter>
    </QueryClientProvider>
  )

  expect(await screen.findByText('Mock Launch')).toBeInTheDocument()
})