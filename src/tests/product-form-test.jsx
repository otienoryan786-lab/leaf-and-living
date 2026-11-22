import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

const renderForm = (onSubmit = vi.fn()) => {
  render(
    <MemoryRouter>
      <ProductForm onSubmit={onSubmit} />
    </MemoryRouter>,
  )
  return onSubmit
}

async function fillValid(user, { name = 'Rubber Plant', price = '1500' } = {}) {
  await user.type(screen.getByLabelText('Name'), name)
  await user.type(screen.getByLabelText('Description'), 'A glossy, easy-going plant.')
  await user.type(screen.getByLabelText('Price (KES)'), price)
}

describe('ProductForm', () => {
  it('shows clear messages for empty required fields and does not submit', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()
    await user.click(screen.getByRole('button', { name: 'Save product' }))
    expect(screen.getByText('Enter a plant name.')).toBeInTheDocument()
    expect(screen.getByText('Enter a description.')).toBeInTheDocument()
    expect(screen.getByText('Price must be a number greater than zero.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects a price of zero', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()
    await fillValid(user, { price: '0' })
    await user.click(screen.getByRole('button', { name: 'Save product' }))
    expect(screen.getByText('Price must be a number greater than zero.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects a name made only of spaces', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()
    await fillValid(user, { name: '   ' })
    await user.click(screen.getByRole('button', { name: 'Save product' }))
    expect(screen.getByText('Enter a plant name.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits trimmed values with a numeric price', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()
    await fillValid(user, { name: '  Rubber Plant  ' })
    await user.click(screen.getByRole('button', { name: 'Save product' }))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Rubber Plant',
        category: 'Indoor',
        careLevel: 'Easy',
        price: 1500,
      }),
    )
  })

  it('keeps the typed input and shows an error when saving fails', async () => {
    const user = userEvent.setup()
    renderForm(vi.fn().mockRejectedValue(new Error('Server down')))
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: 'Save product' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Server down')
    expect(screen.getByLabelText('Name')).toHaveValue('Rubber Plant')
  })

  it('cancel links back to the admin list', () => {
    renderForm()
    expect(screen.getByRole('link', { name: 'Cancel' })).toHaveAttribute('href', '/admin')
  })
})