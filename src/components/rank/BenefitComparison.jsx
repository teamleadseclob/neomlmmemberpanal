const BENEFITS = [
  {
    type: 'Daily SWP ROI',
    bronze: '0.8%',
    silver: '1.0%',
    gold: '1.5%',
    platinum: '2.0%',
    diamond: '3.5%',
  },
  {
    type: 'Referral Comm.',
    bronze: '5%',
    silver: '7%',
    gold: '10%',
    platinum: '12%',
    diamond: '20%',
  },
  {
    type: 'Withdrawal Limit',
    bronze: '$5k/mo',
    silver: '$20k/mo',
    gold: '$50k/mo',
    platinum: '$250k/mo',
    diamond: 'Unlimited',
  },
  {
    type: 'Support Level',
    bronze: 'Email',
    silver: 'Email',
    gold: 'Priority Chat',
    platinum: 'Personal Manager',
    diamond: '24/7 Concierge',
  },
];

function BenefitComparison() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 md:p-6 mt-6">
      <h3 className="text-base font-bold text-white mb-5">Rank Benefit Comparison</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Benefit Type</th>
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Bronze</th>
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Silver</th>
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Gold (Current)</th>
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Platinum</th>
              <th className="px-4 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Diamond</th>
            </tr>
          </thead>
          <tbody>
            {BENEFITS.map((row) => (
              <tr key={row.type} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                <td className="px-4 py-4 text-xs text-gray-300">{row.type}</td>
                <td className="px-4 py-4 text-xs text-gray-500">{row.bronze}</td>
                <td className="px-4 py-4 text-xs text-gray-500">{row.silver}</td>
                <td className="px-4 py-4 text-sm font-bold text-white">{row.gold}</td>
                <td className="px-4 py-4 text-xs text-gray-400">{row.platinum}</td>
                <td className="px-4 py-4 text-xs text-gray-400">{row.diamond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BenefitComparison;
