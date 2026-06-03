// src/components/Navbar/CartDropdown.jsx
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartDropdown({ onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  function goCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute right-4 top-16 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-bold text-gray-900">Cart ({cartItems.length})</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        {cartItems.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">Your cart is empty</div>
        ) : (
          <>
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
              {cartItems.map(car => (
                <div key={car._id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <img src={car.image} alt={car.name} className="w-14 h-10 object-cover rounded-lg" onError={e => e.target.src='https://placehold.co/56x40?text=Car'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{car.name} {car.model}</p>
                    <p className="text-sm text-red-600 font-bold">${car.price}/mo</p>
                  </div>
                  <button onClick={() => removeFromCart(car._id)} className="text-gray-300 hover:text-red-500 text-lg leading-none">×</button>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                <span>Total</span><span>${cartTotal}/mo</span>
              </div>
              <button onClick={goCheckout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
