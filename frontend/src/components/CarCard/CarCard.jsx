// src/components/CarCard/CarCard.jsx
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CarCard({ car }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const loved = isInWishlist(car._id)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={car.image || 'https://placehold.co/400x200?text=No+Image'}
          alt={`${car.name} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${car.condition==='New'?'bg-red-600 text-white':'bg-gray-800 text-white'}`}>
          {car.condition}
        </span>
        <button onClick={() => toggleWishlist(car)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform">
          <svg className={`w-4 h-4 ${loved?'text-red-500 fill-red-500':'text-gray-400'}`} fill={loved?'currentColor':'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 truncate">{car.name} {car.model}</h3>
        <p className="text-xs text-gray-400 mb-3">{car.year} · {car.brand} · {car.type}</p>
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>⏱ {car.mileage} mi</span>
          <span>⛽ {car.fuel}</span>
          <span>⚙️ {car.transmission}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-gray-900">${car.price}</span>
            <span className="text-xs text-gray-400">/mo</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => addToCart(car)} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
              Add to Cart
            </button>
            <Link to={`/car/${car._id}`} className="border border-gray-200 hover:border-red-300 text-gray-600 hover:text-red-600 text-xs font-medium px-3 py-2 rounded-lg transition-all">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
