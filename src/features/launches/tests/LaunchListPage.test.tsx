import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import LaunchListPage from '../pages/LaunchListPage'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/mocks/server'

describe('LaunchListPage', () => {
  it('moves to the next page when clicking Next', async () => {
    server.use(
      http.post('https://api.spacexdata.com/v4/launches/query', async ({ request }) => {
        const body = (await request.json()) as {
          options?: { page?: number }
        }

        const page = body.options?.page ?? 1

        return HttpResponse.json({
          docs: [
            {
              id: `launch-${page}`,
              name: page === 1 ? 'Mock Launch Page 1' : 'Mock Launch Page 2',
              date_utc: '2026-04-12T10:00:00.000Z',
              success: true,
              upcoming: false,
              rocket: {
                id: 'rocket-1',
                name: 'Falcon 9',
                type: 'rocket',
              },
              launchpad: {
                id: 'launchpad-1',
                name: 'KSC LC 39A',
                locality: 'Cape Canaveral',
                region: 'Florida',
              },
              links: {
                patch: { small: null },
                flickr: { original: [] },
                wikipedia: null,
                webcast: null,
                youtube_id: null,
              },
            },
          ],
          hasNextPage: page === 1,
          hasPrevPage: page > 1,
          page,
          totalPages: 2,
        })
      }),
    )

    const user = userEvent.setup()
    renderWithProviders(<LaunchListPage />, { route: '/?page=1' })

    expect(await screen.findByText('Mock Launch Page 1')).toBeInTheDocument()

    const nextButton = await screen.findByRole('button', { name: /next/i })
    expect(nextButton).toBeEnabled()

    await user.click(nextButton)

    expect(await screen.findByText('Mock Launch Page 2')).toBeInTheDocument()
    expect(screen.getByText((_, node) => node?.textContent === 'Page 2')).toBeInTheDocument()
  })
})