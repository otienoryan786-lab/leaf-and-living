import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

export default function EditProduct({ products, loading, updateProduct }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => String(item.id) === String(id))

  const handleUpdate = async (changes) => {
    await updateProduct(id, changes)
    navigate('/admin')
  }

  if (loading) return <p className="empty-state page-container">Loading product…</p>
  if (!product) {
    return (
      <section className="page-container empty-state">
        <h1>Product not found</h1>
        <Link className="button button-secondary" to="/admin">Back to catalogue</Link>
      </section>
    )
  }

  return (
    <section className="form-page page-container">
      <Link className="back-link" to="/admin">&larr; Back to catalogue</Link>
      <div className="form-panel">
        <p className="eyebrow">Catalogue management</p>
        <h1>Edit product</h1>
        <ProductForm initialValues={product} onSubmit={handleUpdate} submitLabel="Save changes" />
      </div>
    </section>
  )
}
