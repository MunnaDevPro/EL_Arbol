// src/app/products/[slug]/page.jsx

import { notFound } from 'next/navigation'
import { products } from '@/app/data/products'
import { getProductBySlug, slugify } from '@/app/lib/slugify'
import ProductDetailClient from './ProductDetailClient'

// ─── Static params for pre-rendering ─────────────────────────────────────────
export function generateStaticParams() {
  return products.map((p) => ({ slug: slugify(p.name) }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// Next.js 15+ এ params একটি Promise, তাই async + await দরকার
export default async function ProductDetailPage({ params }) {
  const { slug } = await params

  const product = getProductBySlug(products, slug)
  if (!product) notFound()

  const related = (product.relatedIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return <ProductDetailClient product={product} related={related} />
}