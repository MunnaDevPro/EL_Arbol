import AboutStyles       from './components/AboutStyles'
import HeroSection       from './components/HeroSection'
import StatsSection      from './components/StatsSection'
import MissionSection    from './components/MissionSection'
import ValuesSection     from './components/ValuesSection'
import TimelineSection   from './components/TimelineSection'
import FarmPartnersSection from './components/FarmPartnersSection'
import TeamSection       from './components/TeamSection'
import LeftoverPackSection from './components/LeftoverPackSection'
import CTASection        from './components/CTASection'

export const metadata = {
  title: 'About Us | El Árbol',
  description: 'Rooted in quality, growing for the future. Learn our story.',
}

const stats = [
  { value: '6+',  label: 'Years of service' },
  { value: '40+', label: 'Local farm partners' },
  { value: '8',   label: 'Store locations' },
  { value: '98%', label: 'Customer satisfaction' },
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
  { name: 'Sofía Martínez', role: 'Co-founder & CEO',              initials: 'SM', origin: 'Madrid'    },
  { name: 'Lucas Ferreira',  role: 'Co-founder & Head of Sourcing', initials: 'LF', origin: 'Porto'     },
  { name: 'Ana Delgado',    role: 'Head of Operations',            initials: 'AD', origin: 'Sevilla'   },
  { name: 'Tomás Ruiz',     role: 'Head of Technology',            initials: 'TR', origin: 'Barcelona' },
]

const milestones = [
  { year: '2018', event: 'Founded in Madrid with three farm partners and a single market stall.' },
  { year: '2019', event: 'Opened our first physical store in Chamberí; launched home delivery across Madrid.' },
  { year: '2021', event: 'Expanded to Barcelona and Sevilla; introduced the Leftover Pack programme.' },
  { year: '2023', event: 'Reached 40 partner farms across Spain; launched the El Árbol digital platform.' },
  { year: '2024', event: '8 store locations, 50,000+ happy customers, and still growing.' },
]

const farms = [
  { name: 'Hacienda del Sol',   region: 'Almería',  specialty: 'Heirloom tomatoes & peppers' },
  { name: 'Finca La Paloma',    region: 'Huelva',   specialty: 'Strawberries & stone fruit'  },
  { name: 'Rancho Verde',       region: 'Murcia',   specialty: 'Avocados & citrus'            },
  { name: 'Serra dei Fiori',    region: 'Liguria',  specialty: 'Fresh herbs & greens'         },
  { name: 'Huerta La Vega',     region: 'Murcia',   specialty: 'Spinach & root vegetables'   },
  { name: 'Les Herbes du Midi', region: 'Provence', specialty: 'Wild-harvested herbs'         },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#f2fdea', minHeight: '100vh' }}>

      <AboutStyles />

      <HeroSection />

      <StatsSection stats={stats} />

      {/* <MissionSection /> */}

      <ValuesSection values={values} />

      <TimelineSection milestones={milestones} />

      <FarmPartnersSection farms={farms} />

      <TeamSection team={team} />

      <LeftoverPackSection />

      <CTASection />

    </div>
  )
}