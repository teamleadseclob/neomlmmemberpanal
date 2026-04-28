import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getmultylevelhistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

function MultilevelHistory() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);

  const fetchData = useCallback(async () => {
    try { const res = await getmultylevelhistory(); setData(res.data); }
    catch { setData(null); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalGross  = data?.totalGross  ?? 0;
  const totalCutoff = data?.totalCutoff ?? 0;
  const totalNet    = data?.totalNet    ?? 0;
  const history     = data?.history     ?? [];
  const totalPages  = Math.max(1, Math.ceil(history.length / PAGE_SIZE));
  const paginated   = history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Multilevel Rewards</h1>
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
          <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">Multilevel Rewards</h3>
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
        <h2 className="text-lg font-bold text-white">Transaction History</h2>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
                {['Date / Time', 'Transaction ID', 'Level', 'Gross', 'Cutoff', 'Net Credited', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500">No transaction history found.</td></tr>
              ) : paginated.map((row) => (
                <tr key={row._id ?? row.id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                  <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">{new Date(row.date ?? row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                  <td className="px-5 py-4 text-xs text-gray-400 font-mono">{row.txnId ?? row._id ?? '—'}</td>
                  <td className="px-5 py-4 text-xs text-purple-400 font-semibold">L{row.level ?? '—'}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-white">${(row.gross ?? 0).toFixed(2)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-white">${(row.cutoff ?? 0).toFixed(2)}</td>
                  <td className="px-5 py-4 text-sm font-bold text-white">${(row.net ?? 0).toFixed(2)}</td>
                  <td className="px-5 py-4"><span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-green-500/15 text-green-400 border-green-500/30">{row.status ?? 'Success'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={history.length} pageSize={PAGE_SIZE} setPage={setPage} />
      </div>
    </div>
  );
}

export default MultilevelHistory;
