// src/app/products/[slug]/page.jsx

import { notFound } from 'next/navigation'
import { products } from '@/app/data/products'
import { getProductBySlug, slugify } from '@/app/lib/slugify'
import ProductDetailClient from './ProductDetailClient'

// ডাইনামিক মেটাডেটা জেনারেটর
export async function generateMetadata({ params }) {
  // Next.js 15-এ params একটি Promise, তাই এটি await করতে হবে
  const { slug } = await params;

  // আপনার lib ফাংশন ব্যবহার করে প্রোডাক্টটি খুঁজে বের করুন
  const product = getProductBySlug(products, slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.name} | The Digital Larder`,
    description: product.shortDesc || product.description.slice(0, 160), // SEO-র জন্য ডেসক্রিপশন ছোট রাখা ভালো
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// Static params for pre-rendering 
export function generateStaticParams() {
  return products.map((p) => ({ 
    slug: slugify(p.name) 
  }))
}

// Page Component
export default async function ProductDetailPage({ params }) {
  const { slug } = await params

  const product = getProductBySlug(products, slug)
  if (!product) notFound()

  const related = (product.relatedIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return <ProductDetailClient product={product} related={related} />
}