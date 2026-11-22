import { Link } from 'react-router-dom'
import { FALLBACK_IMAGE as fallbackImage, resolveImage } from '../utils/images'

export default function ProductCard({ product }) {
  const image = resolveImage(product.image)

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`}>
        <img
          className="product-image"
          src={image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = fallbackImage
          }}
        />
      </Link>
      <div className="product-card-content">
        <p className="product-category">{product.category}</p>
        <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
        <span className={`care-tag care-${product.careLevel?.toLowerCase()}`}>
          {product.careLevel}
        </span>
        <p className="product-price">KES {Number(product.price).toLocaleString('en-KE')}</p>
        <Link className="text-link" to={`/products/${product.id}`}>
          View details <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  )
}