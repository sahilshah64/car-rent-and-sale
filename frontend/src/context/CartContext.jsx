// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])

  const addToCart    = (car) => setCartItems(p => p.find(c => c._id === car._id) ? p : [...p, { ...car, qty: 1 }])
  const removeFromCart = (id) => setCartItems(p => p.filter(c => c._id !== id))
  const clearCart    = () => setCartItems([])
  const toggleWishlist = (car) => setWishlistItems(p => p.find(c => c._id === car._id) ? p.filter(c => c._id !== car._id) : [...p, car])
  const isInWishlist = (id) => wishlistItems.some(c => c._id === id)
  const cartTotal    = cartItems.reduce((s, c) => s + c.price, 0)

  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, addToCart, removeFromCart, clearCart, toggleWishlist, isInWishlist, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
