import Link from "next/link"

const features = [
  {
    title: 'Same Day Delivery',
    sub: 'Order by 10am',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00694C" strokeWidth="1.6" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Click & Collect',
    sub: 'Free pickup in-store',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00694C" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: 'Fresh Daily',
    sub: 'Picked at peak ripeness',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00694C" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 22V12" />
        <path d="M12 12C12 12 7 9 7 4a5 5 0 0 1 10 0c0 5-5 8-5 8z" />
        <path d="M12 12C12 12 17 9 17 4" />
        <path d="M8 20h8" />
      </svg>
    ),
  },
  {
    title: '100% Natural',
    sub: 'Pesticide free choice',
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00694C" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
]

export default function HeroSection() {
  return (
    <section className="bg-[#FAFAF8]">

      {/* ── MOBILE Hero — full-bleed image ─────────────────── */}
      <div className="md:hidden relative overflow-hidden" style={{ height: '420px' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&auto=format&fit=crop"
          alt="Fresh produce"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
          }}
        />
        {/* Text + CTAs */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-8">
          <h1
            className="text-white mb-5"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1.15,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            Freshness from the<br />Orchard to Your Table.
          </h1>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="block text-center text-white font-semibold rounded-lg"
              style={{
                background: '#00694C',
                fontSize: '13.5px',
                letterSpacing: '0.06em',
                padding: '13px 0',
                boxShadow: '0 4px 18px rgba(0,105,76,0.4)',
              }}
            >
              SHOP NOW
            </Link>
            <Link
              href="/stores"
              className="block text-center text-white font-semibold rounded-lg"
              style={{
                border: '1.5px solid rgba(255,255,255,0.55)',
                fontSize: '13.5px',
                letterSpacing: '0.06em',
                padding: '12px 0',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              FIND STORE
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP Hero — text + image side by side ─────── */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-6 lg:px-10 pb-14 md:pb-15">
        <div className="flex items-center justify-between gap-10">

          <div className="max-w-[600px] flex-shrink-0">
            <h1
              className="text-[#151E13] mb-5"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.6rem, 4.2vw, 3rem)',
                fontWeight: 650,
                lineHeight: 1,
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              Fresh from the&nbsp;market,<br />
              delivered to your&nbsp;door.
            </h1>

            <p className="text-[#3D4943] mb-9"
              style={{ fontSize: '15.5px', lineHeight: 1.52, maxWidth: '430px' }}>
              Experience the finest seasonal harvests sourced directly from local
              growers. We bring the artisanal market experience to your kitchen.
            </p>

            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                href=""
                className="inline-flex items-center justify-center bg-[#00694C] text-white font-semibold rounded-[8px] hover:bg-[#085041] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontSize: '14px',
                  padding: '13px 30px',
                  boxShadow: '0 4px 18px rgba(0,105,76,0.28)',
                }}
              >
                Shop Now
              </Link>
              <Link
                href="/stores"
                className="inline-flex items-center justify-center font-semibold rounded-[8px] hover:text-[var(--logo-color)] transition-all duration-200"
                style={{
                  fontSize: '14px',
                  padding: '12px 30px',
                  borderColor: '#ECF7E4',
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  color: 'var(--common-color)',
                  boxShadow: '0 8px 12px -4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Find My Store
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <img
              src="/homepage/hero_image.png"
              alt="Fresh produce"
              className="w-full h-auto object-contain"
              style={{ maxHeight: '480px' }}
            />
          </div>
        </div>
      </div>

      {/* ── Feature cards ─────────────────────────────────── */}
      {/* Desktop: 4 columns | Mobile: 2x2 grid */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 pb-8 md:pb-10 pt-4 md:pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {features.map(({ title, sub, icon }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-[#BCCAC1]/30 flex items-center gap-3"
              style={{ padding: '14px 16px', boxShadow: '0 1px 4px rgba(21,30,19,0.05)' }}
            >
              <span className="shrink-0">{icon}</span>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#151E13', lineHeight: 1.3 }}>{title}</p>
                <p style={{ fontSize: '11px', color: '#6D7A73', lineHeight: 1.4, marginTop: '2px' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}