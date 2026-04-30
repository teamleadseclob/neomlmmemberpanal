import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Pagination from '../common/Pagination';
import { getwithdrawal } from '../../config/apiService';
import { downloadCsv } from '../../utils/downloadCsv';

const CSV_COLUMNS = [
  { label: 'Date',           format: (row) => new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
  { label: 'Time',           format: (row) => new Date(row.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
  { label: 'Tx Hash',        format: (row) => row.txHash ?? '' },
  { label: 'Amount',         format: (row) => `$${(row.amount ?? 0).toFixed(2)}` },
  { label: 'Fee',            format: (row) => `$${(row.calculationDetails?.fee ?? 0).toFixed(2)}` },
  { label: 'Net Amount',     format: (row) => `$${(row.calculationDetails?.netAmount ?? 0).toFixed(2)}` },
  { label: 'Wallet Address', format: (row) => row.walletAddress ?? '' },
  { label: 'Status',         format: (row) => row.status ?? '' },
  { label: 'Description',    format: (row) => row.description ?? '' },
];

const PAGE_SIZE = 5;

const STATUSES = ['all', 'completed', 'pending', 'failed', 'rejected'];

const STATUS_STYLES = {
  completed: 'bg-green-500/15 text-green-400 border-green-500/30',
  pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  failed:    'bg-red-500/15 text-red-400 border-red-500/30',
  rejected:  'bg-red-500/15 text-red-400 border-red-500/30',
};

function getStatusStyle(status) {
  return STATUS_STYLES[status?.toLowerCase()] ?? STATUS_STYLES.pending;
}

function TxHashCell({ txHash }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!txHash) return;
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    toast.success('Transaction hash copied!', { duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!txHash) return <span className="text-gray-600">—</span>;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
      title={txHash}
    >
      <span className="text-[11px] text-gray-400 font-mono group-hover:text-purple-400 transition-colors">
        {`${txHash.slice(0, 6)}...${txHash.slice(-6)}`}
      </span>
      <span className={`transition-all duration-300 ${
        copied ? 'text-green-400 scale-125' : 'text-gray-600 group-hover:text-purple-400'
      }`}>
        {copied ? (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
        )}
      </span>
    </button>
  );
}

TxHashCell.propTypes = { txHash: PropTypes.string };
TxHashCell.defaultProps = { txHash: null };

export default function WithdrawalHistory({ onWalletData, onPendingData, onRefreshRef }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [page, setPage]                 = useState(1);
  const [total, setTotal]               = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [activeStatus, setActiveStatus] = useState('all');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const status = activeStatus === 'all' ? '' : activeStatus;
      const res    = await getwithdrawal(page, PAGE_SIZE, status);
      const data   = res.data ?? [];
      setTransactions(data);
      setTotal(res.pagination?.totalDocs ?? 0);
      setTotalPages(Math.max(1, res.pagination?.totalPages ?? 1));
      onWalletData?.({
        balance:               res.walletBalance        ?? 0,
        availableForWithdrawal: res.walletBalance       ?? 0,
        totalPaidOut:          res.totalWithdrawnAmount ?? 0,
      });
      /* only update pending section when filter is all or pending */
      if (activeStatus === 'all' || activeStatus === 'pending') {
        onPendingData?.(data.filter((tx) => tx.status === 'pending'));
      }
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [page, activeStatus]);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* expose fetchData so parent can trigger a refresh */
  useEffect(() => {
    if (onRefreshRef) onRefreshRef.current = fetchData;
  }, [fetchData, onRefreshRef]);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setPage(1);
  };

  function renderRows() {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="py-16 text-center">
            <div className="w-7 h-7 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" />
          </td>
        </tr>
      );
    }
    if (transactions.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="py-16 text-center text-sm text-gray-500">
            No {activeStatus === 'all' ? '' : activeStatus} withdrawal history found.
          </td>
        </tr>
      );
    }
    return transactions.map((tx) => (
      <tr key={tx._id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
        <td className="py-3 pr-4">
          <p className="text-[11px] font-semibold text-gray-300">
            {new Date(tx.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
          </p>
          <p className="text-[9px] text-gray-500 mt-0.5">
            {new Date(tx.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </td>
        <td className="py-3 pr-4">
          <TxHashCell txHash={tx.txHash} />
        </td>
        <td className="py-3 pr-4">
          <p className="text-[11px] font-bold text-white">${(tx.amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          {tx.calculationDetails?.fee > 0 && (
            <p className="text-[9px] text-gray-500">Fee: ${tx.calculationDetails.fee}</p>
          )}
        </td>
        <td className="py-3 pr-4 text-[11px] text-gray-400 font-mono">
          {tx.walletAddress ? `${tx.walletAddress.slice(0, 6)}...${tx.walletAddress.slice(-4)}` : '—'}
        </td>
        <td className="py-3">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusStyle(tx.status)}`}>
            {tx.status ?? 'pending'}
          </span>
          {tx.rejectionReason && (
            <p className="text-[9px] text-red-400 mt-0.5">{tx.rejectionReason}</p>
          )}
        </td>
      </tr>
    ));
  }

  return (
    <div className="rounded-xl border border-[#1e1e3a] px-5 pt-4 h-full flex flex-col min-h-[520px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white">Withdrawal History</h2>
        <button
          type="button"
          onClick={() => {
            if (transactions.length === 0) { toast.error('No data to export.'); return; }
            downloadCsv(CSV_COLUMNS, transactions, `withdrawals-${activeStatus}.csv`);
            toast.success('CSV downloaded!');
          }}
          className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:bg-green-500/10 bg-transparent text-green-400 border-green-500/30"
        >
          Download CSV
        </button>
      </div>

      <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-[#1e1e3a] self-start mb-4">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleStatusChange(s)}
            className={`px-2.5 py-1 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-all duration-200 border-none cursor-pointer whitespace-nowrap
              ${activeStatus === s
                ? 'bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white shadow-lg shadow-purple-500/20'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1a1a3e]'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              {['Date / Time', 'Tx Hash', 'Amount', 'Wallet Address', 'Status'].map((h) => (
                <th key={h} className="pb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} total={total} pageSize={PAGE_SIZE} setPage={setPage} />
    </div>
  );
}

WithdrawalHistory.propTypes = {
  onWalletData:  PropTypes.func,
  onPendingData: PropTypes.func,
  onRefreshRef:  PropTypes.shape({ current: PropTypes.func }),
};
WithdrawalHistory.defaultProps = {
  onWalletData:  null,
  onPendingData: null,
  onRefreshRef:  null,
};
