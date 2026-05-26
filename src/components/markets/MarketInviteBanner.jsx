import { useState } from 'react'
import { getReferralLink } from '../common/referralLink'
import bg2 from '../../assets/market/bg2.png'



export default function MarketInviteBanner() {
  const [copied, setCopied] = useState(false)
  const referralLink = `https://${getReferralLink()}`

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Join NeoFi', url: referralLink })
    } else {
      navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="relative  overflow-hidden p-6 md:p-8"
    >
      <img src={bg2} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-fill" style={{ zIndex: 0 }} />
      {/* Decorative network icon */}


      <div className="relative z-10 max-w-lg">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
          Double Your Limits via Network.
        </h3>
        <p className="text-sm text-gray-300 mb-5 font-light leading-relaxed">
          Active referrals transform your vault from a 2X asset to a 4X growth engine. Unlock your full potential today.
        </p>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest
                     bg-[#0d0b2e] border border-purple-500/50 text-white
                     hover:bg-purple-500/10 transition-colors duration-200 cursor-pointer"
        >
          {copied ? '✓ Link Copied!' : 'Share Invite Link'}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </div>
    </div>
  )
}
