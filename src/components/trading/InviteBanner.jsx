import { useState } from 'react';
import { getReferralLink } from '../common/referralLink';
import bg from "../../assets/capital/bg.png";
function InviteBanner() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const link = getReferralLink()
    if (navigator.share) {
      navigator.share({ title: 'Join NeoFi', url: `https://${link}` })
    } else {
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  return (
    <div className="relative rounded-xl overflow-hidden bg-linear-to-br mb-40 from-[#42006F] to-[#AB8ACF] border border-purple-500/20 p-6 md:p-8">
      {/* Decorative network illustration */}
      <div className="absolute right-0 bottom-2  top-1 pointer-events-none">
        <img src={bg} alt="Network" className="h-44  object-cover " />
      </div>

      <div className="relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 italic">
          Double Your Limits via Network.
        </h3>
        <p className="text-xs text-white mb-5 font-light ">
          Active referrals transform your vault from a 2X asset growth engine. Unlock your full potential today.
        </p>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-4xl text-xs font-bold uppercase tracking-wider
                     border border-purple-500/50 text-[#081028] bg-white bg-purple-500/10
                     hover:bg-purple-500/20 transition-colors duration-200 cursor-pointer"
        >
          {copied ? '✓ Link Copied!' : 'Share Invite Link'}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default InviteBanner;
