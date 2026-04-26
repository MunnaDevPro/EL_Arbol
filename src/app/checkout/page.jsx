'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'

const DATES = [
  { label: 'Today', short: 'Today', full: 'Apr 26' },
  { label: 'Sun', short: 'Sun', full: 'Apr 27' },
  { label: 'Mon', short: 'Mon', full: 'Apr 28' },
  { label: 'Tue', short: 'Tue', full: 'Apr 29' },
]

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '08:00 – 10:00', available: true },
  { id: 'late-morning', label: 'Late Morning', time: '10:00 – 12:00', available: true },
  { id: 'lunchtime', label: 'Lunchtime', time: '12:00 – 14:00', available: true },
  { id: 'afternoon', label: 'Afternoon', time: '14:00 – 16:00', available: false },
]

const PAYMENT_METHODS = [
  { id: 'card', label: 'Debit / Credit Card', icon: 'credit_card' },
  { id: 'paypal', label: 'PayPal', icon: 'account_balance_wallet' },
  { id: 'cash', label: 'Cash', icon: 'payments' },
]

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState('late-morning')
  const [paymentMethod, setPaymentMethod] = useState('card')

  const [form, setForm] = useState({ name: '', street: '', city: '', postcode: '', phone: '' })
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '' })

  const delivery = subtotal > 40 ? 0 : 2.5
  const total = subtotal + delivery

  function handleOrder() {
    clearCart()
    router.push('/order-confirmation')
  }

  const inputStyle = {
    background: '#f8faf8',
    border: '1px solid #e8eee8',
    color: '#151e13',
    width: '100%',
    height: '44px',
    padding: '0 16px',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  }

  return (
    /* Full-viewport white wrapper */
    <div style={{ background: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Progress bar */}
        <div className="mb-10 md:mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 -z-10"
              style={{ background: '#e8eee8' }}
            />
            <div
              className="absolute top-1/2 left-0 w-1/2 h-0.5 -translate-y-1/2 -z-10"
              style={{ background: '#00694c' }}
            />

            {/* Step 1 — active */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#00694c', color: '#ffffff', boxShadow: '0 4px 12px rgba(0,105,76,0.3)' }}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_shipping
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest font-bold" style={{ color: '#00694c' }}>
                Delivery
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{ background: '#ffffff', borderColor: '#00694c', color: '#00694c' }}
              >
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
              <span className="text-[11px] uppercase tracking-widest font-bold" style={{ color: '#151e13' }}>
                Payment
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{ background: '#ffffff', borderColor: '#d0d8d0', color: '#bccac1' }}
              >
                <span className="material-symbols-outlined text-xl">check_circle</span>
              </div>
              <span className="text-[11px] uppercase tracking-widest font-bold" style={{ color: '#6d7a73' }}>
                Confirm
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: Forms */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">

            {/* Delivery Address */}
            <section
              className="p-6 md:p-8 rounded-xl"
              style={{ background: '#ffffff', border: '1px solid #eaeaea', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <h2
                  className="text-2xl md:text-3xl italic"
                  style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
                >
                  Delivery Address
                </h2>
                <span
                  className="italic text-sm"
                  style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#8a9e93', opacity: 0.7 }}
                >
                  — provenance for the path
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Julian Vane"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#00694c'}
                    onBlur={e => e.target.style.borderColor = '#e8eee8'}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="142 High Meadow Road"
                    value={form.street}
                    onChange={e => setForm({ ...form, street: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#00694c'}
                    onBlur={e => e.target.style.borderColor = '#e8eee8'}
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="London"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#00694c'}
                    onBlur={e => e.target.style.borderColor = '#e8eee8'}
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                    Postcode
                  </label>
                  <input
                    type="text"
                    placeholder="E1 6AN"
                    value={form.postcode}
                    onChange={e => setForm({ ...form, postcode: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#00694c'}
                    onBlur={e => e.target.style.borderColor = '#e8eee8'}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 7700 900077"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#00694c'}
                    onBlur={e => e.target.style.borderColor = '#e8eee8'}
                  />
                </div>
              </div>

              {/* Delivery Window */}
              <div className="mt-8 md:mt-12">
                <h3 className="text-[10px] uppercase tracking-widest font-bold mb-5" style={{ color: '#00694c' }}>
                  Delivery Window
                </h3>

                {/* Date pills */}
                <div className="flex gap-3 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  {DATES.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(i)}
                      className="px-5 cursor-pointer md:px-6 py-3 rounded-full text-sm flex-shrink-0 font-bold transition-all"
                      style={{
                        background: selectedDate === i ? '#d4ede5' : '#f0f4f0',
                        color: selectedDate === i ? '#095041' : '#3d4943',
                        border: selectedDate === i ? '1.5px solid #95d4bc' : '1.5px solid transparent',
                      }}
                    >
                      {date.label === 'Today' ? 'Today, Apr 26' : `${date.short}, ${date.full}`}
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      className="p-3 md:p-4 rounded-xl text-center transition-all"
                      style={{
                        border: selectedSlot === slot.id ? '2px solid #00694c' : '1.5px solid #e8eee8',
                        background: selectedSlot === slot.id ? 'rgba(0,105,76,0.05)' : '#ffffff',
                        opacity: slot.available ? 1 : 0.4,
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span
                        className="block text-[10px] mb-1"
                        style={{ color: selectedSlot === slot.id ? 'rgba(0,105,76,0.7)' : '#6d7a73' }}
                      >
                        {slot.label}
                      </span>
                      <span
                        className="block font-bold text-xs md:text-sm"
                        style={{ color: selectedSlot === slot.id ? '#00694c' : '#151e13' }}
                      >
                        {slot.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Payment */}
            <section
              className="p-6 md:p-8 rounded-xl"
              style={{
                background: '#ffffff',
                border: '1px solid #eaeaea',
                borderTop: '5px solid #c8e8d4',
                boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
              }}
            >
              <h2
                className="text-2xl md:text-3xl italic mb-6 md:mb-8"
                style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
              >
                Secure Payment
              </h2>

              {/* Payment method tabs */}
              <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className="flex-1 p-3 cursor-pointer md:p-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 transition-all"
                    style={{
                      background: paymentMethod === method.id ? '#f0f8f4' : '#f5f5f5',
                      border: paymentMethod === method.id ? '2px solid #00694c' : '1.5px solid #e0e6e0',
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-lg md:text-xl"
                      style={{
                        color: paymentMethod === method.id ? '#00694c' : '#5a6b63',
                        fontVariationSettings: paymentMethod === method.id ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {method.icon}
                    </span>
                    <span
                      className="hidden md:block text-sm font-bold"
                      style={{ color: paymentMethod === method.id ? '#00694c' : '#3d4943' }}
                    >
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Card fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardForm.number}
                      onChange={e => setCardForm({ ...cardForm, number: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#00694c'}
                      onBlur={e => e.target.style.borderColor = '#e8eee8'}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        onChange={e => setCardForm({ ...cardForm, expiry: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#00694c'}
                        onBlur={e => e.target.style.borderColor = '#e8eee8'}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#6d7a73' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardForm.cvv}
                        onChange={e => setCardForm({ ...cardForm, cvv: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#00694c'}
                        onBlur={e => e.target.style.borderColor = '#e8eee8'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod !== 'card' && (
                <div
                  className="flex items-center justify-center h-24 rounded-xl"
                  style={{ background: '#f8faf8', border: '1px solid #e8eee8' }}
                >
                  <p className="text-sm italic" style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#6d7a73' }}>
                    You'll be redirected to complete payment securely.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT: Sticky Summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#f5f8f5', border: '1px solid #e0e8e0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              <div className="p-5 md:p-6">
                <h3
                  className="text-xl md:text-2xl italic mb-5 md:mb-6"
                  style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#151e13' }}
                >
                  Your Basket
                </h3>

                {/* Items */}
                <div className="space-y-4 mb-6 md:mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 md:gap-4 items-center">
                      <div
                        className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: '#ffffff', border: '1px solid #eaeaea' }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate" style={{ color: '#151e13' }}>{item.name}</p>
                        <p
                          className="text-xs italic"
                          style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#5a6b63' }}
                        >
                          from {item.origin}
                        </p>
                        <p className="text-xs" style={{ color: '#6d7a73' }}>Qty: {item.qty}</p>
                      </div>
                      <span className="font-bold text-sm flex-shrink-0" style={{ color: '#151e13' }}>
                        €{(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 pt-5 mb-5" style={{ borderTop: '1px solid #e0e8e0' }}>
                  <div className="flex justify-between text-xs uppercase tracking-widest" style={{ color: '#6d7a73' }}>
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-widest" style={{ color: '#6d7a73' }}>
                    <span>Delivery</span>
                    <span>{delivery === 0 ? 'Free' : `€${delivery.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold mt-3">
                    <span style={{ color: '#151e13' }}>Total</span>
                    <span style={{ color: '#855000' }}>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleOrder}
                  className="w-full cursor-pointer h-14 rounded-lg font-bold text-white uppercase tracking-widest text-sm transition-all hover:brightness-105 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
                    boxShadow: '0 8px 24px -4px rgba(0,105,76,0.3)',
                  }}
                >
                  Complete Purchase
                </button>

                <div className="mt-4 flex items-center justify-center gap-2" style={{ opacity: 0.45 }}>
                  <span className="material-symbols-outlined text-sm" style={{ color: '#3d4943' }}>shield</span>
                  <span className="text-[10px] uppercase tracking-tighter" style={{ color: '#3d4943' }}>Encrypted Transaction</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-5 flex justify-around p-4 transition-all" style={{ opacity: 0.4 }}>
              <span className="material-symbols-outlined text-3xl" style={{ color: '#3d4943' }}>local_mall</span>
              <span className="material-symbols-outlined text-3xl" style={{ color: '#3d4943' }}>eco</span>
              <span className="material-symbols-outlined text-3xl" style={{ color: '#3d4943' }}>workspace_premium</span>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto py-12 text-center">
          <p className="italic" style={{ fontFamily: '"Newsreader", Georgia, serif', color: '#8a9e93', opacity: 0.6 }}>
            "From our larder to yours, with care."
          </p>
        </footer>
      </div>
    </div>
  )
}
