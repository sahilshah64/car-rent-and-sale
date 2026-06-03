// src/pages/admin/AdminOrders.jsx
import { useState, useEffect } from 'react'
import api from '../../utils/api'

const STATUSES = ['pending','confirmed','completed','cancelled']
const STATUS_COLORS = { pending:'bg-yellow-100 text-yellow-700', confirmed:'bg-blue-100 text-blue-700', completed:'bg-green-100 text-green-700', cancelled:'bg-red-100 text-red-600' }

export default function AdminOrders() {
  const [orders,  setOrders]  = useState([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(1)
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('all')
  const [expanded,setExpanded]= useState(null)

  const PER = 10
  const totalPages = Math.ceil(total / PER)

  useEffect(() => { fetchOrders() }, [page, filter])

  async function fetchOrders() {
    setLoading(true)
    try {
      const params = { page, limit: PER }
      if (filter !== 'all') params.status = filter
      const { data } = await api.get('/orders', { params })
      setOrders(data.orders)
      setTotal(data.total)
    } catch { setOrders([]) }
    finally { setLoading(false) }
  }

  async function updateStatus(id, status) {
    try {
      await api.put(`/orders/${id}/status`, { status })
      fetchOrders()
    } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Orders Management</h1>
          <p className="text-sm text-gray-400 mt-1">{total} total orders</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {['all', ...STATUSES].map(s => (
          <button key={s} onClick={() => { setFilter(s); setPage(1) }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${filter===s?'bg-red-600 text-white':'bg-white border border-gray-200 text-gray-600 hover:border-red-300'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-400"><p className="text-lg font-semibold">No orders found</p></div>
        ) : (
          <div className="divide-y divide-gray-50">
            {orders.map(order => (
              <div key={order._id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-mono text-xs text-gray-400">{order._id?.slice(-10)}</p>
                      <p className="font-semibold text-gray-900">{order.user?.name || 'Guest'}</p>
                      <p className="text-xs text-gray-400">{order.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-black text-gray-900">${order.total}/mo</p>
                      <p className="text-xs text-gray-400">{order.items?.length} car(s)</p>
                    </div>
                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-2 rounded-xl border-2 cursor-pointer focus:outline-none ${STATUS_COLORS[order.status]} border-transparent`}
                    >
                      {STATUSES.map(s => <option key={s} value={s} className="bg-white text-gray-800 font-medium capitalize">{s}</option>)}
                    </select>
                    <button onClick={() => setExpanded(expanded===order._id?null:order._id)} className="text-gray-400 hover:text-gray-700 text-sm font-medium">
                      {expanded===order._id ? '▲ Hide' : '▼ Details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expanded === order._id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Items Ordered</p>
                        {order.items?.map((item,i) => (
                          <div key={i} className="flex items-center gap-3 mb-2">
                            <img src={item.car?.image||'https://placehold.co/40x30?text=Car'} alt="" className="w-10 h-8 object-cover rounded-lg"/>
                            <div>
                              <p className="text-sm font-semibold">{item.car?.name} {item.car?.model}</p>
                              <p className="text-xs text-gray-400">${item.price}/mo</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Shipping Address</p>
                        {order.shippingAddress && (
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.address}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                          </p>
                        )}
                        <p className="text-xs font-bold text-gray-500 mt-3 mb-1 uppercase">Payment</p>
                        <p className="text-sm text-gray-600 capitalize">{order.paymentMethod || 'Card'}</p>
                        <p className="text-xs font-bold text-gray-500 mt-3 mb-1 uppercase">Ordered On</p>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-red-300 disabled:opacity-40 transition-all">Prev</button>
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-red-300 disabled:opacity-40 transition-all">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
