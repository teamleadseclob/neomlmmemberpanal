import React from 'react';
import PropTypes from 'prop-types'
import AnimatedAmount from '../common/AnimatedAmount'
import transactionsIcon from '../../assets/dashboard/transactions.png'
import rewardIcon from '../../assets/dashboard/reward.png'
import profitIcon from '../../assets/dashboard/profit.png'
import multiIcon from '../../assets/dashboard/multi.png'
import swpIcon from '../../assets/dashboard/swp.png'
import incomeIcon from '../../assets/dashboard/income.png'
import bg from '../../assets/dashboard/bg2.png'

const ICON_MAP = {
  wallet:     <img src={transactionsIcon} alt="wallet"     className="w-10 h-10 object-contain" />,
  reward:     <img src={rewardIcon}       alt="reward"     className="w-10 h-10 object-contain" />,
  profit:     <img src={profitIcon}       alt="profit"     className="w-10 h-10 object-contain" />,
  multilevel: <img src={multiIcon}        alt="multilevel" className="w-10 h-10 object-contain" />,
  cashback:   <img src={swpIcon}          alt="cashback"   className="w-10 h-10 object-contain" />,
  total:      <img src={incomeIcon}       alt="total"      className="w-10 h-10 object-contain" />,
}

function WalletCard({ iconType, label, amount, islastCard = false }) {
  return (
    <div
      className={`relative rounded-md p-4 hover:border-purple-500/30 transition-all duration-200 overflow-hidden ${islastCard ? 'col-span-full' : ''}`}
    >
      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none" />

      <div className="relative" style={{ zIndex: 1 }}>
        <div className="w-10 h-10 rounded-lg bg-[#1a1a3e] flex items-center justify-center mb-3">
          {ICON_MAP[iconType]}
        </div>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-3xl font-bold mt-0.5">
          <AnimatedAmount value={typeof amount === 'number' ? amount : Number.parseFloat(String(amount).replaceAll(/[^0-9.]/g, '')) || 0} className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent text-3xl font-bold" />
        </p>
      </div>
    </div>
  )
}

WalletCard.propTypes = {
  iconType:   PropTypes.string.isRequired,
  label:      PropTypes.string.isRequired,
  amount:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  islastCard: PropTypes.bool,
}

WalletCard.defaultProps = {
  islastCard: false,
}

export default WalletCard
