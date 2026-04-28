import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getroihistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

function TradingHistory() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);

  const fetchData = useCallback(async () => {
    try { const res = await getroihistory(); setData(res.data); }
    catch { setData(null); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalGross    = data?.totalGross    ?? 0;
  const totalCutoff   = data?.totalCutoff   ?? 0;
  const totalNet      = data?.totalNet      ?? 0;
  const totalInvested = data?.totalInvested ?? 0;
  const roiCap        = data?.roiCap        ?? 0;
  const roiRemaining  = data?.roiRemaining  ?? 0;
  const isCapReached  = data?.isRoiCapReached ?? false;
  const history       = data?.history       ?? [];

  const progressPercent = roiCap > 0 ? Math.min(Math.round(((roiCap - roiRemaining) / roiCap) * 100), 100) : 0;
  const totalPages      = Math.max(1, Math.ceil(history.length / PAGE_SIZE));
  const paginated       = history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Trading Profit</h1>
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">Trading Profit</h3>
          </div>
          {isCapReached ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">ROI Cap Reached</span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">Active</span>
          )}
        </div>
        <div className="flex items-end justify-between mb-2">
          <p className="text-xs text-gray-400">Total Gross Earned</p>
          <p className="text-2xl md:text-3xl font-bold text-white">${totalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total Invested', value: totalInvested },
            { label: 'ROI Cap',        value: roiCap },
            { label: 'ROI Remaining',  value: roiRemaining },
            { label: 'Total Gross',    value: totalGross },
            { label: 'Total Cutoff',   value: totalCutoff },
            { label: 'Net Credited',   value: totalNet },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-[#1e1e3a] p-3">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold mb-1">{item.label}</p>
              <p className="text-base font-bold text-white">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Transaction History</h2>
        <span className="text-xs text-gray-500">{data?.totalEntries ?? 0} entries</span>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
                {['Date / Time', 'Transaction ID', 'Gross', 'Cutoff', 'Net Credited', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">No transaction history found.</td></tr>
              ) : paginated.map((row) => (
                <tr key={row._id ?? row.id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                  <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">{new Date(row.date ?? row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                  <td className="px-5 py-4 text-xs text-gray-400 font-mono">{row.txnId ?? row._id ?? '—'}</td>
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

export default TradingHistory;
