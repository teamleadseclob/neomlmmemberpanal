import PropTypes from 'prop-types';

const STATUS_STYLES = {
  Pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  Success: 'bg-green-500/15 text-green-400 border-green-500/30',
  Failed: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const METHOD_COLORS = {
  USDT: '#26A17B',
  Bank: '#3B82F6',
};

export default function WithdrawalHistory({ transactions }) {
  return (
    <div className="rounded-xl border border-[#1e1e3a] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Withdrawal History</h2>
        <button
          id="payout-download-csv"
          type="button"
          className="text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border cursor-pointer transition-all duration-200 hover:bg-green-500/10"
          style={{
            background: 'transparent',
            color: '#4ade80',
            borderColor: 'rgba(74,222,128,0.3)',
          }}
        >
          Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="pb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold pr-4">
                Date / Time
              </th>
              <th className="pb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold pr-4">
                TXID
              </th>
              <th className="pb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold pr-4">
                Amount
              </th>
              <th className="pb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold pr-4">
                Method
              </th>
              <th className="pb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors"
              >
                <td className="py-4 pr-4">
                  <p className="text-xs font-semibold text-gray-300">{tx.date}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{tx.time}</p>
                </td>
                <td className="py-4 pr-4 text-xs text-gray-400">{tx.txid}</td>
                <td className="py-4 pr-4 text-sm font-bold text-white">
                  ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 pr-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: METHOD_COLORS[tx.method] || '#9CA3AF' }}
                    />
                    {tx.method}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${STATUS_STYLES[tx.status] || STATUS_STYLES.Pending}`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

WithdrawalHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      txid: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      method: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
