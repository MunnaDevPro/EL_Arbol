export default function Footer() {
  return (
    <footer className="bg-[#085041] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <span className="text-white/90">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.5 2 6 5 6 8c0 2.5 1.2 4.5 3 5.7V22h2v-4h2v4h2V13.7c1.8-1.2 3-3.2 3-5.7 0-3-2.5-6-6-6z"/>
                </svg>
              </span>
              <span className="font-serif text-lg font-bold tracking-tight">El Árbol</span>
            </a>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Rooted in quality, growing for the future. We provide the bridge between local farmers and your dinner table.
            </p>
            <div className="flex items-center gap-3">
              {/* Globe */}
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </button>
              {/* Share */}
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors">
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Shop All', 'Wholesale', 'Leftover Pack', 'Sustainability', 'Recipes'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stores */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-5">Stores</h4>
            <ul className="space-y-3">
              {['Madrid Central', 'Barcelona Born', 'Sevilla Centro', 'Valencia Market'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-white/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:hello@elarbol.com" className="text-sm text-white/70 hover:text-white transition-colors">hello@elarbol.com</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-white/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.15 6.15l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.02z"/>
                </svg>
                <a href="tel:+34900123456" className="text-sm text-white/70 hover:text-white transition-colors">+34 900 123 456</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-white/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-sm text-white/70">Calle de la Huertas 12, 28014 Madrid, Spain</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© 2024 El Árbol Fresh Produce. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">{item}</a>
            ))}
          </div>
        </div>

        {/* Support links (mobile) */}
        <div className="md:hidden mt-8 border-t border-white/10 pt-6 space-y-3">
          {[
            { icon: '💬', label: 'WhatsApp Support' },
            { icon: '✉', label: 'Email Us' },
          ].map(({ icon, label }) => (
            <a key={label} href="#"
              className="flex items-center gap-3 px-4 py-3 border border-white/15 rounded-lg text-sm text-white/70 hover:border-white/30 transition-colors"
            >
              <span>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
