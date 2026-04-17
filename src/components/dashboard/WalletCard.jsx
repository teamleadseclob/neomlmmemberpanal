import PropTypes from 'prop-types'

const ICON_MAP = {
  wallet: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1 0-6h.75A2.25 2.25 0 0 1 18 6v0a2.25 2.25 0 0 1-2.25 2.25H15M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5" />
    </svg>
  ),
  reward: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.75 3.75 0 0 0 12.75 10.5h-.75m0 0V6.75a3 3 0 1 1 6 0v3.75m-6 0h-3a3 3 0 0 1-3-3V6" />
    </svg>
  ),
  profit: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  multilevel: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
    </svg>
  ),
  cashback: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  total: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75" />
    </svg>
  ),
};

const BADGE_STYLES = {
  live: 'bg-green-500/20 text-green-400',
  positive: 'bg-green-500/20 text-green-400',
  default: 'bg-purple-500/20 text-purple-300',
}

function WalletCard({ iconType, label, amount, badge, isHighlighted = false }) {
  const badgeStyle = badge ? (BADGE_STYLES[badge.type] ?? BADGE_STYLES.default) : ''

  return (
    <div
      className={`relative rounded-xl p-4 border transition-all duration-200
        ${isHighlighted
          ? 'bg-gradient-to-br from-[#1a0a3e] to-[#0d0b2e] border-purple-500/40 shadow-lg shadow-purple-500/10'
          : 'bg-[#0d0b2e]/60 border-[#1e1e3a] hover:border-purple-500/30'}`}
    >
      {badge && (
        <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle}`}>
          {badge.text}
        </span>
      )}

      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3
          ${isHighlighted
            ? 'bg-purple-500/30 text-purple-300'
            : 'bg-[#1a1a3e] text-gray-400'}`}
      >
        {ICON_MAP[iconType]}
      </div>

      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
      <p
        className={`text-xl font-bold mt-0.5
          ${isHighlighted ? 'text-purple-300' : 'text-white'}`}
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
