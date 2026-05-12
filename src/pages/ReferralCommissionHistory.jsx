import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getreferalhistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

function ReferralCommissionHistory() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]     = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getreferalhistory(page, PAGE_SIZE)
      .then((res) => { if (!cancelled) { setData(res.data); setTotal(res.pagination?.totalDocs ?? res.data?.history?.length ?? 0); setTotalPages(Math.max(1, res.pagination?.totalPages ?? Math.ceil((res.data?.history?.length ?? 0) / PAGE_SIZE))); } })
      .catch(() => { if (!cancelled) setData(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  const totalGross  = data?.totalGross  ?? 0;
  const totalCutoff = data?.totalCutoff ?? 0;
  const totalNet    = data?.totalNet    ?? 0;
  const history     = data?.history     ?? [];
  const paginated   = history;

  function renderRows() {
    if (loading) return (
      <tr><td colSpan={7} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
    );
    if (paginated.length === 0) return (
      <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500">No commission history found.</td></tr>
    );
    return paginated.map((row) => (
      <tr key={row._id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
        <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
        <td className="px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7F25FB] to-[#CB3CFF] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white uppercase">{row.fromUserId?.name?.[0] ?? '?'}</span>
            </div>
            <span className="text-xs text-white font-semibold capitalize">{row.fromUserId?.name ?? '—'}</span>
          </div>
        </td>
        <td className="px-5 py-4 text-xs text-gray-400 font-mono">{row.fromUserId?.userId ?? '—'}</td>
        <td className="px-5 py-4"><span className="text-xs font-bold text-purple-400">L{row.level}</span></td>
        <td className="px-5 py-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${row.type === 'referral' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
            {row.type}
          </span>
        </td>
        <td className="px-5 py-4 text-xs text-gray-300">{row.percentage}%</td>
        <td className="px-5 py-4 text-sm font-bold text-white">${row.amount.toFixed(2)}</td>
      </tr>
    ));
  }

  return (
    <div className="max-w-screen mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <button type="button" onClick={() => navigate('/trading-capital')}
            className="mt-4 w-9 h-9 rounded-lg border border-[#1e1e3a] flex items-center justify-center flex-shrink-0 text-gray-400 hover:text-white hover:border-purple-500/30 transition-colors duration-200 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <p className="text-[10px] text-purple-400 uppercase tracking-[3px] font-semibold mb-1">Wallet Management</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">SWP Cashback</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e1e3a] flex-shrink-0">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Global Market Status</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> OPEN
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] p-5 md:p-6 mb-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">SWP Cashback / Commission</h3>
          <span className="ml-auto text-xs text-gray-500">{data?.totalEntries ?? 0} entries</span>
        </div>
        <div className="flex items-end justify-between mb-2">
          <p className="text-xs text-gray-400">Total Gross Earned</p>
          <p className="text-2xl md:text-3xl font-bold text-white">${totalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700" style={{ width: totalGross > 0 ? '100%' : '0%' }} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Total Gross', value: totalGross }, { label: 'Total Cutoff', value: totalCutoff }, { label: 'Net Credited', value: totalNet }].map((item) => (
            <div key={item.label} className="rounded-xl border border-[#1e1e3a] p-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">{item.label}</p>
              <p className="text-xl md:text-2xl font-bold text-white">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Commission History</h2>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
                {['Date', 'From User', 'User ID', 'Level', 'Type', 'Percentage', 'Amount'].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={total} pageSize={PAGE_SIZE} setPage={setPage} />
      </div>
    </div>
  );
}

export default ReferralCommissionHistory;
