import PropTypes from 'prop-types';

function CapCircle({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-40 h-40 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#1e1e3a" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="url(#capGradient)"
          strokeWidth="10"
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{percentage}%</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Cap Reached</span>
      </div>
    </div>
  );
}

CapCircle.propTypes = { percentage: PropTypes.number.isRequired };

function TradingCapitalStatus({ data, rewardLimit }) {
  const totalInvested   = data?.totalInvested      ?? 0;
  const investmentLimit = data?.maxInvestmentLimit ?? 0;
  const percentage      = investmentLimit > 0
    ? Math.min(Math.round((totalInvested / investmentLimit) * 100), 100)
    : 0;

  const roiEarned  = rewardLimit?.roi?.earned  ?? 0;
  const roiLimit   = rewardLimit?.roi?.limit   ?? 0;
  const roiCap     = rewardLimit?.roi?.capMultiplier ?? '2x';
  const roiPct     = roiLimit > 0 ? Math.min(Math.round((roiEarned / roiLimit) * 100), 100) : 0;

  const mlrEarned  = rewardLimit?.mlr?.earned  ?? 0;
  const mlrLimit   = rewardLimit?.mlr?.limit   ?? 0;
  const mlrCap     = rewardLimit?.mlr?.capMultiplier ?? '2x';
  const mlrPct     = mlrLimit > 0 ? Math.min(Math.round((mlrEarned / mlrLimit) * 100), 100) : 0;

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#181F3066] p-6">
      <div className="flex flex-col md:flex-row items-center gap-8">

        <CapCircle percentage={percentage} />

        <div className="flex-1 w-full">
          <h3 className="text-xl font-bold text-white mb-1">Trading Capital Status</h3>
          <p className="text-xs text-gray-400 mb-5 leading-relaxed">
            Monitor your current earning limits and referral boosts.
          </p>

          {/* Two cards side by side */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 p-3.5 rounded-lg bg-[#141B2C] border border-[#1e1e3a]">
              <p className="text-[11px] text-gray-400 mb-1">ROI ({roiCap})</p>
              <p className="text-xl font-bold text-white">
                ${roiEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex-1 p-3.5 rounded-lg bg-[#141B2C] border border-purple-500/30">
              <p className="text-[11px] text-purple-400 mb-1">Multi level reward ({mlrCap})</p>
              <p className="text-xl font-bold bg-linear-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent">
                ${mlrEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Two progress bars */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-[#1a1a3e] rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-linear-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700"
                style={{ width: `${roiPct}%` }}
              />
            </div>
            <div className="flex-1 bg-[#1a1a3e] rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-linear-to-r from-[#CB3CFF] to-[#f472b6] transition-all duration-700"
                style={{ width: `${mlrPct}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-gray-500 italic">
            Boost your limit by referring active partners.
          </p>
        </div>
      </div>
    </div>
  );
}

TradingCapitalStatus.propTypes = {
  data: PropTypes.shape({
    totalInvested:      PropTypes.number,
    maxInvestmentLimit: PropTypes.number,
  }),
  rewardLimit: PropTypes.object,
};
TradingCapitalStatus.defaultProps = { data: null, rewardLimit: null };

export default TradingCapitalStatus;
