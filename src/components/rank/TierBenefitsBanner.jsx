function TierBenefitsBanner() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 px-5 py-4 mb-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .982-3.172M8.25 8.25a6.75 6.75 0 0 1 7.5 0" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Platinum Tier Benefits</h3>
          <p className="text-xs text-gray-400">
            Unlock 2% higher daily SWP payouts and priority support.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="px-5 py-2 rounded-lg text-xs font-semibold tracking-wide
                   border border-[#1e1e3a] bg-transparent text-white
                   hover:bg-[#1a1a3e] transition-colors duration-200 cursor-pointer flex-shrink-0"
      >
        View All Tiers
      </button>
    </div>
  );
}

export default TierBenefitsBanner;
