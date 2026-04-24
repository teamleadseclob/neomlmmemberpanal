import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/useAuth'
import { login } from '../../../config/apiService'
import InputField from './InputField'
import LoginOptions from './LoginOptions'

export default function LoginForm() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  const { login: saveToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userId.trim() || !password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const res = await login(userId, password)
      if (res?.data?.user?.role === 'admin') {
        toast.error('Admin accounts are not allowed to access this portal.')
        return
      }
      saveToken(res?.data?.token, res?.data?.user)
      toast.success(`Welcome back, ${res?.data?.user?.name}!`)
      navigate('/', { replace: true })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="User ID" type="text" placeholder="Enter user ID"
        value={userId} onChange={(e) => setUserId(e.target.value)} />

      <InputField label="Password" type="password" placeholder="Enter password"
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <LoginOptions remember={remember} onRememberChange={() => setRemember((r) => !r)} />

      {/* Login button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-linear-to-r from-purple-600 to-purple-500 text-white font-bold text-base tracking-wide relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(147,51,234,0.6)] active:translate-y-0 shadow-[0_4px_24px_rgba(147,51,234,0.45)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
        {loading
          ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : 'Login'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <p className="text-center text-white/30 text-xs leading-relaxed">
        By continuing, you agree to NeoFi&apos;s{' '}
        <a href="/terms" className="text-white/60 font-semibold underline">Terms of Service</a>{' '}and{' '}
        <a href="/privacy" className="text-white/60 font-semibold underline">Privacy Policy</a>
      </p>
    </form>
  )
}
