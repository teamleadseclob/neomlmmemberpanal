import PropTypes from 'prop-types';

const BENEFIT_ROWS = [
  { type: 'Milestone Reward',   key: 'reward',     format: (v) => `$${Number(v).toLocaleString()}` },
  { type: 'Required Teams',     key: 'teams',      format: (v) => `${v} Teams` },
  { type: 'Min SWP Volume',     key: 'swpVolume',  format: (v) => `$${Number(v).toLocaleString()}` },
];

function getHeaderClass(isCurrent, achieved) {
  if (isCurrent) return 'text-purple-400';
  if (achieved)  return 'text-green-400';
  return 'text-gray-500';
}

function getCellClass(isCurrent, achieved) {
  if (isCurrent) return 'text-white font-bold text-sm';
  if (achieved)  return 'text-gray-400';
  return 'text-gray-500';
}

function BenefitComparison({ ranks, currentRank }) {
  if (!ranks || ranks.length === 0) {
    return (
      <div id="rank-progression-table" className="rounded-xl border border-[#1e1e3a] p-5 md:p-6 mt-6">
        <h3 className="text-base font-bold text-white mb-5">Rank Progression & Requirements</h3>
        <p className="text-sm text-gray-500">No rank data available.</p>
      </div>
    );
  }

  const rankCells = ranks.map((r) => ({
    name:      r.name,
    reward:    r.reward,
    teams:     r.criteria?.requiredTeams?.required ?? '—',
    swpVolume: r.criteria?.totalSwpVolume?.required ?? '—',
    achieved:  r.isAchieved,
    isCurrent: r.name === currentRank,
  }));

  return (
    <div id="rank-progression-table" className="rounded-xl border border-[#1e1e3a] p-5 md:p-6 mt-6">
      <h3 className="text-base font-bold text-white mb-5">Rank Progression & Requirements</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                Criteria
              </th>
              {rankCells.map((r) => (
                <th
                  key={r.name}
                  className={`px-4 py-3.5 text-[10px] uppercase tracking-widest font-semibold ${getHeaderClass(r.isCurrent, r.achieved)}`}
                >
                  {r.name}
                  {r.isCurrent && (
                    <span className="ml-1.5 text-[8px] bg-purple-500/20 border border-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded-full normal-case tracking-normal">
                      Current
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BENEFIT_ROWS.map((row) => (
              <tr key={row.type} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                <td className="px-4 py-4 text-xs text-gray-300">{row.type}</td>
                {rankCells.map((r) => (
                  <td
                    key={r.name}
                    className={`px-4 py-4 text-xs ${getCellClass(r.isCurrent, r.achieved)}`}
                  >
                    {row.format(r[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

BenefitComparison.propTypes = {
  ranks: PropTypes.arrayOf(PropTypes.shape({
    name:       PropTypes.string,
    reward:     PropTypes.number,
    isAchieved: PropTypes.bool,
    criteria:   PropTypes.object,
  })),
  currentRank: PropTypes.string,
};
BenefitComparison.defaultProps = {
  ranks:       [],
  currentRank: null,
};

export default BenefitComparison;
