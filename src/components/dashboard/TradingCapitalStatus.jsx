function CapCircle({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        {/* Background track */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="#1e1e3a"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="url(#capGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F25FB" />
            <stop offset="100%" stopColor="#CB3CFF" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Cap Reached</span>
      </div>
    </div>
  );
}

function TradingCapitalStatus() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Circular progress */}
        <CapCircle percentage={70} />

        {/* Text content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">Trading Capital Status</h3>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Monitor your current earning limits and referral boosts.
          </p>

          {/* Stats row */}
          <div className="flex gap-4 mb-3">
            <div className="flex-1">
              <p className="text-[10px] text-gray-500 mb-0.5">Without Referral (3X)</p>
              <p className="text-base font-bold text-white">$10,000.00</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-purple-400 mb-0.5">With Referral (4X)</p>
              <p className="text-base font-bold text-purple-300">$20,000.00</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#1a1a3e] rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF]"
              style={{ width: '70%' }}
            />
          </div>

          <p className="text-[11px] text-gray-500 italic">
            Boost your limit to 4X by referring just 2 active partners.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TradingCapitalStatus;
