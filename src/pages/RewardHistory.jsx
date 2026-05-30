import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getcombinedhistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

const FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'referral_income', label: 'Referral Income' },
  { value: 'layered_rewards', label: 'Layered Rewards' },
  { value: 'rank_income', label: 'Rank Income' },
  { value: 'royalty_rewards', label: 'Royalty Rewards' },
  { value: 'special_rewards', label: 'Special Rewards' },
];

function RewardHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getcombinedhistory(filter, page, PAGE_SIZE)
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
  }, [page, filter]);

  function renderRows() {
    if (loading) return (
      <tr><td colSpan={4} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
    );
    if (data.length === 0) return (
      <tr><td colSpan={4} className="px-5 py-12 text-center text-sm text-gray-500">No reward history found.</td></tr>
    );
    return data.map((row, idx) => (
      <tr key={row._id ?? idx} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
        <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
        <td className="px-5 py-4">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/30">
            {row.type?.replace(/_/g, ' ') ?? '—'}
          </span>
        </td>
        <td className="px-5 py-4 text-sm font-bold text-green-400">${row.amount?.toFixed(2) ?? '0.00'}</td>
        <td className="px-5 py-4 text-sm text-gray-300">{row.detail ?? '—'}</td>
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Reward Wallet History</h1>
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
        <h2 className="text-lg font-bold text-white">Reward History</h2>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 rounded-lg border border-[#1e1e3a] bg-[#0d0d1f] text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
                {['Date', 'Type', 'Amount', 'Detail'].map((h) => (
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
