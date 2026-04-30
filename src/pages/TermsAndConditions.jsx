import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By registering on the NEOFI platform, you confirm that:',
    bullets: [
      'You are at least 18 years old.',
      'You agree to comply with these Terms and Conditions.',
      'You understand that financial market trading involves risk.',
    ],
    note: 'If you do not agree with any part of these Terms, you should not create an account or use our services.',
  },
  {
    title: '2. Nature of Services',
    content: 'NEOFI provides services including:',
    bullets: [
      'Forex trading education',
      'Market insights and analysis',
      'Community learning resources',
      'Copy trading technology and related services',
    ],
    note: 'All information provided on the platform is for educational and informational purposes only and does not constitute financial or investment advice.',
  },
  {
    title: '3. Risk Disclosure',
    content: 'Trading financial markets such as Forex, CFDs, and cryptocurrencies involves a high level of risk. By registering on the NEOFI platform, you acknowledge that:',
    bullets: [
      'Trading may result in partial or total loss of capital.',
      'Past performance does not guarantee future results.',
      'You are fully responsible for your own financial decisions.',
    ],
    note: 'NEOFI shall not be held responsible for any financial losses incurred through trading activities.',
  },
  {
    title: '4. User Account Responsibility',
    content: 'Users agree to:',
    bullets: [
      'Provide accurate and truthful registration information.',
      'Maintain the security and confidentiality of their login credentials.',
      'Notify NEOFI immediately if any unauthorized access to their account is suspected.',
    ],
    note: 'Users are responsible for all activities conducted through their accounts.',
  },
  {
    title: '5. Platform Usage',
    content: 'Users agree not to:',
    bullets: [
      'Use the platform for illegal or fraudulent purposes.',
      'Attempt to gain unauthorized access to other accounts or system resources.',
      'Copy, distribute, or reproduce NEOFI educational content without written permission.',
    ],
    note: 'Violation of these rules may result in account suspension or permanent termination.',
  },
  {
    title: '6. Third-Party Platforms',
    content: 'Some services offered by NEOFI may involve third-party brokers or trading platforms. NEOFI is not responsible for:',
    bullets: [
      'Broker operations or policies',
      'Platform execution delays',
      'Technical issues related to third-party services',
    ],
    note: 'Users must independently review the terms and policies of any third-party platform they choose to use.',
  },
  {
    title: '7. Intellectual Property',
    content: 'All content on the NEOFI platform, including:',
    bullets: [
      'Educational materials',
      'Videos and training resources',
      'Graphics and platform designs',
      'Branding and trading tools',
    ],
    note: 'are the intellectual property of NEOFI and may not be copied, reproduced, or distributed without prior written permission.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'NEOFI shall not be liable for:',
    bullets: [
      'Trading or investment losses',
      'Market volatility or market changes',
      'Technical interruptions or system downtime',
      'Broker-related issues',
      'Indirect, incidental, or consequential damages',
    ],
    note: 'Users agree that they use the platform and its services at their own risk.',
  },
  {
    title: '9. Privacy Policy',
    content: 'NEOFI respects the privacy and security of user information. Personal data collected during registration may include name, email address, contact details, and other necessary information. This data will be used for:',
    bullets: [
      'Account management',
      'Platform communication and updates',
      'Security and compliance purposes',
    ],
    note: 'NEOFI does not sell or share personal data with third parties except where required by law or necessary for platform operations.',
  },
  {
    title: '10. Changes to Terms',
    content: 'NEOFI reserves the right to update or modify these Terms and Conditions at any time.',
    note: 'Continued use of the platform after any updates indicates acceptance of the revised Terms.',
  },
  {
    title: '11. Contact Information',
    content: 'If you have any questions regarding these Terms and Conditions or Privacy Policy, please contact:',
    contact: true,
  },
]

export default function TermsAndConditions() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(160deg, #0d0018 0%, #0a0010 60%, #0d001a 100%)' }}>
      {/* Header bar */}
      <div className="sticky top-0 z-10 px-6 py-4 flex items-center gap-3 border-b border-white/5"
        style={{ background: 'rgba(10,0,16,0.85)', backdropFilter: 'blur(12px)' }}>
        <img src={logo} alt="NeoFi" className="h-8 w-auto object-contain" />
        <div className="w-px h-5 bg-white/10" />
        <span className="text-white/50 text-sm tracking-wide">Terms & Conditions</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 py-12 pb-20">

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-purple-300 text-xs font-medium">Legal Document</span>
          </div>
          <h1 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl">
            Welcome to NEOFI. By registering an account on our platform, you agree to the following
            Terms and Conditions. Please read them carefully before creating an account.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl border border-white/6 px-6 py-6 flex flex-col gap-3 ${
                s.contact ? 'md:col-span-2' : ''
              }`}
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Section number badge + title */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                  <span className="text-purple-400 text-xs font-bold leading-none">
                    {s.title.split('.')[0]}
                  </span>
                </span>
                <h2 className="text-white font-bold text-base leading-snug">
                  {s.title.replace(/^\d+\.\s*/, '')}
                </h2>
              </div>

              {s.content && (
                <p className="text-white/55 text-sm leading-relaxed">{s.content}</p>
              )}

              {s.bullets && (
                <ul className="flex flex-col gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400/70 flex-shrink-0" />
                      <span className="text-white/65 text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.note && (
                <div className="pl-3 border-l-2 border-purple-500/30">
                  <p className="text-white/40 text-sm leading-relaxed">{s.note}</p>
                </div>
              )}

              {s.contact && (
                <div className="rounded-xl bg-purple-500/8 border border-purple-500/15 px-5 py-4 space-y-2">
                  <p className="text-white/80 text-base font-semibold">NEOFI Support</p>
                  <p className="text-white/50 text-sm">
                    Email:{' '}
                    <a href="mailto:support@neo-fi.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                      support@neo-fi.com
                    </a>
                  </p>
                  <p className="text-white/50 text-sm">
                    Website:{' '}
                    <a href="https://www.neo-fi.com" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                      www.neo-fi.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 px-6 py-5">
          <p className="text-white/50 text-base leading-relaxed text-center">
            By registering on the NEOFI platform, you confirm that you have{' '}
            <span className="text-white/80 font-semibold">read, understood, and agreed</span>{' '}
            to these Terms and Conditions.
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full md:w-64 mx-auto block py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-sm tracking-wide relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(147,51,234,0.5)] active:translate-y-0 shadow-[0_4px_20px_rgba(147,51,234,0.35)] cursor-pointer"
        >
          <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          ← Back to Register
        </button>
      </div>
    </div>
  )
}
