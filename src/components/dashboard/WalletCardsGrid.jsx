import React from 'react';
import PropTypes from 'prop-types'
import WalletCard from './WalletCard'
import SplitWalletCard from './SplitWalletCard'

function WalletCardsGrid({ data, rewardWallet }) {
  const fmt = (val) => `$${(val ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  const earnings = data?.earnings?.breakdown ?? {}
  const totalRoiEarned = data?.totalRoiEarned ?? {}
  const totalMultiLevelEarned =data?.totalMultiLevelEarned ?? {}
  const totalRewardWalletEarned = data?.totalRewardWalletEarned ?? {}
  const totalEarnings = data?.totalEarnings ?? {}
  const summary  = data?.earnings?.summary ?? {}

  const rewardTotal = rewardWallet?.totalRewardWallet ?? (
    (earnings.roi?.net ?? 0) +
    (earnings.multiLevelRewards?.net ?? 0) +
    (earnings.rankRewards?.net ?? 0) +
    (earnings.rankBonus?.net ?? 0)
  )

  const WALLET_DATA = [
    { iconType: 'wallet',      label: 'Main Wallet',         amount: fmt(data?.walletBalance) },
    { iconType: 'cashback',    label: 'Last Earned Multilevel Rewards',        amount: fmt(earnings.multiLevelRewards?.lastEarned?.amount),iconType2: 'cashback',      label2: 'Last Earned Trading profit',        amount2: fmt(earnings.roi?.lastEarned?.amount),  },
    { iconType: 'profit',      label: 'Trading Profit',      amount: fmt(totalRoiEarned) },
    { iconType: 'multilevel',  label: 'Multilevel Rewards',  amount: fmt(totalMultiLevelEarned) },
    { iconType: 'reward',      label: 'Reward Wallet',       amount: fmt(totalRewardWalletEarned) },
    { iconType: 'total',       label: 'Total Income',        amount: fmt(totalEarnings) },
  ]

  const ROW1 = WALLET_DATA.slice(0, 3)
  const ROW2 = WALLET_DATA.slice(3)

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Mobile: 1col | Tablet: single 2-col grid for all 6 | Desktop: split into 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {WALLET_DATA.map((card) => (
          card.iconType2
            ? <SplitWalletCard
                key={card.label}
                iconType={card.iconType}   label={card.label}   amount={card.amount}
                iconType2={card?.iconType2} label2={card.label2} amount2={card.amount2}
              />
            : <WalletCard
                key={card.label}
                iconType={card?.iconType}
                label={card.label}
                amount={card.amount}
              />
        ))}
      </div>

      {/* Desktop only */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {ROW1.map((card) => (
          card.iconType2
            ? <SplitWalletCard
                key={card.label}
                className=""
                iconType={card.iconType}   label={card.label}   amount={card.amount}
                iconType2={card.iconType2} label2={card.label2} amount2={card.amount2}
              />
            : <WalletCard
                key={card.label}
                iconType={card.iconType}
                label={card.label}
                amount={card.amount}
              />
        ))}
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {ROW2.map((card) => (
          <WalletCard
            key={card.label}
            iconType={card.iconType}
            label={card.label}
            amount={card.amount}
          />
        ))}
      </div>
    </div>
  )
}

WalletCardsGrid.propTypes = {
  data: PropTypes.object,
  rewardWallet: PropTypes.object,
}

WalletCardsGrid.defaultProps = {
  data: null,
  rewardWallet: null,
}

export default WalletCardsGrid
