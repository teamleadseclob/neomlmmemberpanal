import PropTypes from 'prop-types';
import tikImg from '../../assets/rank/tik.png';

function AchievementHistory({ achievedRanks }) {
  const items = achievedRanks.length > 0
    ? achievedRanks.map((r) => ({
        rank:   r.name,
        date:   r.achievedAt ? `Achieved on ${new Date(r.achievedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}` : 'Achieved',
        reward: `REWARD: $${r.reward.toLocaleString()} BONUS`,
      }))
    : [
        { rank: 'No achievements yet', date: 'Complete rank criteria to earn rewards', reward: '' },
      ];

  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <h3 className="text-base font-bold text-white mb-5">Achievement History</h3>

      <div className="flex flex-col">
        {items.map((a, i) => (
          <div key={a.rank} className="flex gap-3">
            {/* Icon + connector line */}
            <div className="flex flex-col items-center w-9 flex-shrink-0">
              <img src={tikImg} alt="achieved" className="w-9 h-9 object-contain flex-shrink-0" />
              {i < items.length - 1 && (
                <div className="w-px flex-1 bg-gray-600/50 my-1" />
              )}
            </div>

            {/* Text */}
            <div className={i < items.length - 1 ? 'pb-6' : ''}>
              <p className="text-sm font-bold text-white">{a.rank}</p>
              <p className="text-xs text-gray-400 mb-0.5">{a.date}</p>
              {a.reward && (
                <p
                  className="text-[10px] uppercase tracking-wider font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #CB3CFF, #7F25FB)' }}
                >
                  {a.reward}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

AchievementHistory.propTypes = {
  achievedRanks: PropTypes.arrayOf(PropTypes.shape({
    name:       PropTypes.string,
    reward:     PropTypes.number,
    achievedAt: PropTypes.string,
  })),
};
AchievementHistory.defaultProps = { achievedRanks: [] };

export default AchievementHistory;
