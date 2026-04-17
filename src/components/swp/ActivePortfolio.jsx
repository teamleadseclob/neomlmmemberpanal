function ActivePortfolio() {
  const utilized = 45;
  const remaining = 55;
  const current = 450;
  const limit = 1000;

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 md:p-6 h-full flex flex-col">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
            Active Portfolio Shell
          </p>
          <h2 className="text-xl font-bold text-white">$100 Package</h2>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          Live Status
        </span>
      </div>

      {/* Remaining limit */}
      <div className="flex items-baseline justify-between mb-2 mt-auto">
        <p className="text-xs text-gray-400">Remaining Investment Limit</p>
        <p className="text-lg font-bold text-white">
          ${current.toLocaleString()}{' '}
          <span className="text-sm text-gray-500 font-normal">/ ${limit.toLocaleString()}</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] transition-all duration-700"
          style={{ width: `${utilized}%` }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-5">
        <span>{utilized}% Utilized</span>
        <span>{remaining}% Capacity Remaining</span>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 mt-auto">
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Reach 100% capacity to trigger Repurchase or Upgrade protocols.
        </p>
      </div>
    </div>
  );
}

export default ActivePortfolio;
