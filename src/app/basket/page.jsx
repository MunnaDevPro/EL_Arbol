'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

export default function BasketPage() {
  const { items, subtotal, totalItems, fulfillment, setFulfillment, updateQty, removeItem } = useCart()
  const router = useRouter()

  const deliveryModes = [
    { id: 'delivery', label: 'Home Delivery' },
    { id: 'collect', label: 'Click & Collect' },
    { id: 'instore', label: 'In-Store' },
  ]

  function handleCheckout() {
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div style={{ background: '#ffffff', minHeight: '100vh', width: '100%' }}>
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: '#f0f4f0' }}
          >
            <span className="material-symbols-outlined text-5xl text-[#bccac1]">shopping_basket</span>
          </div>
          <h1
            className="text-4xl italic mb-4"
            style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
          >
            Your basket is empty
          </h1>
          <p className="mb-8" style={{ color: '#6d7a73' }}>
            Discover fresh, seasonal produce from local artisans.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)' }}
          >
            <span className="material-symbols-outlined">storefront</span>
            Browse Market
          </Link>
        </div>
      </div>
    )
  }

  return (
    /* Full-viewport white wrapper so no dark bleed on sides */
    <div style={{ background: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: Cart Items */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            <section>
              <h1
                className="text-4xl md:text-5xl font-light mb-6 md:mb-8 italic leading-tight"
                style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
              >
                Your Basket{' '}
                <span
                  className="text-2xl font-normal not-italic ml-2"
                  style={{ color: '#6d7a73' }}
                >
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              </h1>

              {/* Delivery Switcher */}
              <div
                className="inline-flex p-1 rounded-xl mb-8 md:mb-12"
                style={{ background: '#f0f4f0' }}
              >
                {deliveryModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setFulfillment(mode.id)}
                    className="px-5 cursor-pointer md:px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: fulfillment === mode.id ? '#ffffff' : 'transparent',
                      color: fulfillment === mode.id ? '#00694c' : '#3d4943',
                      boxShadow: fulfillment === mode.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl transition-all"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-base md:text-xl font-medium leading-tight" style={{ color: '#151e13' }}>
                            {item.name}
                          </h3>
                          <p
                            className="text-xs md:text-sm italic mt-0.5"
                            style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#6d7a73' }}
                          >
                            from {item.origin}
                          </p>
                        </div>
                        <span
                          className="text-base md:text-xl font-bold flex-shrink-0"
                          style={{ color: '#855000' }}
                        >
                          €{(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-3 md:mt-4">
                        {/* Qty stepper */}
                        <div
                          className="flex items-center gap-0.5 rounded-lg p-1"
                          style={{ background: '#f0f4f0' }}
                        >
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded transition-colors"
                            style={{ color: '#3d4943' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e2e8e2'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <span className="cursor-pointer material-symbols-outlined text-[14px] md:text-[16px]">remove</span>
                          </button>
                          <span className="w-7 md:w-8 text-center font-bold text-sm md:text-base" style={{ color: '#151e13' }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 cursor-pointer  h-7 md:w-8 md:h-8 flex items-center justify-center rounded transition-colors"
                            style={{ color: '#3d4943' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e2e8e2'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <span className="material-symbols-outlined text-[14px] md:text-[16px]">add</span>
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 cursor-pointer transition-colors"
                          style={{ color: '#6d7a73' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ba1a1a'}
                          onMouseLeave={e => e.currentTarget.style.color = '#6d7a73'}
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Order Summary — sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div
              className="p-6 md:p-8 rounded-2xl space-y-6 md:space-y-8"
              style={{ background: '#f8fbf8', border: '1px solid #e8eee8' }}
            >
              <h2
                className="text-2xl md:text-3xl font-light italic"
                style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
              >
                Order Summary
              </h2>

              {/* Price breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm" style={{ color: '#3d4943' }}>
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm items-center" style={{ color: '#3d4943' }}>
                  <span>Delivery</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold"
                      style={{ background: '#d4ede5', color: '#095041' }}
                    >
                      Free
                    </span>
                    <span className="font-bold" style={{ color: '#00694c' }}>€0.00</span>
                  </div>
                </div>

                <div
                  className="pt-4 mt-2 flex justify-between items-end"
                  style={{ borderTop: '1px solid #e8eee8' }}
                >
                  <span className="font-bold uppercase tracking-tight" style={{ color: '#151e13' }}>Total</span>
                  <div className="text-right">
                    <p
                      className="text-3xl font-bold"
                      style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#855000' }}
                    >
                      €{subtotal.toFixed(2)}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: '#6d7a73' }}>
                      VAT included
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#6d7a73' }}>
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow rounded-lg px-4 py-3 text-sm border outline-none transition-all focus:ring-2 focus:ring-[#00694c]/20"
                    style={{ background: '#ffffff', borderColor: '#e0e6e0', color: '#151e13' }}
                  />
                  <button
                    className="px-4 py-2 cursor-pointer rounded-lg text-sm font-bold transition-colors"
                    style={{ background: '#151e13', color: '#ffffff' }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full cursor-pointer flex items-center justify-center gap-3 py-4 md:py-5 rounded-lg font-bold text-white transition-all hover:brightness-105 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
                  boxShadow: '0 8px 24px -4px rgba(0,105,76,0.25)',
                }}
              >
                Proceed to Checkout
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              {/* Trust badges */}
              <div className="flex justify-center items-center gap-6 pt-2" style={{ opacity: 0.4 }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: '#151e13' }}>credit_card</span>
                <span className="material-symbols-outlined text-3xl" style={{ color: '#151e13' }}>verified_user</span>
                <span className="material-symbols-outlined text-3xl" style={{ color: '#151e13' }}>payments</span>
              </div>
            </div>

            {/* Eco note */}
            <div
              className="mt-4 p-5 rounded-2xl"
              style={{ background: '#f5f9f5', border: '1px solid #e8f0e8' }}
            >
              <div className="flex gap-3">
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#00694c', fontVariationSettings: "'FILL' 1" }}
                >
                  eco
                </span>
                <p className="text-sm leading-relaxed" style={{ color: '#3d4943' }}>
                  Your order supports local farmers and sustainable packaging. Estimated delivery:{' '}
                  <span className="font-bold" style={{ color: '#151e13' }}>Tomorrow, 9am – 12pm</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
