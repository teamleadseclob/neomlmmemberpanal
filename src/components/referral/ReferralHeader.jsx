function ReferralHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Referral Hub</h1>
        <p className="text-sm text-gray-400">
          Manage your kinetic network and accelerate your earnings capacity.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">

        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold
                     bg-gradient-to-r from-[#D946EF] to-[#CB3CFF] text-white
                     hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 border-none cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}

export default ReferralHeader;
