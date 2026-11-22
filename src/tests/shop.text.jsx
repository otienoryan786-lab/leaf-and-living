import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Shop from '../pages/Shop'

const products = [
  { id: '1', name: 'Snake Plant', category: 'Indoor', careLevel: 'Easy', description: 'Low light.', price: 850, image: 'snake-plant.svg' },
  { id: '2', name: 'Aloe Vera', category: 'Succulents', careLevel: 'Easy', description: 'Sun lover.', price: 600, image: 'aloe-vera.svg' },
  { id: '3', name: 'Peace Lily', category: 'Indoor', careLevel: 'Moderate', description: 'White blooms.', price: 1200, image: 'peace-lily.svg' },
  { id: '4', name: 'Fiddle Leaf Fig', category: 'Indoor', careLevel: 'Experienced', description: 'Statement tree.', price: 2800, image: 'fiddle-leaf-fig.svg' },
]

const renderShop = (props = {}) =>
  render(
    <MemoryRouter>
      <Shop products={products} loading={false} loadError={null} {...props} />
    </MemoryRouter>,
  )

describe('Shop', () => {
  it('shows each product with its price and the result count', () => {
    renderShop()
    expect(screen.getByRole('heading', { name: 'Snake Plant' })).toBeInTheDocument()
    expect(screen.getByText('KES 850')).toBeInTheDocument()
    expect(screen.getByText('4 plants found')).toBeInTheDocument()
  })

  it('searches by name', async () => {
    const user = userEvent.setup()
    renderShop()
    await user.type(screen.getByLabelText('Search'), 'aloe')
    expect(screen.getByText('1 plant found')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Snake Plant' })).not.toBeInTheDocument()
  })

  it('searches by category', async () => {
    const user = userEvent.setup()
    renderShop()
    await user.type(screen.getByLabelText('Search'), 'succulents')
    expect(screen.getByText('1 plant found')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Aloe Vera' })).toBeInTheDocument()
  })

  it('filters by care level', async () => {
    const user = userEvent.setup()
    renderShop()
    await user.selectOptions(screen.getByLabelText('Care level'), 'Moderate')
    expect(screen.getByText('1 plant found')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Peace Lily' })).toBeInTheDocument()
  })

  it('combines search and care-level filter', async () => {
    const user = userEvent.setup()
    renderShop()
    await user.type(screen.getByLabelText('Search'), 'indoor')
    await user.selectOptions(screen.getByLabelText('Care level'), 'Easy')
    expect(screen.getByText('1 plant found')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Snake Plant' })).toBeInTheDocument()
  })

  it('resets search and filter', async () => {
    const user = userEvent.setup()
    renderShop()
    await user.type(screen.getByLabelText('Search'), 'aloe')
    await user.click(screen.getByRole('button', { name: 'Reset filters' }))
    expect(screen.getByLabelText('Search')).toHaveValue('')
    expect(screen.getByText('4 plants found')).toBeInTheDocument()
  })

  it('shows an empty-results message when nothing matches', async () => {
    const user = userEvent.setup()
    renderShop()
    await user.type(screen.getByLabelText('Search'), 'zzz')
    expect(screen.getByRole('heading', { name: /no plants match/i })).toBeInTheDocument()
  })

  it('shows a loading state', () => {
    renderShop({ products: [], loading: true })
    expect(screen.getByText('Loading plants…')).toBeInTheDocument()
  })

  it('shows an error and retries', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    renderShop({ products: [], loadError: 'Network error', onRetry })
    expect(screen.getAllByText('Network error').length).toBeGreaterThan(0)
    await user.click(screen.getByRole('button', { name: /try again/i }))
    expect(onRetry).toHaveBeenCalled()
  })
})