import { useEffect, useState } from 'react';
import { getswphistory } from '../../config/apiService';

function renderContent(loading, history) {
  if (loading) return (
    <div className="flex justify-center py-10">
      <span className="w-7 h-7 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );

  if (history.length === 0) return (
    <p className="text-sm text-gray-500 text-center py-10">No purchase history found.</p>
  );

  return (
    <>
      {/* Mobile: cards */}
      <div className="bg-[#070E1E80] md:hidden flex flex-col gap-3">
        {history.map((item) => (
          <div key={item._id} className="rounded-xl p-4 flex flex-col gap-2" style={{ background: '#181F3066 ', border: '1px solid #EEB1FF1A' }}>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-purple-500/15 text-purple-400 border-purple-500/30">
                {item.purchaseType}
              </span>
              <span className="text-[10px] text-white/40">
                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40">Amount</span>
              <span className="text-xs font-bold text-white">${item.amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40">SWP Before</span>
              <span className="text-[11px] text-white/60">${item.swpBefore.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40">SWP After</span>
              <span className="text-[11px] text-purple-300 font-semibold">${item.swpAfter.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden bg-[#070E1E80] md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Type', 'Amount', 'SWP Before', 'SWP After', 'Date'].map((h) => (
                <th key={h} className="px-4 py-3.5 text-[10px] text-white/50 uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={item._id} className="transition-colors hover:bg-white/5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <td className="px-4 py-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-purple-500/15 text-purple-400 border-purple-500/30">
                    {item.purchaseType}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs font-bold text-white">${item.amount.toLocaleString()}</td>
                <td className="px-4 py-4 text-xs text-white/55">${item.swpBefore.toLocaleString()}</td>
                <td className="px-4 py-4 text-xs font-semibold text-purple-300">${item.swpAfter.toLocaleString()}</td>
                <td className="px-4 py-4 text-xs text-white/50 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function SwpHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getswphistory()
      .then((res) => setHistory(res?.data ?? []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-xl p-5 md:p-6 mt-6" style={{ background: '#181F3066', border: '1px solid #EEB1FF1A' }}>
      <h3 className="text-base font-bold text-white mb-5">Purchase History</h3>
      {renderContent(loading, history)}
    </div>
  );
}
