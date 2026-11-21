import { useState, useEffect, useCallback } from 'react'

import {
  getProducts,
  createProduct,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from '../api/productsApi'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const refreshProducts = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      setLoadError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    getProducts()
      .then((data) => {
        if (active) setProducts(data)
      })
      .catch((error) => {
        if (active) setLoadError(error.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  // Add a product
  const addProduct = async (product) => {
    const newProduct = await createProduct(product)

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ])

    return newProduct
  }

  // Update a product
  const updateProduct = async (id, changes) => {
    const updatedProduct = await updateProductApi(id, changes)

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        String(product.id) === String(id)
          ? updatedProduct
          : product
      )
    )

    return updatedProduct
  }

  // Delete a product
  const deleteProduct = async (id) => {
    await deleteProductApi(id)

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => String(product.id) !== String(id)
      )
    )
  }

  return {
    products,
    loading,
    loadError,
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}
