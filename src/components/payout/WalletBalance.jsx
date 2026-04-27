import PropTypes from 'prop-types';

export default function WalletBalance({ balance, availableForWithdrawal, totalPaidOut }) {
  const dollars = Math.floor(balance);
  const cents = ((balance % 1) * 100).toFixed(0).padStart(2, '0');

  return (
    <div
      className="rounded-xl p-5 md:p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10,8,35,0.9) 0%, rgba(20,15,50,0.9) 100%)',
        border: '1px solid rgba(127,37,251,0.18)',
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute -top-20 -left-20 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7F25FB 0%, transparent 70%)' }}
      />

      <p className="text-[10px] text-gray-500 uppercase tracking-[3px] font-semibold mb-3">
        Main Wallet Balance
      </p>
      <p className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
        ${dollars.toLocaleString()}.
        <span className="text-2xl md:text-3xl text-gray-400 font-semibold ml-0.5">{cents}</span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#1e1e3a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
            Available for Withdrawal
          </p>
          <p className="text-lg md:text-xl font-bold text-green-400">
            ${availableForWithdrawal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-[#1e1e3a] p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
            Total Paid Out (YTD)
          </p>
          <p className="text-lg md:text-xl font-bold text-white">
            ${totalPaidOut.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}

WalletBalance.propTypes = {
  balance: PropTypes.number.isRequired,
  availableForWithdrawal: PropTypes.number.isRequired,
  totalPaidOut: PropTypes.number.isRequired,
};
