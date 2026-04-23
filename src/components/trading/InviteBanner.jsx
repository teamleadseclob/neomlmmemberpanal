function InviteBanner() {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#2d1462] via-[#1a0a3e] to-[#0d0b2e] border border-purple-500/20 p-6 md:p-8">
      {/* Decorative network illustration */}
      <div className="absolute right-4 bottom-2 w-44 h-44 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Outer rings */}
          <circle cx="130" cy="130" r="70" stroke="#CB3CFF" strokeWidth="1.5" opacity="0.5" />
          <circle cx="130" cy="130" r="50" stroke="#CB3CFF" strokeWidth="1.5" opacity="0.4" />
          <circle cx="130" cy="130" r="30" stroke="#CB3CFF" strokeWidth="1.5" opacity="0.3" />
          {/* Nodes */}
          <circle cx="130" cy="60" r="8" fill="#CB3CFF" opacity="0.6" />
          <circle cx="70" cy="130" r="6" fill="#CB3CFF" opacity="0.5" />
          <circle cx="130" cy="200" r="7" fill="#CB3CFF" opacity="0.4" />
          <circle cx="190" cy="130" r="9" fill="#CB3CFF" opacity="0.5" />
          <circle cx="85" cy="80" r="5" fill="#CB3CFF" opacity="0.4" />
          <circle cx="175" cy="80" r="5" fill="#CB3CFF" opacity="0.4" />
          <circle cx="175" cy="175" r="6" fill="#CB3CFF" opacity="0.35" />
          <circle cx="85" cy="175" r="5" fill="#CB3CFF" opacity="0.35" />
          {/* Connection lines */}
          <line x1="130" y1="60" x2="85" y2="80" stroke="#CB3CFF" strokeWidth="1" opacity="0.3" />
          <line x1="130" y1="60" x2="175" y2="80" stroke="#CB3CFF" strokeWidth="1" opacity="0.3" />
          <line x1="70" y1="130" x2="85" y2="80" stroke="#CB3CFF" strokeWidth="1" opacity="0.25" />
          <line x1="190" y1="130" x2="175" y2="80" stroke="#CB3CFF" strokeWidth="1" opacity="0.25" />
          <line x1="70" y1="130" x2="85" y2="175" stroke="#CB3CFF" strokeWidth="1" opacity="0.2" />
          <line x1="190" y1="130" x2="175" y2="175" stroke="#CB3CFF" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 italic">
          Double Your Limits via Network.
        </h3>
        <p className="text-sm text-gray-400 mb-5 max-w-xl">
          Active referrals transform your vault from a 2X asset to a 4X growth engine. Unlock your full potential today.
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider
                     border border-purple-500/50 text-purple-300 bg-purple-500/10
                     hover:bg-purple-500/20 transition-colors duration-200 cursor-pointer"
        >
          Share Invite Link
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default InviteBanner;
