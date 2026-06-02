import { useState, useEffect } from 'react';
import { getreferals } from '../../config/apiService';

import Pagination from '../common/Pagination';

const PAGE_SIZE = 10;

function ReferralsTable() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]         = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getreferals(page, PAGE_SIZE)
      .then((res) => { if (!cancelled) { setReferrals(res.data ?? []); setTotal(res.pagination?.totalDocs ?? res.data?.length ?? 0); setTotalPages(Math.max(1, res.pagination?.totalPages ?? 1)); } })
      .catch(() => { if (!cancelled) setReferrals([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  if (loading) {
    return (
      <div className="rounded-xl p-10 flex items-center justify-center" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
        <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
              {['Name', 'User ID', 'Email', 'SWP Balance', 'Total Invested', 'Status', 'Joined'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {referrals.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500">
                  No referrals found.
                </td>
              </tr>
            ) : (
              referrals.map((r) => (
                <tr key={r._id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                  {/* Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7F25FB] to-[#CB3CFF] flex items-center justify-center flex-shrink-0">
                        <span className="text-[11px] font-bold text-white uppercase">{r.name?.[0] ?? '?'}</span>
                      </div>
                      <span className="text-sm font-semibold text-white capitalize">{r.name}</span>
                    </div>
                  </td>
                  {/* User ID */}
                  <td className="px-5 py-4 text-xs text-gray-400 font-mono">{r.userId}</td>
                  {/* Email */}
                  <td className="px-5 py-4 text-xs text-gray-400">{r.email}</td>
                  {/* SWP Balance */}
                  <td className="px-5 py-4 text-xs text-white font-semibold">
                    ${r.swpBalance.toLocaleString()}
                  </td>
                  {/* Total Invested */}
                  <td className="px-5 py-4 text-xs text-white font-semibold">
                    ${r.totalInvested.toLocaleString()}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border
                      ${r.isBlocked
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
                      {r.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  {/* Joined */}
                  <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    <span className="block text-[10px] text-gray-500">{new Date(r.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} total={total} pageSize={PAGE_SIZE} setPage={setPage} />
    </div>
  );
}

export default ReferralsTable;
