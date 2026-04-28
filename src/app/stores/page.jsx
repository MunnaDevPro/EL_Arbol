// src/app/stores/page.jsx
import StoreFinderClient from '@/app/stores/StoreFinderClient'

export const metadata = {
  title: 'Our Stores | The Digital Larder',
  description: 'Find our artisan produce stores near you and experience care in every delivery.',
}

export default function StorePage() {
  return <StoreFinderClient />
}