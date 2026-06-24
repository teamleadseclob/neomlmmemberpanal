import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getswpplan } from '../config/apiService'
import {
  SwpHeader,
  ActivePortfolio,
  CapacityLogic,
  PackagesGrid,
  CustomCapacity,
  SwpHistory,
} from '../components/swp'

function SwpPurchase() {
  const [swpData, setSwpData] = useState(null)
  const location = useLocation()
  const { daysRemaining = null, expired = false } = location.state || {}

  const fetchSwp = useCallback(async () => {
    try {
      const res = await getswpplan()
      setSwpData(res.data)
    } catch {
      setSwpData(null)
    }
  }, [])

  useEffect(() => {
    fetchSwp()
  }, [fetchSwp])

  return (
    <div className="max-w-screen mx-auto">
      {daysRemaining !== null && (
        <div className={`mb-4 p-4 rounded-lg text-center font-semibold ${
          expired
            ? 'bg-red-500/20 border border-red-500 text-red-400'
            : 'bg-yellow-500/20 border border-yellow-500 text-yellow-300'
        }`}>
          {expired
            ? '⚠️ Your 30-day trial period has expired. Please purchase an SWP package to activate your account.'
            : `⏳ You have ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining to purchase an SWP package before your registration expires.`
          }
        </div>
      )}

      <SwpHeader />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        <div className="lg:col-span-3">
          <ActivePortfolio data={swpData} />
        </div>
        <div className="lg:col-span-2">
          <CapacityLogic />
        </div>
      </div>

      <PackagesGrid
        packages={swpData?.packages ?? []}
        lastPurchased={swpData?.lastPurchased ?? null}
        swpCap={swpData?.swpCap ?? 0}
        isRoiLimitReached={swpData?.isRoiLimitReached ?? false}
        onPurchaseSuccess={fetchSwp}
      />

      <CustomCapacity />
      <SwpHistory />
    </div>
  )
}

export default SwpPurchase
