export default function LeftoverPackBanner() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 pb-14 md:pb-16">
      <div
        className="rounded-2xl overflow-hidden grid md:grid-cols-2 min-h-[400px] md:min-h-[500px] anim-init animate-fade-up delay-200"
        style={{ background: '#085041' }}
      >
        {/* Text side */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-16">
          <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Leftover Pack&nbsp;—<br/>Save food, save&nbsp;money
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-[360px]">
            Get a curated selection of seasonal surplus at 40% off. Perfectly good produce that deserves a home.
          </p>
          <a
            href="#"
            className="self-start bg-brand-amber text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:brightness-110 transition-all duration-200 shadow-[0_4px_16px_rgba(133,80,0,0.4)]"
          >
            Get Your Pack
          </a>
        </div>

        {/* Image side */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=700&auto=format&fit=crop"
            alt="Leftover pack produce bag"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile image */}
        <div className="md:hidden h-52 relative">
          <img
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=700&auto=format&fit=crop"
            alt="Leftover pack produce bag"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
