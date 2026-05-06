import { useState, useEffect } from 'react';
import { getreferals } from '../../config/apiService';

const PAGE_SIZE = 5;

function ReferralsTable() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);

  useEffect(() => {
    getreferals()
      .then((res) => setReferrals(res.data ?? []))
      .catch(() => setReferrals([]))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(referrals.length / PAGE_SIZE));
  const paginated  = referrals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500">
                  No referrals found.
                </td>
              </tr>
            ) : (
              paginated.map((r) => (
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#1e1e3a] bg-[#0f0f1e]">
        <p className="text-xs text-gray-500">
          Showing <span className="text-white font-semibold">{Math.min((page - 1) * PAGE_SIZE + 1, referrals.length)}</span>–<span className="text-white font-semibold">{Math.min(page * PAGE_SIZE, referrals.length)}</span> of <span className="text-white font-semibold">{referrals.length}</span> referrals
        </p>
        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-[#2a2a4a] bg-transparent text-gray-400
                       hover:border-purple-500/50 hover:text-white transition-all duration-150
                       disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all duration-150 cursor-pointer
                ${p === page
                  ? 'bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white border-transparent shadow-lg shadow-purple-500/20'
                  : 'border-[#2a2a4a] bg-transparent text-gray-400 hover:border-purple-500/50 hover:text-white'}`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-[#2a2a4a] bg-transparent text-gray-400
                       hover:border-purple-500/50 hover:text-white transition-all duration-150
                       disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReferralsTable;
