import AddToCartButton from './AddToCartButton'

export default function ProductCard({ product }) {
  const { name, badge, badgeColor, sku, skuExtra, unit, price, oldPrice, inStock, image } = product

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-brand-light-muted/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group">

      {/* Image */}
      <div className="relative h-40 md:h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-white text-brand-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4">
        <h3 className="font-sans font-semibold text-brand-black text-sm md:text-[15px] leading-snug mb-1">
          {name}
        </h3>

        {/* SKU */}
        {sku && (
          <p className="text-xs text-brand-amber font-medium mb-1">
            {sku}
            {skuExtra && <span className="text-brand-muted ml-1">{skuExtra}</span>}
            <span className="text-brand-muted ml-1">/ {unit}</span>
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-1.5 mb-3">
          <span className="text-sm md:text-base font-bold text-brand-amber">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-xs text-brand-muted line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>

        {/* CTA */}
        <AddToCartButton inStock={inStock} />
      </div>
    </div>
  )
}
