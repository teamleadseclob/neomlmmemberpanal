import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { forgotPassword, resetPassword } from '../../../config/apiService'

export default function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState(1) // 1 = email, 2 = otp + new password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = Array.from({ length: 6 }, () => React.useRef(null))
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return toast.error('Email is required')
    setLoading(true)
    try {
      await forgotPassword(email)
      toast.success('OTP sent to your email')
      setStep(2)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    if (otp.join('').length < 6) return toast.error('Enter complete 6-digit OTP')
    if (!newPassword.trim()) return toast.error('New password is required')
    setLoading(true)
    try {
      await resetPassword(email, otp.join(''), newPassword)
      toast.success('Password reset successful!')
      onClose()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 p-7"
        style={{ background: 'rgba(20,10,40,0.95)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white/80 text-xl leading-none cursor-pointer bg-transparent border-none">✕</button>

        {step === 1 ? (
          <>
            <h2 className="text-white font-bold text-xl mb-1">Forgot Password</h2>
            <p className="text-white/40 text-xs mb-5">Enter your email to receive an OTP.</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send OTP'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-white font-bold text-xl mb-1">Reset Password</h2>
            <p className="text-white/40 text-xs mb-5">OTP sent to <span className="text-purple-400">{email}</span></p>
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
              <div className="flex gap-2 justify-between">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/, '')
                      const next = [...otp]
                      next[i] = val
                      setOtp(next)
                      if (val && i < 5) otpRefs[i + 1].current?.focus()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs[i - 1].current?.focus()
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
                      if (pasted) {
                        setOtp(pasted.split('').concat(Array(6).fill('')).slice(0, 6))
                        otpRefs[Math.min(pasted.length, 5)].current?.focus()
                        e.preventDefault()
                      }
                    }}
                    className="w-11 h-12 text-center bg-white/5 border border-white/10 rounded-xl text-white text-lg font-bold outline-none focus:border-purple-500 transition-colors"
                  />
                ))}
              </div>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Reset Password'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="text-white/40 hover:text-white/70 text-xs text-center cursor-pointer bg-transparent border-none">
                ← Back
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
