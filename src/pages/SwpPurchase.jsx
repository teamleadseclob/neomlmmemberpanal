import { useState, useEffect } from 'react'
import { getswpplan } from '../config/apiService'
import {
  SwpHeader,
  ActivePortfolio,
  CapacityLogic,
  PackagesGrid,
  CustomCapacity,
} from '../components/swp'

function SwpPurchase() {
  const [swpData, setSwpData] = useState(null)

  useEffect(() => {
    const fetchSwp = async () => {
      try {
        const res = await getswpplan()
        setSwpData(res.data)
      } catch {
        setSwpData(null)
      }
    }
    fetchSwp()
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto">
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
      />

      <CustomCapacity />
    </div>
  )
}

export default SwpPurchase
