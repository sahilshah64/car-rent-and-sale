// src/pages/CarDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/CartContext'

export default function CarDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/cars/${id}`)
      .then(r => setCar(r.data))
      .catch(() => navigate('/inventory'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-16"><div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>
  if (!car)    return null

  const specs = [
    { label: 'Brand',        value: car.brand },
    { label: 'Model',        value: car.model },
    { label: 'Year',         value: car.year },
    { label: 'Condition',    value: car.condition },
    { label: 'Fuel Type',    value: car.fuel },
    { label: 'Transmission', value: car.transmission },
    { label: 'Mileage',      value: `${car.mileage} mi` },
    { label: 'Body Type',    value: car.type },
  ]

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 mb-6 transition-colors">
          ← Back
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img src={car.image || 'https://placehold.co/600x400?text=No+Image'} alt={car.name} className="w-full h-80 object-cover"/>
            <div className="p-4 flex gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${car.condition==='New'?'bg-red-100 text-red-600':'bg-gray-100 text-gray-600'}`}>{car.condition}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-600">{car.type}</span>
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">{car.name} {car.model}</h1>
            <p className="text-gray-400 text-sm mb-4">{car.year} · {car.brand}</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">${car.price}</span>
              <span className="text-gray-400 text-sm ml-1">/month</span>
            </div>
            {car.description && <p className="text-gray-600 text-sm leading-relaxed mb-6">{car.description}</p>}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {specs.map(s => (
                <div key={s.label} className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{s.value || '—'}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => { addToCart(car); navigate('/checkout') }} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
                Book Now
              </button>
              <button onClick={() => addToCart(car)} className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3 rounded-xl transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
