'use client'
import { newsreader } from '@/app/components/fonts'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import AuthModal from '@/app/components/AuthModal'
import { products } from '@/app/data/products'

const navLinks = [
  { label: 'Shop',    href: '/shop' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Store',   href: '/stores' },
  { label: 'About',   href: '/about' },
  { label: 'Wholesale',   href: '/wholesale' },
]

function PineTree() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#00694C">
      <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
      <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
    </svg>
  )
}

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function Navbar() {
  const [open, setOpen]                     = useState(false)
  const [authOpen, setAuthOpen]             = useState(false)
  const [authMode, setAuthMode]             = useState('login')
  const [query, setQuery]                   = useState('')
  const [showDropdown, setShowDropdown]     = useState(false)
  const [activeIndex, setActiveIndex]       = useState(-1)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false) // ← NEW

  const { totalItems, setSidebarOpen } = useCart()
  const pathname  = usePathname()
  const router    = useRouter()
  const inputRef        = useRef(null)
  const mobileInputRef  = useRef(null) // ← NEW
  const dropdownRef     = useRef(null)

  const openLogin  = () => { setAuthMode('login');  setAuthOpen(true) }
  const openSignup = () => { setAuthMode('signup'); setAuthOpen(true) }

  function isActive(href) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const filtered = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target) &&
        mobileInputRef.current && !mobileInputRef.current.contains(e.target)
      ) {
        setShowDropdown(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-focus mobile input when search opens
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setShowDropdown(false)
      setActiveIndex(-1)
    }
  }, [mobileSearchOpen])

  function handleInputChange(e) {
    setQuery(e.target.value)
    setShowDropdown(true)
    setActiveIndex(-1)
  }

  function handleKeyDown(e) {
    if (!showDropdown || filtered.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      navigateToProduct(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setActiveIndex(-1)
      setMobileSearchOpen(false)
    }
  }

  function navigateToProduct(product) {
    setQuery('')
    setShowDropdown(false)
    setActiveIndex(-1)
    setMobileSearchOpen(false)
    const slug = product.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    router.push(`/products/${slug}`)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAFAF8] backdrop-blur-sm border-b border-[#BCCAC1]/35">
        <nav className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[60px] flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-[4px] shrink-0 mr-2 text-[var(--logo-color)]">
            <PineTree />
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              El Árbol
            </span>
          </Link>

          {/* Desktop links — UNCHANGED */}
          <ul className={`${newsreader.className} hidden md:flex items-center gap-7`}>
            {navLinks.map(({ label, href }) => {
              const active = isActive(href)
              return (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: '16px', lineHeight: '20px',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#085041' : '#475569',
                      borderBottom: active ? '2px solid #1D9E75' : '2px solid transparent',
                      paddingBottom: '2px',
                      transition: 'color 0.15s, border-color 0.15s',
                    }}
                    className="hover:text-[#151E13]"
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop right — UNCHANGED */}
          <div className="hidden md:flex items-center gap-[8px] ml-auto">
            <div className="relative">
              <label className="flex items-center gap-[7px] bg-[#ECF7E4] rounded-full px-[14px] py-[8px] w-[215px] cursor-text">
                <svg width="14" height="14" fill="none" stroke="#6D7A73" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search fresh produce..."
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => query.trim() && setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none w-full placeholder:text-[#6D7A73]"
                  style={{ fontSize: '13px', color: '#6D7A73', border: 'none' }}
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); setShowDropdown(false); inputRef.current?.focus() }}
                    className="flex-shrink-0 text-[#6D7A73] hover:text-[#3D4943] transition-colors"
                    style={{ lineHeight: 1 }}
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </label>

              {showDropdown && query.trim().length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-[calc(100%+8px)] w-[280px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#BCCAC1]/40 overflow-hidden z-50"
                  style={{ animation: 'dropdownFadeIn 0.15s ease' }}
                >
                  {filtered.length > 0 ? (
                    <>
                      <p className="px-4 pt-3 pb-1.5 text-[11px] font-semibold tracking-widest text-[#6D7A73] uppercase">Products</p>
                      <ul>
                        {filtered.map((product, idx) => (
                          <li key={product.id}>
                            <button
                              onMouseEnter={() => setActiveIndex(idx)}
                              onMouseLeave={() => setActiveIndex(-1)}
                              onClick={() => navigateToProduct(product)}
                              className="w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors cursor-pointer"
                              style={{ backgroundColor: activeIndex === idx ? '#F0FAF5' : 'transparent' }}
                            >
                              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-[#ECF7E4]">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13.5px] font-medium text-[#151E13] truncate" style={{ lineHeight: '18px' }}>
                                  {highlightMatch(product.name, query)}
                                </p>
                                <p className="text-[11.5px] text-[#6D7A73]" style={{ lineHeight: '16px' }}>
                                  {product.category} · {product.origin}
                                </p>
                              </div>
                              <span className="text-[13px] font-semibold text-[#00694C] flex-shrink-0">
                                €{product.price.toFixed(2)}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-[#BCCAC1]/30 px-4 py-2.5">
                        <button
                          onClick={() => { router.push(`/shop?q=${encodeURIComponent(query)}`); setShowDropdown(false) }}
                          className="text-[12px] text-[#1D9E75] font-medium hover:text-[#085041] transition-colors cursor-pointer bg-transparent border-none p-0"
                        >
                          See all results for "{query}" →
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-5 text-center">
                      <p className="text-[13px] text-[#6D7A73]">No products found for <span className="font-medium text-[#151E13]">"{query}"</span></p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bell */}
            <button className="w-9 cursor-pointer h-9 flex items-center justify-center rounded-full hover:bg-[#BCCAC1]/25 transition-colors">
              <svg width="19" height="19" fill="none" stroke="#3D4943" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-full hover:bg-[#BCCAC1]/25 transition-colors relative"
            >
              <svg width="19" height="19" fill="none" stroke="#3D4943" strokeWidth="1.75" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-[#00694C] text-white rounded-full flex items-center justify-center"
                  style={{ fontSize: '10px', fontWeight: 700, lineHeight: 1 }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={openLogin}
              style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--common-color)' }}
              className="ml-5 px-3 py-1.5 rounded-lg border border-[#00694C]/40 hover:text-[#151E13] transition-colors bg-transparent cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={openSignup}
              className="bg-[#00694C] px-3.5 py-2 text-white rounded-lg hover:bg-[#085041] transition-colors border-none cursor-pointer"
              style={{ fontSize: '13.5px', fontWeight: 600 }}
            >
              Sign Up
            </button>
          </div>

          {/* ── Mobile right ── */}
          <div className="flex md:hidden items-center gap-1 ml-auto">

            {/* Mobile search toggle button */}
            <button
              onClick={() => { setMobileSearchOpen(v => !v); setOpen(false) }}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: mobileSearchOpen ? '#ECF7E4' : 'transparent' }}
              aria-label="Search"
            >
              {mobileSearchOpen ? (
                // X icon when open
                <svg width="17" height="17" fill="none" stroke="#151E13" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              ) : (
                // Magnifier icon when closed
                <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              )}
            </button>

            {/* Cart */}
            <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 flex items-center justify-center relative">
              <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="1.75" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-[15px] h-[15px] bg-[#00694C] text-white rounded-full flex items-center justify-center"
                  style={{ fontSize: '9px', fontWeight: 700, lineHeight: 1 }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => { setOpen(!open); setMobileSearchOpen(false) }}
              className="w-9 h-9 flex items-center justify-center"
              aria-label="Menu"
            >
              <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="2" viewBox="0 0 24 24">
                {open ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </nav>

        {/* ── Mobile Search Bar (slides in below navbar) ── */}
        {mobileSearchOpen && (
          <div
            className="md:hidden bg-[#FAFAF8] border-t border-[#BCCAC1]/35 px-4 py-3"
            style={{ animation: 'dropdownFadeIn 0.15s ease' }}
          >
            {/* Input row */}
            <div
              ref={mobileInputRef}
              className="flex items-center gap-2 bg-[#ECF7E4] rounded-full px-4 py-2.5"
            >
              <svg width="15" height="15" fill="none" stroke="#6D7A73" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search fresh produce..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none flex-1 placeholder:text-[#6D7A73]"
                style={{ fontSize: '14px', color: '#151E13', border: 'none' }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setShowDropdown(false) }}
                  className="text-[#6D7A73] flex-shrink-0"
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile dropdown results */}
            {showDropdown && query.trim().length > 0 && (
              <div
                ref={dropdownRef}
                className="mt-2 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#BCCAC1]/40 overflow-hidden"
                style={{ animation: 'dropdownFadeIn 0.15s ease' }}
              >
                {filtered.length > 0 ? (
                  <>
                    <p className="px-4 pt-3 pb-1.5 text-[11px] font-semibold tracking-widest text-[#6D7A73] uppercase">
                      Products
                    </p>
                    <ul>
                      {filtered.map((product, idx) => (
                        <li key={product.id}>
                          <button
                            onClick={() => navigateToProduct(product)}
                            className="w-full text-left flex items-center gap-3 px-4 py-3 transition-colors active:bg-[#F0FAF5]"
                            style={{ backgroundColor: activeIndex === idx ? '#F0FAF5' : 'transparent' }}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#ECF7E4]">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-medium text-[#151E13] truncate" style={{ lineHeight: '19px' }}>
                                {highlightMatch(product.name, query)}
                              </p>
                              <p className="text-[12px] text-[#6D7A73]" style={{ lineHeight: '17px' }}>
                                {product.category} · {product.origin}
                              </p>
                            </div>
                            <span className="text-[13.5px] font-semibold text-[#00694C] flex-shrink-0">
                              €{product.price.toFixed(2)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-[#BCCAC1]/30 px-4 py-3">
                      <button
                        onClick={() => {
                          router.push(`/shop?q=${encodeURIComponent(query)}`)
                          setShowDropdown(false)
                          setMobileSearchOpen(false)
                        }}
                        className="text-[13px] text-[#1D9E75] font-medium bg-transparent border-none p-0 cursor-pointer"
                      >
                        See all results for "{query}" →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-5 text-center">
                    <p className="text-[13px] text-[#6D7A73]">
                      No products found for <span className="font-medium text-[#151E13]">"{query}"</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[60px] bg-[#F5F5E8] z-40 px-6 pt-8 pb-10 flex flex-col md:hidden overflow-y-auto">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href)
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-[#BCCAC1]/40 py-4 flex items-center justify-between"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '1.5rem', fontWeight: 600,
                  color: active ? '#00694C' : '#151E13',
                }}
              >
                {label}
                {active && <span className="w-2 h-2 rounded-full bg-[#1D9E75]" />}
              </Link>
            )
          })}
          <div className="flex gap-3 mt-7">
            <button
              onClick={() => { setOpen(false); openLogin() }}
              className="flex-1 text-center border border-[#151E13] rounded-full bg-transparent cursor-pointer"
              style={{ fontSize: '14px', fontWeight: 500, color: '#151E13', padding: '11px 0' }}
            >
              Log In
            </button>
            <button
              onClick={() => { setOpen(false); openSignup() }}
              className="flex-1 text-center bg-[#00694C] text-white rounded-full border-none cursor-pointer"
              style={{ fontSize: '14px', fontWeight: 500, padding: '11px 0' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode={authMode}
      />
    </>
  )
}

function highlightMatch(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: '#D1FAE5', color: '#085041', borderRadius: '2px', padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}