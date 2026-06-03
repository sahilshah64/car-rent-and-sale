// src/pages/OrdersPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

const STATUS_COLORS = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function OrdersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    api.get('/orders/myorders')
      .then(r => setOrders(r.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-16"><div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold mb-4">No orders yet</p>
            <button onClick={() => navigate('/inventory')} className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">Browse Cars</button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="font-mono text-sm font-semibold text-gray-700">{order._id}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={item.car?.image || 'https://placehold.co/48x36?text=Car'} alt="" className="w-12 h-9 object-cover rounded-lg"/>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{item.car?.name} {item.car?.model}</p>
                        <p className="text-xs text-gray-400">{item.car?.year}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">${item.price}/mo</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p>
                  <p className="font-black text-gray-900">Total: ${order.total}/mo</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
