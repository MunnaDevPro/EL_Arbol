'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'

export default function AddToCartButton({ product, inStock = true }) {
  const { addItem, setSidebarOpen } = useCart()
  const [added, setAdded] = useState(false)

  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock) return
    addItem(product)
    setAdded(true)
    setSidebarOpen(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center px-5 py-2.5 rounded-lg cursor-not-allowed"
        style={{
          background: '#f0f0f0',
          color: '#aaaaaa',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        Out of Stock
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex cursor-pointer items-center justify-center px-5 py-2.5 rounded-lg transition-all duration-200 active:scale-[0.97]"
      style={{
        background: added ? '#085041' : 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
        color: 'white',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        boxShadow: added ? 'none' : '0 2px 8px rgba(0,105,76,0.25)',
      }}
    >
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}