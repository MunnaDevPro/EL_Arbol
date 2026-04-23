const steps = [
  {
    num: '1',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Order online',
    desc: 'Browse our seasonal selection and build your custom box in minutes.',
  },
  {
    num: '2',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Choose delivery/pickup',
    desc: 'Select a time slot that fits your schedule. We deliver 7 days a week.',
  },
  {
    num: '3',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    title: 'Receive fresh',
    desc: 'Your harvest arrives at peak freshness, ready for your kitchen creations.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-brand-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16 anim-init animate-fade-up delay-100">
          <h2 className="font-serif text-brand-black text-3xl md:text-4xl font-bold mb-3">
            How It Works
          </h2>
          <div className="w-10 h-[3px] bg-brand-green rounded-full mx-auto" />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map(({ num, icon, title, desc }, i) => (
            <div
              key={num}
              className="flex flex-col items-center text-center anim-init animate-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.15}s` }}
            >
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-brand-mint/40 border border-brand-mint flex items-center justify-center text-brand-green mb-5">
                {icon}
              </div>

              {/* Step number (mobile: shown above icon) */}
              <div className="w-7 h-7 rounded-full bg-brand-mint flex items-center justify-center text-brand-dark-green text-xs font-bold mb-4 md:hidden">
                {num}
              </div>

              <h3 className="font-serif text-brand-black text-lg md:text-xl font-semibold mb-3">
                {title}
              </h3>
              <p className="text-brand-dark-muted text-sm md:text-base leading-relaxed max-w-[280px]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
