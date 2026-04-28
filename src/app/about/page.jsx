// src/app/about/page.jsx
import Link from 'next/link'

export const metadata = {
  title: 'About Us | El Árbol',
  description: 'Rooted in quality, growing for the future. Learn our story.',
}

const stats = [
  { value: '6+',    label: 'Years of service' },
  { value: '40+',  label: 'Local farm partners' },
  { value: '8',    label: 'Store locations' },
  { value: '98%',  label: 'Customer satisfaction' },
]

const values = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#00694c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.3A10 10 0 0 0 19 5c-1-1-2-1.71-2-1.71V8z"/>
        <path d="M3.82 19.3C4 18 5 13 9 11"/>
      </svg>
    ),
    title: 'Rooted in sustainability',
    body: 'Every product we source follows strict environmental criteria. We partner only with farms that practice regenerative agriculture, protect biodiversity, and minimise water use.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#00694c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Community first',
    body: 'We believe in fair prices for farmers and fair prices for customers. Our direct-sourcing model cuts out the middlemen, ensuring producers earn what they deserve.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#00694c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Uncompromising quality',
    body: 'From harvest to doorstep in under 48 hours. Our cold-chain logistics and daily quality checks ensure that what arrives at your table is genuinely fresh — nothing less.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#00694c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Transparent provenance',
    body: 'Every product carries a story — the farm, the region, the farmer. We believe you have the right to know exactly where your food comes from and how it was grown.',
  },
]

const team = [
  { name: 'Sofía Martínez', role: 'Co-founder & CEO', initials: 'SM', origin: 'Madrid' },
  { name: 'Lucas Ferreira',  role: 'Co-founder & Head of Sourcing', initials: 'LF', origin: 'Porto' },
  { name: 'Ana Delgado',    role: 'Head of Operations', initials: 'AD', origin: 'Sevilla' },
  { name: 'Tomás Ruiz',     role: 'Head of Technology', initials: 'TR', origin: 'Barcelona' },
]

const milestones = [
  { year: '2018', event: 'Founded in Madrid with three farm partners and a single market stall.' },
  { year: '2019', event: 'Opened our first physical store in Chamberí; launched home delivery across Madrid.' },
  { year: '2021', event: 'Expanded to Barcelona and Sevilla; introduced the Leftover Pack programme.' },
  { year: '2023', event: 'Reached 40 partner farms across Spain; launched the El Árbol digital platform.' },
  { year: '2024', event: '8 store locations, 50,000+ happy customers, and still growing.' },
]

const farms = [
  { name: 'Hacienda del Sol', region: 'Almería', specialty: 'Heirloom tomatoes & peppers' },
  { name: 'Finca La Paloma',  region: 'Huelva',  specialty: 'Strawberries & stone fruit' },
  { name: 'Rancho Verde',     region: 'Murcia',   specialty: 'Avocados & citrus' },
  { name: 'Serra dei Fiori',  region: 'Liguria',  specialty: 'Fresh herbs & greens' },
  { name: 'Huerta La Vega',   region: 'Murcia',   specialty: 'Spinach & root vegetables' },
  { name: 'Les Herbes du Midi', region: 'Provence', specialty: 'Wild-harvested herbs' },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#f2fdea', minHeight: '100vh' }}>

      {/* ─────────────────── HERO ─────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(188,202,193,0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 32px 72px' }}>
          <div style={{ maxWidth: '720px' }}>
            <span style={{
              display: 'inline-block', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c',
              marginBottom: '20px',
            }}>
              Our story
            </span>
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 700, color: '#151e13', lineHeight: 1.1,
              marginBottom: '24px',
            }}>
              Rooted in quality,<br />
              <em style={{ fontStyle: 'italic', color: '#00694c' }}>growing for the future.</em>
            </h1>
            <p style={{ fontSize: '18px', color: '#6D7A73', lineHeight: 1.75, maxWidth: '580px', marginBottom: '40px' }}>
              El Árbol was born from a simple conviction: the gap between a Spanish farmer's harvest and your dinner table should be as short as possible. We are the bridge — careful, transparent, and deeply committed to the people on both ends.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shop"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '12px', fontWeight: 700,
                  fontSize: '14px', color: '#fff', textDecoration: 'none',
                  background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
                }}>
                Browse the Market
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/stores"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '12px', fontWeight: 700,
                  fontSize: '14px', color: '#151e13', textDecoration: 'none',
                  background: '#ECF7E4', border: '1px solid rgba(0,105,76,0.12)',
                }}>
                Find a Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── STATS ─────────────────── */}
      <section style={{ background: '#00694c' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              }}>
                <p style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '42px', fontWeight: 700, color: '#fff',
                  lineHeight: 1, marginBottom: '8px',
                }}>{s.value}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── MISSION ─────────────────── */}
      <section style={{ background: '#fff', padding: '96px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c', display: 'block', marginBottom: '16px' }}>
                Why we exist
              </span>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '2.4rem', fontWeight: 700, color: '#151e13',
                lineHeight: 1.2, marginBottom: '24px',
              }}>
                The bridge between farm and table
              </h2>
              <p style={{ fontSize: '16px', color: '#6D7A73', lineHeight: 1.8, marginBottom: '20px' }}>
                Industrial food systems prioritise shelf life over flavour, and volume over provenance. We built El Árbol to push back against that — to make it easy for anyone to eat the kind of food that small farmers grow with care.
              </p>
              <p style={{ fontSize: '16px', color: '#6D7A73', lineHeight: 1.8, marginBottom: '32px' }}>
                Today we work with over 40 farms across Spain and southern Europe, sourcing directly and paying fairly. Every product we sell has a name, a face, and a story behind it.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Direct from farmer to you — no warehouses, no middlemen', 'Every supplier is personally visited and vetted', 'Seasonal menus so you always eat what\'s at its best'].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E7F1DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <svg width="10" height="10" fill="none" stroke="#00694c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <p style={{ fontSize: '14px', color: '#3d4943', lineHeight: 1.5 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image placeholder — elegant illustration panel */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '20px', overflow: 'hidden',
                background: 'linear-gradient(145deg, #E7F1DF 0%, #adedd8 100%)',
                aspectRatio: '4/5',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '16px',
              }}>
                <svg width="80" height="80" fill="none" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 19.3A10 10 0 0 0 19 5c-1-1-2-1.71-2-1.71V8z"
                    stroke="#00694c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                    fill="rgba(0,105,76,0.12)"/>
                  <path d="M3.82 19.3C4 18 5 13 9 11" stroke="#00694c" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: '18px', color: '#00694c', textAlign: 'center', maxWidth: '200px', lineHeight: 1.5 }}>
                  "Care in every delivery."
                </p>
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: '-20px', left: '-20px',
                background: '#fff', borderRadius: '16px', padding: '16px 20px',
                boxShadow: '0 8px 32px rgba(0,33,21,0.1)',
                border: '1px solid rgba(188,202,193,0.2)',
              }}>
                <p style={{ fontSize: '11px', color: '#6D7A73', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Founded</p>
                <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '26px', fontWeight: 700, color: '#151e13', lineHeight: 1 }}>2018</p>
                <p style={{ fontSize: '11px', color: '#00694c', marginTop: '2px' }}>Madrid, Spain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── VALUES ─────────────────── */}
      <section style={{ padding: '96px 32px', background: '#f2fdea' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c', display: 'block', marginBottom: '12px' }}>
              What we stand for
            </span>
            <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#151e13', lineHeight: 1.2 }}>
              Our values
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '16px',
                padding: '32px 24px',
                border: '1px solid rgba(188,202,193,0.2)',
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: '#E7F1DF', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '20px',
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#151e13', marginBottom: '10px', lineHeight: 1.3 }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6D7A73', lineHeight: 1.7 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TIMELINE ─────────────────── */}
      <section style={{ background: '#fff', padding: '96px 32px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c', display: 'block', marginBottom: '12px' }}>
              How we got here
            </span>
            <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#151e13', lineHeight: 1.2 }}>
              Our journey
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '68px', top: '8px', bottom: '8px', width: '1px', background: 'rgba(188,202,193,0.4)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', paddingBottom: i < milestones.length - 1 ? '36px' : '0' }}>
                  {/* Year */}
                  <div style={{ width: '68px', flexShrink: 0, textAlign: 'right', paddingTop: '2px' }}>
                    <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#00694c' }}>{m.year}</span>
                  </div>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, marginTop: '6px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00694c', border: '3px solid #fff', outline: '1px solid #00694c' }} />
                  </div>
                  {/* Text */}
                  <p style={{ fontSize: '15px', color: '#3d4943', lineHeight: 1.65, paddingTop: '0px' }}>{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── FARM PARTNERS ─────────────────── */}
      <section style={{ padding: '96px 32px', background: '#f2fdea' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c', display: 'block', marginBottom: '12px' }}>
                Where it comes from
              </span>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#151e13', lineHeight: 1.2 }}>
                Our farm partners
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#6D7A73', maxWidth: '280px', textAlign: 'right', lineHeight: 1.6 }}>
              A selection of the growers we work with — every one personally visited and vetted.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {farms.map((f, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '14px', padding: '24px',
                border: '1px solid rgba(188,202,193,0.2)',
                display: 'flex', alignItems: 'flex-start', gap: '16px',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: '#E7F1DF', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00694c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8C8 10 5.9 16.17 3.82 19.3A10 10 0 0 0 19 5c-1-1-2-1.71-2-1.71V8z"/>
                    <path d="M3.82 19.3C4 18 5 13 9 11"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#151e13', marginBottom: '4px' }}>{f.name}</h3>
                  <p style={{ fontSize: '12px', color: '#00694c', fontWeight: 600, marginBottom: '4px' }}>{f.region}</p>
                  <p style={{ fontSize: '12px', color: '#9aada3', fontStyle: 'italic', fontFamily: '"Newsreader", Georgia, serif' }}>{f.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TEAM ─────────────────── */}
      <section style={{ background: '#fff', padding: '96px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c', display: 'block', marginBottom: '12px' }}>
              The people behind it
            </span>
            <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#151e13', lineHeight: 1.2 }}>
              Meet the team
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {team.map((t, i) => (
              <div key={i} style={{
                background: '#f2fdea', borderRadius: '16px', padding: '28px 20px',
                textAlign: 'center', border: '1px solid rgba(188,202,193,0.2)',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: '#adedd8', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 16px',
                }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#085041' }}>{t.initials}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#151e13', marginBottom: '4px' }}>{t.name}</h3>
                <p style={{ fontSize: '12px', color: '#00694c', fontWeight: 600, marginBottom: '6px' }}>{t.role}</p>
                <p style={{ fontSize: '11px', color: '#9aada3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {t.origin}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── LEFTOVER PACK ─────────────────── */}
      <section style={{ background: '#00694c', padding: '80px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.3A10 10 0 0 0 19 5c-1-1-2-1.71-2-1.71V8z"/>
              <path d="M3.82 19.3C4 18 5 13 9 11"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '20px' }}>
            The Leftover Pack programme
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 36px' }}>
            Every day, perfectly good produce goes unsold. Our Leftover Pack bundles these items at a reduced price — saving food from waste, saving you money, and supporting farmers who grew it. It's one of our proudest initiatives.
          </p>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '12px', fontWeight: 700,
            fontSize: '14px', color: '#00694c', textDecoration: 'none',
            background: '#fff',
          }}>
            See stores with Leftover Pack
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* ─────────────────── CTA ─────────────────── */}
      <section style={{ background: '#f2fdea', padding: '96px 32px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#151e13', lineHeight: 1.2, marginBottom: '16px' }}>
            Ready to taste the difference?
          </h2>
          <p style={{ fontSize: '16px', color: '#6D7A73', lineHeight: 1.8, marginBottom: '36px' }}>
            Whether you shop online or visit one of our stores, every product carries our promise — fresh, honest, and grown with care.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '15px 32px', borderRadius: '12px', fontWeight: 700,
              fontSize: '14px', color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg, #00694c 0%, #008560 100%)',
              boxShadow: '0 4px 16px rgba(0,105,76,0.25)',
            }}>
              Shop All Produce
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/stores" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '15px 32px', borderRadius: '12px', fontWeight: 700,
              fontSize: '14px', color: '#151e13', textDecoration: 'none',
              background: '#ECF7E4', border: '1px solid rgba(0,105,76,0.12)',
            }}>
              Find Our Stores
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
