import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Admin from './pages/Admin'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import NotFound from './pages/NotFound'
import useProducts from './hooks/useProducts'

export default function App() {
  // useProducts is called once here: the single source of truth for product data.
  const { products, loading, loadError, refreshProducts,
          addProduct, updateProduct, deleteProduct } = useProducts()

  // Every page receives the same props, so teammates never need to edit this file.
  const data = { products, loading, loadError, refreshProducts,
                 addProduct, updateProduct, deleteProduct }

  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home {...data} />} />
          <Route path="/shop" element={<Shop {...data} />} />
          <Route path="/products/:id" element={<ProductDetails {...data} />} />
          <Route path="/admin" element={<Admin {...data} />} />
          <Route path="/admin/products/new" element={<AddProduct {...data} />} />
          <Route path="/admin/products/:id/edit" element={<EditProduct {...data} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
