const categories = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#00694c" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: 'Fresh Vegetables',
    items: 'Heirloom tomatoes, peppers, courgettes, aubergines, leafy greens, brassicas',
    badge: 'Year-round',
    bg: '#EDFAF2',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#b45309" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
        <path d="M7 3.34A10 10 0 0 1 22 12" />
      </svg>
    ),
    title: 'Seasonal Fruits',
    items: 'Stone fruit, berries, figs, pears, melons — sourced at peak ripeness per season',
    badge: 'Seasonal',
    bg: '#FFF7ED',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#15803d" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" />
        <path d="M12 12C12 7 7 3 7 3s0 6 5 9" />
        <path d="M12 12C12 7 17 3 17 3s0 6-5 9" />
        <path d="M9 20h6" />
      </svg>
    ),
    title: 'Fresh Herbs & Microgreens',
    items: 'Basil, thyme, rosemary, tarragon, chives, coriander, edible flowers, micro shoots',
    badge: 'Year-round',
    bg: '#F0FDF4',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#d97706" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9" />
        <path d="M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9" />
        <path d="M3 12h18" />
      </svg>
    ),
    title: 'Citrus & Tropical',
    items: 'Valencia oranges, Eureka lemons, limes, grapefruits, pomelos, blood oranges',
    badge: 'Year-round',
    bg: '#FFFBEB',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#92400e" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Root & Allium',
    items: 'Carrots, beetroot, celeriac, parsnips, turnips, garlic varieties, shallots, onions',
    badge: 'Year-round',
    bg: '#FDF4E7',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#6d28d9" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Specialty & Heirloom',
    items: 'Rare varietals, wild-harvested items, foraged mushrooms, edible flowers, truffle products',
    badge: 'Limited',
    bg: '#F5F3FF',
  },
]

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        .ws-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .ws-cat-card {
          background: #fff;
          border-radius: 13px;
          padding: 18px 16px;
          border: 1px solid rgba(188,202,193,0.3);
          transition: box-shadow 0.18s, transform 0.18s;
          cursor: default;
        }
        .ws-cat-card:hover {
          box-shadow: 0 5px 20px rgba(0,105,76,0.07);
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          .ws-cat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ws-cat-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .ws-cat-card { padding: 14px 12px; }
        }
        @media (max-width: 380px) {
          .ws-cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section style={{ background: '#F7FAF8', padding: '56px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00694c', display: 'block', marginBottom: '8px' }}>
                Product Range
              </span>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700, color: '#0d1f14', lineHeight: 1.2, margin: 0,
                fontSize: 'clamp(22px, 3vw, 34px)',
              }}>
                What we supply
              </h2>
            </div>
            {/* <p style={{ fontSize: '13px', color: '#6D7A73', maxWidth: '240px', lineHeight: 1.65, margin: 0 }}>
              Full catalogue and seasonal availability sheets provided after account approval.
            </p> */}
          </div>

          <div className="ws-cat-grid">
            {categories.map((c, i) => (
              <div key={i} className="ws-cat-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '11px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: c.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', border: '1px solid rgba(0,0,0,0.04)',
                    flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <span style={{
                    fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: '#00694c',
                    background: '#E7F1DF', borderRadius: '100px', padding: '3px 8px',
                  }}>
                    {c.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0d1f14', marginBottom: '5px', lineHeight: 1.3 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '11.5px', color: '#9aada3', lineHeight: 1.65, fontStyle: 'italic', fontFamily: '"Newsreader", Georgia, serif', margin: 0 }}>
                  {c.items}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" fill="none" stroke="#9aada3" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: '11.5px', color: '#9aada3', margin: 0 }}>
              Availability varies by season. Custom sourcing requests welcomed for approved accounts.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}