import React from 'react';
import PropTypes from 'prop-types'
import WalletCard from './WalletCard'

function WalletCardsGrid({ data }) {
  const fmt = (val) => `$${(val ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  const earnings = data?.earnings?.breakdown ?? {}
  const summary  = data?.earnings?.summary ?? {}

  const rewardTotal =
    (earnings.roi?.net ?? 0) +
    (earnings.multiLevelRewards?.net ?? 0) +
    (earnings.rankRewards?.net ?? 0) +
    (earnings.rankBonus?.net ?? 0)

  const WALLET_DATA = [
    { iconType: 'wallet',     label: 'Main Wallet',         amount: fmt(data?.walletBalance) },
    { iconType: 'reward',     label: 'Reward Wallet',       amount: fmt(rewardTotal) },
    { iconType: 'profit',     label: 'Trading Profit',      amount: fmt(earnings.roi?.thisMonth) },
    { iconType: 'multilevel', label: 'Multilevel Rewards',  amount: fmt(earnings.multiLevelRewards?.thisMonth) },
    { iconType: 'cashback',   label: 'SWP Cashback',        amount: fmt(earnings.commissions?.net) },
    { iconType: 'total',      label: 'Total Income',        amount: fmt(summary.totalNetEarnings), isHighlighted: true },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {WALLET_DATA.map((card) => (
        <WalletCard
          key={card.label}
          iconType={card.iconType}
          label={card.label}
          amount={card.amount}
          isHighlighted={card.isHighlighted}
        />
      ))}
    </div>
  )
}

WalletCardsGrid.propTypes = {
  data: PropTypes.object,
}

WalletCardsGrid.defaultProps = {
  data: null,
}

export default WalletCardsGrid
