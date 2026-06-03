// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { AuthProvider }  from './context/AuthContext'
import { CartProvider }  from './context/CartContext'

// Layout
import Navbar  from './components/Navbar/Navbar'
import Footer  from './components/Footer/Footer'

// Public Pages
import HomePage       from './pages/HomePage'
import InventoryPage  from './pages/InventoryPage'
import CarDetailPage  from './pages/CarDetailPage'
import CheckoutPage   from './pages/CheckoutPage'
import OrdersPage     from './pages/OrdersPage'
import ContactPage    from './pages/ContactPage'
import { BlogListPage, BlogDetailPage } from './pages/BlogPage'
import { LoginPage, RegisterPage }      from './pages/AuthPages'

// Admin Pages
import AdminLayout    from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCars      from './pages/admin/AdminCars'
import AdminOrders    from './pages/admin/AdminOrders'
import AdminBlogs     from './pages/admin/AdminBlogs'
import AdminUsers     from './pages/admin/AdminUsers'

// Pages that use the main Navbar + Footer layout
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* ── Public pages (Navbar + Footer) ── */}
          <Route path="/"          element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/inventory" element={<PublicLayout><InventoryPage /></PublicLayout>} />
          <Route path="/car/:id"   element={<PublicLayout><CarDetailPage /></PublicLayout>} />
          <Route path="/checkout"  element={<PublicLayout><CheckoutPage /></PublicLayout>} />
          <Route path="/orders"    element={<PublicLayout><OrdersPage /></PublicLayout>} />
          <Route path="/blog"      element={<PublicLayout><BlogListPage /></PublicLayout>} />
          <Route path="/blog/:id"  element={<PublicLayout><BlogDetailPage /></PublicLayout>} />
          <Route path="/contact"   element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/register"  element={<RegisterPage />} />

          {/* ── Admin Panel (own layout, no public navbar) ── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index          element={<AdminDashboard />} />
            <Route path="cars"    element={<AdminCars />} />
            <Route path="orders"  element={<AdminOrders />} />
            <Route path="blogs"   element={<AdminBlogs />} />
            <Route path="users"   element={<AdminUsers />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
