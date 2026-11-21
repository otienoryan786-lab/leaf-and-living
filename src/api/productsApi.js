const API_URL = 'http://localhost:3001/products'

// Get all products
export async function getProducts() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return response.json()
}

// Add a new product
export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('Failed to add product')
  }

  return response.json()
}

// Update an existing product
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('Failed to update product')
  }

  return response.json()
}

// Delete a product
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete product')
  }

  return true
}
