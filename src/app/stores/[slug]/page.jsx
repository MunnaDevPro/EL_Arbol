import { getStoreBySlug } from '@/app/data/stores'
import { notFound } from 'next/navigation'
import StoreDetailClient from './StoreDetailClient'

export default async function StoreDetailPage({ params }) {
  const { slug } = await params
  const store = getStoreBySlug(slug)
  if (!store) notFound()
  return <StoreDetailClient store={store} />
}