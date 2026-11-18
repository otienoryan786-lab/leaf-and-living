import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

const renderAt = (path) =>
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

test('renders Home at /', () => {
  renderAt('/')
  expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
})

test('renders Shop at /shop', () => {
  renderAt('/shop')
  expect(screen.getByRole('heading', { name: 'Shop' })).toBeInTheDocument()
})

test('shows Not Found for an unknown route', () => {
  renderAt('/nope')
  expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
})