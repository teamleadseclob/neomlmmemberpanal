import PropTypes from 'prop-types'

const BADGE_STYLES = {
  positive: 'bg-green-500/20 text-green-400',
  active: 'bg-green-500/20 text-green-400',
  beta: 'bg-orange-500/20 text-orange-400',
  default: 'bg-purple-500/20 text-purple-300',
}

function ReferralStatCard({ icon, label, value, unit, badge }) {
  const badgeStyle = badge ? (BADGE_STYLES[badge.type] ?? BADGE_STYLES.default) : ''

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-4 hover:border-purple-500/30 transition-all duration-200">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#1a1a3e] flex items-center justify-center text-purple-400">
          {icon}
        </div>
        {badge && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle}`}>
            {badge.text}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-1">{label}</p>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-xs text-gray-500 font-medium">{unit}</span>}
      </div>
    </div>
  )
}

ReferralStatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  badge: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
}

ReferralStatCard.defaultProps = {
  unit: undefined,
  badge: undefined,
}

export default ReferralStatCard
