import PropTypes from 'prop-types';
import rankImg      from '../../assets/rank/rank.png';
import globalImg    from '../../assets/rank/global.png';
import communityImg from '../../assets/rank/communityseleted.png';

function CurrentAchievement({ currentRank, nextRank }) {
  const label = currentRank ?? 'No Rank';

  const criteria = nextRank ? Object.values(nextRank.criteria) : []
  const progress = criteria.length
    ? Math.min(100, Math.floor(Math.min(...criteria.map(c => (c.current / c.required) * 100))))
    : 100

  const unmetCriteria = criteria.filter(c => !c.met)
  const hint = unmetCriteria.length
    ? `${unmetCriteria.length} criteria pending to reach ${nextRank.name}`
    : nextRank ? `All criteria met for ${nextRank.name}!` : 'You have reached the highest rank!'

  return (
    <div className="rounded-xl p-5 h-full flex flex-col" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] text-green-400 uppercase tracking-[2px] font-bold mb-1">Current Achievement</p>
          <h2 className="text-4xl font-bold text-white">{label}</h2>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
            border: '1px solid #EAB3084D',
          }}
        >
          <img src={rankImg} alt="rank" className="w-7 h-7 object-contain" />
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-gray-400">Progress to <span className="text-white font-medium">Next Rank</span></p>
          <span className="text-lg font-bold text-white">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-500">
          <span className="text-gray-400">⊕</span> {hint}
        </p>
      </div>
    </div>
  );
}

CurrentAchievement.propTypes  = { currentRank: PropTypes.string, nextRank: PropTypes.object };
CurrentAchievement.defaultProps = { currentRank: null, nextRank: null };

function TotalTeamSize() {
  return (
    <div className="rounded-xl p-5 h-full flex flex-col" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <div className="w-9 h-9 flex items-center justify-center mb-3">
        <img src={communityImg} alt="community" className="w-5 h-5 object-contain" />
      </div>
      <p className="text-xs text-gray-400 mb-1">Total Team Size</p>
      <h2 className="text-3xl font-bold text-white mb-3">1,284</h2>
      <p className="text-[11px] text-green-400 mt-auto flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
        +12% from last month
      </p>
    </div>
  );
}

function GlobalRanking() {
  return (
    <div className="rounded-xl p-5 h-full flex flex-col" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <div className="w-9 h-9 flex items-center justify-center mb-3">
        <img src={globalImg} alt="global ranking" className="w-5 h-5 object-contain" />
      </div>
      <p className="text-xs text-gray-400 mb-1">Global Ranking</p>
      <h2 className="text-3xl font-bold text-white mb-3">#42</h2>
      <span className="text-[10px] text-gray-400 border border-[#1e1e3a] rounded-full px-2.5 py-1 mt-auto self-start">
        Top 5% of all members
      </span>
    </div>
  );
}

function TopStatsRow({ currentRank, nextRank }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <CurrentAchievement currentRank={currentRank} nextRank={nextRank} />
      {/* <TotalTeamSize /> */}
      {/* <GlobalRanking /> */}
    </div>
  );
}

TopStatsRow.propTypes  = { currentRank: PropTypes.string, nextRank: PropTypes.object };
TopStatsRow.defaultProps = { currentRank: null, nextRank: null };

export default TopStatsRow;
