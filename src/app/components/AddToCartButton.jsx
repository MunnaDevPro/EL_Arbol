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
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg cursor-not-allowed"
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
      className="w-full flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 active:scale-[0.97]"
      style={{
        background: added
          ? '#085041'
          : 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
        color: 'white',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        boxShadow: added
          ? 'none'
          : '0 2px 8px rgba(0,105,76,0.25)',
      }}
    >
      {added ? (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </>
      )}
    </button>
  )
}