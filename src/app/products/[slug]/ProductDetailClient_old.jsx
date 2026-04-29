'use client'
// src/app/products/[slug]/ProductDetailClient.jsx

import { useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/app/components/ProductCard'
import Link from 'next/link'


import { useCart } from '@/app/context/CartContext' 
import {
  ShoppingCart, ShoppingBag, Check, ChevronLeft, Share2, Heart,
  Truck, Store, Minus, Plus, Star, ArrowRight, CreditCard,
  Lock, Zap, Package
} from 'lucide-react'
import { newsreader } from '@/app/components/fonts'
import { slugify } from '@/app/lib/slugify'

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, reviews, size = 16 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
            fill={i <= full ? '#855000' : i === full + 1 && half ? 'url(#half-star)' : '#E5E7EB'}>
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="#855000" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      {reviews > 0 && (
        <span style={{ fontSize: '13px', color: '#6D7A73' }}>
          {rating.toFixed(1)}{' '}
          <span style={{ color: '#BCCAC1' }}>·</span>{' '}
          {reviews} reviews
        </span>
      )}
    </div>
  )
}

// ─── Tab Section ──────────────────────────────────────────────────────────────
function TabSection({ product }) {
  const [tab, setTab] = useState('Description')
  const tabs = ['Description', 'Nutritional Info', 'Origin', 'Reviews']

  return (
    <section className="border-t border-[#BCCAC1]/30">
      {/* Tab bar */}
      <div
        className="flex border-b border-[#BCCAC1]/20 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="cursor-pointer shrink-0 px-5 py-4 text-sm transition-all"
            style={{
              fontWeight: tab === t ? 700 : 500,
              color: tab === t ? '#151E13' : '#6D7A73',
              borderBottom: tab === t ? '2px solid #00694C' : '2px solid transparent',
              background: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {t}{t === 'Reviews' ? ` (${product.reviews})` : ''}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8 max-w-[820px]">

        {tab === 'Description' && (
          <div>
            <h3 style={{
              fontFamily: '"Newsreader", "Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.25rem, 2vw, 1.55rem)',
              fontWeight: 700, color: '#151E13', marginBottom: '14px',
            }}>
              A Taste of the Sun
            </h3>
            <p style={{ fontSize: '15px', color: '#3D4943', lineHeight: 1.75, marginBottom: '32px' }}>
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#6D7A73] uppercase mb-4">Key Features</p>
                <ul className="space-y-2.5">
                  {product.keyFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5" style={{ fontSize: '14px', color: '#3D4943' }}>
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#00694C] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#6D7A73] uppercase mb-4">Best Used For</p>
                <ul className="space-y-2.5">
                  {product.bestUsedFor.map((u) => (
                    <li key={u} className="flex items-start gap-2.5" style={{ fontSize: '14px', color: '#3D4943' }}>
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#00694C] shrink-0" />{u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === 'Nutritional Info' && (
          <div>
            <h3 style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontSize: '1.4rem', fontWeight: 700, color: '#151E13', marginBottom: '20px',
            }}>
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
                <div key={label} className="flex justify-between"
                  style={{
                    padding: label.startsWith('of') ? '12px 20px 12px 28px' : '12px 20px',
                    background: i % 2 === 0 ? '#FAFAF8' : 'white',
                    fontSize: '14px',
                    color: label.startsWith('of') ? '#6D7A73' : '#151E13',
                    fontWeight: label.startsWith('of') ? 400 : 500,
                  }}>
                  <span>{label}</span><span>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Origin' && (
          <div>
            <h3 style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontSize: '1.4rem', fontWeight: 700, color: '#151E13', marginBottom: '14px',
            }}>
              From {product.origin}
            </h3>
            <p style={{ fontSize: '15px', color: '#3D4943', lineHeight: 1.75, marginBottom: '28px' }}>
              {product.description}
            </p>
            <div className="flex items-start gap-5 bg-[#F5F5E8] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#00694C]/10 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00694C">
                  <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
                  <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#6D7A73] uppercase mb-1">Produced by</p>
                <p style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '1rem', fontWeight: 700, color: '#151E13', marginBottom: '8px' }}>
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
              <div>
                <div style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '3.5rem', fontWeight: 700, color: '#151E13', lineHeight: 1 }}>
                  {product.rating.toFixed(1)}
                </div>
                <StarRating rating={product.rating} reviews={product.reviews} size={14} />
              </div>
            </div>
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
function RelatedProducts({ related }) {
  if (!related?.length) return null

  return (
    <section className="border-t border-[#BCCAC1]/30 pt-12 pb-24 lg:pb-20">
      <div className="flex items-end justify-between mb-8">
        <h2 style={{
          fontFamily: '"Newsreader", Georgia, serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
          fontWeight: 700, 
          color: '#151E13',
        }}>
          You might also enjoy
        </h2>
        
        <Link href="/shop" className="hidden sm:flex items-center gap-1.5"
          style={{ fontSize: '13.5px', fontWeight: 600, color: '#00694C' }}>
          View All
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid layout for Product Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {related.map((p) => (
          <ProductCard key={p.id} product={{...p, inStock: p.inStock ?? true, }} 
          />
        ))}
      </div>
    </section>
  )
}



// ─── Main Client Component ────────────────────────────────────────────────────
export default function ProductDetailClient({ product, related }) {

  const [added, setAdded] = useState(false)
  const { addItem, setSidebarOpen } = useCart()


  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [fulfillment, setFulfillment] = useState('delivery')
  const [wishlisted, setWishlisted] = useState(false)

  const savePercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

   function handleAddToCart() {
      addItem(product)           // ← cart context এ item যাবে
      setSidebarOpen(true)       // ← sidebar খুলবে
      setAdded(true)             // ← button state change হবে
      setTimeout(() => setAdded(false), 2000)  // ← 2s পর reset
  }

  const fulfillmentOptions = [
    { id: 'delivery', label: 'Home Delivery', sub: 'Today before 8:00 PM', Icon: Truck },
    { id: 'collect', label: 'Click & Collect', sub: 'Ready in 2 hours', Icon: Store },
    { id: 'instore', label: 'In-Store Payment', sub: 'Reserve for 24 hours', Icon: CreditCard },
  ]

  return (
    <main className="bg-[#F2FDEA] min-h-screen">

  
      {/* MOBILE GALLERY (below lg) */}
      <section className="lg:hidden px-4 mb-8 pt-3">
        <div className="flex gap-4 overflow-x-auto pb-0"
          style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}>
          {(product.images || [product.image]).map((img, i) => (
            <div key={i} className="shrink-0 rounded-2xl overflow-hidden "
              style={{
                width: '85%', aspectRatio: '3/4',
                scrollSnapAlign: 'center',
                boxShadow: '0 24px 48px -12px rgba(0,33,21,0.12)',
              }}>
              <div className="relative w-full h-full">
                <Image src={img} alt={product.name} fill className="object-cover cursor-pointer" sizes="85vw " />
              </div>
            </div>
          ))}
        </div>
        {/* Pagination dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {(product.images || [product.image]).map((_, i) => (
            <button key={i} onClick={() => setActiveImg(i)}
              className="rounded-full transition-all"
              style={{
                height: '6px',
                width: i === activeImg ? '24px' : '6px',
                background: i === activeImg ? '#00694C' : '#BCCAC1',
              }} />
          ))}
        </div>
      </section>

      {/*MOBILE PRODUCT HEADER (below lg) */}
      <header className="lg:hidden px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="italic text-lg text-[#855000]"
            style={{ fontFamily: '"Newsreader", Georgia, serif' }}>
            from {product.origin}
          </span>
          <div className="flex-1 h-px bg-[#BCCAC1]/30" />
        </div>
        <h1 className="font-bold tracking-tight text-[#151E13] mb-3"
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontSize: 'clamp(2.4rem, 8vw, 3rem)',
            lineHeight: 1.1,
          }}>
          {product.name}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          {product.onSale && (
            <div className="flex items-center bg-[#ADEDD8] px-3 py-1 rounded-full">
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#095041', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ★ {product.rating.toFixed(1)} Rare Selection
              </span>
            </div>
          )}
          {!product.onSale && (
            <StarRating rating={product.rating} reviews={product.reviews} size={14} />
          )}
          <span style={{ fontSize: '13px', color: '#6D7A73' }}>approx. {product.unit}</span>
        </div>
      </header>

      {/*  MOBILE EDITORIAL DESCRIPTION CARD (below lg) */}
      <section className="lg:hidden px-6 mb-10">
        <div className="bg-[#ECF7E4] p-8 rounded-[2rem] relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold mb-4" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '1.4rem', color: '#151E13' }}>
              The Digital Larder's Choice
            </h3>
            <p className="text-[#151E13]/80 leading-relaxed mb-6" style={{ fontSize: '16px', lineHeight: 1.7 }}>
              {product.shortDesc}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#855000] font-bold block mb-1">Notes</span>
                <span className="text-sm font-medium text-[#151E13]">{product.notes}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#855000] font-bold block mb-1">Texture</span>
                <span className="text-sm font-medium text-[#151E13]">{product.texture}</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#00694C]/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* MOBILE FULFILLMENT (below lg) */}

      <section className="lg:hidden px-6 mb-10">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6D7A73] mb-4">Delivery &amp; Pickup</h4>
        <div className="space-y-3">
          {fulfillmentOptions.slice(0, 2).map((opt) => (
            <label key={opt.id}
              className="relative flex items-center p-4 rounded-xl bg-white cursor-pointer transition-all active:scale-[0.98]"
              style={{ border: `2px solid ${fulfillment === opt.id ? '#00694C' : 'transparent'}` }}
              onClick={() => setFulfillment(opt.id)}>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#ECF7E4] text-[#00694C] mr-4">
                <opt.Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#151E13] text-sm">{opt.label}</p>
                <p className="text-xs text-[#6D7A73]">{opt.sub}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#00694C] text-sm">Free</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/*  MOBILE PROVENANCE CARD (below lg) */}

      <section className="lg:hidden px-6 mb-6">
        <div className="bg-white p-6 rounded-3xl border border-[#BCCAC1]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00694C]/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#00694C">
                <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
                <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6D7A73]">Produced by</p>
              <p className="font-bold text-[#151E13]" style={{ fontFamily: '"Newsreader", Georgia, serif' }}>
                {product.producer?.name}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#6D7A73] leading-relaxed italic">{product.producer?.quote}</p>
        </div>
      </section>

      {/* DESKTOP: BREADCRUMB + MAIN GRID (lg+) */}
      <div className="hidden lg:block">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-6 pb-0">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#6D7A73', letterSpacing: '0.05em' }}>
            <Link href="/" className="hover:text-[#085041] transition-colors">Fruits</Link>
            <span className="text-[#BCCAC1]">›</span>
            <span style={{ color: '#3D4943', fontWeight: 500 }}>{product.category}</span>
          </nav>
        </div>

        {/* Main grid */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8 lg:py-8">
          <div className="grid grid-cols-12 gap-16">

            {/* LEFT: Image Gallery — 7 cols */}
            <div className="col-span-7 flex flex-col gap-4">
              {/* Main image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#BCCAC1]/20"
                style={{ boxShadow: '0 24px 48px -12px rgba(0,33,21,0.08)' }}>
                <Image
                  src={product.images?.[activeImg] || product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1280px) 58vw, 730px"
                  className="object-cover  mix-blend-multiply transition-opacity duration-300"
                  priority
                />
           
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="relative aspect-square rounded-xl overflow-hidden transition-all duration-150 bg-white"
                      style={{
                        border: `2px solid ${i === activeImg ? '#00694C' : '#BCCAC1'}`,
                        opacity: i === activeImg ? 1 : 0.7,
                      }}>
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="120px"
                        className="cursor-pointer object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info — 5 cols */}
            <div className="col-span-5 flex flex-col gap-6">

              {/* Name */}
              <div>
                <h1 className="font-bold tracking-tight text-[#151E13] mb-2"
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontSize: 'clamp(2rem, 3vw, 2.6rem)',
                    lineHeight: 1.1,
                  }}>
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="italic text-lg text-[#00694C]"
                    style={{ fontFamily: '"Newsreader", Georgia, serif' }}>
                    Class A — Fresh from {product.origin}
                  </span>
                </div>
                <StarRating rating={product.rating} reviews={product.reviews} size={16} />
              </div>

              {/* Price block — accent left border */}
              <div className="bg-white p-6 rounded-md border-l-4 border-[#00694C] flex justify-between items-center"
                style={{ boxShadow: '0 2px 8px rgba(0,33,21,0.04)' }}>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[#855000]"
                      style={{ fontFamily: '"Newsreader", Georgia, serif' }}>
                      €{product.price.toFixed(2)}/kg
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-[#BCCAC1] line-through font-medium">
                        €{product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.onSale && (
                    <p className="text-xs font-bold uppercase tracking-widest text-[#00694C] mt-1">
                      Limited Time Offer
                    </p>
                  )}
                </div>
                {savePercent && (
                  <span className="bg-[#BA1A1A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Save {savePercent}%
                  </span>
                )}
              </div>

              {/* Unit + Quantity */}
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7A73] block mb-2">
                      Select Unit
                    </label>
                    <div className="relative">
                      <select className="w-full cursor-pointer bg-white border border-[#BCCAC1]/40 rounded-xl px-4 py-3 appearance-none text-sm font-medium text-[#151E13] focus:ring-2 focus:ring-[#00694C]/20 focus:border-[#00694C] outline-none">
                        <option>Kilograms (kg)</option>
                        <option>Individual Units</option>
                        <option>Pre-packed Box (2kg)</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="14" height="14" fill="none" stroke="#6D7A73" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7A73] block mb-2">
                      Quantity
                    </label>
                    <div className="flex cursor-pointer items-center justify-between bg-white border border-[#BCCAC1]/40 rounded-xl px-2 py-1">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="p-2 cursor-pointer hover:bg-[#E7F1DF] rounded-lg text-[#00694C] transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg text-[#151E13]">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)}
                        className="p-2 cursor-pointer hover:bg-[#E7F1DF] rounded-lg text-[#00694C] transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm text-[#6D7A73]">Estimated Total</span>
                  <span className="font-bold text-xl text-[#151E13]">
                    €{(product.price * qty).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Fulfillment */}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#6D7A73] block mb-3">
                  Fulfillment
                </label>
                <div className="space-y-2.5">
                  {fulfillmentOptions.map((opt) => (
                    <label key={opt.id}
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: fulfillment === opt.id ? 'white' : 'white',
                        border: `1px solid ${fulfillment === opt.id ? '#00694C' : '#BCCAC1'}`,
                        boxShadow: fulfillment === opt.id ? '0 0 0 1px #00694C20' : 'none',
                      }}>
                      <input type="radio" name="fulfillment" value={opt.id}
                        checked={fulfillment === opt.id}
                        onChange={() => setFulfillment(opt.id)}
                        className="accent-[#00694C]" />
                      <opt.Icon size={18} className={fulfillment === opt.id ? 'text-[#00694C]' : 'text-[#6D7A73]'} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#151E13]">{opt.label}</p>
                        <p className="text-xs text-[#6D7A73]">{opt.sub}</p>
                      </div>
                      {opt.id !== 'instore' && (
                        <span className="text-xs font-bold text-[#00694C]">Free</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

                {/* Add to Cart */}
                {product.inStock ? (
                  <button onClick={handleAddToCart}
                    className="w-full cursor-pointer flex items-center justify-center gap-3 rounded-xl py-3  transition-all duration-200 shadow-sm"
                    style={{
                      background: added
                        ? '#085041'
                        : 'linear-gradient(135deg, #00694C 0%, #008560 100%)',
                      color: 'white', fontSize: '16px', fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}>
                    {added
                      ? <><Check size={19} /> Added to Cart</>
                      : <><ShoppingCart size={19} /> Add to Cart</>
                    }
                  </button>
                ) : (
                  <button disabled
                    className="w-full flex items-center justify-center gap-3 rounded-xl cursor-pointer py-4 bg-gray-100 text-gray-400 cursor-not-allowed"
                    style={{ fontSize: '16px', fontWeight: 700 }}>
                    Out of Stock
                  </button>
                )}

                {product.inStock && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00694C]" />
                    <span className="text-xs font-medium text-[#00694C]">In Stock — 42 units available</span>
                  </div>
                )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 border-t border-[#BCCAC1]/20 pt-4 mt-2">
                {[
                  { Icon: Zap, label: 'Fresh Daily' },
                  { Icon: Truck, label: 'Free > €40' },
                  { Icon: Lock, label: 'Secure Pay' },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-1.5 py-2">
                    <t.Icon size={18} className="text-[#00694C] opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D7A73]">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS + RELATED (desktop only via hidden lg:block wrapper) */}
      <div className="hidden lg:block max-w-[1280px] mx-auto px-6 lg:px-10 mt-16">
        <TabSection product={product} />
        <RelatedProducts related={related} />
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 px-5 pb-8 pt-4 bg-[#F2FDEA]/80 backdrop-blur-xl">
        <div className="flex items-center gap-5 max-w-md mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#855000]">Total Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#151E13]"
                style={{ fontFamily: '"Newsreader", Georgia, serif' }}>
                €{(product.price * qty).toFixed(2)}
              </span>
              <span className="text-sm font-medium text-[#6D7A73]">/kg</span>
            </div>
          </div>
          <button onClick={handleAddToCart}
            className="flex-1 h-16 flex items-center justify-center gap-3 rounded-2xl transition-all active:scale-95"
            style={{
              background: added ? '#085041' : 'linear-gradient(135deg, #00694C 0%, #008560 100%)',
              color: 'white',
              boxShadow: '0 24px 48px -12px rgba(0,33,21,0.25)',
            }}>
            {added
              ? <><Check size={18} /><span className="font-bold uppercase tracking-widest text-sm">Added!</span></>
              : <><ShoppingBag size={18} style={{ fill: 'white', opacity: 0.9 }} /><span className="font-bold uppercase tracking-widest text-sm">Add to Cart</span></>
            }
          </button>
        </div>
      </div>

  
    </main>
  )
}