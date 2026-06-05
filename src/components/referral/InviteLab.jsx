import { useState } from 'react';
import PropTypes from 'prop-types';
import QRCodeGenerator from './Qrcode';
import { getReferralLink } from '../common/referralLink';

function InviteLab({ directReferralEarnings }) {
  const [copied, setCopied] = useState(false);
  const referralLink = getReferralLink();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#181F3066] p-5 md:p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white">Invite Lab</h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: link */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2.5">
            Your Primary Transmission Link
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 min-w-0 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2.5 overflow-hidden">
              <span className="text-[10px] text-gray-300 font-mono break-all">{referralLink}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="sm:flex-shrink-0 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer bg-gradient-to-r from-[#D946EF] to-[#CB3CFF] text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 whitespace-nowrap"
            >
              {copied ? '✓ Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Right: QR */}
        <div className="flex items-center justify-center lg:justify-end flex-shrink-0">
          <div className="w-48 h-48 rounded-xl p-2 flex items-center justify-center">
            <QRCodeGenerator referralLink={referralLink} />
          </div>
        </div>
      </div>
    </div>
  );
}

InviteLab.propTypes = { directReferralEarnings: PropTypes.number };
InviteLab.defaultProps = { directReferralEarnings: 0 };

export default InviteLab;
