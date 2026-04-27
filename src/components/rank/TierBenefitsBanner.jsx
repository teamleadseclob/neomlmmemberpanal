import PropTypes from 'prop-types';
import diamondImg from '../../assets/rank/diamond.png';

function TierBenefitsBanner({ nextRank }) {
  const name = nextRank?.name ?? 'Next Tier';

  const handleViewAllTiers = () => {
    document.getElementById('rank-progression-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="rounded-xl border border-[#1e1e3a] px-5 py-4 mb-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gray-500/20 flex items-center justify-center flex-shrink-0">
          <img src={diamondImg} alt="diamond" className="w-5 h-5 object-contain" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{name} Tier Benefits</h3>
          <p className="text-xs text-gray-400">
            Unlock 2% higher daily SWP payouts and priority support.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleViewAllTiers}
        className="px-5 py-2 rounded-lg text-xs font-semibold tracking-wide border border-[#1e1e3a] bg-transparent text-white hover:bg-[#1a1a3e] transition-colors duration-200 cursor-pointer flex-shrink-0"
      >
        View All Tiers
      </button>
    </div>
  );
}

TierBenefitsBanner.propTypes = {
  nextRank: PropTypes.shape({ name: PropTypes.string }),
};
TierBenefitsBanner.defaultProps = { nextRank: null };

export default TierBenefitsBanner;
