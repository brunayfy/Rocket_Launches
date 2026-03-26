// unit test
import { render, screen } from '@testing-library/react'
import LaunchCard from '../components/LaunchCard'

it('renders launch name', () => {
  render(<LaunchCard launch={{ id: '1', name: 'Test', links: { patch: { small: '' } } }} />)
  expect(screen.getByText('Test')).toBeInTheDocument()
})

