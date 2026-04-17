import { useState } from 'react';

function InviteLab() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'neofi.io/register?ref=NEO_9921';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white">Invite Lab</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-6">
        {/* Left: Link + Bonuses */}
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2.5">
            Your Primary Transmission Link
          </p>

          {/* Link row */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3.5 py-2.5">
              <span className="text-sm text-gray-300 font-mono">{referralLink}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer
                         bg-gradient-to-r from-[#D946EF] to-[#CB3CFF] text-white
                         hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 border-none whitespace-nowrap"
            >
              {copied ? '✓ Copied' : 'Copy Link'}
            </button>
          </div>

          {/* Bonus cards */}
          <div className="flex gap-3">
            <div className="flex-1 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e]/60 px-4 py-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Invite Bonus</p>
              <p className="text-lg font-bold text-white">50 <span className="text-xs text-gray-400 font-medium">USDT</span></p>
            </div>
            <div className="flex-1 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e]/60 px-4 py-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Fee Rebate</p>
              <p className="text-lg font-bold bg-gradient-to-r from-[#D946EF] to-[#CB3CFF] bg-clip-text text-transparent">
                15% <span className="text-xs font-medium">Lifetime</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: QR code */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[140px] h-[160px] rounded-xl bg-white p-3 flex flex-col items-center justify-center shadow-lg shadow-purple-500/10">
            {/* Simulated QR with phone icon */}
            <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
              {/* QR grid pattern */}
              <div className="absolute inset-2 grid grid-cols-7 grid-rows-7 gap-[2px] opacity-20">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={`qr-${i}`}
                    className="rounded-[1px]"
                    style={{
                      backgroundColor: [0,1,2,6,7,8,12,14,18,20,24,28,30,34,36,40,42,43,44,48].includes(i)
                        ? '#1a1a2e'
                        : 'transparent',
                    }}
                  />
                ))}
              </div>
              {/* Phone icon overlay */}
              <svg className="w-10 h-10 text-gray-700 z-10 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-2.5 font-medium">Scan to Join</p>
        </div>
      </div>
    </div>
  );
}

export default InviteLab;
