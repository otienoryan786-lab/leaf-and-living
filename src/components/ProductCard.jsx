 import { Link } from 'react-router-dom'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80'

export default function ProductCard({ product }) {
  const {
    id,
    name = 'Unnamed Plant',
    price,
    image,
    imageUrl,
    careLevel,
    care_level,
    category,
  } = product

  const displayImage = image || imageUrl || FALLBACK_IMAGE
  const displayCare = careLevel || care_level || 'Easy'
  const numericPrice = Number(price)
  const formattedPrice = Number.isFinite(numericPrice)
    ? `$${numericPrice.toFixed(2)}`
    : 'Price unavailable'

  return (
    <article className="product-card">
      <Link to={`/products/${id}`} className="product-card-image-wrap">
        <img
          src={displayImage}
          alt={name}
          className="product-card-image"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE) {
              e.currentTarget.src = FALLBACK_IMAGE
            }
          }}
        />
        <span className={`care-badge care-${displayCare.toLowerCase()}`}>
          {displayCare} Care
        </span>
      </Link>

      <div className="product-card-body">
        {category && <span className="product-category">{category}</span>}
        <h2 className="product-card-title">
          <Link to={`/products/${id}`}>{name}</Link>
        </h2>

        <div className="product-card-footer">
          <span className="product-price">{formattedPrice}</span>
          <Link to={`/products/${id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}