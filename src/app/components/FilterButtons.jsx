'use client'

import { categories } from '../../data/products'

export default function FilterButtons({ active, onChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
            active === cat
              ? 'bg-brand-green text-white border-brand-green'
              : cat === 'On Sale'
              ? 'border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-white'
              : 'border-brand-light-muted text-brand-dark-muted hover:border-brand-green hover:text-brand-green'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}