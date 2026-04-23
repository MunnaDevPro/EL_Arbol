'use client'

import { useState } from 'react'

export default function AddToCartButton({ inStock }) {
  const [added, setAdded] = useState(false)

  if (!inStock) {
    return (
      <button className="w-full text-xs font-medium border border-brand-light-muted text-brand-muted py-2.5 rounded-lg cursor-default">
        Notify Me
      </button>
    )
  }

  const handleClick = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 ${
        added
          ? 'bg-brand-mint text-brand-dark-green'
          : 'bg-brand-green text-white hover:bg-brand-dark-green active:scale-95'
      }`}
    >
      {added ? '✓ Added' : 'ADD TO CART'}
    </button>
  )
}
