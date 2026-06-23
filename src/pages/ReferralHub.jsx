import { useState, useEffect } from 'react';
import { ReferralHeader, InviteLab } from '../components/referral';
import { getprofile, getpoolfundhistory } from '../config/apiService';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 10;

function ReferralHub() {
  const [directReferralEarnings, setDirectReferralEarnings] = useState(0);
  const [totalPoolFundEarned, setTotalPoolFundEarned] = useState(0);
  const [swpBalance, setSwpBalance] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getprofile()
      .then((res) => {
        setDirectReferralEarnings(res?.data?.directReferralEarnings ?? 0);
        setTotalPoolFundEarned(res?.data?.totalPoolFundEarned ?? 0);
        setSwpBalance(res?.data?.swpBalance ?? 0);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getpoolfundhistory(page, PAGE_SIZE)
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
    if (loading) return (
      <tr><td colSpan={5} className="px-5 py-12 text-center"><div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" /></td></tr>
    );
    if (data.length === 0) return (
      <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-500">No pool fund history found.</td></tr>
    );
    return data.map((row) => (
      <tr key={row._id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
        <td className="px-5 py-4 text-xs text-gray-300 whitespace-nowrap">
          {new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
          <span className="block text-[10px] text-gray-500">{new Date(row.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        </td>
        <td className="px-5 py-4 text-sm font-bold text-white">${row.amount?.toFixed(2)}</td>
        <td className="px-5 py-4 text-xs text-gray-300">{row.swpBalance}</td>
        <td className="px-5 py-4 text-xs text-gray-300">{row.ratePerHundred}</td>
        <td className="px-5 py-4 text-xs text-gray-300">{row.percentage}%</td>
      </tr>
    ));
  }

  return (
    <div className="max-w-screen mx-auto">
      <ReferralHeader />
      <div className="mb-6">
        <InviteLab directReferralEarnings={directReferralEarnings} />
      </div>

      <div className="rounded-xl border border-[#1e1e3a] p-5 md:p-6 mb-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">Pool Fund</h3>
          <span className="ml-auto text-xs text-gray-500">{total} entries</span>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="rounded-xl border border-[#1e1e3a] p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">Total Pool Fund Earned</p>
            <p className="text-xl md:text-2xl font-bold text-white">${totalPoolFundEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span className="text-sm text-gray-400 font-normal">/{swpBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Pool Fund History</h2>
      </div>

      <div className="rounded-xl border border-[#1e1e3a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a] bg-[#0f0f1e]">
                {['Date', 'Amount', 'SWP Balance', 'Rate/100', 'Percentage'].map((h) => (
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

export default ReferralHub;
