'use client'

import { useState } from 'react'
import { products, categories } from '@/app/data/products'
import ProductCard from '@/app/components/ProductCard'   // ← এইটা আগে ছিলই না

export default function ProductGrid() {
  const [active, setActive] = useState('All')
  const [notified, setNotified] = useState({})

  const filtered =
    active === 'All'
      ? products
      : active === 'On Sale'
      ? products.filter((p) => p.onSale)               // ← p.oldPrice থেকে p.onSale
      : products.filter((p) => p.category === active)

  return (
    <section className="bg-[var(--section-color)] pb-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* ── Category filter pills ──────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-8" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const isActive = active === cat
            const isOnSale = cat === 'On Sale'
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="shrink-0 rounded-full transition-all duration-200"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '7px 18px',
                  border: isActive
                    ? '1.5px solid #00694C'
                    : isOnSale
                    ? '1.5px solid #855000'
                    : '1.5px solid #BCCAC1',
                  background: isActive ? '#00694C' : 'white',
                  color: isActive ? '#fff' : isOnSale ? '#855000' : '#3D4943',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* ── Section heading ────────────────────────── */}
        <div className="flex items-end justify-between mt-10 mb-6">
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
              fontWeight: 700,
              color: '#151E13',
              lineHeight: 1.15,
            }}
          >
            Seasonal Favorites
          </h2>
          <a
            href="#"
            className="hidden md:flex items-center gap-1 hover:underline"
            style={{ fontSize: '13.5px', fontWeight: 500, color: '#00694C' }}
          >
            View all harvest
            <svg width="14" height="14" fill="none" stroke="#00694C" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* ── Product grid ───────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              notified={!!notified[p.id]}
              onNotify={() => setNotified((n) => ({ ...n, [p.id]: true }))}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center" style={{ color: '#6D7A73', fontSize: '14px' }}>
            No products in this category.
          </p>
        )}
      </div>
    </section>
  )
}