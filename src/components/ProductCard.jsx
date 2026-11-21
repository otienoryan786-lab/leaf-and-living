 import { Link } from 'react-router-dom'
import fallbackImage from '../assets/hero.png'

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

  const displayImage = image || imageUrl || fallbackImage
  const displayCare = careLevel || care_level || 'Easy'
  const numericPrice = Number(price)
  const formattedPrice = Number.isFinite(numericPrice)
    ? `KES ${numericPrice.toLocaleString()}`
    : 'Price unavailable'

  return (
    <article className="card product-card">
      <Link to={`/products/${id}`} className="product-card__media">
        <img
          src={displayImage}
          alt={name}
          className="product-card__image"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== fallbackImage) {
              e.currentTarget.src = fallbackImage
            }
          }}
        />
      </Link>

      <div className="product-card__body">
        <h3 className="product-card__title">{name}</h3>
        {category && <p className="product-card__category">{category}</p>}
        <div className="product-card__meta">
          <span className={`badge badge--${displayCare.toLowerCase()}`}>{displayCare}</span>
        </div>
        <p className="product-card__price">{formattedPrice}</p>
        <Link to={`/products/${id}`} className="product-card__link">
          View Details
        </Link>
      </div>
    </article>
  )
}