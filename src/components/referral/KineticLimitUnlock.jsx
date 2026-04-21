function KineticLimitUnlock() {
  const current = 12;
  const target = 20;
  const remaining = target - current;
  const progress = (current / target) * 100;

  return (
    <div className="rounded-xl border border-purple-500/30 bg-[#51425333] p-5 md:p-6 h-full flex flex-col">
      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2">Kinetic Limit Unlock</h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-5">
        Reach the milestone to unlock the 4X Kinetic Limit bonus for your staking rewards.

      </p>

      {/* Progress display */}
      <div className="flex items-baseline gap-1 mb-1.5 ">
        <span className="text-3xl font-bold bg-linear-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent">
          {current}
        </span>
        <span className="text-3xl font-bold text-gray-500  bg-linear-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent"> / </span>
        <span className="text-3xl font-bold text-gray-500  bg-linear-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent ">{target}</span>
        <span className="text-xs text-gray-500 ml-auto">{remaining} more needed</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#7F25FB] to-[#D946EF] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Next tier */}
      <div className="flex items-center gap-1.5 mt-auto">
        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <span className="text-xs text-gray-500">Next Tier: </span>
        <span className="text-xs text-gray-300 font-medium">Orbital Commander</span>
      </div>
    </div>
  );
}

export default KineticLimitUnlock;
