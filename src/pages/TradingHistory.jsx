import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getroihistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

function TradingHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getroihistory(page, PAGE_SIZE)
      .then((res) => {
        if (!cancelled) {
          setData(res.data ?? []);
          setTotal(res.pagination?.totalDocs ?? 0);
          setTotalPages(res.pagination?.totalPages ?? 1);
        }
      })
      .catch(() => { if (!cancelled) setData([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  function renderRows() {
    if (loading) {
      return (
        <tr><td colSpan={7} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
      );
    }
    if (data.length === 0) {
      return (
        <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500">No ROI history found.</td></tr>
      );
    }
    return data.map((row) => (
      <tr key={row._id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
        <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
        <td className="px-5 py-4 text-sm font-semibold text-white">${row.totalInvestedAmount.toLocaleString()}</td>
        <td className="px-5 py-4 text-xs text-purple-400 font-bold">{row.roiPercentage}%</td>
        <td className="px-5 py-4 text-xs text-gray-300">{row.daysCalculated}</td>
        <td className="px-5 py-4 text-sm font-bold text-green-400">${row.roiEarned.toLocaleString()}</td>
        <td className="px-5 py-4 text-sm text-gray-400">${row.totalRoiBefore.toLocaleString()}</td>
        <td className="px-5 py-4 text-sm font-bold text-white">${row.totalRoiAfter.toLocaleString()}</td>
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">ROI History</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e1e3a] flex-shrink-0">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Global Market Status</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> OPEN
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">ROI Distribution History</h2>
        <span className="text-xs text-gray-500">{total} entries</span>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
                {['Date', 'Invested Amount', 'ROI %', 'Days', 'ROI Earned', 'Total Before', 'Total After'].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={total} pageSize={PAGE_SIZE} setPage={setPage} />
      </div>
    </div>
  );
}

export default TradingHistory;
