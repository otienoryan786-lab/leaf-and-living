import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from '../pages/ProductDetails'

const products = [
  { id: '1', name: 'Snake Plant', category: 'Indoor', careLevel: 'Easy', description: 'Low light friendly.', price: 850, image: 'snake-plant.svg' },
]

const renderAt = (path, props = {}) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetails products={products} {...props} />} />
      </Routes>
    </MemoryRouter>,
  )

describe('ProductDetails', () => {
  it('shows the selected product information', () => {
    renderAt('/products/1')
    expect(screen.getByRole('heading', { name: 'Snake Plant' })).toBeInTheDocument()
    expect(screen.getByText('KES 850')).toBeInTheDocument()
    expect(screen.getByText('Low light friendly.')).toBeInTheDocument()
    expect(screen.getByText(/easy care/i)).toBeInTheDocument()
  })

  it('shows a not-found message for a missing product', () => {
    renderAt('/products/99')
    expect(screen.getByRole('heading', { name: 'Product not found' })).toBeInTheDocument()
  })

  it('shows a loading message', () => {
    renderAt('/products/1', { loading: true })
    expect(screen.getByText('Loading product…')).toBeInTheDocument()
  })
})