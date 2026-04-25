import Image from 'next/image'
import AddToCartButton from '@/app/components/AddToCartButton'

export default function ProductCard({ product, notified, onNotify }) {
  const { name, badge, badgeColor, origin, unit, price, inStock, image, onSale } = product

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md">

      {/* ── Image ── */}
      <div className="relative h-40 md:h-48 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
        />

        {/* Category badge — left */}
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}

        {/* Sale badge — right */}
        {onSale && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-[#3B3A2E] text-[#E8E0BA]">
            SALE
          </span>
        )}

        {/* Out-of-stock overlay */}
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

        {/* Name + Origin */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-sans font-bold text-gray-900 text-[15px] leading-snug flex-1">
            {name}
          </h3>
          {origin && (
            <div className="text-right flex-shrink-0 pt-0.5">
              <span className="font-serif italic text-[12px] text-gray-400 leading-tight block">from</span>
              <span className="font-serif italic text-[12px] text-gray-400 leading-tight block">{origin}</span>
            </div>
          )}
        </div>

        {/* Unit */}
        {unit && <p className="text-[12px] text-gray-400 mb-3">{unit}</p>}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          {inStock ? (
            <>
              <span className="text-xl font-bold text-amber-500">€{price.toFixed(2)}</span>
              <AddToCartButton inStock={inStock} />
            </>
          ) : (
            <button
              onClick={onNotify}
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
  )
}