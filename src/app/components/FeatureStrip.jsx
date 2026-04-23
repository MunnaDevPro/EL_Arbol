const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Same Day Delivery',
    sub: 'Order by 10am',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    title: 'Click & Collect',
    sub: 'Free pickup in-store',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Fresh Daily',
    sub: 'Picked at peak ripeness',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: '100% Natural',
    sub: 'Pesticide free choice',
  },
]

export default function FeatureStrip() {
  return (
    <section className="bg-white border-y border-brand-light-muted/30 py-4 hidden md:block">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-4 gap-4">
          {features.map(({ icon, title, sub }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 px-4 py-3 anim-init animate-fade-up`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <span className="text-brand-green shrink-0">{icon}</span>
              <div>
                <p className="text-xs font-semibold text-brand-black leading-tight">{title}</p>
                <p className="text-[11px] text-brand-muted leading-tight mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
