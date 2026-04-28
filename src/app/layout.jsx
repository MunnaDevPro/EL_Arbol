import { Newsreader, Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/app/context/CartContext'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CartSidebar from '@/app/components/CartSidebar'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  title: 'The Digital Larder',
  description: 'Artisan produce, delivered with care.',
  icons: {
    icon: '/favicon_orrange.jpeg', 
    apple: '/favicon_orrange.jpeg', 
  },
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Force white background — overrides any dark globals.css */}
        <style>{`
          html, body, #__next {
            background: #ffffff !important;
            color: #151e13 !important;
          }
        `}</style>
      </head>
      <body
        className={`${newsreader.variable} ${manrope.variable}`}
        style={{
          fontFamily: '"Manrope", sans-serif',
          background: '#ffffff',
          color: '#151e13',
          minHeight: '100vh',
        }}
      >
        <CartProvider>
          <Navbar />
          <main style={{ background: '#ffffff', minHeight: '100vh' }} className="pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
