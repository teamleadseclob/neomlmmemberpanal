import React from 'react';
function ReferralMultiplier() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 md:p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-white">Referral Multiplier</h3>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          Active
        </span>
      </div>

      {/* Multiplier rows */}
      <div className="flex flex-col gap-3 mb-6 flex-1">
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#0a0920]/80 border border-[#1e1e3a]">
          <span className="text-xs text-gray-400">Without Referral</span>
          <span className="text-sm font-bold text-white tracking-wide">2X LIMIT</span>
        </div>
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <span className="text-xs text-purple-400 font-medium">With Referral</span>
          <span className="text-sm font-bold text-purple-300 tracking-wide">4X LIMIT</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2.5 mt-auto">
        <button
          type="button"
          className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center gap-2
                     border border-[#1e1e3a] bg-[#0a0920]/80 text-white
                     hover:bg-[#1a1a3e] transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Withdraw Profits
        </button>
        <button
          type="button"
          className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center gap-2
                     bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                     hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Trading Capital
        </button>
      </div>
    </div>
  );
}

export default ReferralMultiplier;
