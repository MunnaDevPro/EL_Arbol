'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { isStoreOpen, stores, haversineDistance, formatDistance } from '@/app/data/stores'

const AVAILABILITY_ICONS = {
  Fruits: 'nutrition',
  Veg: 'eco',
  Bread: 'bakery_dining',
  Cheese: 'breakfast_dining',
  Dairy: 'water_drop',
  Wine: 'wine_bar',
}

const FEATURE_LABELS = {
  leftoverPack: 'LEFTOVER PACK',
  clickCollect: 'CLICK & COLLECT',
}

function BackIcon() {
  return (
    <svg width="20" height="20" fill="none" style={{ color: '#00694c' }} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function PinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="20" height="20" fill={filled ? '#00694c' : 'none'} stroke="#00694c" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

// Simple map tile preview using iframe embed
function LocationMap({ store }) {
  const zoom = 15
  const { lat, lng } = store
  const delta = 0.008
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`

  return (
    <a
      href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-2xl overflow-hidden"
      style={{ height: '180px', boxShadow: '0 4px 24px rgba(0,33,21,0.08)' }}
    >
      <iframe
        src={iframeSrc}
        style={{ width: '100%', height: '100%', border: 'none', opacity: 0.85, pointerEvents: 'none' }}
        title="Store location"
      />
      {/* Overlay pin */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white"
          style={{ background: '#00694c', boxShadow: '0 4px 16px rgba(0,105,76,0.4)' }}
        >
          <PinIcon size={16} />
          <style>{`svg { color: white; }`}</style>
        </div>
      </div>
      <div
        className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.92)', color: '#00694c', backdropFilter: 'blur(6px)' }}
      >
        Open Navigation
      </div>
    </a>
  )
}

export default function StoreDetailClient({ store }) {
  const router = useRouter()
  const [favorited, setFavorited] = useState(false)
  const open = isStoreOpen(store)

  return (
    <>
      {/* ═══════════════════════════ MOBILE ═══════════════════════════ */}
      <div className="md:hidden min-h-screen" style={{ background: '#f2fdea' }}>
        {/* Fixed Header */}
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{ background: 'rgba(242,253,234,0.82)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(188,202,193,0.15)' }}
        >
          <div className="flex items-center justify-between px-5 h-[60px]">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full flex items-center justify-center text-primary active:scale-95 transition-transform"
              style={{ background: 'rgba(0,105,76,0.08)' }}
            >
              <BackIcon />
            </button>
            <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '20px', fontStyle: 'italic', color: '#00694c' }}>
              El Árbol
            </span>
            <button
              onClick={() => setFavorited(!favorited)}
              className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: 'rgba(0,105,76,0.08)' }}
            >
              <HeartIcon filled={favorited} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="pt-[60px] pb-32">
          {/* Hero */}
          <div className="px-0 mb-6">
            <div className="relative h-64 overflow-hidden" style={{ borderRadius: '0 0 24px 24px' }}>
              <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              {/* Open badge on image */}
              <div className="absolute bottom-4 left-5">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: open ? '#E7F1DF' : '#FEE2E2', color: open ? '#00694c' : '#e11d48' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: open ? '#00694c' : '#e11d48' }} />
                  {open ? `Open until ${store.closeTime}` : 'Closed now'}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6">
            {/* Title + Address */}
            <div className="mb-6">
              <h1
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontSize: '30px', fontWeight: 700, color: '#151e13',
                  lineHeight: 1.15, marginBottom: '10px',
                }}
              >
                {store.name}
              </h1>
              <div className="flex items-start gap-2" style={{ color: '#6D7A73', fontSize: '13px' }}>
                <span style={{ marginTop: '2px', flexShrink: 0, color: '#00694c' }}><PinIcon size={13} /></span>
                {store.fullAddress}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { label: 'Opening Hours', value: store.hours },
                { label: 'Contact', value: store.phone },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl" style={{ background: '#ECF7E4' }}>
                  <span
                    className="block text-[10px] uppercase tracking-widest mb-1.5"
                    style={{ color: '#6D7A73', opacity: 0.75, fontWeight: 700 }}
                  >
                    {label}
                  </span>
                  <p className="font-semibold text-sm" style={{ color: '#151e13' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Today's Availability */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#151e13' }}>
                  Today's Availability
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#00694c' }}>
                  Fresh Today
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
                {store.availability.map((item) => (
                  <div
                    key={item}
                    className="min-w-[96px] flex-shrink-0 p-4 rounded-2xl flex flex-col items-center gap-2.5"
                    style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,33,21,0.06)' }}
                  >
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>
                      {AVAILABILITY_ICONS[item] || 'local_grocery_store'}
                    </span>
                    <span className="text-xs font-bold" style={{ color: '#151e13' }}>{item}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#008560' }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Leftover Packs */}
            {store.leftoverPacks.length > 0 && (
              <section className="mb-10">
                <div className="flex items-baseline justify-between mb-5">
                  <h2 style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#151e13' }}>
                    Leftover Packs
                  </h2>
                  <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '13px', fontStyle: 'italic', color: '#855000' }}>
                    {store.leftoverPacks.length} packs remaining
                  </span>
                </div>
                <div className="space-y-4">
                  {store.leftoverPacks.map((pack) => (
                    <div
                      key={pack.id}
                      className="flex overflow-hidden rounded-xl"
                      style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,33,21,0.06)' }}
                    >
                      <div className="w-28 h-28 flex-shrink-0">
                        <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="font-bold text-sm leading-snug" style={{ color: '#151e13' }}>{pack.name}</h3>
                          <p className="text-xs mt-1" style={{ color: '#6D7A73' }}>{pack.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm" style={{ color: '#855000' }}>€{pack.price.toFixed(2)}</span>
                          <button
                            className="text-xs font-bold px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                            style={{ background: 'rgba(0,105,76,0.09)', color: '#00694c', border: 'none' }}
                          >
                            Reserve Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location */}
            <section className="mb-10">
              <h2 style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#151e13', marginBottom: '20px' }}>
                Location
              </h2>
              <LocationMap store={store} />
            </section>
          </div>
        </div>

        {/* Sticky CTA */}
        <div
          className="fixed bottom-0 left-0 right-0 p-5"
          style={{ background: 'rgba(242,253,234,0.9)', backdropFilter: 'blur(14px)', borderTop: '1px solid rgba(188,202,193,0.15)' }}
        >
          <Link
            href={`/shop?store=${store.slug}`}
            className="flex items-center justify-center w-full py-4 rounded-xl font-bold text-sm text-white active:scale-[0.98] transition-transform"
            style={{ background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)', boxShadow: '0 4px 18px rgba(0,105,76,0.28)' }}
          >
            Shop This Store's Products
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════ DESKTOP ═══════════════════════════ */}
      <div className="hidden md:block" style={{ background: '#f2fdea', minHeight: 'calc(100vh - 60px)' }}>
        <div className="max-w-5xl mx-auto px-8 py-10">
          {/* Back nav */}
          <button
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-2 mb-8 text-sm font-semibold active:scale-95 transition-transform"
            style={{ color: '#00694c' }}
          >
            <BackIcon /> Back to stores
          </button>

          <div className="grid grid-cols-5 gap-10">
            {/* LEFT: main content */}
            <div className="col-span-3 space-y-10">
              {/* Hero */}
              <div className="rounded-2xl overflow-hidden h-72 relative">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: open ? '#E7F1DF' : '#FEE2E2', color: open ? '#00694c' : '#e11d48' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: open ? '#00694c' : '#e11d48' }} />
                    {open ? `Open until ${store.closeTime}` : 'Closed now'}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontSize: '38px', fontWeight: 700, color: '#151e13',
                    lineHeight: 1.15, marginBottom: '12px',
                  }}
                >
                  {store.name}
                </h1>
                <div className="flex items-center gap-2" style={{ color: '#6D7A73', fontSize: '14px' }}>
                  <span style={{ color: '#00694c' }}><PinIcon size={14} /></span>
                  {store.fullAddress}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Opening Hours', value: store.hours },
                  { label: 'Contact', value: store.phone },
                ].map(({ label, value }) => (
                  <div key={label} className="p-5 rounded-xl" style={{ background: '#ECF7E4' }}>
                    <span className="block text-[10px] uppercase tracking-widest mb-2 font-bold" style={{ color: '#6D7A73', opacity: 0.75 }}>
                      {label}
                    </span>
                    <p className="font-semibold text-sm" style={{ color: '#151e13' }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#151e13' }}>
                    Today's Availability
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#00694c' }}>Fresh Today</span>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {store.availability.map((item) => (
                    <div
                      key={item}
                      className="px-5 py-4 rounded-2xl flex flex-col items-center gap-2.5"
                      style={{ background: '#fff', minWidth: '96px', boxShadow: '0 2px 12px rgba(0,33,21,0.06)' }}
                    >
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>
                        {AVAILABILITY_ICONS[item] || 'local_grocery_store'}
                      </span>
                      <span className="text-xs font-bold" style={{ color: '#151e13' }}>{item}</span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#008560' }} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Leftover Packs */}
              {store.leftoverPacks.length > 0 && (
                <section>
                  <div className="flex items-baseline justify-between mb-5">
                    <h2 style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#151e13' }}>
                      Leftover Packs
                    </h2>
                    <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '13px', fontStyle: 'italic', color: '#855000' }}>
                      {store.leftoverPacks.length} packs remaining
                    </span>
                  </div>
                  <div className="space-y-4">
                    {store.leftoverPacks.map((pack) => (
                      <div
                        key={pack.id}
                        className="flex overflow-hidden rounded-xl"
                        style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,33,21,0.06)' }}
                      >
                        <div className="w-36 h-36 flex-shrink-0">
                          <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="font-bold text-base leading-snug mb-1" style={{ color: '#151e13' }}>{pack.name}</h3>
                            <p className="text-sm" style={{ color: '#6D7A73' }}>{pack.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg" style={{ color: '#855000' }}>€{pack.price.toFixed(2)}</span>
                            <button
                              className="text-sm font-bold px-5 py-2 rounded-full active:scale-95 transition-transform"
                              style={{ background: 'rgba(0,105,76,0.09)', color: '#00694c' }}
                            >
                              Reserve Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT: sticky sidebar */}
            <div className="col-span-2">
              <div className="sticky top-[80px] space-y-5">
                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {store.features.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: f === 'leftoverPack' ? '#FFF8ED' : '#E7F1DF',
                        color: f === 'leftoverPack' ? '#855000' : '#00694c',
                      }}
                    >
                      {FEATURE_LABELS[f]}
                    </span>
                  ))}
                </div>

                {/* Provenance */}
                <p
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontSize: '15px', fontStyle: 'italic', color: '#00694c',
                  }}
                >
                  Produce {store.provenance}
                </p>

                {/* Location Map */}
                <div>
                  <h3 style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#151e13', marginBottom: '14px' }}>
                    Location
                  </h3>
                  <LocationMap store={store} />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 mt-3 text-xs font-bold"
                    style={{ color: '#855000' }}
                  >
                    Get Directions <ExternalIcon />
                  </a>
                </div>

                {/* CTA */}
                <Link
                  href={`/shop?store=${store.slug}`}
                  className="flex items-center justify-center w-full py-4 rounded-xl font-bold text-sm text-white active:scale-[0.98] transition-transform"
                  style={{ background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)', boxShadow: '0 4px 18px rgba(0,105,76,0.28)' }}
                >
                  Shop This Store's Products
                </Link>

                {/* Back to finder */}
                <Link
                  href="/stores"
                  className="flex cursor-pointer items-center justify-center w-full py-3.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-transform"
                  style={{ background: '#ECF7E4', color: '#151e13' }}
                >
                  All Stores
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}