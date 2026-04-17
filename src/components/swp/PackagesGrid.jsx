import PackageCard from './PackageCard';

const PACKAGES = [
  {
    tierLabel: 'Tier 01',
    title: '$100 Package',
    price: 100,
    maxLimit: 1000,
    leverage: '10.0x',
    icon: 'bolt',
    btnType: 'repurchase',
  },
  {
    tierLabel: 'Tier 02',
    title: '$200 Package',
    price: 200,
    maxLimit: 2000,
    leverage: '10.0x',
    icon: 'rocket',
    btnType: 'upgrade',
  },
  {
    tierLabel: 'Tier 03',
    title: '$300 Package',
    price: 300,
    maxLimit: 3000,
    leverage: '10.0x',
    icon: 'gear',
    btnType: 'select',
  },
  {
    tierLabel: 'Tier 04',
    title: '$500 Package',
    price: 500,
    maxLimit: 5000,
    leverage: '10.0x',
    icon: 'diamond',
    btnType: 'select',
    badge: 'Popular Choice',
  },
  {
    tierLabel: 'Tier 05',
    title: '$700 Package',
    price: 700,
    maxLimit: 7000,
    leverage: '10.0x',
    icon: 'infinity',
    btnType: 'select',
  },
  {
    tierLabel: 'Elite Tier 06',
    title: '$1,000 Package',
    price: 1000,
    maxLimit: 10000,
    leverage: '10.0x',
    icon: 'star',
    btnType: 'select',
  },
];

function PackagesGrid() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-white mb-5">Available Investment Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.tierLabel} {...pkg} />
        ))}
      </div>
    </div>
  );
}

export default PackagesGrid;
