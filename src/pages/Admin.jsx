import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Admin({ products, loading, loadError, onRetry, deleteProduct }) {
  const [confirmingId, setConfirmingId] = useState(null)
  const [error, setError] = useState('')

  const handleDelete = async (id) => {
    setError('')
    try {
      await deleteProduct(id)
      setConfirmingId(null)
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete the product.')
    }
  }

  return (
    <section className="page-container admin-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalogue management</p>
          <h1>Admin portal</h1>
        </div>
        <Link className="button button-primary" to="/admin/products/new">Add product <span aria-hidden="true">+</span></Link>
      </div>
      <p className="page-intro">Manage product details, prices and availability in the Leaf &amp; Living catalogue.</p>
      {(loadError || error) && (
        <div className="notice notice-error" role="alert">
          <span>{error || loadError}</span>
          {loadError && !error && (
            <button className="button button-secondary" type="button" onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      )}
      {loading ? <p className="empty-state">Loading products…</p> : (
        <div className="table-wrap">
          <table className="product-table">
            <thead>
              <tr><th>Product</th><th>Category</th><th>Care level</th><th>Price</th><th><span className="visually-hidden">Actions</span></th></tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td data-label="Product"><strong>{product.name}</strong></td>
                  <td data-label="Category">{product.category}</td>
                  <td data-label="Care level"><span className="care-tag">{product.careLevel}</span></td>
                  <td data-label="Price">KES {Number(product.price).toLocaleString('en-KE')}</td>
                  <td className="table-actions" data-label="Actions">
                    {confirmingId === product.id ? (
                      <span className="confirm-actions">
                        <span>Delete?</span>
                        <button className="text-button text-danger" onClick={() => handleDelete(product.id)}>Confirm</button>
                        <button className="text-button" onClick={() => setConfirmingId(null)}>Cancel</button>
                      </span>
                    ) : (
                      <>
                        <Link className="text-link" to={`/admin/products/${product.id}/edit`}>Edit</Link>
                        <button className="text-button text-danger" onClick={() => setConfirmingId(product.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!products.length && <p className="empty-state">No products yet. Add the first plant to your catalogue.</p>}
        </div>
      )}
    </section>
  )
}
