'use client'
import { newsreader } from '@/app/components/fonts'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import AuthModal from '@/app/components/AuthModal'   // ← add this import

const navLinks = [
  { label: 'Shop',    href: '#', active: true },
  { label: 'Recipes', href: '#' },
  { label: 'Store',   href: '/stores' },
  { label: 'About',   href: '#' },
]

function PineTree() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#00694C">
      <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
      <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)          // ← new state
  const [authMode, setAuthMode] = useState('login')        // ← new state
  const { totalItems, setSidebarOpen } = useCart()

  const openLogin  = () => { setAuthMode('login');  setAuthOpen(true) }
  const openSignup = () => { setAuthMode('signup'); setAuthOpen(true) }

  return (
    <>
      <header className="sticky top-0 z-50 border border-b-[1px] border-color-[var(--common-color)] bg-[#FAFAF8] backdrop-blur-sm border-b border-[#BCCAC1]/35">
        <nav className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[60px] flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-[4px] shrink-0 mr-2 text-[var(--logo-color)]">
            <PineTree />
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              El Árbol
            </span>
          </Link>

          {/* Desktop links */}
          <ul className={`${newsreader.className} hidden md:flex items-center gap-7`}>
            {navLinks.map(({ label, href, active }) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    fontSize: '16px', lineHeight: '20px',
                    fontWeight: active ? 600 : 400, letterSpacing: '0px',
                    color: active ? '#085041' : '#475569',
                    borderBottom: active ? '2px solid #1D9E75' : 'none',
                    paddingBottom: active ? '2px' : '0',
                  }}
                  className="transition-colors hover:text-[#151E13]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-[8px] ml-auto">

            {/* Search pill */}
            <label className="flex items-center gap-[7px] bg-[#ECF7E4] rounded-full px-[14px] py-[8px] w-[215px] cursor-text">
              <svg width="14" height="14" fill="none" stroke="#6D7A73" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text" placeholder="Search fresh produce..."
                className="bg-transparent outline-none w-full placeholder:text-[#6D7A73]"
                style={{ fontSize: '13px', color: '#6D7A73', border: 'none' }}
              />
            </label>

            {/* Bell */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#BCCAC1]/25 transition-colors">
              <svg width="19" height="19" fill="none" stroke="#3D4943" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#BCCAC1]/25 transition-colors relative"
            >
              <svg width="19" height="19" fill="none" stroke="#3D4943" strokeWidth="1.75" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-[#00694C] text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px', fontWeight: 700, lineHeight: 1 }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Log In — now opens modal */}
            <button
              onClick={openLogin}
              style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--common-color)' }}
              className="ml-5 px-3 py-1.5 rounded-lg border border-[#00694C]/40 hover:text-[#151E13] transition-colors bg-transparent cursor-pointer"
            >
              Log In
            </button>

            {/* Sign Up — now opens modal */}
            <button
              onClick={openSignup}
              className="bg-[#00694C] px-3.5 py-2 text-white rounded-lg hover:bg-[#085041] transition-colors border-none cursor-pointer"
              style={{ fontSize: '13.5px', fontWeight: 600 }}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-1 ml-auto">
            <button className="w-9 h-9 flex items-center justify-center">
              <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 flex items-center justify-center relative">
              <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="1.75" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[15px] h-[15px] bg-[#00694C] text-white rounded-full flex items-center justify-center" style={{ fontSize: '9px', fontWeight: 700, lineHeight: 1 }}>
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="w-9 h-9 flex items-center justify-center" aria-label="Menu">
              <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="2" viewBox="0 0 24 24">
                {open ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[68px] bg-[#F5F5E8] z-40 px-6 pt-8 pb-10 flex flex-col md:hidden overflow-y-auto">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label} href={href} onClick={() => setOpen(false)}
              className="border-b border-[#BCCAC1]/40 py-4"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.5rem', fontWeight: 600, color: '#151E13' }}
            >
              {label}
            </Link>
          ))}
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode={authMode}
      />
    </>
  )
}
