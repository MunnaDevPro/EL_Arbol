import '@/app/globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import MobileBottomNav from '@/app/components/MobileBottomNav'
// import Footer from '@/app/components/Footer'
// import MobileBottomNav from '@/app/components/MobileBottomNav'

export const metadata = {
  title: 'El Árbol — Fresh from the Market',
  description: 'Experience the finest seasonal harvests sourced directly from local growers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  )
}