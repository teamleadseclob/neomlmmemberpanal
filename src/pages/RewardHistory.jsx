import { useNavigate } from 'react-router-dom';

const SAMPLE_TRANSACTIONS = [
  { id: 1, date: '24 Oct, 2023 ·', time: '14:20', txnId: 'TXN-902341', amount: 450, cutoff: 40, credited: 450, type: 'Success' },
  { id: 2, date: '23 Oct, 2023 ·', time: '09:15', txnId: 'TXN-881203', amount: 450, cutoff: 40, credited: 450, type: 'Success' },
  { id: 3, date: '22 Oct, 2023 ·', time: '18:45', txnId: 'TXN-774512', amount: 450, cutoff: 40, credited: 450, type: 'Success' },
  { id: 4, date: '20 Oct, 2023 ·', time: '11:30', txnId: 'TXN-663291', amount: 450, cutoff: 40, credited: 450, type: 'Success' },
];

function RewardHistory() {
  const navigate = useNavigate();
  const totalAmount = 3120.45;
  const cutOff = 20.45;
  const walletAmount = 20.45;
  const progressPercent = 35;

  return (
    <div className="max-w-screen mx-auto">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => navigate('/trading-capital')}
            className="mt-4 w-9 h-9 rounded-lg border border-[#1e1e3a]  flex items-center justify-center flex-shrink-0
                       text-gray-400 hover:text-white hover:border-purple-500/30 transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <p className="text-[10px] text-purple-400 uppercase tracking-[3px] font-semibold mb-1">
              Wallet Management
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Reward Wallet Total</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e1e3a]  flex-shrink-0">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Global Market Status
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />{''}
            OPEN
          </span>
        </div>
      </div>

      {/* ── Summary Card ─────────────────────────────────────── */}
      <div className="rounded-xl border border-[#1e1e3a]  p-5 md:p-6 mb-8">
        {/* Icon + Title */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">Total Reward Wallet</h3>
        </div>

        {/* Amount row */}
        <div className="flex items-end justify-between mb-2">
          <p className="text-xs text-gray-400">Total Reward Wallet</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Cut Off & Wallet Amount sub-cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#1e1e3a]  p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
              Cut Off
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              ${cutOff.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-[#1e1e3a]  p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
              Wallet Amount
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              ${walletAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Transaction History Header ────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Transaction History</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide
                       border border-[#1e1e3a] bg-transparent text-gray-300
                       hover:bg-[#1a1a3e] transition-colors duration-200 cursor-pointer"
          >
            Export CSV
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide
                       border border-[#1e1e3a] bg-transparent text-gray-300
                       hover:bg-[#1a1a3e] transition-colors duration-200 cursor-pointer"
          >
            Filters
          </button>
        </div>
      </div>

      {/* ── Transaction Table ─────────────────────────────────── */}
      <div className="rounded-xl border border-[#1e1e3a]  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a]">
                <th className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Date/Time</th>
                <th className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Transaction ID</th>
                <th className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Amount</th>
                <th className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Cutoff</th>
                <th className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Credited</th>
                <th className="px-5 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Type</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_TRANSACTIONS.map((row) => (
                <tr key={row.id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                  <td className="px-5 py-5 text-xs text-gray-300 whitespace-nowrap">
                    {row.date}{' '}{row.time}
                  </td>
                  <td className="px-5 py-5 text-xs text-gray-400">{row.txnId}</td>
                  <td className="px-5 py-5 text-sm font-semibold text-white">${row.amount.toFixed(2)}</td>
                  <td className="px-5 py-5 text-sm font-semibold text-white">${row.cutoff.toFixed(2)}</td>
                  <td className="px-5 py-5 text-sm font-bold text-white">${row.credited.toFixed(2)}</td>
                  <td className="px-5 py-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-green-500/15 text-green-400 border-green-500/30">
                      {row.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RewardHistory;
