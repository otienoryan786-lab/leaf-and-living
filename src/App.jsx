import { Route, Routes } from 'react-router-dom'
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
  // Initialize the product data hook once for the app.
  useProducts()

  return (
  <div className="app">
    <Navbar />
    <main className="content">
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products/new" element={<AddProduct />} />
        <Route path="/admin/products/:id/edit" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
)
}