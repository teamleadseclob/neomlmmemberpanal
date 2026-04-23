const REQUIREMENTS = [
  {
    label: 'Total Team Volume',
    current: '$84,500',
    target: '$100,000',
    percent: 84.5,
    statusLeft: '84.5% COMPLETE',
    statusRight: '$15,500 REMAINING',
    statusRightColor: 'text-purple-400',
    completed: false,
  },
  {
    label: 'Active Directs',
    current: '8',
    target: '10 Members',
    percent: 80,
    statusLeft: '80% COMPLETE',
    statusRight: '2 MORE NEEDED',
    statusRightColor: 'text-purple-400',
    completed: false,
  },
  {
    label: 'Personal Investment',
    current: '$5,000',
    target: '$5,000',
    percent: 100,
    statusLeft: 'COMPLETED',
    statusRight: null,
    completed: true,
  },
  {
    label: 'Direct Team Rank (Gold)',
    current: '1',
    target: '2 Members',
    percent: 50,
    statusLeft: '50% COMPLETE',
    statusRight: '1 MORE GOLD MEMBER',
    statusRightColor: 'text-purple-400',
    completed: false,
  },
];

function PlatinumRequirements() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 md:p-6 h-full">
      <h3 className="text-base font-bold text-white mb-5">Platinum Rank Requirements</h3>

      <div className="flex flex-col gap-5">
        {REQUIREMENTS.map((req) => (
          <div key={req.label}>
            {/* Label + values */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">{req.label}</span>
              <span className="text-xs text-white font-semibold">
                {req.current} / {req.target}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#1a1a3e] rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] transition-all duration-700"
                style={{ width: `${req.percent}%` }}
              />
            </div>

            {/* Status row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                {req.statusLeft}
                {req.completed && (
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {req.statusRight && (
                <span className={`text-[10px] uppercase tracking-wider font-semibold ${req.statusRightColor}`}>
                  {req.statusRight}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatinumRequirements;
