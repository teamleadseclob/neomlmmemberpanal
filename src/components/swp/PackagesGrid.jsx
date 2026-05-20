import React from 'react';
import PropTypes from 'prop-types'
import PackageCard from './PackageCard'

const TIER_META = [
  { icon: 'bolt' },
  { icon: 'rocket' },
  { icon: 'gear' },
  { icon: 'diamond', badge: 'Popular Choice' },
  { icon: 'infinity' },
  { icon: 'star' },
]

function getBtnType(amount, lastPurchased) {
  if (lastPurchased !== null && amount === lastPurchased) return 'repurchase'
  return 'select'
}

function PackagesGrid({ packages, lastPurchased, swpCap }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Available Investment SWP Packages</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e1e3a] bg-[#0d0b2e]/60">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">SWP Cap</span>
          <span className="text-sm font-bold text-white">${swpCap.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((pkg, i) => {
          const meta = TIER_META[i] ?? { icon: 'bolt' }
          return (
            <PackageCard
              key={pkg.amount}
              tierLabel={`Tier ${String(i + 1).padStart(2, '0')}`}
              title={`$${pkg.amount.toLocaleString()}`}
              price={pkg.amount}
              maxLimit={pkg.investmentLimit}
              leverage="10.0x"
              icon={meta.icon}
              badge={meta.badge}
              btnType={getBtnType(pkg.amount, lastPurchased)}
            />
          )
        })}
      </div>
    </div>
  )
}

PackagesGrid.propTypes = {
  packages: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    investmentLimit: PropTypes.number.isRequired,
  })),
  lastPurchased: PropTypes.number,
  swpCap: PropTypes.number,
}

PackagesGrid.defaultProps = {
  packages: [],
  lastPurchased: null,
  swpCap: 0,
}

export default PackagesGrid
