import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import LaunchCard from '../components/LaunchCard'
import { renderWithProviders } from '../../../test/render'

describe('LaunchCard', () => {
  const launch = {
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
  }

  it('renders launch information', () => {
    renderWithProviders(<LaunchCard launch={launch} />)

    expect(screen.getByText('Mock Launch')).toBeInTheDocument()
    expect(screen.getByText(/2026|4\/12\/2026|12\/4\/2026/)).toBeInTheDocument()
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('navigates to the detail route when clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <Routes>
        <Route path="/" element={<LaunchCard launch={launch} />} />
        <Route path="/launch/:id" element={<div>Detail Page</div>} />
      </Routes>,
      { route: '/' },
    )

    await user.click(screen.getByText('Mock Launch'))

    expect(await screen.findByText('Detail Page')).toBeInTheDocument()
  })
})