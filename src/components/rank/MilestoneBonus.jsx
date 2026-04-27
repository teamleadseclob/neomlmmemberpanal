import PropTypes from 'prop-types';
import bgImg from '../../assets/rank/bg.png';

function MilestoneBonus({ nextRank }) {
  const name   = nextRank?.name   ?? 'Platinum';
  const reward = nextRank?.reward ?? 0;

  return (
    <div
      className="relative rounded-xl overflow-hidden border bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] border-purple-500/20 p-5 md:p-6"
    >
      {/* Background image */}
      <img
        src={bgImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Decorative image bottom-right */}
      <img
        src={bgImg}
        alt=""
        className="absolute right-0 bottom-0 w-24 h-24 object-contain pointer-events-none"
      />

      <div className="relative z-10">
        <h3 className="text-base font-bold text-white mb-1">Next Milestone Bonus</h3>
        <p className="text-xs text-gray-300 mb-3 leading-relaxed max-w-[200px]">
          Advance to {name} and receive a one-time cash reward.
        </p>
        <p className="text-3xl md:text-4xl font-bold text-white mb-3">
          ${reward.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-800/20 border border-gray-500/30">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          Unlock at {name}
        </span>
      </div>
    </div>
  );
}

MilestoneBonus.propTypes = {
  nextRank: PropTypes.shape({
    name:   PropTypes.string,
    reward: PropTypes.number,
  }),
};
MilestoneBonus.defaultProps = { nextRank: null };

export default MilestoneBonus;
