import { Link, useParams } from 'react-router-dom'

const fallbackImage = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=90'

export default function ProductDetails({ products = [], loading, loadError, onRetry }) {
  const { id } = useParams()
  const product = products.find((item) => String(item.id) === String(id))

  if (loading) return <p className="empty-state page-container">Loading product…</p>
  if (loadError && products.length === 0) {
    return (
      <section className="page-container empty-state" role="alert">
        <h1>Unable to load product</h1>
        <p>{loadError}</p>
        <button className="button button-secondary" type="button" onClick={onRetry}>
          Try again
        </button>
      </section>
    )
  }
  if (!product) {
    return (
      <section className="page-container empty-state">
        <h1>Product not found</h1>
        <Link className="button button-secondary" to="/shop">Browse plants</Link>
      </section>
    )
  }

  const image = product.image?.startsWith('http') ? product.image : fallbackImage

  return (
    <section className="product-detail page-container">
      <Link className="back-link" to="/shop">&larr; Back to shop</Link>
      <div className="detail-layout">
        <img
          className="detail-image"
          src={image}
          alt={product.name}
          onError={(event) => {
            if (event.currentTarget.src !== fallbackImage) {
              event.currentTarget.src = fallbackImage
            }
          }}
        />
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <span className="care-tag">{product.careLevel} care</span>
          <p className="detail-price">KES {Number(product.price).toLocaleString('en-KE')}</p>
          <p className="detail-description">{product.description}</p>
          <Link className="button button-primary" to="/shop">Explore more plants</Link>
        </div>
      </div>
    </section>
  )
}
