// src/components/Vehicles/VehicleSection.jsx
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import CarCard from '../CarCard/CarCard'

const PER_PAGE = 8

export default function VehicleSection({ searchFilters }) {
  const [cars,       setCars]       = useState([])
  const [loading,    setLoading]    = useState(true)
  const [total,      setTotal]      = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [tab,        setTab]        = useState('All')
  const [sort,       setSort]       = useState('-createdAt')
  const [page,       setPage]       = useState(1)

  useEffect(() => {
    fetchCars()
  }, [tab, sort, page, searchFilters])

  async function fetchCars() {
    setLoading(true)
    try {
      const params = { page, limit: PER_PAGE, sort }
      if (tab !== 'All') params.condition = tab
      if (searchFilters?.make  && searchFilters.make  !== 'Any Make')   params.brand = searchFilters.make
      if (searchFilters?.model && searchFilters.model !== 'Any Model')  params.model = searchFilters.model
      if (searchFilters?.price && searchFilters.price !== 'Any Price') {
        if (searchFilters.price === 'Under $500')   { params.maxPrice = 500 }
        if (searchFilters.price === '$500–$800')    { params.minPrice = 500; params.maxPrice = 800 }
        if (searchFilters.price === '$800–$1000')   { params.minPrice = 800; params.maxPrice = 1000 }
        if (searchFilters.price === 'Over $1000')   { params.minPrice = 1000 }
      }
      const { data } = await api.get('/cars', { params })
      setCars(data.cars)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch {
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  function changeTab(t) { setTab(t); setPage(1) }

  return (
    <section id="inventory" className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 uppercase">Explore All Vehicles</h2>
            <p className="text-sm text-gray-400 mt-1">{total} cars found</p>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="-createdAt">Newest First</option>
            <option value="price">Price: Low → High</option>
            <option value="-price">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 w-fit border border-gray-100 shadow-sm mb-8">
          {['All','New','Used'].map(t => (
            <button key={t} onClick={() => changeTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t?'bg-red-600 text-white':'text-gray-500 hover:text-gray-800'}`}>{t}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_,i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold">No cars found</p>
            <p className="text-sm mt-1">Try adjusting your search or add cars via Admin Panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cars.map(car => <CarCard key={car._id} car={car} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">‹</button>
            {[...Array(totalPages)].map((_,i) => (
              <button key={i} onClick={() => setPage(i+1)} className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${page===i+1?'bg-red-600 text-white':'border border-gray-200 text-gray-600 hover:border-red-400'}`}>{i+1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">›</button>
          </div>
        )}
      </div>
    </section>
  )
}
