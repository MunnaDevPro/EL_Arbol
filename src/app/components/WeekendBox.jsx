export default function WeekendBox() {
  return (
    <section
      className="py-10 px-6 text-center"
      style={{ background: '#085041' }}
    >
      <div className="max-w-[480px] mx-auto anim-init animate-fade-up delay-100">
        <h2 className="font-serif text-white text-2xl md:text-3xl font-bold mb-2">
          Weekend Box
        </h2>
        <p className="text-white/65 text-sm leading-relaxed mb-6">
          Curated selection of seasonal greens delivered every Saturday
        </p>
        <a
          href="#"
          className="inline-block border border-white/40 text-white text-sm font-semibold tracking-widest px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          PRE-ORDER NOW
        </a>
      </div>
    </section>
  )
}
