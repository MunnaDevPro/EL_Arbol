import Link from "next/link"

const navLinks = [
  { label: 'Shop all',  href: '/shop' },
  { label: 'Recipes',  href: '/recipes' },
  { label: 'Store',    href: '/stores' },
  { label: 'About',    href: '/about' },
  { label: 'Wholesale', href: '/wholesale' },
]

const storeLinks = ['Madrid Central', 'Barcelona Born', 'Sevilla Centro', 'Valencia Market']

export default function Footer() {
  return (
    <footer style={{
      background: '#085041',
      borderRadius: '24px 24px 0 0',
      color: 'white',
      marginTop: '0',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 28px' }}>

        {/* ── DESKTOP ── */}
        <div className="hidden md:block">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '40px', marginBottom: '48px' }}>

            {/* Brand */}
            <div>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.5 2 6 5 6 8c0 2.5 1.2 4.5 3 5.7V22h2v-4h2v4h2V13.7c1.8-1.2 3-3.2 3-5.7 0-3-2.5-6-6-6z"/>
                </svg>
                <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '18px', fontWeight: 700, color: 'white' }}>
                  El Árbol
                </span>
              </a>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '24px', maxWidth: '220px' }}>
                Rooted in quality, growing for the future. We provide the bridge between local farmers and your dinner table.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  <svg key="globe" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                  <svg key="share" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
                ].map((icon, i) => (
                  <button key={i} style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stores */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
                Stores
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {storeLinks.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
                Contact
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>,
                    extra: <polyline points="22,6 12,13 2,6"/>,
                    text: 'hello@elarbol.com',
                    href: 'mailto:hello@elarbol.com',
                  },
                  {
                    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.15 6.15l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
                    text: '+34 900 123 456',
                    href: 'tel:+34900123456',
                  },
                  {
                    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
                    text: 'Calle de la Huertas 12, 28014 Madrid, Spain',
                    href: null,
                  },
                ].map(({ icon, extra, text, href }, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" viewBox="0 0 24 24" style={{ marginTop: '2px', flexShrink: 0 }}>
                      {icon}{extra}
                    </svg>
                    {href
                      ? <a href={href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.5 }}>{text}</a>
                      : <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{text}</span>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              © 2024 El Árbol Fresh Produce. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
                <a key={item} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden">

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.5 2 6 5 6 8c0 2.5 1.2 4.5 3 5.7V22h2v-4h2v4h2V13.7c1.8-1.2 3-3.2 3-5.7 0-3-2.5-6-6-6z"/>
              </svg>
              <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '17px', fontWeight: 700, color: 'white' }}>
                El Árbol
              </span>
            </a>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                <svg key="g" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                <svg key="s" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
              ].map((icon, i) => (
                <button key={i} style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.18)', background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Contact buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {[
              { label: 'WhatsApp Support', href: '#', icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/> },
              { label: 'hello@elarbol.com', href: 'mailto:hello@elarbol.com', icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '13px 16px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
              }}>
                <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" viewBox="0 0 24 24">
                  {icon}
                </svg>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{label}</span>
              </a>
            ))}
          </div>

          {/* Links grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '14px' }}>
                Explore
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '14px' }}>
                Stores
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {storeLinks.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Address */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            marginBottom: '24px',
          }}>
            <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Calle de la Huertas 12, 28014 Madrid, Spain
            </span>
          </div>

          {/* Bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a key={item} href="#" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{item}</a>
              ))}
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
              © 2024 El Árbol Organic Markets
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}