import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from './productsApi'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('productsApi', () => {
  it('loads products', async () => {
    const products = [{ id: '1', name: 'Snake Plant' }]
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(products),
    }))

    await expect(getProducts()).resolves.toEqual(products)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/products')
  })

  it('creates a product', async () => {
    const product = { name: 'Aloe Vera' }
    const created = { id: '2', ...product }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(created),
    }))

    await expect(createProduct(product)).resolves.toEqual(created)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
  })

  it('updates a product', async () => {
    const changes = { price: 900 }
    const updated = { id: '1', name: 'Snake Plant', ...changes }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(updated),
    }))

    await expect(updateProduct('1', changes)).resolves.toEqual(updated)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/products/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
  })

  it('deletes a product', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))

    await expect(deleteProduct('1')).resolves.toBe(true)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/products/1', {
      method: 'DELETE',
    })
  })

  it('reports response failures with stable API messages', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(getProducts()).rejects.toThrow('Failed to load products')
    await expect(createProduct({ name: 'Aloe Vera' }))
      .rejects.toThrow('Failed to add product')
    await expect(updateProduct('1', { price: 900 }))
      .rejects.toThrow('Failed to update product')
    await expect(deleteProduct('1'))
      .rejects.toThrow('Failed to delete product')
  })
})
