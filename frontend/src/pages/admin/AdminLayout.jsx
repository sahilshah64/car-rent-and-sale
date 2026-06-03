// src/pages/admin/AdminLayout.jsx
import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const MENU = [
  { label: 'Dashboard',  to: '/admin',           icon: '📊' },
  { label: 'Cars',       to: '/admin/cars',       icon: '🚗' },
  { label: 'Orders',     to: '/admin/orders',     icon: '📦' },
  { label: 'Blog Posts', to: '/admin/blogs',      icon: '✍️' },
  { label: 'Users',      to: '/admin/users',      icon: '👥' },
]

export default function AdminLayout() {
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate  = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700 mb-4">Admin access required</p>
          <button onClick={() => navigate('/login')} className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl">Login</button>
        </div>
      </div>
    )
  }

  function handleLogout() { logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2 font-black text-lg">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-xs font-black">Z</span></div>
            ZOOMCAR
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">✕</button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {MENU.map(m => {
            const active = location.pathname === m.to
            return (
              <Link key={m.to} to={m.to} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <span>{m.icon}</span>{m.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-black">{user.name?.charAt(0)}</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
          <Link to="/" className="text-sm text-red-600 font-semibold hover:underline">← View Site</Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
