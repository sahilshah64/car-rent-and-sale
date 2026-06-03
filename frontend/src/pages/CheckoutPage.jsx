// src/pages/CheckoutPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)   // 1=Details, 2=Payment, 3=Success
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName:  user?.name?.split(' ')[1] || '',
    email:     user?.email || '',
    phone:     '',
    address:   '',
    city:      '',
    state:     '',
    zip:       '',
    cardName:  '',
    cardNumber:'',
    expiry:    '',
    cvv:       '',
    payMethod: 'card',
  })

  function update(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function placeOrder() {
    setLoading(true)
    setError('')
    try {
      const orderData = {
        items: cartItems.map(c => ({ car: c._id, price: c.price })),
        total: cartTotal,
        shippingAddress: { address: form.address, city: form.city, state: form.state, zip: form.zip },
        paymentMethod: form.payMethod,
      }
      await api.post('/orders', orderData)
      clearCart()
      setStep(3)
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && step !== 3) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700 mb-4">Your cart is empty</p>
          <button onClick={() => navigate('/inventory')} className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">Browse Cars</button>
        </div>
      </main>
    )
  }

  // ── Step 3: Success ──────────────────────────────────────────────────
  if (step === 3) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 text-center max-w-md shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-500 text-sm mb-8">Thank you for your order. We'll contact you shortly to confirm.</p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/orders')} className="flex-1 border-2 border-red-600 text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors">View Orders</button>
            <button onClick={() => navigate('/')}       className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors">Home</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-10">
          {[['1','Details'],['2','Payment'],['3','Confirm']].map(([n,label], i) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= Number(n) ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'}`}>{n}</div>
              <span className={`text-sm font-medium hidden sm:block ${step >= Number(n) ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
              {i < 2 && <div className={`h-0.5 w-8 sm:w-16 ${step > Number(n) ? 'bg-red-600' : 'bg-gray-200'}`}/>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['firstName','First Name'],['lastName','Last Name'],['email','Email Address'],['phone','Phone Number'],['address','Street Address'],['city','City'],['state','State'],['zip','ZIP Code']].map(([name, label]) => (
                    <div key={name} className={name==='address' ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                      <input name={name} value={form[name]} onChange={update} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={label}/>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Method</h2>

                {/* Method Toggle */}
                <div className="flex gap-3 mb-6">
                  {[['card','💳 Credit / Debit Card'],['cash','💵 Cash on Delivery']].map(([v,l]) => (
                    <button key={v} onClick={() => setForm(p=>({...p,payMethod:v}))} className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.payMethod===v?'border-red-600 bg-red-50 text-red-600':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>{l}</button>
                  ))}
                </div>

                {form.payMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name on Card</label>
                      <input name="cardName" value={form.cardName} onChange={update} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="John Doe"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Card Number</label>
                      <input name="cardNumber" value={form.cardNumber} onChange={update} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="1234 5678 9012 3456" maxLength={19}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Expiry Date</label>
                        <input name="expiry" value={form.expiry} onChange={update} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="MM/YY"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">CVV</label>
                        <input name="cvv" value={form.cvv} onChange={update} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="123" maxLength={4}/>
                      </div>
                    </div>
                  </div>
                )}

                {form.payMethod === 'cash' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                    💡 Pay in cash when the car is delivered to your address. Our team will contact you to schedule.
                  </div>
                )}

                {error && <p className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300 transition-colors">← Back</button>
                  <button onClick={() => setStep(3.5) || placeOrder()} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
                    {loading ? 'Placing Order...' : 'Place Order ✓'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map(car => (
                <div key={car._id} className="flex items-center gap-3">
                  <img src={car.image || 'https://placehold.co/48x36?text=Car'} alt="" className="w-12 h-9 object-cover rounded-lg"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{car.name} {car.model}</p>
                    <p className="text-xs text-gray-400">{car.year}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">${car.price}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>${cartTotal}</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Service Fee</span><span>$0</span></div>
              <div className="flex justify-between font-black text-gray-900 text-lg pt-2 border-t border-gray-100"><span>Total</span><span>${cartTotal}/mo</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
