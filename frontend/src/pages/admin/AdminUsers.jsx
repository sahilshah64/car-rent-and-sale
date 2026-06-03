// src/pages/admin/AdminUsers.jsx
import { useState, useEffect } from 'react'
import api from '../../utils/api'

export default function AdminUsers() {
  const [users,   setUsers]   = useState([])
  const [total,   setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [deleteId,setDeleteId]= useState(null)

  useEffect(() => { fetchUsers() }, [search])

  async function fetchUsers() {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      const { data } = await api.get('/users', { params })
      setUsers(data.users || data)
      setTotal(data.total || (data.users||data).length)
    } catch { setUsers([]) }
    finally { setLoading(false) }
  }

  async function toggleRole(id, currentRole) {
    try {
      await api.put(`/users/${id}/role`, { role: currentRole === 'admin' ? 'user' : 'admin' })
      fetchUsers()
    } catch {}
  }

  async function handleDelete(id) {
    try { await api.delete(`/users/${id}`); setDeleteId(null); fetchUsers() } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Users Management</h1>
          <p className="text-sm text-gray-400 mt-1">{total} registered users</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"/>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-400"><p className="text-lg font-semibold">No users found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['User','Email','Role','Joined','Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${user.role==='admin'?'bg-red-100 text-red-600':'bg-gray-100 text-gray-600'}`}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleRole(user._id, user.role)} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors text-xs font-semibold" title={user.role==='admin'?'Make User':'Make Admin'}>
                          {user.role === 'admin' ? '👤' : '🛡️'}
                        </button>
                        <button onClick={() => setDeleteId(user._id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-black mb-2">Delete this user?</h3>
            <p className="text-sm text-gray-500 mb-6">Their orders and data will remain but they won't be able to log in.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
