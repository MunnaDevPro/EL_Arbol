'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const orderNumber = 'BSK-9921-X'

  return (
    /* Full-viewport white wrapper */
    <div style={{ background: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <div className="max-w-md mx-auto px-6 pt-8 pb-24">

        {/* Success Hero */}
        <section className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: '#d4ede5' }}
            >
              <svg className="w-12 h-12" fill="none" stroke="#00694c" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className="absolute inset-0 rounded-full -z-10"
              style={{ background: 'rgba(0,105,76,0.08)', filter: 'blur(20px)' }}
            />
          </div>

          <h1
            className="text-4xl italic mb-2"
            style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
          >
            Order Confirmed!
          </h1>
          <p className="text-sm mb-3" style={{ color: '#3d4943' }}>
            Your artisan selection is being prepared.
          </p>
          <div
            className="px-4 py-1.5 rounded-full inline-block"
            style={{ background: '#f0f4f0', border: '1px solid #e0e6e0' }}
          >
            <span className="font-mono text-xs tracking-tight" style={{ color: '#095041' }}>
              ORDER #{orderNumber}
            </span>
          </div>
        </section>

        {/* Order Summary Card */}
        <div className="space-y-4">
          <section
            className="p-6 rounded-xl"
            style={{
              background: '#ffffff',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              border: '1px solid #eeeeee',
            }}
          >
            <h2
              className="text-lg italic mb-4"
              style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
            >
              Summary
            </h2>

            <div className="space-y-4 mb-8">
              {[
                {
                  name: 'Spanish Green Olives',
                  origin: 'Almería',
                  price: '€8.50',
                  img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop',
                },
                {
                  name: 'Wild Yeast Sourdough',
                  origin: 'Local Bakery',
                  price: '€5.20',
                  img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&auto=format&fit=crop',
                },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ background: '#f0f4f0' }}
                  >
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold" style={{ color: '#151e13' }}>{item.name}</p>
                    <p
                      className="text-xs italic"
                      style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#5a6b63' }}
                    >
                      from {item.origin}
                    </p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: '#855000' }}>
                    {item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery info */}
            <div className="space-y-4 pt-4" style={{ borderTop: '1px solid #eeeeee' }}>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl" style={{ color: '#00694c' }}>location_on</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#6d7a73' }}>
                    Delivery Address
                  </p>
                  <p className="text-sm leading-snug mt-0.5" style={{ color: '#151e13' }}>
                    Rue de la Paix 24,<br />75002 Paris, France
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl" style={{ color: '#00694c' }}>schedule</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#6d7a73' }}>
                    Estimated Delivery
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: '#151e13' }}>Today, 14:30 – 15:15</p>
                </div>
              </div>
            </div>
          </section>

          {/* Total Card */}
          <section
            className="p-6 rounded-xl"
            style={{ background: '#f5f8f5', border: '1px solid #e0e8e0' }}
          >
            <div className="flex justify-between items-center text-sm mb-2" style={{ color: '#3d4943' }}>
              <span>Subtotal</span>
              <span>€13.70</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-4" style={{ color: '#3d4943' }}>
              <span>Delivery Fee</span>
              <span>€2.50</span>
            </div>
            <div
              className="flex justify-between items-center pt-4"
              style={{ borderTop: '1px solid #d8e4d8' }}
            >
              <span
                className="text-xl italic"
                style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
              >
                Total Paid
              </span>
              <span className="font-bold text-xl" style={{ color: '#00694c' }}>€16.20</span>
            </div>
          </section>
        </div>

        {/* Actions */}
        <section className="mt-10 space-y-3">
          <button
            className="cursor-pointer w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm text-white transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
              boxShadow: '0 8px 24px -4px rgba(0,105,76,0.25)',
            }}
          >
            Track My Order
          </button>

          <Link
            href="/"
            className="w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center transition-colors"
            style={{
              border: '1.5px solid rgba(0,105,76,0.35)',
              color: '#00694c',
              background: '#ffffff',
            }}
          >
            Continue Shopping
          </Link>
        </section>

        {/* Eco note */}
        <p
          className="text-center mt-8 text-[11px] italic"
          style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#8a9e93' }}
        >
          Packaging is 100% compostable and sourced sustainably.
        </p>
      </div>
    </div>
  )
}
