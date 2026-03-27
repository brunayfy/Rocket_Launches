import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LaunchCard from '../components/LaunchCard'
import { renderWithProviders } from '../../../test/render'

describe('LaunchCard', () => {
  it('renders launch name and date', () => {
    renderWithProviders(
      <LaunchCard
        launch={{
          id: 'launch-1',
          name: 'Mock Launch',
          date_utc: '2026-04-12T10:00:00.000Z',
          success: true,
          upcoming: false,
          links: {
            patch: {
              small: null,
            },
          },
        }}
      />,
    )

    expect(screen.getByText('Mock Launch')).toBeInTheDocument()
    expect(screen.getByText(/2026|4\/12\/2026|12\/4\/2026/)).toBeInTheDocument()
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})