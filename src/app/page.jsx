import HeroSection from '@/app/components/HeroSection';
import ProductGrid from '@/app/components/ProductGrid';
import LeftoverPackBanner from '@/app/components/LeftoverPackBanner'
import WeekendBox from '@/app/components/WeekendBox'
import HowItWorks from '@/app/components/HowItWorks'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className='bg-[var(--section-color)]'>
        <ProductGrid />
        {/* Mobile: WeekendBox | Desktop: LeftoverPackBanner */}
        <WeekendBox />
        <LeftoverPackBanner />
      </div>
      <div style={{ backgroundColor: '#ECF7E4' }}>
        <HowItWorks />
      </div>
    </>
  )
}