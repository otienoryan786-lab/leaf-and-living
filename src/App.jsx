import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Admin from './pages/Admin'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import NotFound from './pages/NotFound'
import useProducts from './hooks/useProducts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  // useProducts is called once here: the single source of truth for product data.
  const { products, loading, loadError, refreshProducts,
          addProduct, updateProduct, deleteProduct } = useProducts()
  const productData = {
    products,
    loading,
    loadError,
    onRetry: refreshProducts,
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop {...productData} />} />
          <Route path="/products/:id" element={<ProductDetails {...productData} />} />
          <Route path="/admin" element={
            <Admin {...productData} deleteProduct={deleteProduct} />} />
          <Route path="/admin/products/new" element={
            <AddProduct addProduct={addProduct} />} />
          <Route path="/admin/products/:id/edit" element={
            <EditProduct products={products} loading={loading}
                         updateProduct={updateProduct} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}