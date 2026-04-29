'use client'
import { useState, useEffect, useRef } from 'react'

function PineTree() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#00694C">
      <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
      <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function EyeIcon({ show }) {
  return show ? (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="#00694c" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

const BUSINESS_TYPES = [
  'Restaurant / Bistro',
  'Hotel / Resort',
  'Catering Company',
  'Food Retail / Grocery',
  'Dark Kitchen',
  'Café / Bakery',
  'Other',
]

const VOLUME_RANGES = [
  '€400 – €1,000 / month',
  '€1,000 – €3,000 / month',
  '€3,000 – €7,000 / month',
  '€7,000+ / month',
]

export default function WholesaleModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1) // 1 = apply form, 2 = login, 3 = success
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const overlayRef = useRef(null)

  const [applyData, setApplyData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    volume: '',
    postcode: '',
    password: '',
  })

  const [loginData, setLoginData] = useState({ email: '', password: '' })

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setErrors({})
      setApplyData({ businessName: '', contactName: '', email: '', phone: '', businessType: '', volume: '', postcode: '', password: '' })
      setLoginData({ email: '', password: '' })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const handleOverlay = (e) => { if (e.target === overlayRef.current) onClose() }

  const handleApplyChange = (e) => {
    const { name, value } = e.target
    setApplyData(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const validateApply = () => {
    const e = {}
    if (!applyData.businessName.trim()) e.businessName = 'Required'
    if (!applyData.contactName.trim()) e.contactName = 'Required'
    if (!applyData.email.trim() || !/\S+@\S+\.\S+/.test(applyData.email)) e.email = 'Valid email required'
    if (!applyData.businessType) e.businessType = 'Please select a type'
    if (!applyData.volume) e.volume = 'Please select a range'
    if (!applyData.password || applyData.password.length < 8) e.password = 'Min. 8 characters'
    return e
  }

  const handleApplySubmit = (e) => {
    e.preventDefault()
    const errs = validateApply()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep(3)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!loginData.email.trim()) errs.email = 'Required'
    if (!loginData.password) errs.password = 'Required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    console.log('Wholesale login:', loginData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5, 20, 13, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px 16px',
        overflowY: 'auto',
        animation: 'wsOverlayIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes wsOverlayIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes wsSlideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .ws-inp {
          width: 100%; padding: 10px 13px; border: 1.5px solid #C8D5CC; border-radius: 10px;
          background: #fff; color: #151E13; font-size: 13.5px; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s; box-sizing: border-box;
          font-family: inherit;
        }
        .ws-inp:focus { border-color: #00694C; box-shadow: 0 0 0 3px rgba(0,105,76,0.1); }
        .ws-inp::placeholder { color: #A0ADA6; }
        .ws-inp-err { border-color: #D94040 !important; }
        .ws-sel {
          width: 100%; padding: 10px 13px; border: 1.5px solid #C8D5CC; border-radius: 10px;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236D7A73' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
          color: #151E13; font-size: 13.5px; outline: none; cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s; box-sizing: border-box;
          font-family: inherit; appearance: none;
        }
        .ws-sel:focus { border-color: #00694C; box-shadow: 0 0 0 3px rgba(0,105,76,0.1); }
        .ws-sel-err { border-color: #D94040 !important; }
        .ws-btn-primary {
          width: 100%; padding: 12px; background: #00694C; color: white; border: none;
          border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer;
          transition: background 0.15s, transform 0.1s; letter-spacing: 0.01em; font-family: inherit;
        }
        .ws-btn-primary:hover { background: #005540; }
        .ws-btn-primary:active { transform: scale(0.99); }
        .ws-err-msg { font-size: 11.5px; color: #D94040; margin: 3px 0 0; }
        .ws-label { display: block; font-size: 12.5px; font-weight: 600; color: #2D3A35; margin-bottom: 5px; }
        .ws-pass-eye {
          position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #6D7A73;
          display: flex; align-items: center; padding: 2px;
        }
        .ws-pass-eye:hover { color: #151E13; }
        .ws-scroll::-webkit-scrollbar { width: 3px; }
        .ws-scroll::-webkit-scrollbar-thumb { background: #C8D5CC; border-radius: 3px; }
        .ws-tab { flex: 1; padding: 8px 0; background: none; border: none; font-size: 13.5px; font-weight: 600; cursor: pointer; border-radius: 8px; transition: all 0.15s; font-family: inherit; }
        .ws-tab-active { background: white; color: #085041; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
        .ws-tab-inactive { color: #6D7A73; }
      `}</style>

      <div style={{
        background: '#F7FAF8',
        borderRadius: '22px',
        width: '100%',
        maxWidth: step === 3 ? '420px' : '480px',
        maxHeight: 'calc(100dvh - 64px)',
        display: 'flex', flexDirection: 'column',
        animation: 'wsSlideUp 0.24s ease',
        boxShadow: '0 24px 80px rgba(5,20,13,0.22), 0 4px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* Header */}
        <div style={{ padding: '24px 26px 0', flexShrink: 0 }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '14px', right: '14px',
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6D7A73', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ECF7E4'; e.currentTarget.style.color = '#085041' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6D7A73' }}
          >
            <CloseIcon />
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: step === 3 ? '0' : '18px' }}>
            <PineTree />
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '19px', fontWeight: 700, color: '#085041', letterSpacing: '-0.01em' }}>
              El Árbol
            </span>
            <span style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              background: '#00694C', color: '#fff', borderRadius: '100px', padding: '2px 8px', marginLeft: '4px',
            }}>Wholesale</span>
          </div>

          {/* Tabs — only on step 1 or 2 */}
          {step !== 3 && (
            <div style={{
              display: 'flex', background: '#E7F1DF', borderRadius: '10px',
              padding: '4px', gap: '2px',
            }}>
              <button className={`ws-tab ${step === 1 ? 'ws-tab-active' : 'ws-tab-inactive'}`} onClick={() => { setStep(1); setErrors({}) }}>
                Apply for Account
              </button>
              <button className={`ws-tab ${step === 2 ? 'ws-tab-active' : 'ws-tab-inactive'}`} onClick={() => { setStep(2); setErrors({}) }}>
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="ws-scroll" style={{ overflowY: 'auto', padding: '20px 26px 28px', flex: 1 }}>

          {/* ── APPLY FORM ── */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '21px', fontWeight: 700, color: '#151E13', margin: '0 0 5px' }}>
                  Open a wholesale account
                </h2>
                <p style={{ fontSize: '13px', color: '#6D7A73', margin: 0, lineHeight: 1.55 }}>
                  Review within 1 business day. Minimum order €400/month.
                </p>
              </div>

              {/* Info strip */}
              <div style={{
                background: '#E7F1DF', borderRadius: '10px', padding: '12px 14px',
                display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '20px',
              }}>
                <svg width="16" height="16" fill="none" stroke="#00694c" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '1px' }}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p style={{ fontSize: '12px', color: '#3A5A44', margin: 0, lineHeight: 1.6 }}>
                  Your application creates a <strong>wholesale account</strong> — separate from the retail store. A dedicated account manager will contact you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleApplySubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  {/* Row: Business + Contact */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="ws-label">Business Name *</label>
                      <input className={`ws-inp${errors.businessName ? ' ws-inp-err' : ''}`} name="businessName" placeholder="Restaurante Sol" value={applyData.businessName} onChange={handleApplyChange} />
                      {errors.businessName && <p className="ws-err-msg">{errors.businessName}</p>}
                    </div>
                    <div>
                      <label className="ws-label">Contact Name *</label>
                      <input className={`ws-inp${errors.contactName ? ' ws-inp-err' : ''}`} name="contactName" placeholder="María García" value={applyData.contactName} onChange={handleApplyChange} />
                      {errors.contactName && <p className="ws-err-msg">{errors.contactName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="ws-label">Business Email *</label>
                    <input className={`ws-inp${errors.email ? ' ws-inp-err' : ''}`} type="email" name="email" placeholder="orders@yourbusiness.com" value={applyData.email} onChange={handleApplyChange} autoComplete="email" />
                    {errors.email && <p className="ws-err-msg">{errors.email}</p>}
                  </div>

                  {/* Row: Phone + Postcode */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="ws-label">Phone</label>
                      <input className="ws-inp" name="phone" placeholder="+34 600 000 000" value={applyData.phone} onChange={handleApplyChange} />
                    </div>
                    <div>
                      <label className="ws-label">Delivery Postcode</label>
                      <input className="ws-inp" name="postcode" placeholder="28001" value={applyData.postcode} onChange={handleApplyChange} />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="ws-label">Business Type *</label>
                    <select className={`ws-sel${errors.businessType ? ' ws-sel-err' : ''}`} name="businessType" value={applyData.businessType} onChange={handleApplyChange}>
                      <option value="">Select type…</option>
                      {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.businessType && <p className="ws-err-msg">{errors.businessType}</p>}
                  </div>

                  {/* Monthly Volume */}
                  <div>
                    <label className="ws-label">Estimated Monthly Volume *</label>
                    <select className={`ws-sel${errors.volume ? ' ws-sel-err' : ''}`} name="volume" value={applyData.volume} onChange={handleApplyChange}>
                      <option value="">Select range…</option>
                      {VOLUME_RANGES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    {errors.volume && <p className="ws-err-msg">{errors.volume}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="ws-label">Create Password *</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        className={`ws-inp${errors.password ? ' ws-inp-err' : ''}`}
                        type={showPass ? 'text' : 'password'}
                        name="password" placeholder="Min. 8 characters"
                        value={applyData.password} onChange={handleApplyChange}
                        autoComplete="new-password"
                        style={{ paddingRight: '40px' }}
                      />
                      <button type="button" className="ws-pass-eye" onClick={() => setShowPass(p => !p)}>
                        <EyeIcon show={showPass} />
                      </button>
                    </div>
                    {errors.password && <p className="ws-err-msg">{errors.password}</p>}
                  </div>

                  <p style={{ fontSize: '11.5px', color: '#9DAAA3', lineHeight: 1.5, margin: '2px 0 0' }}>
                    By applying you agree to our{' '}
                    <span style={{ color: '#00694C', cursor: 'pointer' }}>Wholesale Terms</span> and{' '}
                    <span style={{ color: '#00694C', cursor: 'pointer' }}>Privacy Policy</span>.
                  </p>

                  <button type="submit" className="ws-btn-primary" style={{ marginTop: '4px' }}>
                    Submit Application
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── LOGIN ── */}
          {step === 2 && (
            <>
              <div style={{ marginBottom: '22px' }}>
                <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '21px', fontWeight: 700, color: '#151E13', margin: '0 0 5px' }}>
                  Welcome back
                </h2>
                <p style={{ fontSize: '13px', color: '#6D7A73', margin: 0 }}>
                  Sign in to your wholesale account
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label className="ws-label">Business Email</label>
                    <input
                      className={`ws-inp${errors.email ? ' ws-inp-err' : ''}`}
                      type="email" placeholder="orders@yourbusiness.com"
                      value={loginData.email}
                      onChange={e => { setLoginData(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })) }}
                    />
                    {errors.email && <p className="ws-err-msg">{errors.email}</p>}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <label className="ws-label" style={{ margin: 0 }}>Password</label>
                      <button type="button" style={{ fontSize: '12px', color: '#00694C', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
                        Forgot password?
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input
                        className={`ws-inp${errors.password ? ' ws-inp-err' : ''}`}
                        type={showPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={e => { setLoginData(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: '' })) }}
                        style={{ paddingRight: '40px' }}
                      />
                      <button type="button" className="ws-pass-eye" onClick={() => setShowPass(p => !p)}>
                        <EyeIcon show={showPass} />
                      </button>
                    </div>
                    {errors.password && <p className="ws-err-msg">{errors.password}</p>}
                  </div>

                  <button type="submit" className="ws-btn-primary" style={{ marginTop: '6px' }}>
                    Log In to Wholesale
                  </button>
                </div>
              </form>

              <p style={{ fontSize: '12.5px', color: '#6D7A73', textAlign: 'center', marginTop: '18px' }}>
                Don't have an account?{' '}
                <button onClick={() => { setStep(1); setErrors({}) }} style={{ color: '#00694C', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '12.5px', fontFamily: 'inherit' }}>
                  Apply now
                </button>
              </p>
            </>
          )}

          {/* ── SUCCESS ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '32px 16px 8px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: '#E7F1DF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 24px',
              }}>
                <CheckIcon />
              </div>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#151E13', margin: '0 0 10px' }}>
                Application received
              </h2>
              <p style={{ fontSize: '14px', color: '#6D7A73', lineHeight: 1.7, margin: '0 0 10px' }}>
                Thank you, <strong style={{ color: '#151E13' }}>{applyData.contactName || 'there'}</strong>. We'll review your application for <strong style={{ color: '#151E13' }}>{applyData.businessName || 'your business'}</strong> within 1 business day.
              </p>
              <p style={{ fontSize: '13px', color: '#9DAAA3', lineHeight: 1.6, margin: '0 0 28px' }}>
                You'll receive a confirmation to <strong>{applyData.email}</strong> and a call from your dedicated account manager shortly.
              </p>

              {/* What happens next */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #E2EDE6', textAlign: 'left', marginBottom: '20px' }}>
                {[
                  'Confirmation email sent immediately',
                  'Account review within 1 business day',
                  'Onboarding call from your account manager',
                  'First delivery within 48 hours of approval',
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: i < 3 ? '0 0 10px' : '0', borderBottom: i < 3 ? '1px solid #F0F5F2' : 'none' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E7F1DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#00694C' }}>{i + 1}</span>
                    </div>
                    <span style={{ fontSize: '12.5px', color: '#3A5A44' }}>{s}</span>
                  </div>
                ))}
              </div>

              <button onClick={onClose} className="ws-btn-primary">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}