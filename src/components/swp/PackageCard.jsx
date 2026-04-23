import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { purchaseswp } from '../../config/apiService'

const TIER_ICONS = {
  bolt: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>),
  rocket: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 1-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>),
  gear: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>),
  diamond: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>),
  infinity: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>),
  star: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>),
}

const buttonLabels = {
  repurchase: 'Repurchase',
  upgrade: 'Upgrade Now',
}

function PackageCard({ tierLabel, title, price, maxLimit, leverage, icon, btnType, badge }) {
  const [hovered, setHovered] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    try {
      await purchaseswp(price)
      toast.success(`${title} purchased successfully!`)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Purchase failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isSelect = btnType === 'select'

  return (
    <div className="relative rounded-xl border border-[#1e1e3a] p-5 flex flex-col hover:border-purple-500/30 transition-all duration-200">
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white whitespace-nowrap">
            {badge}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-1">
        <p className="text-[10px] text-purple-400 uppercase tracking-widest font-semibold">{tierLabel}</p>
        <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400">
          {TIER_ICONS[icon]}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>

      <div className="flex flex-col gap-2.5 mb-5 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Price</span>
          <span className="text-sm font-semibold text-white">${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Max Limit</span>
          <span className="text-sm font-semibold text-purple-400">${maxLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Leverage</span>
          <span className="text-sm font-semibold text-white">{leverage}</span>
        </div>
      </div>

      {/* Select tier morphing button */}
      {isSelect ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handlePurchase}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            disabled={loading}
            style={{
              background: hovered ? 'linear-gradient(to right, #7F25FB, #CB3CFF)' : 'transparent',
              border: hovered ? '1px solid transparent' : '1px solid rgba(139,92,246,0.5)',
              borderRadius: hovered ? '8px' : '9px',
              width: hovered ? '100%' : '50%',
              color: hovered ? '#fff' : 'rgb(192,132,252)',
              boxShadow: hovered ? '0 8px 24px rgba(127,37,251,0.35)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              padding: '10px 0',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span style={{ position: 'relative', display: 'inline-block', height: '16px', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{
                  display: 'block',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s',
                  transform: hovered ? 'translateY(-100%)' : 'translateY(0)',
                  opacity: hovered ? 0 : 1,
                  whiteSpace: 'nowrap',
                }}>Select Tier</span>
                <span style={{
                  display: 'block',
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s',
                  transform: hovered ? 'translateY(0)' : 'translateY(100%)',
                  opacity: hovered ? 1 : 0,
                  whiteSpace: 'nowrap',
                }}>Purchase</span>
              </span>
            )}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePurchase}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            btnType === 'repurchase'
              ? 'border border-purple-500/50 text-purple-400 bg-transparent hover:bg-purple-500/10 transition-all duration-200'
              : 'border border-[#2a2a4a] bg-[#1a1a2e] text-gray-300 hover:text-white transition-all duration-200'
          }`}
        >
          {loading
            ? <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            : buttonLabels[btnType]
          }
        </button>
      )}
    </div>
  )
}

PackageCard.propTypes = {
  tierLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxLimit: PropTypes.number.isRequired,
  leverage: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  btnType: PropTypes.oneOf(['repurchase', 'upgrade', 'select']).isRequired,
  badge: PropTypes.string,
}

PackageCard.defaultProps = { badge: undefined }

export default PackageCard
