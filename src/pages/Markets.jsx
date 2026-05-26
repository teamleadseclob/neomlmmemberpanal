import BrokerCard from '../components/markets/BrokerCard'
import MarketInviteBanner from '../components/markets/MarketInviteBanner'
import { useProfile } from '../context/ProfileContext'
import exnessLogo  from '../assets/market/exness.png'
import fusionLogo  from '../assets/market/fusion.png'
import xmLogo      from '../assets/market/xm.png'
import centuryLogo from '../assets/market/century.png'

const BROKERS = [
  {
    name:           'EXNESS',
    logo:           exnessLogo,
    description:    'Multi-asset broker regulated cross global markets',
    regulation:     'FCA / CySEC',
    markets:        'Forex - Metals - Cryptos',
    platform:       'MT5',
    openAccountUrl: 'https://one.exnessonelink.com/a/35033uq308',
    copyTradingUrl: null,
  },
  {
    name:           'FUSION',
    logo:           fusionLogo,
    description:    'Multi-asset broker regulated cross global markets',
    regulation:     'ASIC / VFSC',
    markets:        'Forex, Stocks, Indices',
    platform:       'MT4 / cTrader',
    openAccountUrl: 'https://fusionmarkets.com/?refcode=109999',
    copyTradingUrl: null,
  },
  {
    name:           'XM',
    logo:           xmLogo,
    description:    'Multi-asset broker regulated cross global markets',
    regulation:     'FCA / CySEC',
    markets:        'Forex - Metals - Cryptos',
    platform:       'MT5',
    openAccountUrl: 'https://affs.click/DclKq',
    copyTradingUrl: null,
  },
  {
    name:           'CENTURY',
    logo:           centuryLogo,
    description:    'Multi-asset broker regulated cross global markets',
    regulation:     'DFSA / SCA',
    markets:        'Forex Stocks. Comodities',
    platform:       'MT4 / MT5',
    openAccountUrl: 'https://portal.centuryfinancial.com/signup?RC=MOSH-CMP001&id=1065',
    copyTradingUrl: null,
  },
]

export default function Markets() {
  const { profile } = useProfile()

  return (
    <div className="max-w-screen mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Regulated Brokerage Partners.</h1>
          <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
            We Collaborate With Globally Regulated Brokers To Ensure Secure Execution, Transparency,
            And Institutional-Grade Trading Access.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#0d0d1f] border border-[#1e1e3a] rounded-xl px-4 py-2.5 flex-shrink-0">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">User ID</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
          <span className="text-sm font-bold bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent tracking-wider">
            {profile?.userId || '—'}
          </span>
        </div>
      </div>

      {/* Broker cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {BROKERS.map((broker) => (
          <BrokerCard key={broker.name} {...broker} />
        ))}
      </div>

      {/* Invite banner */}
      <MarketInviteBanner />

    </div>
  )
}
