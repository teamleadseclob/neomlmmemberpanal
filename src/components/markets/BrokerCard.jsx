import PropTypes from 'prop-types'
import { useState } from 'react'
import toast from 'react-hot-toast'
import bg from '../../assets/market/bg.png'
import { interest } from '../../config/apiService'
import fca from '../../assets/market/fca.png'
import forex from '../../assets/market/forex.png'
import mt from '../../assets/market/mt.png'


const RegIcon = () => (
  <img src={fca} alt="fca" className="w-4 h-4 object-contain" />
)

const MarketIcon = () => (
  <img src={forex} alt="forex" className="w-4 h-4 object-contain" />
)

const PlatformIcon = () => (
  <img src={mt} alt="mt" className="w-4 h-4 object-contain" />
)

export default function BrokerCard({ name, logo, description, regulation, markets, platform, openAccountUrl, copyTradingUrl, marketTitle, interestStatus }) {
  const [copying, setCopying] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyTrading = async () => {
    setCopying(true)
    try {
      if (marketTitle) await interest(marketTitle)
      toast.success('Interest registered successfully!')
    } catch (err) {
      const msg = err?.response?.data?.message
      if (msg) toast.error(msg)
    } finally {
      setCopying(false)
    }
  }
  return (
    <div className="relative overflow-hidden transition-all duration-200 hover:border-purple-500/30 flex flex-col">

      {/* Full card background */}
      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-fill" style={{ zIndex: 0 }} />

      {/* Content on top of bg */}
      <div className="relative flex flex-col p-6 flex-1">

        {/* Logo area */}
        <div className="h-36 flex items-center rounded-lg  justify-center p-4">
          {logo
            ? <img src={logo} alt={name} className="max-h-16 max-w-[300px] object-contain" />
            : <span className="text-2xl font-black text-white tracking-widest">{name}</span>
          }
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-black text-white text-center tracking-widest mb-1">{name}</h3>
          <p className="text-xs text-gray-400 text-center mb-4 leading-relaxed">{description}</p>

          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex items-center gap-2">
              <RegIcon />
              <span className="text-xs text-gray-300">{regulation}</span>
            </div>
            <div className="flex items-center gap-2">
              <MarketIcon />
              <span className="text-xs text-gray-300">{markets}</span>
            </div>
            <div className="flex items-center gap-2">
              <PlatformIcon />
              <span className="text-xs text-gray-300">{platform}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mt-auto">
            <a
              href={openAccountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest text-center hover:bg-white/5 transition-colors"
            >
              Open Account
            </a>
            {(copyTradingUrl || marketTitle) && (
              <button
                type="button"
                onClick={handleCopyTrading}
                disabled={copying || interestStatus === 'pending'}
                className="w-full py-3 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest text-center hover:bg-white/5 transition-colors cursor-pointer bg-transparent disabled:opacity-60"
              >
                {copying ? 'Please wait...' : interestStatus === 'accepted' ? 'Copy Trading' : interestStatus === 'pending' ? 'Pending' : 'Copy Trading'}
              </button>
            )}

            {interestStatus === 'accepted' && copyTradingUrl && (
              <div className="mt-3 bg-[#0a0a1a] border border-[#1e1e3a] rounded-xl p-3">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5">Trading URL</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 bg-[#12122a] rounded-lg px-3 py-2 border border-[#2a2a4a]">
                    <span className="text-[11px] text-gray-300 block truncate">{copyTradingUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(copyTradingUrl)
                      setCopied(true)
                      toast.success('URL copied!')
                      setTimeout(() => setCopied(false), 2000)
                    }}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-[10px] text-white font-bold uppercase tracking-wider cursor-pointer border-none hover:opacity-90 transition-opacity"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

BrokerCard.propTypes = {
  name:           PropTypes.string.isRequired,
  logo:           PropTypes.string,
  description:    PropTypes.string.isRequired,
  regulation:     PropTypes.string.isRequired,
  markets:        PropTypes.string.isRequired,
  platform:       PropTypes.string.isRequired,
  openAccountUrl: PropTypes.string.isRequired,
  copyTradingUrl: PropTypes.string,
  marketTitle:    PropTypes.string,
  interestStatus: PropTypes.string,
}

BrokerCard.defaultProps = {
  logo:           null,
  copyTradingUrl: null,
  marketTitle:    null,
  interestStatus: null,
}
