import { Link } from 'react-router-dom'

const fallbackImage = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85'

export default function ProductCard({ product }) {
	const image = product.image?.startsWith('http') ? product.image : fallbackImage

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
