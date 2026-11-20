 import { Link, useParams } from 'react-router-dom'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80'

export default function ProductDetails({
  products = [],
  loading = false,
  loadError = null,
  onRetry,
}) {
  const { id } = useParams()

  const product = products.find((item) => String(item.id) === String(id))

  return (
    <div className="page-wrapper">

      <main className="container details-main">
        <div className="details-back-row">
          <Link to="/shop" className="btn btn-outline btn-sm">
            &larr; Back to Shop
          </Link>
        </div>

        {loading ? (
          <div className="status-box" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <h2>Loading plant details...</h2>
            <p>Fetching information from the Leaf &amp; Living greenhouse.</p>
          </div>
        ) : loadError ? (
          <div className="status-box status-error" role="alert">
            <h2>Unable to load plant details</h2>
            <p>{loadError}</p>
            {typeof onRetry === 'function' && (
              <button type="button" className="btn btn-primary" onClick={onRetry}>
                Try Again
              </button>
            )}
          </div>
        ) : !product ? (
          <div className="status-box" role="alert">
            <h2>Plant not found</h2>
            <p>
              We couldn&apos;t find a plant matching ID &ldquo;{id}&rdquo;. It may have been
              removed or the link may be incorrect.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Browse All Plants
            </Link>
          </div>
        ) : (
          <ProductDetailsContent product={product} />
        )}
      </main>
    </div>
  )
}

function ProductDetailsContent({ product }) {
  const {
    name = 'Unnamed Plant',
    price,
    description = 'No description available for this plant yet.',
    image,
    imageUrl,
    careLevel,
    care_level,
    category,
    light,
    water,
  } = product

  const displayImage = image || imageUrl || FALLBACK_IMAGE
  const displayCare = careLevel || care_level || 'Easy'
  const numericPrice = Number(price)
  const formattedPrice = Number.isFinite(numericPrice)
    ? `$${numericPrice.toFixed(2)}`
    : 'Price unavailable'

  return (
    <article className="details-card">
      <div className="details-image-wrap">
        <img
          src={displayImage}
          alt={name}
          className="details-image"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE) {
              e.currentTarget.src = FALLBACK_IMAGE
            }
          }}
        />
      </div>

      <div className="details-body">
        <div className="details-badges">
          <span className={`care-badge care-${displayCare.toLowerCase()}`}>
            {displayCare} Care
          </span>
          {category && <span className="product-category">{category}</span>}
        </div>

        <h1 className="details-title">{name}</h1>
        <p className="details-price">{formattedPrice}</p>
        <p className="details-description">{description}</p>

        {(light || water) && (
          <dl className="details-specs">
            {light && (
              <div>
                <dt>Light</dt>
                <dd>{light}</dd>
              </div>
            )}
            {water && (
              <div>
                <dt>Watering</dt>
                <dd>{water}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="details-actions">
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </article>
  )
}
