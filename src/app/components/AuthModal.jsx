'use client'
import { useState, useEffect, useRef } from 'react'

function PineTree() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#00694C">
      <polygon points="12,2 5.5,10.5 8.5,10.5 3,18 21,18 15.5,10.5 18.5,10.5" />
      <rect x="10.5" y="18" width="3" height="3.5" rx="0.4" />
    </svg>
  )
}

function EyeIcon({ show }) {
  return show ? (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }) {
  const [mode, setMode] = useState(defaultMode)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const overlayRef = useRef(null)

  useEffect(() => {
    setMode(defaultMode)
  }, [defaultMode, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (mode === 'signup' && !formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (mode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    // TODO: handle auth
    console.log('Auth submitted:', mode, formData)
    onClose()
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login')
    setErrors({})
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setShowPass(false)
    setShowConfirm(false)
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(8, 28, 20, 0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 16px',
        animation: 'fadeIn 0.18s ease',
        overflowY: 'auto',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        .auth-input { width: 100%; padding: 10px 14px; border: 1.5px solid #BCCAC1; border-radius: 10px; background: #FAFAF8; color: #151E13; font-size: 14px; outline: none; transition: border-color 0.15s, box-shadow 0.15s; box-sizing: border-box; }
        .auth-input:focus { border-color: #00694C; box-shadow: 0 0 0 3px rgba(0,105,76,0.12); }
        .auth-input::placeholder { color: #9DAAA3; }
        .auth-input-error { border-color: #C84040 !important; }
        .auth-btn-primary { width: 100%; padding: 11px; background: #00694C; color: white; border: none; border-radius: 10px; font-size: 14.5px; font-weight: 600; cursor: pointer; transition: background 0.15s, transform 0.1s; letter-spacing: 0.01em; }
        .auth-btn-primary:hover { background: #085041; }
        .auth-btn-primary:active { transform: scale(0.99); }
        .auth-btn-google { width: 100%; padding: 10px; background: white; color: #151E13; border: 1.5px solid #BCCAC1; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; transition: border-color 0.15s, background 0.15s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .auth-btn-google:hover { border-color: #9DAAA3; background: #F5F5EE; }
        .pass-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #6D7A73; padding: 2px; display: flex; align-items: center; }
        .pass-toggle:hover { color: #151E13; }
        .tab-btn { flex: 1; padding: 9px 0; background: none; border: none; font-size: 14px; cursor: pointer; border-radius: 8px; transition: background 0.15s, color 0.15s; font-weight: 500; }
        .tab-active { background: white; color: #085041; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .tab-inactive { color: #6D7A73; }
        .auth-scroll-body { overflow-y: auto; flex: 1; }
        .auth-scroll-body::-webkit-scrollbar { width: 4px; }
        .auth-scroll-body::-webkit-scrollbar-track { background: transparent; }
        .auth-scroll-body::-webkit-scrollbar-thumb { background: #BCCAC1; border-radius: 4px; }
        .auth-scroll-body::-webkit-scrollbar-thumb:hover { background: #9DAAA3; }
      `}</style>

      <div style={{
        background: '#FAFAF8',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',
        maxHeight: 'calc(100dvh - 96px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.22s ease',
        boxShadow: '0 20px 60px rgba(8,28,20,0.18), 0 4px 16px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── Fixed header (logo + close + tabs) ── */}
        <div style={{ padding: '28px 28px 0', flexShrink: 0 }}>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6D7A73', transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ECF7E4'; e.currentTarget.style.color = '#085041' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6D7A73' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <PineTree />
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#085041', letterSpacing: '-0.01em' }}>
              El Árbol
            </span>
          </div>

          {/* Tab switcher */}
          <div style={{
            display: 'flex', background: '#ECF7E4', borderRadius: '10px',
            padding: '4px', marginBottom: '4px', gap: '2px',
          }}>
            <button
              className={`tab-btn ${mode === 'login' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => { setMode('login'); setErrors({}) }}
            >
              Log In
            </button>
            <button
              className={`tab-btn ${mode === 'signup' ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => { setMode('signup'); setErrors({}) }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="auth-scroll-body" style={{ padding: '20px 28px 24px' }}>

          {/* Heading */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '22px', fontWeight: 700,
              color: '#151E13', margin: '0 0 5px', lineHeight: 1.2,
            }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p style={{ fontSize: '13.5px', color: '#6D7A73', margin: 0 }}>
              {mode === 'login'
                ? 'Sign in to continue to El Árbol'
                : 'Fresh produce delivered to your door'}
            </p>
          </div>

          {/* Google button */}
          <button className="auth-btn-google" style={{ marginBottom: '16px' }}>
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#BCCAC1' }} />
            <span style={{ fontSize: '12.5px', color: '#9DAAA3', whiteSpace: 'nowrap' }}>or continue with email</span>
            <div style={{ flex: 1, height: '1px', background: '#BCCAC1' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Name field — signup only */}
              {mode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#2D3A35', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input
                    className={`auth-input${errors.name ? ' auth-input-error' : ''}`}
                    type="text" name="name" placeholder="Jane Doe"
                    value={formData.name} onChange={handleChange} autoComplete="name"
                  />
                  {errors.name && <p style={{ fontSize: '12px', color: '#C84040', margin: '4px 0 0' }}>{errors.name}</p>}
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#2D3A35', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  className={`auth-input${errors.email ? ' auth-input-error' : ''}`}
                  type="email" name="email" placeholder="jane@example.com"
                  value={formData.email} onChange={handleChange} autoComplete="email"
                />
                {errors.email && <p style={{ fontSize: '12px', color: '#C84040', margin: '4px 0 0' }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#2D3A35' }}>Password</label>
                  {mode === 'login' && (
                    <button type="button" style={{ fontSize: '12.5px', color: '#00694C', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    className={`auth-input${errors.password ? ' auth-input-error' : ''}`}
                    type={showPass ? 'text' : 'password'} name="password"
                    placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
                    value={formData.password} onChange={handleChange}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    style={{ paddingRight: '40px' }}
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(p => !p)}>
                    <EyeIcon show={showPass} />
                  </button>
                </div>
                {errors.password && <p style={{ fontSize: '12px', color: '#C84040', margin: '4px 0 0' }}>{errors.password}</p>}
              </div>

              {/* Confirm Password — signup only */}
              {mode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#2D3A35', marginBottom: '6px' }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className={`auth-input${errors.confirmPassword ? ' auth-input-error' : ''}`}
                      type={showConfirm ? 'text' : 'password'} name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword} onChange={handleChange}
                      autoComplete="new-password"
                      style={{ paddingRight: '40px' }}
                    />
                    <button type="button" className="pass-toggle" onClick={() => setShowConfirm(p => !p)}>
                      <EyeIcon show={showConfirm} />
                    </button>
                  </div>
                  {errors.confirmPassword && <p style={{ fontSize: '12px', color: '#C84040', margin: '4px 0 0' }}>{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Signup terms */}
              {mode === 'signup' && (
                <p style={{ fontSize: '12px', color: '#9DAAA3', margin: '2px 0 0', lineHeight: 1.5 }}>
                  By signing up, you agree to our{' '}
                  <span style={{ color: '#00694C', cursor: 'pointer' }}>Terms of Service</span> and{' '}
                  <span style={{ color: '#00694C', cursor: 'pointer' }}>Privacy Policy</span>.
                </p>
              )}

              <button type="submit" className="auth-btn-primary" style={{ marginTop: '4px' }}>
                {mode === 'login' ? 'Log In' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Switch mode */}
          <p style={{ fontSize: '13px', color: '#6D7A73', textAlign: 'center', margin: '16px 0 0' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={switchMode}
              style={{ color: '#00694C', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '13px' }}
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}
