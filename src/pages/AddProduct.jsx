import { Link, useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

export default function AddProduct({ addProduct }) {
  const navigate = useNavigate()

  const handleAdd = async (product) => {
    await addProduct(product)
        navigate('/admin', { state: { notice: 'Product added.' } })
  }

  return (
    <section className="form-page page-container">
      <Link className="back-link" to="/admin">&larr; Back to catalogue</Link>
      <div className="form-panel">
        <p className="eyebrow">Catalogue management</p>
        <h1>Add product</h1>
        <ProductForm onSubmit={handleAdd} />
      </div>
    </section>
  )
}
