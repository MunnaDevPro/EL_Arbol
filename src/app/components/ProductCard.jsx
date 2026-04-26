// src/app/components/ProductCard.jsx
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/app/components/AddToCartButton'
import { slugify } from '@/app/lib/slugify'

export default function ProductCard({ product, notified, onNotify }) {
  const { name, badge, badgeColor, origin, unit, price, oldPrice, inStock, image, onSale } = product
  const slug = slugify(name)

  return (
    <Link href={`/products/${slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-shadow duration-200">

        {/* ── Image ── */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover rounded-2xl transition-transform duration-300"
          />

          {badge && (
            <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}

          {onSale && (
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-[#3B3A2E] text-[#E8E0BA]">
              SALE
            </span>
          )}

          {!inStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="p-3.5 md:p-4">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-sans font-bold text-gray-900 text-[15px] leading-snug flex-1 group-hover:text-[#00694C] transition-colors">
              {name}
            </h3>
            {origin && (
              <div className="text-right flex-shrink-0 pt-0.5">
                <span className="font-serif italic text-[12px] text-gray-400 leading-tight block">from</span>
                <span className="font-serif italic text-[12px] text-gray-400 leading-tight block">{origin}</span>
              </div>
            )}
          </div>

          {unit && <p className="text-[12px] text-gray-400 mb-3">{unit}</p>}

          <div className="flex items-center justify-between">
            {inStock ? (
              <>
                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-amber-500">€{price.toFixed(2)}</span>
                {oldPrice && (
                  <span className="text-sm text-gray-400 line-through">€{oldPrice.toFixed(2)}</span>
                )}
              </div>
              {/* Stop link propagation on button click */}
              <span onClick={(e) => e.preventDefault()} className="w-full md:hidden  md:w-auto">
                <AddToCartButton product={product} inStock={inStock} />
              </span>
            </div>
              </>
            ) : (
              <button
                onClick={(e) => { e.preventDefault(); onNotify?.() }}
                className="w-full rounded-lg border transition-colors"
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
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
