// src/app/products/[slug]/page.jsx
// ✅ Server Component — no 'use client' here

import { notFound } from 'next/navigation'
import { products } from '@/app/data/products'
import { getProductBySlug, slugify } from '@/app/lib/slugify'
import ProductDetailClient from './ProductDetailClient'

// ─── Static params for pre-rendering ─────────────────────────────────────────
export function generateStaticParams() {
  return products.map((p) => ({ slug: slugify(p.name) }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(products, params.slug)
  if (!product) notFound()

  const related = (product.relatedIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return <ProductDetailClient product={product} related={related} />
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything below has been moved to ProductDetailClient.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating, reviews, size = 16 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= full ? '#F59E0B' : i === full + 1 && half ? 'url(#half)' : '#E5E7EB'}>
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      <span style={{ fontSize: '13px', color: '#6D7A73' }}>
        {rating.toFixed(1)} <span className="text-[#BCCAC1]">·</span> {reviews} reviews
      </span>
    </div>
  )
}

// ─── Tab Panel ────────────────────────────────────────────────────────────────
function TabSection({ product }) {
  const [tab, setTab] = useState('Description')
  const tabs = ['Description', 'Nutritional Info', 'Origin', 'Reviews']

  return (
    <section className="border-t border-[#BCCAC1]/30 pt-0">
      {/* Tab bar */}
      <div className="flex border-b border-[#BCCAC1]/30 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="shrink-0 px-5 py-4 text-sm transition-colors relative"
            style={{
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? '#085041' : '#6D7A73',
              borderBottom: tab === t ? '2px solid #00694C' : '2px solid transparent',
              background: 'none',
            }}
          >
            {t}{t === 'Reviews' ? ` (${product.reviews})` : ''}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-10 max-w-[820px]">
        {tab === 'Description' && (
          <div>
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.25rem, 2vw, 1.55rem)',
                fontWeight: 700,
                color: '#151E13',
                marginBottom: '14px',
              }}
            >
              A Taste of the Sun
            </h3>
            <p style={{ fontSize: '15px', color: '#3D4943', lineHeight: 1.75, marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* Two-column feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] font-bold tracking-widest text-[#6D7A73] uppercase mb-4">Key Features</p>
                <ul className="space-y-2">
                  {product.keyFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2" style={{ fontSize: '14px', color: '#3D4943' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00694C] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-[#6D7A73] uppercase mb-4">Best Used For</p>
                <ul className="space-y-2">
                  {product.bestUsedFor.map((u) => (
                    <li key={u} className="flex items-start gap-2" style={{ fontSize: '14px', color: '#3D4943' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00694C] shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === 'Nutritional Info' && (
          <div>
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#151E13',
                marginBottom: '20px',
              }}
            >
              Nutritional Information
            </h3>
            <p style={{ fontSize: '13.5px', color: '#6D7A73', marginBottom: '20px' }}>
              Approximate values per 100g. Figures may vary by season and growing conditions.
            </p>
            <div className="rounded-2xl border border-[#BCCAC1]/40 overflow-hidden max-w-sm">
              {[
                ['Energy', '36 kcal'],
                ['Protein', '1.6 g'],
                ['Carbohydrates', '7.1 g'],
                ['of which sugars', '4.7 g'],
                ['Fat', '0.4 g'],
                ['Fibre', '2.1 g'],
                ['Salt', '0.02 g'],
              ].map(([label, val], i) => (
                <div
                  key={label}
                  className="flex justify-between px-5 py-3"
                  style={{
                    background: i % 2 === 0 ? '#FAFAF8' : 'white',
                    fontSize: '14px',
                    color: label.startsWith('of') ? '#6D7A73' : '#151E13',
                    fontWeight: label.startsWith('of') ? 400 : 500,
                    paddingLeft: label.startsWith('of') ? '28px' : undefined,
                  }}
                >
                  <span>{label}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Origin' && (
          <div>
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#151E13',
                marginBottom: '14px',
              }}
            >
              From {product.origin}
            </h3>
            <p style={{ fontSize: '15px', color: '#3D4943', lineHeight: 1.75, marginBottom: '28px' }}>
              {product.description}
            </p>
            {/* Producer card */}
            <div className="flex items-start gap-4 bg-[#F5F5E8] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#00694C]/10 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00694C">
                  <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
                  <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#6D7A73] uppercase mb-1">Produced by</p>
                <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1rem', fontWeight: 700, color: '#151E13', marginBottom: '8px' }}>
                  {product.producer.name}
                </p>
                <p style={{ fontSize: '14px', color: '#3D4943', lineHeight: 1.7, fontStyle: 'italic' }}>
                  {product.producer.quote}
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'Reviews' && (
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="text-center">
                <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '3.5rem', fontWeight: 700, color: '#151E13', lineHeight: 1 }}>
                  {product.rating.toFixed(1)}
                </div>
                <StarRating rating={product.rating} reviews={product.reviews} size={14} />
              </div>
            </div>
            {/* Mock reviews */}
            {[
              { name: 'María G.', date: '2 weeks ago', rating: 5, body: 'Absolutely the best quality I\'ve found. You can taste the difference immediately — so much more flavour than the supermarket.' },
              { name: 'James T.', date: '1 month ago', rating: 4, body: 'Arrived perfectly packaged and fresh. Slight inconsistency in size but flavour was excellent. Will definitely reorder.' },
              { name: 'Saoirse O.', date: '1 month ago', rating: 5, body: 'We use these every week now. My family won\'t go back to standard supermarket produce after trying El Árbol.' },
            ].map((r) => (
              <div key={r.name} className="border-b border-[#BCCAC1]/30 pb-7 mb-7 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: '#151E13' }}>{r.name}</p>
                    <p style={{ fontSize: '12px', color: '#6D7A73' }}>{r.date}</p>
                  </div>
                  <StarRating rating={r.rating} reviews={0} size={13} />
                </div>
                <p style={{ fontSize: '14px', color: '#3D4943', lineHeight: 1.7 }}>{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Related Products ─────────────────────────────────────────────────────────
function RelatedProducts({ currentProduct }) {
  const related = (currentProduct.relatedIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  if (!related.length) return null

  return (
    <section className="border-t border-[#BCCAC1]/30 pt-12 pb-20">
      <div className="flex items-end justify-between mb-8">
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            fontWeight: 700,
            color: '#151E13',
          }}
        >
          You might also enjoy
        </h2>
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1 hover:underline"
          style={{ fontSize: '13.5px', fontWeight: 500, color: '#00694C' }}
        >
          View Entire Orchard
          <svg width="14" height="14" fill="none" stroke="#00694C" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {related.map((p) => (
          <Link key={p.id} href={`/products/${slugify(p.name)}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-[#BCCAC1]/60 transition-all duration-200">
            <div className="relative h-44 overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist */}
              <button
                onClick={(e) => e.preventDefault()}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart size={14} className="text-gray-400" />
              </button>
            </div>
            <div className="p-3.5">
              <p className="font-bold text-[14.5px] text-gray-900 mb-0.5 group-hover:text-[#00694C] transition-colors">{p.name}</p>
              <p className="text-[12px] text-[#6D7A73] mb-2">
                {p.category} · {p.origin}
              </p>
              <p className="font-bold text-[15px] text-amber-500">€{p.price.toFixed(2)}<span className="text-[12px] font-normal text-gray-400">/{p.unit?.split(' ')[0]}</span></p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(products, params.slug)
  if (!product) notFound()

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [fulfillment, setFulfillment] = useState('delivery')
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const savePercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  function handleAddToCart() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <main className="bg-[#FAFAF8] min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-5 pb-0">
        <nav className="flex items-center gap-2 text-sm" style={{ color: '#6D7A73' }}>
          <Link href="/" className="hover:text-[#085041] transition-colors">Fruits</Link>
          <span className="text-[#BCCAC1]">›</span>
          <span style={{ color: '#3D4943' }}>{product.category}</span>
        </nav>
      </div>

      {/* ── Main product section ── */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT: Image Gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white border border-[#BCCAC1]/30">
              <Image
                src={product.images?.[activeImg] || product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-300"
                priority
              />
              {/* Mobile back button */}
              <Link
                href="/"
                className="lg:hidden absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
              >
                <ChevronLeft size={18} className="text-[#151E13]" />
              </Link>
              {/* Share / Wishlist */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                  <Share2 size={15} className="text-[#3D4943]" />
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Heart size={15} fill={wishlisted ? '#ef4444' : 'none'} className={wishlisted ? 'text-red-500' : 'text-[#3D4943]'} />
                </button>
              </div>
              {/* Dot indicator (mobile) */}
              {product.images?.length > 1 && (
                <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="rounded-full transition-all"
                      style={{
                        width: i === activeImg ? '20px' : '6px',
                        height: '6px',
                        background: i === activeImg ? '#00694C' : 'white',
                        opacity: i === activeImg ? 1 : 0.7,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails — desktop only */}
            {product.images?.length > 1 && (
              <div className="hidden lg:grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-150"
                    style={{ borderColor: i === activeImg ? '#00694C' : 'transparent' }}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col gap-5">

            {/* Origin pill */}
            <p className={`${newsreader.className}`} style={{ fontSize: '13px', color: '#6D7A73', fontStyle: 'italic' }}>
              from {product.origin}
            </p>

            {/* Name */}
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 700,
                color: '#151E13',
                lineHeight: 1.15,
              }}
            >
              {product.name}
            </h1>

            {/* Badge + badge info row */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.onSale && (
                <span className="text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full bg-[#3B3A2E] text-[#E8E0BA]">
                  ★ RARE SELECTION
                </span>
              )}
              <span style={{ fontSize: '13px', color: '#6D7A73' }}>approx. {product.unit}</span>
            </div>

            {/* Rating */}
            <StarRating rating={product.rating} reviews={product.reviews} />

            {/* Short description */}
            <p className={`${newsreader.className}`} style={{ fontSize: '15px', color: '#3D4943', lineHeight: 1.75 }}>
              {product.shortDesc}
            </p>

            {/* Notes + Texture */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10.5px] font-bold tracking-widest text-[#6D7A73] uppercase mb-1">Notes</p>
                <p style={{ fontSize: '13.5px', color: '#3D4943' }}>{product.notes}</p>
              </div>
              <div>
                <p className="text-[10.5px] font-bold tracking-widest text-[#6D7A73] uppercase mb-1">Texture</p>
                <p style={{ fontSize: '13.5px', color: '#3D4943' }}>{product.texture}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#BCCAC1]/30" />

            {/* Price block */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#151E13',
                }}
              >
                €{product.price.toFixed(2)}
                <span className="text-base font-normal text-[#6D7A73]">/kg</span>
              </span>
              {product.oldPrice && (
                <>
                  <span style={{ fontSize: '1.1rem', color: '#BCCAC1', textDecoration: 'line-through' }}>
                    €{product.oldPrice.toFixed(2)}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600">
                    SAVE {savePercent}%
                  </span>
                </>
              )}
            </div>
            {product.onSale && (
              <p className="text-[11.5px] font-semibold tracking-wider text-amber-600 -mt-3">LIMITED TIME OFFER</p>
            )}

            {/* Quantity + Unit selector */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10.5px] font-bold tracking-widest text-[#6D7A73] uppercase mb-2">Select Unit</p>
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-[#BCCAC1]/60 rounded-xl px-4 py-3 text-sm text-[#151E13] bg-white pr-9 focus:outline-none focus:border-[#00694C]"
                    style={{ fontSize: '13.5px' }}
                  >
                    <option>Kilograms (kg)</option>
                    <option>Grams (g)</option>
                    <option>Each</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" stroke="#6D7A73" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-[10.5px] font-bold tracking-widest text-[#6D7A73] uppercase mb-2">Quantity</p>
                <div className="flex items-center border border-[#BCCAC1]/60 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors text-[#3D4943]"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="flex-1 text-center font-bold text-[15px] text-[#151E13]">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition-colors text-[#3D4943]"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Estimated total */}
            <div className="flex items-center justify-between px-1">
              <span style={{ fontSize: '13px', color: '#6D7A73' }}>Estimated Total</span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#151E13' }}>
                €{(product.price * qty).toFixed(2)}
              </span>
            </div>

            {/* Fulfillment options */}
            <div>
              <p className="text-[10.5px] font-bold tracking-widest text-[#6D7A73] uppercase mb-3">Fulfillment</p>
              <div className="space-y-2">
                {[
                  {
                    id: 'delivery',
                    label: 'Home Delivery',
                    sub: 'Today before 6:00 PM',
                    icon: <Truck size={18} className="text-[#00694C]" />,
                  },
                  {
                    id: 'collect',
                    label: 'Click & Collect',
                    sub: 'Ready in 2 hours',
                    icon: <Store size={18} className="text-[#6D7A73]" />,
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-4 border rounded-xl px-4 py-3.5 cursor-pointer transition-all"
                    style={{
                      borderColor: fulfillment === opt.id ? '#00694C' : '#BCCAC1',
                      background: fulfillment === opt.id ? '#F0F9F5' : 'white',
                    }}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      value={opt.id}
                      checked={fulfillment === opt.id}
                      onChange={() => setFulfillment(opt.id)}
                      className="accent-[#00694C]"
                    />
                    <span className="flex items-center gap-3 flex-1">
                      {opt.icon}
                      <span>
                        <span className="block text-sm font-semibold text-[#151E13]">{opt.label}</span>
                        <span className="block text-[12px] text-[#6D7A73]">{opt.sub}</span>
                      </span>
                    </span>
                    <span className="text-[13px] font-semibold text-[#00694C]">Free</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 transition-all duration-200 mt-1"
                style={{
                  background: added ? '#085041' : '#00694C',
                  color: 'white',
                  fontSize: '15.5px',
                  fontWeight: 600,
                }}
              >
                {added ? (
                  <>
                    <Check size={19} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={19} />
                    Add to Cart
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 bg-gray-100 text-gray-400 cursor-not-allowed"
                style={{ fontSize: '15.5px', fontWeight: 600 }}
              >
                Out of Stock
              </button>
            )}

            {/* Stock notice */}
            {product.inStock && (
              <p className="text-center" style={{ fontSize: '12.5px', color: '#00694C' }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00694C] mr-1.5 mb-0.5" />
                In Stock — {Math.floor(Math.random() * 50) + 10} units available
              </p>
            )}

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#BCCAC1]/20">
              {[
                { icon: '✦', label: 'Fresh Daily' },
                { icon: '↗', label: 'Free > €40' },
                { icon: '🔒', label: 'Secure Pay' },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1 py-2">
                  <span style={{ fontSize: '15px' }}>{t.icon}</span>
                  <span style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.06em', color: '#6D7A73', textTransform: 'uppercase' }}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs + Related ── */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <TabSection product={product} />
        <RelatedProducts currentProduct={product} />
      </div>

      {/* ── Mobile sticky Add to Cart ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#BCCAC1]/40 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          {/* Producer block */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00694C]/10 flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#00694C">
                <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
                <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
              </svg>
            </div>
            <div>
              <p className="text-[9.5px] font-bold tracking-widest text-[#6D7A73] uppercase">Produced by</p>
              <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#151E13' }}>{product.producer?.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#6D7A73] mb-0.5">Total Price</p>
            <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '1.2rem', color: '#151E13' }}>
              €{(product.price * qty).toFixed(2)}<span className="text-xs font-normal text-[#6D7A73]">/lb</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 transition-colors"
          style={{ background: added ? '#085041' : '#00694C', color: 'white', fontSize: '14.5px', fontWeight: 600 }}
        >
          {added ? <><Check size={17} /> Added</> : <><ShoppingBag size={17} /> ADD TO CART</>}
        </button>
      </div>
    </main>
  )
}