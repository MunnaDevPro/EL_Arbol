'use client'

import { useState } from 'react'
import { products, categories } from '@/app/data/products'

export default function ProductGrid() {
  const [active, setActive] = useState('All')
  const [notified, setNotified] = useState({})

  const filtered =
    active === 'All'
      ? products
      : active === 'On Sale'
      ? products.filter((p) => p.oldPrice)
      : products.filter((p) => p.category === active)

  return (
    <section className="bg-[#F5F5E8] pb-20">
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

/* ─── Product Card ──────────────────────────────────────────── */
function ProductCard({ product, notified, onNotify }) {
  const isCentered = !product.inStock

  return (
    <article
      className="bg-white rounded-xl overflow-hidden flex flex-col"
      style={{
        border: '1px solid rgba(188,202,193,0.35)',
        boxShadow: '0 1px 6px rgba(21,30,19,0.05)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F0F0E6]" style={{ aspectRatio: '1 / 1' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badge */}
        <span
          className={`absolute top-2.5 ${isCentered ? 'left-1/2 -translate-x-1/2' : 'left-2.5'} rounded-full`}
          style={{
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '4px 10px',
            whiteSpace: 'nowrap',
            background: product.badge === 'ON SALE' ? '#DC2626' : 'white',
            color: product.badge === 'ON SALE' ? 'white' : '#151E13',
          }}
        >
          {product.badge}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-3.5">
        {/* Name */}
        <h3
          className="mb-2"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '14px',
            fontWeight: 700,
            color: '#151E13',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {/* SKU + unit OR Notify Me */}
        {product.inStock ? (
          <div className="flex items-center gap-2 flex-wrap mt-auto">
            {product.sku && (
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#855000' }}>
                {product.sku}
              </span>
            )}
            {product.skuExtra && (
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#855000' }}>
                {product.skuExtra}
              </span>
            )}
            {product.sku && (
              <span style={{ fontSize: '12px', color: '#6D7A73' }}>
                / {product.unit}
              </span>
            )}
          </div>
        ) : (
          <div className="mt-auto pt-1">
            <button
              onClick={onNotify}
              className="w-full rounded-lg border transition-colors hover:bg-[#F5F5E8]"
              style={{
                fontSize: '12.5px',
                fontWeight: 500,
                color: notified ? '#00694C' : '#151E13',
                borderColor: notified ? '#00694C' : '#BCCAC1',
                padding: '8px 0',
              }}
            >
              {notified ? 'Notified ✓' : 'Notify Me'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}