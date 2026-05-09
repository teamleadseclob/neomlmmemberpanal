import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/useAuth'
import { sendotp, resendotp } from '../config/apiService'
import PlexusBackground from './bg'
import logo from '../assets/logo.png'

export default function OtpVerify() {
  const { state } = useLocation()
  const email = state?.email || ''
  const navigate = useNavigate()
  const { login: saveToken } = useAuth()

  const [otp, setOtp] = useState(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const inputs = useRef([])

  const getCountdown = () => {
    const sentAt = localStorage.getItem('otp_sent_at')
    if (!sentAt) return 0
    const elapsed = Math.floor((Date.now() - parseInt(sentAt)) / 1000)
    return Math.max(0, 30 - elapsed)
  }

  const [countdown, setCountdown] = useState(getCountdown)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleResend = async () => {
    if (countdown > 0 || resending) return
    setResending(true)
    setError('')
    try {
      await resendotp(email)
      toast.success('OTP resent to your email!')
      setOtp(Array(6).fill(''))
      localStorage.setItem('otp_sent_at', Date.now().toString())
      setCountdown(30)
      inputs.current[0]?.focus()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to resend OTP. Try again.')
    } finally {
      setResending(false)
    }
  }

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = [...otp]
    pasted.split('').forEach((ch, i) => { next[i] = ch })
    setOtp(next)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { setError('Please enter the 6-digit OTP'); return }
    setError('')
    setLoading(true)
    try {
      const res = await sendotp(email, code)
      saveToken(res?.data?.token, res?.data?.user)
      localStorage.removeItem('otp_sent_at')
      toast.success(res?.data?.message)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(b.length) + c)
    : ''

  return (
    <PlexusBackground>
      <div className="absolute top-6 left-8 z-10">
        <img src={logo} alt="NeoFi" className="h-10 w-auto object-contain" />
      </div>

      <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
        <div
          className="relative w-full max-w-md rounded-3xl border border-white/8 px-8 md:px-10 py-10"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset',
            animation: 'slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-[20%] right-[20%] h-px rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), rgba(96,165,250,0.5), transparent)' }} />

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
            </div>
          </div>

          <h1 className="text-center text-white font-black text-3xl tracking-tight mb-2">Verify Email</h1>
          <p className="text-center text-white/40 text-sm mb-1">We sent a 6-digit code to</p>
          <p className="text-center text-purple-300 font-semibold text-sm mb-8">{maskedEmail}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs px-3.5 py-2.5 rounded-xl text-center">
                {error}
              </div>
            )}

            {/* OTP boxes */}
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`w-11 h-14 rounded-xl text-center text-white text-xl font-bold outline-none transition-all duration-200 border ${
                    digit
                      ? 'border-purple-500/70 bg-purple-500/15 shadow-[0_0_12px_rgba(147,51,234,0.25)]'
                      : 'border-white/10 bg-white/5'
                  } focus:border-purple-400/80 focus:bg-purple-500/10 focus:shadow-[0_0_16px_rgba(147,51,234,0.3)]`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-base tracking-wide relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(147,51,234,0.6)] active:translate-y-0 shadow-[0_4px_24px_rgba(147,51,234,0.45)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              {loading
                ? <span className="inline-block w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                : 'Verify & Continue'}
            </button>

            <p className="text-center text-white/30 text-xs">
              Wrong email?{' '}
              <button type="button" onClick={() => navigate(-1)} className="text-white/60 font-semibold underline hover:text-purple-300 transition-colors">
                Go back
              </button>
            </p>

            <div className="text-center">
              <p className="text-white/30 text-xs mb-1">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || resending}
                className="text-sm font-semibold transition-colors disabled:cursor-not-allowed"
                style={{ color: countdown > 0 ? 'rgba(255,255,255,0.25)' : 'rgba(167,139,250,1)' }}
              >
                {resending
                  ? <span className="inline-flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-[2px] border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                      Sending...
                    </span>
                  : countdown > 0
                    ? `Resend OTP in ${countdown}s`
                    : 'Resend OTP'
                }
              </button>
            </div>
          </form>
        </div>

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(32px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </PlexusBackground>
  )
}
