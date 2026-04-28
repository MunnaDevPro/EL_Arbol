// src/app/stores/[slug]/page.jsx
import { getStoreBySlug } from '@/app/data/stores'
import { notFound } from 'next/navigation'
import StoreDetailClient from './StoreDetailClient'

// ডাইনামিক মেটাডেটা
export async function generateMetadata({ params }) {
  const { slug } = await params
  const store = getStoreBySlug(slug)

  if (!store) {
    return {
      title: 'Store Not Found',
    }
  }

  return {
    title: `${store.name} | The Digital Larder`,
    description: `Visit our ${store.name} location. ${store.address || 'Artisan produce, delivered with care.'}`,
  }
}

export default async function StoreDetailPage({ params }) {
  const { slug } = await params
  const store = getStoreBySlug(slug)

  if (!store) notFound()

  return <StoreDetailClient store={store} />
}