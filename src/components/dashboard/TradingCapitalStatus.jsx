import PropTypes from 'prop-types';

function CapCircle({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#1e1e3a" strokeWidth="8" />
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Cap Reached</span>
      </div>
    </div>
  );
}

CapCircle.propTypes = { percentage: PropTypes.number.isRequired };

function TradingCapitalStatus({ data }) {
  const totalInvested  = data?.totalInvested      ?? 0;
  const investmentLimit = data?.maxInvestmentLimit ?? 0;
  const percentage     = investmentLimit > 0
    ? Math.min(Math.round((totalInvested / investmentLimit) * 100), 100)
    : 0;

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#181F3066] p-5">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <CapCircle percentage={percentage} />

        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">Trading Capital Status</h3>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Monitor your current earning limits and referral boosts.
          </p>

          <div className="flex gap-4 mb-3">
            <div className="flex-1 p-2.5 rounded bg-[#141B2C]">
              <p className="text-[10px] text-gray-500 mb-0.5">Investment Limit</p>
              <p className="text-base font-bold text-white">
                ${investmentLimit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex-1 p-2.5 rounded bg-[#141B2C]">
              <p className="text-[10px] text-gray-500 mb-0.5">Amount Invested</p>
              <p className="text-base font-bold text-white">
                ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="w-full bg-[#1a1a3e] rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
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
};
TradingCapitalStatus.defaultProps = { data: null };

export default TradingCapitalStatus;
