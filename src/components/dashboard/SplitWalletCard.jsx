import React from 'react'
import PropTypes from 'prop-types'
import AnimatedAmount from '../common/AnimatedAmount'
import transactionsIcon from '../../assets/dashboard/transactions.png'
import rewardIcon from '../../assets/dashboard/reward.png'
import profitIcon from '../../assets/dashboard/profit.png'
import multiIcon from '../../assets/dashboard/multi.png'
import swpIcon from '../../assets/dashboard/swp.png'
import incomeIcon from '../../assets/dashboard/income.png'
import bg2 from '../../assets/dashboard/bg2.png'

const ICON_MAP = {
  wallet:     <img src={transactionsIcon} alt="wallet"     className="w-10 h-10 object-contain" />,
  reward:     <img src={rewardIcon}       alt="reward"     className="w-10 h-10 object-contain" />,
  profit:     <img src={profitIcon}       alt="profit"     className="w-10 h-10 object-contain" />,
  multilevel: <img src={multiIcon}        alt="multilevel" className="w-10 h-10 object-contain" />,
  cashback:   <img src={swpIcon}          alt="cashback"   className="w-10 h-10 object-contain" />,
  total:      <img src={incomeIcon}       alt="total"      className="w-10 h-10 object-contain" />,
}

function parseAmount(amount) {
  return typeof amount === 'number'
    ? amount
    : Number.parseFloat(String(amount).replaceAll(/[^0-9.]/g, '')) || 0
}

export default function SplitWalletCard({ iconType, label, amount, iconType2, label2, amount2, className }) {
  return (
    <div className={`relative rounded-md hover:border-purple-500/30 transition-all duration-200 flex overflow-hidden ${className ?? ''}`}>

      <img src={bg2} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none" />

      {/* Left half */}
      <div className="relative flex-1 p-4" style={{ zIndex: 1 }}>
        <div className="w-10 h-10 rounded-lg bg-[#1a1a3e] flex items-center justify-center mb-3">
          {ICON_MAP[iconType]}
        </div>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
        <AnimatedAmount value={parseAmount(amount)} className="text-3xl font-bold mt-0.5 bg-gradient-to-r from-[#36ff6f] to-[#25fb3e] bg-clip-text text-transparent" />
      </div>

      <div className="w-px my-4 bg-[#3c3c55] mr-2" aria-hidden="true" />

      {/* Right half */}
      <div className="relative flex-1 p-4" style={{ zIndex: 1 }}>
        <div className="w-10 h-10 rounded-lg bg-[#1a1a3e00] flex items-center justify-center mb-3">
        </div>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label2}</p>
        <AnimatedAmount value={parseAmount(amount2)} className="text-3xl font-bold mt-0.5 bg-gradient-to-r from-[#3cffa1] to-[#53fb25] bg-clip-text text-transparent" />
      </div>

    </div>
  )
}

SplitWalletCard.propTypes = {
  iconType:  PropTypes.string.isRequired,
  label:     PropTypes.string.isRequired,
  amount:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconType2: PropTypes.string.isRequired,
  label2:    PropTypes.string.isRequired,
  amount2:   PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
}

SplitWalletCard.defaultProps = {
  className: '',
}
