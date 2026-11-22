import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Admin from '../pages/Admin'

const products = [
  { id: '1', name: 'Snake Plant', category: 'Indoor', careLevel: 'Easy', description: 'x', price: 850, image: 'snake-plant.svg' },
]

const renderAdmin = (props = {}) =>
  render(
    <MemoryRouter>
      <Admin products={products} loading={false} loadError={null} onRetry={vi.fn()} deleteProduct={vi.fn()} {...props} />
    </MemoryRouter>,
  )

describe('Admin', () => {
  it('lists products with Edit and Delete actions and an Add link', () => {
    renderAdmin()
    expect(screen.getByText('Snake Plant')).toBeInTheDocument()
    expect(screen.getByText('KES 850')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('href', '/admin/products/1/edit')
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /add product/i })).toHaveAttribute('href', '/admin/products/new')
  })

  it('does not delete when the confirmation is cancelled', async () => {
    const user = userEvent.setup()
    const deleteProduct = vi.fn()
    renderAdmin({ deleteProduct })
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(deleteProduct).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('deletes after confirmation and shows a success message', async () => {
    const user = userEvent.setup()
    const deleteProduct = vi.fn().mockResolvedValue(undefined)
    renderAdmin({ deleteProduct })
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(deleteProduct).toHaveBeenCalledWith('1')
    expect(await screen.findByText('Product deleted.')).toBeInTheDocument()
  })

  it('shows an error when deleting fails', async () => {
    const user = userEvent.setup()
    renderAdmin({ deleteProduct: vi.fn().mockRejectedValue(new Error('Delete failed')) })
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Delete failed')
  })
})