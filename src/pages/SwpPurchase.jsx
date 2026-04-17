import {
  SwpHeader,
  ActivePortfolio,
  CapacityLogic,
  PackagesGrid,
  CustomCapacity,
} from '../components/swp'; 

function SwpPurchase() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Page header */}
      <SwpHeader />

      {/* Active portfolio + Capacity logic row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        <div className="lg:col-span-3">
          <ActivePortfolio />
        </div>
        <div className="lg:col-span-2">
          <CapacityLogic />
        </div>
      </div>

      {/* Investment packages grid */}
      <PackagesGrid />

      {/* Custom capacity CTA */}
      <CustomCapacity />
    </div>
  );
}

export default SwpPurchase;
