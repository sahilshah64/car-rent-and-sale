// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'

function StatCard({ icon, label, value, color, to }) {
  return (
    <Link to={to} className={`${color} rounded-2xl p-6 text-white hover:opacity-90 transition-opacity`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">View All →</span>
      </div>
      <p className="text-3xl font-black mb-1">{value}</p>
      <p className="text-sm font-medium opacity-80">{label}</p>
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats,   setStats]   = useState({ cars:0, orders:0, users:0, blogs:0, revenue:0 })
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/cars?limit=1'),
      api.get('/orders?limit=5'),
      api.get('/users?limit=1'),
      api.get('/blogs?limit=1'),
    ]).then(([cars, orders, users, blogs]) => {
      setStats({
        cars:    cars.data.total    || 0,
        orders:  orders.data.total  || 0,
        users:   users.data.total   || 0,
        blogs:   blogs.data.total   || 0,
        revenue: orders.data.orders?.reduce((s,o) => s + (o.total||0), 0) || 0,
      })
      setOrders(orders.data.orders || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard icon="🚗" label="Total Cars"    value={stats.cars}   color="bg-red-600"    to="/admin/cars"   />
        <StatCard icon="📦" label="Total Orders"  value={stats.orders} color="bg-blue-600"   to="/admin/orders" />
        <StatCard icon="👥" label="Total Users"   value={stats.users}  color="bg-green-600"  to="/admin/users"  />
        <StatCard icon="✍️" label="Blog Posts"    value={stats.blogs}  color="bg-purple-600" to="/admin/blogs"  />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-red-600 font-semibold hover:underline">View All</Link>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Order ID','Customer','Items','Total','Status','Date'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                  <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{o._id?.slice(-8)}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{o.user?.name || 'Guest'}</td>
                    <td className="px-6 py-4 text-gray-600">{o.items?.length || 0} car(s)</td>
                    <td className="px-6 py-4 font-bold text-gray-900">${o.total}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${
                        o.status==='completed'?'bg-green-100 text-green-700':
                        o.status==='confirmed'?'bg-blue-100 text-blue-700':
                        o.status==='cancelled'?'bg-red-100 text-red-600':
                        'bg-yellow-100 text-yellow-700'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
