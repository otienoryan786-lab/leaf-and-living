import { expect, test, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import * as productsApi from '../api/productsApi'

vi.mock('../api/productsApi', () => ({
  getProducts: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}))

const seed = [
  { id: '1', name: 'Snake Plant', category: 'Indoor', careLevel: 'Easy', description: 'Low light.', price: 850, image: 'snake-plant.svg' },
]

// Mirrors the manual acceptance workflow from the brief, with the API mocked.
test('admin can add, edit and delete a product and see it in the Shop', async () => {
  const user = userEvent.setup()
  const created = { id: '7', name: 'Rubber Plant', category: 'Indoor', careLevel: 'Easy', description: 'Glossy leaves.', price: 1500, image: 'snake-plant.svg' }
  productsApi.getProducts.mockResolvedValue(seed)
  productsApi.createProduct.mockResolvedValue(created)
  productsApi.updateProduct.mockResolvedValue({ ...created, price: 1800 })
  productsApi.deleteProduct.mockResolvedValue(true)

  render(<MemoryRouter initialEntries={['/admin']}><App /></MemoryRouter>)
  const nav = () => screen.getByRole('navigation', { name: /main navigation/i })

  // Add
  await user.click(await screen.findByRole('link', { name: /add product/i }))
  await user.type(screen.getByLabelText('Name'), 'Rubber Plant')
  await user.type(screen.getByLabelText('Description'), 'Glossy leaves.')
  await user.type(screen.getByLabelText('Price (KES)'), '1500')
  await user.click(screen.getByRole('button', { name: 'Save product' }))
  expect(await screen.findByText('Product added.')).toBeInTheDocument()
  expect(productsApi.createProduct).toHaveBeenCalledWith(expect.objectContaining({ name: 'Rubber Plant', price: 1500 }))

  // Find it in the Shop
  await user.click(within(nav()).getByRole('link', { name: 'Shop' }))
  expect(await screen.findByRole('heading', { name: 'Rubber Plant' })).toBeInTheDocument()

  // Edit the price
  await user.click(within(nav()).getByRole('link', { name: 'Admin Portal' }))
  const editLinks = await screen.findAllByRole('link', { name: 'Edit' })
  await user.click(editLinks[editLinks.length - 1])
  const price = await screen.findByLabelText('Price (KES)')
  await user.clear(price)
  await user.type(price, '1800')
  await user.click(screen.getByRole('button', { name: 'Save changes' }))
  expect(await screen.findByText('KES 1,800')).toBeInTheDocument()

  // Delete (confirm)
  const deleteButtons = screen.getAllByRole('button', { name: 'Delete' })
  await user.click(deleteButtons[deleteButtons.length - 1])
  await user.click(screen.getByRole('button', { name: 'Confirm' }))
  expect(productsApi.deleteProduct).toHaveBeenCalledWith('7')
  expect(await screen.findByText('Product deleted.')).toBeInTheDocument()
  expect(screen.queryByText('Rubber Plant')).not.toBeInTheDocument()
})