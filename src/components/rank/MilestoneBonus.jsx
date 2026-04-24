import React from 'react';
function MilestoneBonus() {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#3b1578] via-[#2d1462] to-[#1a0a3e] border border-purple-500/20 p-5 md:p-6">
      {/* Decorative background */}
      <div className="absolute right-2 bottom-2 w-28 h-28 opacity-20 pointer-events-none">
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          <circle cx="60" cy="60" r="50" stroke="#CB3CFF" strokeWidth="1.5" opacity="0.5" />
          <circle cx="60" cy="60" r="35" stroke="#CB3CFF" strokeWidth="1.5" opacity="0.4" />
          <circle cx="60" cy="60" r="20" stroke="#CB3CFF" strokeWidth="1.5" opacity="0.3" />
          <circle cx="60" cy="20" r="5" fill="#CB3CFF" opacity="0.5" />
          <circle cx="95" cy="60" r="6" fill="#CB3CFF" opacity="0.4" />
          <circle cx="40" cy="95" r="4" fill="#CB3CFF" opacity="0.4" />
          <line x1="60" y1="20" x2="95" y2="60" stroke="#CB3CFF" strokeWidth="1" opacity="0.3" />
          <line x1="95" y1="60" x2="40" y2="95" stroke="#CB3CFF" strokeWidth="1" opacity="0.25" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="text-base font-bold text-white mb-1">Next Milestone Bonus</h3>
        <p className="text-xs text-gray-300 mb-3 leading-relaxed max-w-[200px]">
          Advance to Platinum and receive a one-time cash reward.
        </p>
        <p className="text-3xl md:text-4xl font-bold text-white mb-3">$15,000.00</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          Unlock at Platinum
        </span>
      </div>
    </div>
  );
}

export default MilestoneBonus;
