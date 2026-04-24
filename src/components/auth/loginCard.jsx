import React from 'react';
import LoginForm from './login/LoginForm'

export default function LoginCard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Card */}
      <div
        className="relative w-full max-w-120 rounded-3xl border border-white/8 p-11"
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

        <h1 className="text-center text-white font-black text-4xl tracking-tight mb-2">Welcome back!</h1>
        <p className="text-center text-white/40 text-sm mb-8">Enter your credentials to access your dashboard.</p>

        <LoginForm />
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
