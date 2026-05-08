import PropTypes from 'prop-types';

const BENEFIT_ROWS = [
  { type: 'Milestone Reward', key: 'reward',    format: (v) => `$${Number(v).toLocaleString()}` },
  { type: 'Required Teams',   key: 'teams',     format: (v) => `${v} Teams` },
  { type: 'Min SWP Volume',   key: 'swpVolume', format: (v) => `$${Number(v).toLocaleString()}` },
];

function getHeaderColor(isCurrent, achieved) {
  if (isCurrent) return '#ffffff';
  if (achieved) return 'rgba(255,255,255,0.7)';
  return 'rgba(255,255,255,0.4)';
}

function getCellColor(isCurrent) {
  return isCurrent ? '#ffffff' : 'rgba(255,255,255,0.7)';
}

function BenefitComparison({ ranks, currentRank }) {
  if (!ranks || ranks.length === 0) {
    return (
      <div id="rank-progression-table" className="rounded-xl p-5 md:p-6 mt-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
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
    <div id="rank-progression-table" className="rounded-xl p-5 md:p-6 mt-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <h3 className="text-base font-bold text-white mb-5">Rank Progression & Requirements</h3>

      <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        <table className="w-full text-left">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th className="px-4 py-4 text-xs text-white/70 uppercase tracking-widest font-semibold whitespace-nowrap">
                Criteria
              </th>
              {rankCells.map((r) => (
                <th
                  key={r.name}
                  className="px-4 py-4 text-xs uppercase tracking-widest font-semibold whitespace-nowrap"
                  style={{ color: getHeaderColor(r.isCurrent, r.achieved) }}
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
            {BENEFIT_ROWS.map((row, idx) => (
              <tr
                key={row.type}
                className="transition-colors hover:bg-white/5"
                style={{
                  background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)',
                  borderBottom: idx < BENEFIT_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <td className="px-4 py-4 text-xs text-white/80 font-medium whitespace-nowrap">{row.type}</td>
                {rankCells.map((r) => (
                  <td
                    key={r.name}
                    className="px-4 py-4 text-xs whitespace-nowrap"
                    style={{ color: getCellColor(r.isCurrent),
                      fontWeight: r.isCurrent ? 700 : 400,
                    }}
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
