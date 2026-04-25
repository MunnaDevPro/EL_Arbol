import HeroSection from '@/app/components/HeroSection';
import ProductGrid from '@/app/components/ProductGrid';

import LeftoverPackBanner from '@/app/components/LeftoverPackBanner'
import HowItWorks         from '@/app/components/HowItWorks'
import WeekendBox         from '@/app/components/WeekendBox'


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <LeftoverPackBanner />
      <HowItWorks />
      <WeekendBox />
    </>
  )
}


