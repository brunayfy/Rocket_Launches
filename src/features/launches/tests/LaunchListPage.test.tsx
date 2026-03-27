import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LaunchListPage from '../pages/LaunchListPage'
import { renderWithProviders } from '../../../test/render'

describe('LaunchListPage', () => {
  it('loads and displays launches from the API', async () => {
    renderWithProviders(<LaunchListPage />)

    expect(await screen.findByText('Mock Launch')).toBeInTheDocument()
    expect(screen.getByText('Page 1')).toBeInTheDocument()
  })

  it('renders visible filter labels and controls', () => {
    renderWithProviders(<LaunchListPage />)

    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByText('To')).toBeInTheDocument()

    expect(screen.getByLabelText('Search launches')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by success')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by upcoming launches')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter from date')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter to date')).toBeInTheDocument()
  })

  it('navigates to detail page on click', async () => {
    renderWithProviders(<LaunchListPage />)

    const card = await screen.findByText('Mock Launch')

    fireEvent.click(card)

    expect(await screen.findByText('Details')).toBeInTheDocument()
  })
})