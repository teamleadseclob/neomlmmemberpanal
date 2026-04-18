import PlexusBackground from './bg'
import RegisterForm from '../components/auth/register/RegisterForm'

export default function Register() {
  return (
    <PlexusBackground>
      <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">

        {/* Ambient blobs */}
        <div className="fixed top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-[80px] animate-pulse pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed, #4f46e5)' }} />
        <div className="fixed bottom-0 right-0 w-64 h-64 rounded-full opacity-25 blur-[80px] animate-pulse pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2563eb, #7c3aed)', animationDelay: '1.5s' }} />

        {/* Glass Card */}
        <div
          className="relative w-full max-w-md md:max-w-lg rounded-3xl border border-white/8 px-8 md:px-10 py-10"
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

          <h1 className="text-center text-white font-black text-4xl tracking-tight mb-2">Create Account</h1>
          <p className="text-center text-white/40 text-sm mb-8">Join NeoFi and start your financial journey.</p>

          <RegisterForm />
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
