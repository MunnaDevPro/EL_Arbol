'use client'
import { useState } from 'react'
import HeroSection from '@/app/wholesale/HeroSection'
// import StatsSection from '@/app/wholesale/StatsSection'
import BenefitsSection from '@/app/wholesale/BenefitsSection'
import CategoriesSection from '@/app/wholesale/CategoriesSection'
import HowItWorksSection from '@/app/wholesale/HowItWorksSection'
import WholesaleModal from '@/app/wholesale/WholesaleModal'

export default function WholesalePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <HeroSection onApplyClick={() => setModalOpen(true)} />
      {/* <StatsSection /> */}
      <BenefitsSection />
      <CategoriesSection />
      <HowItWorksSection />

      {/* Floating CTA bar */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2218 0%, #0f3d27 100%)',
        padding: '56px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{
            fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#5dd9a8', display: 'block', marginBottom: '16px',
          }}>
            Ready to get started?
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700,
            color: '#fff', lineHeight: 1.15, marginBottom: '16px',
          }}>
            Join 200+ food businesses<br />across Spain.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px', lineHeight: 1.7 }}>
            Apply in 5 minutes. First delivery within 48 hours of approval.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '15px 32px', borderRadius: '12px', fontWeight: 700,
              fontSize: '15px', color: '#061812', cursor: 'pointer',
              background: 'linear-gradient(135deg, #5dd9a8 0%, #3fcf8e 100%)',
              boxShadow: '0 4px 28px rgba(93,217,168,0.3)',
              border: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(93,217,168,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 28px rgba(93,217,168,0.3)' }}
          >
            Apply for a Wholesale Account
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '14px' }}>
            Minimum order €400/month · No setup fee · Cancel anytime
          </p>
        </div>
      </div>

      <WholesaleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}