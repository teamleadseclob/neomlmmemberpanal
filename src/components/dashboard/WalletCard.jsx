import PropTypes from 'prop-types'
import transactionsIcon from '../../assets/dashboard/transactions.png'
import rewardIcon from '../../assets/dashboard/reward.png'
import profitIcon from '../../assets/dashboard/profit.png'
import multiIcon from '../../assets/dashboard/multi.png'
import swpIcon from '../../assets/dashboard/swp.png'
import incomeIcon from '../../assets/dashboard/income.png'

const ICON_MAP = {
  wallet:     <img src={transactionsIcon} alt="wallet" className="w-10 h-10 object-contain" />,
  reward:     <img src={rewardIcon}       alt="reward" className="w-10 h-10 object-contain" />,
  profit:     <img src={profitIcon}       alt="profit" className="w-10 h-10 object-contain" />,
  multilevel: <img src={multiIcon}        alt="multilevel" className="w-10 h-10 object-contain" />,
  cashback:   <img src={swpIcon}          alt="cashback" className="w-10 h-10 object-contain" />,
  total:      <img src={incomeIcon}       alt="total" className="w-10 h-10 object-contain" />,
};

const BADGE_STYLES = {
  live: 'bg-green-500/20 text-green-400',
  positive: 'bg-green-500/20 text-green-400',
  default: 'bg-purple-500/20 text-purple-300',
}

function WalletCard({ iconType, label, amount, isHighlighted = false }) {

  return (
    <div
      className={`relative rounded-xl p-4 border transition-all duration-200
        ${isHighlighted
          ? 'bg-gradient-to-br from-[#1a0a3e75] to-[#0d0b2ebe] border-purple-500/40 shadow-lg shadow-purple-500/10'
          : 'bg-[#181f30ae] border-[#3c3c55] hover:border-purple-500/30'}`}
    >

      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3
          ${isHighlighted
            ? 'bg-purple-500/30 text-purple-300'
            : 'bg-[#1a1a3e] text-gray-400'}`}
      >
        {ICON_MAP[iconType]}
      </div>

      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
      <p
        className={`text-3xl font-bold mt-0.5
          ${isHighlighted ? 'bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent' : 'text-white'}`}
      >
        {amount}
      </p>
    </div>
  );
}

WalletCard.propTypes = {
  iconType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isHighlighted: PropTypes.bool,
  badge: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
}

WalletCard.defaultProps = {
  isHighlighted: false,
  badge: undefined,
}

export default WalletCard;
