import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getcombinedhistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

function RewardHistory() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]     = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getcombinedhistory(page, PAGE_SIZE)
      .then((res) => { if (!cancelled) { setData(res.data); setTotal(res.pagination?.totalDocs ?? res.data?.history?.length ?? 0); setTotalPages(Math.max(1, res.pagination?.totalPages ?? Math.ceil((res.data?.history?.length ?? 0) / PAGE_SIZE))); } })
      .catch(() => { if (!cancelled) setData(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  const summary  = data?.summary ?? { roi: {}, mlr: {} };
  const history  = data?.history ?? [];
  const totalGross  = (summary.roi?.totalGross ?? 0) + (summary.mlr?.totalGross ?? 0);
  const totalCutoff = (summary.roi?.totalCutoff ?? 0) + (summary.mlr?.totalCutoff ?? 0);
  const totalNet    = (summary.roi?.totalNet ?? 0) + (summary.mlr?.totalNet ?? 0);
  const paginated   = history;

  function renderRows() {
    if (loading) return (
      <tr><td colSpan={6} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
    );
    if (paginated.length === 0) return (
      <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">No transaction history found.</td></tr>
    );
    return paginated.map((row) => (
      <tr key={row._id ?? row.id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
        <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">{new Date(row.date ?? row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
        <td className="px-5 py-4 text-xs text-gray-400 font-mono">{row.txnId ?? row._id ?? '—'}</td>
        <td className="px-5 py-4"><span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/30">{row.type ?? '—'}</span></td>
        <td className="px-5 py-4 text-sm font-semibold text-white">${(row.gross ?? 0).toFixed(2)}</td>
        <td className="px-5 py-4 text-sm font-semibold text-white">${(row.cutoff ?? 0).toFixed(2)}</td>
        <td className="px-5 py-4 text-sm font-bold text-white">${(row.net ?? 0).toFixed(2)}</td>
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Reward Wallet Total</h1>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">Total Reward Wallet</h3>
          <span className="ml-auto text-xs text-gray-500">{data?.totalEntries ?? 0} entries</span>
        </div>
        <div className="flex items-end justify-between mb-2">
          <p className="text-xs text-gray-400">Total Gross</p>
          <p className="text-2xl md:text-3xl font-bold text-white">${totalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF]" style={{ width: totalGross > 0 ? '100%' : '0%' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'ROI Gross', value: summary.roi?.totalGross ?? 0 }, { label: 'MLR Gross', value: summary.mlr?.totalGross ?? 0 }, { label: 'Total Cutoff', value: totalCutoff }, { label: 'Net Credited', value: totalNet }].map((item) => (
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
                {['Date / Time', 'Transaction ID', 'Type', 'Gross', 'Cutoff', 'Net Credited'].map((h) => (
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

export default RewardHistory;
