'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  stores,
  haversineDistance,
  isStoreOpen,
  sortStoresByDistance,
  formatDistance,
  FEATURE_LABELS,
} from '@/app/data/stores'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

const DISTANCES = [2, 5, 10, null]
const DISTANCE_LABELS = ['2 km', '5 km', '10 km', 'All stores']

// ── Icon helpers ────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)
const IconPin = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const IconArrow = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
const IconExternal = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)
const IconChevron = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" />
  </svg>
)
const IconFilter = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="10" y1="18" x2="14" y2="18" />
  </svg>
)

export default function StoreFinderClient() {
  const [userLocation, setUserLocation] = useState(null)
  const [sortedStores, setSortedStores] = useState(stores)
  const [activeStoreId, setActiveStoreId] = useState(stores[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [distanceFilter, setDistanceFilter] = useState(null)
  const [showLeftoverOnly, setShowLeftoverOnly] = useState(false)
  const [locationLoading, setLocationLoading] = useState(true)
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false)

  // ── Geolocation on mount ──────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) { setLocationLoading(false); return }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const loc = { lat: coords.latitude, lng: coords.longitude }
        setUserLocation(loc)
        const sorted = sortStoresByDistance(stores, loc.lat, loc.lng)
        setSortedStores(sorted)
        setActiveStoreId(sorted[0].id)
        setLocationLoading(false)
      },
      () => setLocationLoading(false),
      { timeout: 8000 }
    )
  }, [])

  // ── Filter pipeline ───────────────────────────────────────────
  const filteredStores = sortedStores.filter((store) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (
        !store.name.toLowerCase().includes(q) &&
        !store.city.toLowerCase().includes(q) &&
        !store.address.toLowerCase().includes(q)
      ) return false
    }
    if (distanceFilter && userLocation) {
      if (haversineDistance(userLocation.lat, userLocation.lng, store.lat, store.lng) > distanceFilter)
        return false
    }
    if (showLeftoverOnly && !store.features.includes('leftoverPack')) return false
    return true
  })

  const activeStore = filteredStores.find((s) => s.id === activeStoreId) ?? filteredStores[0]

  function getDist(store) {
    if (!userLocation) return null
    return haversineDistance(userLocation.lat, userLocation.lng, store.lat, store.lng)
  }

  // ── Store card (used in desktop sidebar + mobile sheet) ──────
  function StoreCard({ store, compact = false }) {
    const isActive = store.id === activeStoreId
    const dist = getDist(store)
    const open = isStoreOpen(store)

    return (
      <div
        onClick={() => { setActiveStoreId(store.id); if (compact) setBottomSheetExpanded(false) }}
        className="cursor-pointer transition-colors"
        style={{
          borderLeft: `4px solid ${isActive ? '#00694c' : 'transparent'}`,
          background: isActive ? 'rgba(0,105,76,0.04)' : 'white',
          padding: compact ? '12px 0' : '20px',
          borderBottom: '1px solid rgba(188,202,193,0.15)',
        }}
      >
        <div className="flex items-start justify-between mb-1">
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#151e13', lineHeight: 1.3, flex: 1 }}>
            {store.name}
          </h3>
          {dist !== null && (
            <span
              className="shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: isActive ? '#E7F1DF' : '#f3f4f6', color: isActive ? '#00694c' : '#6D7A73' }}
            >
              {formatDistance(dist)}
            </span>
          )}
        </div>

        {!compact && (
          <p style={{ fontSize: '12px', color: '#6D7A73', marginBottom: '10px' }}>
            {store.address}, {store.city}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-2">
          {store.features.map((f) => (
            <span
              key={f}
              className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{
                background: f === 'leftoverPack' ? '#FFF8ED' : '#E7F1DF',
                color: f === 'leftoverPack' ? '#855000' : '#00694c',
              }}
            >
              {FEATURE_LABELS[f]}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: open ? '#00694c' : '#e11d48' }} />
            <span style={{ fontSize: '12px', color: '#3d4943', fontWeight: 500 }}>
              {open ? `Open until ${store.closeTime}` : 'Closed'}
            </span>
          </div>
          {!compact && (
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '12px', fontStyle: 'italic', color: '#00694c' }}>
              {store.provenance}
            </span>
          )}
        </div>

        {!compact && (
          <div className="flex gap-5">
            <Link
              href={`/stores/${store.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[12px] font-bold"
              style={{ color: '#00694c' }}
            >
              View Products <IconArrow />
            </Link>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[12px] font-bold"
              style={{ color: '#6D7A73' }}
            >
              Get Directions <IconExternal />
            </a>
          </div>
        )}
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════════════════ DESKTOP ══════════════════════════════════ */}
      <div className="hidden md:flex bg-white" style={{ height: 'calc(100vh - 60px)' }}>

        {/* Left sidebar */}
        <aside
          className="flex flex-col overflow-hidden bg-white"
          style={{ width: '380px', flexShrink: 0, borderRight: '1px solid rgba(188,202,193,0.2)' }}
        >
          {/* Header */}
          <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(188,202,193,0.15)' }}>
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '26px', fontWeight: 700, color: '#00694c', marginBottom: '3px',
              }}
            >
              Market Finder
            </h1>
            <p style={{ fontSize: '13px', color: '#6D7A73' }}>Find fresh produce near you</p>
          </div>

          {/* Search + filters */}
          <div className="px-5 py-4 space-y-3" style={{ borderBottom: '1px solid rgba(188,202,193,0.15)' }}>
            {/* Search input */}
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#6D7A73]"><IconSearch /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city or street..."
                className="w-full rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00694c]/30"
                style={{ background: '#ECF7E4', color: '#151e13', fontSize: '13px', border: 'none' }}
              />
            </div>

            {/* Distance pills */}
            <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
              {DISTANCE_LABELS.map((label, i) => {
                const val = DISTANCES[i]
                const isActive = distanceFilter === val
                return (
                  <button
                    key={label}
                    onClick={() => setDistanceFilter(val)}
                    className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      background: isActive ? '#00694c' : '#ECF7E4',
                      color: isActive ? '#fff' : '#3d4943',
                      border: 'none',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Leftover toggle */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl"
              style={{ background: '#ECF7E4' }}
            >
              <span style={{ fontSize: '13px', color: '#151e13', fontWeight: 500 }}>
                Leftover Packs only
              </span>
              <button
                onClick={() => setShowLeftoverOnly(!showLeftoverOnly)}
                className="relative w-10 h-6 rounded-full transition-colors flex-shrink-0"
                style={{ background: showLeftoverOnly ? '#00694c' : '#BCCAC1' }}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                  style={{ transform: showLeftoverOnly ? 'translateX(18px)' : 'translateX(2px)' }}
                />
              </button>
            </div>

            {/* Count */}
            <p style={{ fontSize: '12px', color: '#6D7A73' }}>
              {locationLoading
                ? 'Locating you…'
                : userLocation
                ? `${filteredStores.length} store${filteredStores.length !== 1 ? 's' : ''} near you`
                : `${filteredStores.length} store${filteredStores.length !== 1 ? 's' : ''} available`}
            </p>
          </div>

          {/* Store list */}
          <div className="flex-1 overflow-y-auto">
            {filteredStores.length === 0 ? (
              <p className="p-6 text-center" style={{ fontSize: '14px', color: '#6D7A73' }}>
                No stores match your filters.
              </p>
            ) : (
              filteredStores.map((store) => <StoreCard key={store.id} store={store} />)
            )}
          </div>
        </aside>

        {/* Map panel */}
        <div className="flex-1 relative">
          <LeafletMap
            stores={filteredStores}
            activeStoreId={activeStore?.id}
            userLocation={userLocation}
            onStoreClick={setActiveStoreId}
          />
          {/* Floating badge */}
          <div
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(188,202,193,0.25)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00694c]" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#151e13' }}>
              {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} in your area
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════ MOBILE ═══════════════════════════════════ */}
      <div className="md:hidden relative overflow-hidden bg-[#f2fdea]" style={{ height: 'calc(100vh - 60px)' }}>

        {/* Full-screen map */}
        <div className="absolute inset-0 z-0">
          <LeafletMap
            stores={filteredStores}
            activeStoreId={activeStore?.id}
            userLocation={userLocation}
            onStoreClick={(id) => { setActiveStoreId(id); setBottomSheetExpanded(false) }}
          />
        </div>

        {/* Floating search + filter pills */}
        <div className="absolute top-4 left-4 right-4 z-10 space-y-3">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.96)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
          >
            <span className="text-[#6D7A73]"><IconSearch /></span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a market..."
              className="bg-transparent outline-none flex-1"
              style={{ fontSize: '14px', color: '#151e13' }}
            />
            <span className="text-[#6D7A73]"><IconFilter /></span>
          </div>

          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {['Near me', '2 km', '5 km', 'Open Now', 'Leftover Pack'].map((label, i) => {
              const isActive = i === 0 && !distanceFilter && !showLeftoverOnly
              return (
                <button
                  key={label}
                  className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: isActive ? '#00694c' : 'rgba(255,255,255,0.95)',
                    color: isActive ? '#fff' : '#3d4943',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  }}
                  onClick={() => {
                    if (label === '2 km') setDistanceFilter(2)
                    else if (label === '5 km') setDistanceFilter(5)
                    else if (label === 'Near me') setDistanceFilter(null)
                    else if (label === 'Leftover Pack') setShowLeftoverOnly(!showLeftoverOnly)
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Bottom sheet */}
        {activeStore && (
          <div
            className="absolute bottom-0 left-0 right-0 z-20 rounded-t-3xl overflow-hidden"
            style={{
              background: '#fff',
              boxShadow: '0 -8px 40px rgba(0,33,21,0.12)',
              transform: bottomSheetExpanded ? 'translateY(0)' : 'translateY(calc(100% - 230px))',
              transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
              maxHeight: '85vh',
              overflowY: bottomSheetExpanded ? 'auto' : 'hidden',
            }}
          >
            {/* Drag handle */}
            <div
              className="flex justify-center pt-3 pb-1 cursor-pointer"
              onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)}
            >
              <div className="w-10 h-1 rounded-full" style={{ background: '#BCCAC1' }} />
            </div>

            {/* Active store header */}
            <div className="px-5 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <span
                    className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: '#00694c' }}
                  >
                    {userLocation ? 'Closest to you' : 'Featured store'}
                  </span>
                  <h2
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: '21px', fontWeight: 700, color: '#151e13', lineHeight: 1.2,
                    }}
                  >
                    {activeStore.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[#6D7A73]"><IconPin /></span>
                    <span style={{ fontSize: '13px', color: '#6D7A73' }}>{activeStore.address}</span>
                  </div>
                </div>
                {getDist(activeStore) !== null && (
                  <div
                    className="shrink-0 px-3 py-2 rounded-xl text-center"
                    style={{ background: '#ECF7E4' }}
                  >
                    <span className="block font-bold leading-none" style={{ fontSize: '20px', color: '#151e13' }}>
                      {getDist(activeStore)?.toFixed(1)}
                    </span>
                    <span className="text-[10px] font-bold uppercase" style={{ color: '#6D7A73' }}>km</span>
                  </div>
                )}
              </div>

              {/* Status + directions */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: isStoreOpen(activeStore) ? '#E7F1DF' : '#FEE2E2' }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isStoreOpen(activeStore) ? '#00694c' : '#e11d48' }}
                  />
                  <span
                    style={{
                      fontSize: '12px', fontWeight: 600,
                      color: isStoreOpen(activeStore) ? '#00694c' : '#e11d48',
                    }}
                  >
                    {isStoreOpen(activeStore) ? `Open until ${activeStore.closeTime}` : 'Closed'}
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeStore.lat},${activeStore.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold"
                  style={{ fontSize: '13px', color: '#855000' }}
                >
                  Directions <IconExternal />
                </a>
              </div>

              {/* CTA buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/stores/${activeStore.slug}`}
                  className="py-3.5 rounded-xl text-center font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)' }}
                >
                  SHOP THIS STORE
                </Link>
                <Link
                  href={`/stores/${activeStore.slug}`}
                  className="py-3.5 rounded-xl text-center font-bold text-sm"
                  style={{ background: '#ECF7E4', color: '#151e13' }}
                >
                  STORE INFO
                </Link>
              </div>
            </div>

            {/* Expanded: other stores list */}
            <div className="px-5 pt-4" style={{ borderTop: '1px solid rgba(188,202,193,0.2)' }}>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '18px', fontStyle: 'italic', color: '#151e13', marginBottom: '8px',
                }}
              >
                Other locations near you
              </h3>
              <div className="pb-6">
                {filteredStores
                  .filter((s) => s.id !== activeStore.id)
                  .map((store) => (
                    <div
                      key={store.id}
                      onClick={() => { setActiveStoreId(store.id); setBottomSheetExpanded(false) }}
                      className="flex items-center justify-between py-3 cursor-pointer"
                      style={{ borderBottom: '1px solid rgba(188,202,193,0.15)' }}
                    >
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#151e13' }}>{store.name}</h4>
                        <p style={{ fontSize: '12px', color: '#6D7A73', marginTop: '2px' }}>
                          {getDist(store) ? formatDistance(getDist(store)) + ' · ' : ''}
                          {isStoreOpen(store) ? `Closes ${store.closeTime}` : 'Closed'}
                        </p>
                      </div>
                      <span className="text-[#BCCAC1]"><IconChevron /></span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}