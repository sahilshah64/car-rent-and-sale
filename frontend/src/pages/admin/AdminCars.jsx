// src/pages/admin/AdminCars.jsx
import { useState, useEffect } from 'react'
import api from '../../utils/api'

const EMPTY = { name:'', model:'', brand:'', year:'', price:'', mileage:'', fuel:'Petrol', transmission:'Automatic', condition:'New', type:'SUV', image:'', description:'' }

export default function AdminCars() {
  const [cars,    setCars]    = useState([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(1)
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)   // null = create, object = edit
  const [form,    setForm]    = useState(EMPTY)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')
  const [search,  setSearch]  = useState('')
  const [deleteId,setDeleteId]= useState(null)

  const PER = 10
  const totalPages = Math.ceil(total / PER)

  useEffect(() => { fetchCars() }, [page, search])

  async function fetchCars() {
    setLoading(true)
    try {
      const params = { page, limit: PER }
      if (search) params.brand = search
      const { data } = await api.get('/cars', { params })
      setCars(data.cars)
      setTotal(data.total)
    } catch { setCars([]) }
    finally { setLoading(false) }
  }

  function openCreate() { setEditing(null); setForm(EMPTY); setError(''); setModal(true) }
  function openEdit(car) { setEditing(car); setForm({ ...car }); setError(''); setModal(true) }
  function closeModal()  { setModal(false) }

  function update(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      if (editing) await api.put(`/cars/${editing._id}`, form)
      else         await api.post('/cars', form)
      closeModal()
      fetchCars()
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed')
    } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/cars/${id}`)
      setDeleteId(null)
      fetchCars()
    } catch {}
  }

  const FIELDS = [
    ['name','Car Name','text'],['model','Model','text'],['brand','Brand','text'],
    ['year','Year','number'],['price','Price ($/mo)','number'],['mileage','Mileage','text'],
    ['image','Image URL','text'],
  ]
  const SELECTS = [
    ['fuel','Fuel',['Petrol','Diesel','Electric','Hybrid']],
    ['transmission','Transmission',['Automatic','Manual']],
    ['condition','Condition',['New','Used']],
    ['type','Body Type',['SUV','Sedan','Coupe','Pickup','MPV','Hatchback']],
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Cars Management</h1>
          <p className="text-sm text-gray-400 mt-1">{total} total cars</p>
        </div>
        <button onClick={openCreate} className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
          + Add Car
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex gap-3">
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search by brand..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"/>
        <button onClick={() => { setSearch(''); setPage(1) }} className="text-sm text-gray-400 hover:text-gray-700 px-3">Clear</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-semibold mb-2">No cars found</p>
            <button onClick={openCreate} className="bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors">Add First Car</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Image','Name','Brand','Year','Price','Condition','Stock','Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cars.map(car => (
                  <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <img src={car.image||'https://placehold.co/48x36?text=Car'} alt="" className="w-12 h-9 object-cover rounded-lg"/>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{car.name} {car.model}</p>
                      <p className="text-xs text-gray-400">{car.type}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{car.brand}</td>
                    <td className="px-4 py-3 text-gray-600">{car.year}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">${car.price}/mo</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${car.condition==='New'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{car.condition}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${car.inStock?'bg-blue-100 text-blue-700':'bg-red-100 text-red-600'}`}>{car.inStock?'In Stock':'Out'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(car)} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Edit">✏️</button>
                        <button onClick={() => setDeleteId(car._id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
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

      {/* ── Create / Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-black text-gray-900">{editing ? 'Edit Car' : 'Add New Car'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.map(([name,label,type]) => (
                  <div key={name} className={name==='image'||name==='description'?'sm:col-span-2':''}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                    <input name={name} type={type} value={form[name]} onChange={update} required={!['image','description'].includes(name)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={label}/>
                  </div>
                ))}
                {SELECTS.map(([name,label,opts]) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                    <select name={name} value={form[name]} onChange={update} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                  <textarea name="description" value={form.description} onChange={update} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" placeholder="Car description..."/>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input type="checkbox" name="inStock" id="inStock" checked={form.inStock !== false} onChange={e => setForm(p=>({...p,inStock:e.target.checked}))} className="w-4 h-4 accent-red-600"/>
                  <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
                </div>
              </div>
              {error && <p className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={closeModal} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🗑️</div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Delete this car?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
