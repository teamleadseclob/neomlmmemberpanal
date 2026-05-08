import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { register } from '../../../config/apiService'
import RegisterInput from './RegisterInput'

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3" />
  </svg>
)

export default function RegisterForm() {
  const [searchParams] = useSearchParams()
  const sponsorCode = searchParams.get('ref') || ''
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    referralCode: sponsorCode,
    password: '',
    confirmPassword: '',
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.referralCode.trim()) newErrors.referralCode = 'Referral code is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms of Service'

    if (Object.keys(newErrors).length) { setErrors(newErrors); return }
    setErrors({})

    setLoading(true)
    try {
      await register(formData.fullName, formData.email, formData.referralCode, formData.password, formData.referralCode)
      toast.success('OTP sent to your email!')
      navigate('/verify-otp', { state: { email: formData.email } })
    } catch (err) {
      setErrors({ api: err?.response?.data?.message || 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const getCheckboxClass = () => {
    if (agreeTerms) return 'bg-gradient-to-br from-purple-600 to-purple-500 border-transparent shadow-[0_0_10px_rgba(147,51,234,0.4)]';
    if (errors.agreeTerms) return 'bg-white/5 border-red-500/60';
    return 'bg-white/5 border-purple-400/40';
  }
  const checkboxClass = getCheckboxClass()

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {errors.api && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs px-3.5 py-2.5 rounded-xl text-center">
          {errors.api}
        </div>
      )}

      <RegisterInput id="fullName" name="fullName" label="Full Name"
        placeholder="Enter your full name" value={formData.fullName}
        onChange={handleChange} autoComplete="name" error={errors.fullName} />

      <RegisterInput id="email" name="email" label="Email"
        placeholder="Enter your email" value={formData.email}
        onChange={handleChange} autoComplete="email" error={errors.email} />

      <RegisterInput id="referralCode" name="referralCode" label="Referral Code"
        placeholder="Enter referral code" value={formData.referralCode}
        onChange={handleChange} readOnly error={errors.referralCode} />

      <RegisterInput id="password" name="password" label="Password" type="password"
        placeholder="Create password" value={formData.password}
        onChange={handleChange} autoComplete="new-password" error={errors.password} />

      <RegisterInput id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password"
        placeholder="Confirm password" value={formData.confirmPassword}
        onChange={handleChange} autoComplete="new-password" error={errors.confirmPassword} />

      {/* Agree terms */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer select-none mt-1" htmlFor="agreeTerms">
          <input id="agreeTerms" type="checkbox" checked={agreeTerms}
            onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((p) => ({ ...p, agreeTerms: '' })) }} className="hidden" />
          <span className={`w-5 h-5 rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${checkboxClass}`}>
            {agreeTerms && <CheckIcon />}
          </span>
          <span className="text-white/70 text-sm">
            I agree to the{' '}
            <a href="/terms" className="text-purple-400 hover:text-purple-300 underline font-semibold">Terms of Service</a>
          </span>
        </label>
        {errors.agreeTerms && <p className="mt-1.5 text-red-400 text-xs">{errors.agreeTerms}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-base tracking-wide relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(147,51,234,0.6)] active:translate-y-0 shadow-[0_4px_24px_rgba(147,51,234,0.45)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-1"
      >
        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        {loading
          ? <span className="inline-block w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
          : 'Create Account'}
      </button>

      <p className="text-center text-white/30 text-xs leading-relaxed">
        Already have an account?{' '}
        <a href="/login" className="text-white/60 font-semibold underline hover:text-purple-300 transition-colors">Login here</a>
      </p>
    </form>
  )
}
