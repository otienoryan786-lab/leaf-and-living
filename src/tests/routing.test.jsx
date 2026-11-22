import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { test, expect, vi } from 'vitest'
import App from '../App'
import * as productsApi from '../api/productsApi'

vi.mock('../api/productsApi', () => ({
  getProducts: vi.fn().mockResolvedValue([]),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}))

const renderAt = (path) =>
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

test('renders the home page at /', () => {
  renderAt('/')
  expect(screen.getByRole('heading', { name: /a little green/i })).toBeInTheDocument()
})

test('renders the plant shop at /shop', () => {
  renderAt('/shop')
  expect(screen.getByRole('heading', { name: 'Shop plants' })).toBeInTheDocument()
})

test('retries loading a product from its details page', async () => {
  const user = userEvent.setup()
  const product = {
    id: '1',
    name: 'Snake Plant',
    category: 'Indoor',
    careLevel: 'Easy',
    description: 'Low maintenance.',
    price: 850,
    image: 'snake-plant.jpg',
  }
  productsApi.getProducts
    .mockRejectedValueOnce(new Error('Network error'))
    .mockResolvedValueOnce([product])

  renderAt('/products/1')

  expect(await screen.findByText('Network error')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /try again/i }))

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'Snake Plant' })).toBeInTheDocument()
  })
})

test('shows Not Found for an unknown route', () => {
  renderAt('/nope')
  expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
})