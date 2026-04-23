function ElitePrivilege() {
  return (
    <div className="rounded-xl p-5 md:p-6 relative" style={{ background: 'linear-gradient(#020717, #020717) padding-box, linear-gradient(135deg, #CB3CFF, #7F25FB) border-box', border: '1px solid transparent' }}>
      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        </div>
        <span className="text-[10px] text-green-400 uppercase tracking-[2px] font-bold">
          Elite Privilege
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
        Direct Compliance Support
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-5">
        As an Elite Member, you have a dedicated compliance officer for immediate assistance with heavy transactions.
      </p>

      <button
        type="button"
        className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide
                   text-white hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        style={{ background: 'linear-gradient(135deg, #CB3CFF, #7F25FB)' }}
      >
        Connect Live
      </button>
    </div>
  );
}

export default ElitePrivilege;
