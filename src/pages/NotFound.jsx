import React from 'react';
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020717] relative overflow-hidden p-6 text-center">

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(127,37,251,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(127,37,251,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Glow 1 */}
      <div className="absolute rounded-full pointer-events-none blur-[120px] animate-pulse"
        style={{ width: 400, height: 400, background: 'rgba(127,37,251,0.1)', top: '20%', left: '10%' }} />

      {/* Glow 2 */}
      <div className="absolute rounded-full pointer-events-none blur-[120px] animate-pulse"
        style={{ width: 350, height: 350, background: 'rgba(203,60,255,0.08)', bottom: '10%', right: '10%', animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10" style={{ animation: 'nfEntry 0.7s cubic-bezier(0.16,1,0.3,1)' }}>

        {/* Floating satellite */}
        <div className="mb-2" style={{ animation: 'floatAstro 5s ease-in-out infinite' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="42" y="42" width="36" height="36" rx="6" fill="url(#satGrad)" opacity="0.9" />
            <rect x="48" y="48" width="24" height="24" rx="3" fill="#0a0014" stroke="#7F25FB" strokeWidth="1.5" />
            <line x1="60" y1="42" x2="60" y2="28" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="60" cy="25" r="3" fill="#CB3CFF">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <rect x="10" y="52" width="30" height="16" rx="3" fill="url(#panelGrad)" opacity="0.8" />
            <rect x="80" y="52" width="30" height="16" rx="3" fill="url(#panelGrad)" opacity="0.8" />
            <line x1="20" y1="52" x2="20" y2="68" stroke="#0a0014" strokeWidth="0.5" />
            <line x1="30" y1="52" x2="30" y2="68" stroke="#0a0014" strokeWidth="0.5" />
            <line x1="90" y1="52" x2="90" y2="68" stroke="#0a0014" strokeWidth="0.5" />
            <line x1="100" y1="52" x2="100" y2="68" stroke="#0a0014" strokeWidth="0.5" />
            <path d="M 85 38 Q 95 30 105 38" stroke="#CB3CFF" strokeWidth="1.5" fill="none" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 88 32 Q 98 22 108 32" stroke="#CB3CFF" strokeWidth="1" fill="none" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.05;0.3" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <circle cx="15" cy="20" r="1.5" fill="#6b7280" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="90" r="1" fill="#6b7280" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="95" r="1.5" fill="#6b7280" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="5s" begin="2s" repeatCount="indefinite" />
            </circle>
            <defs>
              <linearGradient id="satGrad" x1="42" y1="42" x2="78" y2="78">
                <stop offset="0%" stopColor="#7F25FB" />
                <stop offset="100%" stopColor="#CB3CFF" />
              </linearGradient>
              <linearGradient id="panelGrad" x1="0" y1="52" x2="0" y2="68">
                <stop offset="0%" stopColor="#3b0764" />
                <stop offset="100%" stopColor="#581c87" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 404 */}
        <h1
          className="font-bold leading-none m-0 text-[100px] sm:text-[140px] bg-clip-text text-transparent"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-4px',
            backgroundImage: 'linear-gradient(135deg, #7F25FB, #CB3CFF, #7F25FB)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 4s ease-in-out infinite',
          }}
        >
          404
        </h1>

        <h2 className="text-[22px] sm:text-[28px] font-semibold text-white mt-4 mb-3"
          style={{ fontFamily: 'Poppins, sans-serif' }}>
          Lost in Space
        </h2>

        <p className="text-sm text-gray-400 mb-9 max-w-[400px] mx-auto leading-relaxed">
          The page you&apos;re looking for has drifted beyond our observatory&apos;s reach.
          Let&apos;s navigate you back to familiar coordinates.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 flex-wrap sm:flex-row flex-col">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(127,37,251,0.45)] no-underline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Go to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => globalThis.history.back()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-gray-300 border border-[rgba(127,37,251,0.3)] bg-[rgba(20,10,40,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(127,37,251,0.5)] hover:bg-[rgba(30,15,60,0.6)] cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Go Back
          </button>
        </div>
      </div>

      <style>{`
        @keyframes nfEntry {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatAstro {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%       { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
