'use client'
import { newsreader } from '@/app/components/fonts'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Shop',          href: '#', active: true },
  { label: 'Recipes',       href: '#' },
  { label: 'Sustainability', href: '#' },
  { label: 'About',         href: '#' },
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

  return (
    <>
      <header className="sticky top-0 z-50 border border-b-[1px] border-color-[var(--common-color)] bg-[#FAFAF8] backdrop-blur-sm border-b border-[#BCCAC1]/35">
        <nav className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[60px] flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className=" flex items-center gap-[4px] shrink-0 mr-2 text-[var(--logo-color)]">
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
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: active ? 600 : 400,
                    letterSpacing: '0px',
                    color: active ? '#085041' : '#475569', 
                    borderBottom: active ? '2px solid #1D9E75' : 'none', 
                    paddingBottom: active ? '2px' : '0' 
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
            <label className="flex items-center gap-[7px] bg-[#B0EFDB]/45 rounded-full px-[14px] py-[8px] w-[215px] cursor-text">
              <svg width="14" height="14" fill="none" stroke="#6D7A73" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span style={{ fontSize: '13px', color: '#6D7A73', whiteSpace: 'nowrap' }}>Search fresh produce...</span>
            </label>

            {/* Bell */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#BCCAC1]/25 transition-colors">
              <svg width="19" height="19" fill="none" stroke="#3D4943" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>

            {/* Cart */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#BCCAC1]/25 transition-colors relative">
              <svg width="19" height="19" fill="none" stroke="#3D4943" strokeWidth="1.75" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-[#00694C] text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px', fontWeight: 700, lineHeight: 1 }}>
                2
              </span>
            </button>

            {/* Log In */}
            <Link href="#" style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--common-color)',  }} className="ml-5 px-3 py-1.5 rounded-lg  border border-color-[var(--common-color)] hover:text-[#151E13] transition-colors" >
              Log In
            </Link>

            {/* Sign Up */}
            <Link href="#" className="bg-[#00694C] px-3.5 py-2 text-white rounded-lg hover:bg-[#085041] transition-colors" style={{ fontSize: '13.5px', fontWeight: 600}}>
              Sign Up
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-1 ml-auto">
            <button className="w-9 h-9 flex items-center justify-center">
              <svg width="19" height="19" fill="none" stroke="#151E13" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
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
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-[#BCCAC1]/40 py-4"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.5rem', fontWeight: 600, color: '#151E13' }}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 mt-7">
            <Link href="#" className="flex-1 text-center border border-[#151E13] rounded-full" style={{ fontSize: '14px', fontWeight: 500, color: '#151E13', padding: '11px 0' }}>
              Log In
            </Link>
            <Link href="#" className="flex-1 text-center bg-[#00694C] text-white rounded-full" style={{ fontSize: '14px', fontWeight: 500, padding: '11px 0' }}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  )
}