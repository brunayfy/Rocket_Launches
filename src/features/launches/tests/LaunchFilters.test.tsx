import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LaunchFilters from '../components/LaunchFilters'
import { renderWithProviders } from '../../../test/render'

describe('LaunchFilters', () => {
  it('updates search input', () => {
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    fireEvent.change(screen.getByLabelText('Search launches'), {
      target: { value: 'falcon' },
    })

    expect(setParams).toHaveBeenCalled()
  })

  it('updates success filter', () => {
    const setParams = vi.fn()

    renderWithProviders(
      <LaunchFilters
        search=""
        success=""
        upcoming=""
        from=""
        to=""
        setParams={setParams}
      />
    )

    fireEvent.change(screen.getByLabelText('Filter by success'), {
      target: { value: 'true' },
    })

    expect(setParams).toHaveBeenCalled()
  })
})