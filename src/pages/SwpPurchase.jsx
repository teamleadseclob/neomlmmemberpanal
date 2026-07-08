import React, { useState, useEffect, useCallback, useContext } from 'react';
import { getswpplan } from '../config/apiService'
import AuthContext from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import {
  SwpHeader,
  ActivePortfolio,
  CapacityLogic,
  PackagesGrid,
  CustomCapacity,
  SwpHistory,
} from '../components/swp'

function getDaysRemaining(createdAt) {
  if (!createdAt) return 0
  const created = new Date(createdAt)
  const deadline = new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

function SwpPurchase() {
  const [swpData, setSwpData] = useState(null)
  const [copied, setCopied] = useState(false)
  const { user } = useContext(AuthContext)
  const { profile } = useProfile()
  const daysRemaining = getDaysRemaining(profile?.createdAt)
  const expired = daysRemaining === 0

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.userId || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      {profile && (!profile.swpBalance || profile.swpBalance <= 0) && <div className={`mb-4 p-4 rounded-lg font-semibold ${
          expired
            ? 'bg-red-500/20 border border-red-500 text-red-400'
            : 'bg-yellow-500/20 border border-yellow-500 text-yellow-300'
        }`}>
          <p className="text-center">
            {expired
              ? '⚠️ Your 30-day trial period has expired. Please purchase an SWP package to activate your account.'
              : `⏳ You have ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining to purchase an SWP package before your registration expires.`
            }
          </p>
          {user?.userId && (
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-cyan-400">
              <span className="opacity-80">Your User ID:</span>
              <span className="font-mono font-bold tracking-wide">{user.userId}</span>
              <button
                onClick={handleCopy}
                className="px-2 py-0.5 rounded text-xs bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors border border-cyan-400/40"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>}

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
