import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useProducts from './useProducts'
import * as productsApi from '../api/productsApi'

vi.mock('../api/productsApi', () => ({
  getProducts: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}))

const seedProducts = [
  {
    id: '1',
    name: 'Snake Plant',
    category: 'Indoor',
    careLevel: 'Easy',
    description: 'A low-maintenance plant.',
    price: 850,
    image: 'snake-plant.jpg',
  },
]

describe('useProducts', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    productsApi.getProducts.mockResolvedValue(seedProducts)
  })

  it('loads products successfully', async () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toEqual(seedProducts)
    expect(result.current.loadError).toBeNull()
  })

  it('reports a loading error', async () => {
    productsApi.getProducts.mockRejectedValueOnce(new Error('Network error'))
    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loadError).toBe('Network error'))

    expect(result.current.products).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('retries loading when refreshProducts is called', async () => {
    productsApi.getProducts
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(seedProducts)
    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loadError).toBe('Network error'))

    await act(async () => {
      await result.current.refreshProducts()
    })

    expect(result.current.products).toEqual(seedProducts)
    expect(result.current.loadError).toBeNull()
    expect(productsApi.getProducts).toHaveBeenCalledTimes(2)
  })

  it('adds a product after the API request succeeds', async () => {
    const newProduct = { ...seedProducts[0], id: '2', name: 'Aloe Vera' }
    productsApi.createProduct.mockResolvedValueOnce(newProduct)
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.addProduct(newProduct)
    })

    expect(productsApi.createProduct).toHaveBeenCalledWith(newProduct)
    expect(result.current.products).toEqual([...seedProducts, newProduct])
  })

  it('updates a product after the API request succeeds', async () => {
    const updatedProduct = { ...seedProducts[0], price: 900 }
    productsApi.updateProduct.mockResolvedValueOnce(updatedProduct)
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.updateProduct('1', { price: 900 })
    })

    expect(productsApi.updateProduct).toHaveBeenCalledWith('1', { price: 900 })
    expect(result.current.products).toEqual([updatedProduct])
  })

  it('deletes a product after the API request succeeds', async () => {
    productsApi.deleteProduct.mockResolvedValueOnce(true)
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.deleteProduct('1')
    })

    expect(productsApi.deleteProduct).toHaveBeenCalledWith('1')
    expect(result.current.products).toEqual([])
  })

  it('preserves existing products when a mutation fails', async () => {
    const originalProducts = resultProducts()
    productsApi.createProduct.mockRejectedValueOnce(new Error('Create failed'))
    productsApi.updateProduct.mockRejectedValueOnce(new Error('Update failed'))
    productsApi.deleteProduct.mockRejectedValueOnce(new Error('Delete failed'))
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await expect(result.current.addProduct({ name: 'Aloe Vera' }))
      .rejects.toThrow('Create failed')
    expect(result.current.products).toEqual(originalProducts)

    await expect(result.current.updateProduct('1', { price: 900 }))
      .rejects.toThrow('Update failed')
    expect(result.current.products).toEqual(originalProducts)

    await expect(result.current.deleteProduct('1'))
      .rejects.toThrow('Delete failed')
    expect(result.current.products).toEqual(originalProducts)
  })
})

function resultProducts() {
  return seedProducts.map((product) => ({ ...product }))
}