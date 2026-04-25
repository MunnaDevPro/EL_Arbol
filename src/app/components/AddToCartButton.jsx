'use client'
import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'

export default function AddToCartButton({ inStock }) {
  const [added, setAdded] = useState(false)

  if (!inStock) {
    return (
      <button
        disabled
        className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center cursor-default"
        title="Out of stock"
      >
        <ShoppingBag size={16} className="text-gray-300" />
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
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${
        added ? 'bg-emerald-400' : 'bg-emerald-600'
      }`}
      title="Add to cart"
    >
      {added
        ? <Check size={16} className="text-white" />
        : <ShoppingBag size={16} className="text-white" />
      }
    </button>
  )
}