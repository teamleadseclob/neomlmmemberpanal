import PropTypes from 'prop-types';
import AnimatedAmount from '../common/AnimatedAmount';

export default function WalletBalance({ balance, availableForWithdrawal, totalPaidOut }) {
  return (
    <div
      className="rounded-xl p-5 md:p-6 relative overflow-hidden"
      style={{
        background: '#181F3033',
        border: '1px solid rgba(127,37,251,0.18)',
      }}
    >
      <div
        className="absolute -top-40 -right-40 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0, 108, 74, 0.24) 0%, transparent 70%)' }}
      />

      <p className="text-[10px] text-gray-500 uppercase tracking-[3px] font-semibold mb-3">
        Main Wallet Balance
      </p>

      <AnimatedAmount
        value={balance}
        large
        className="text-4xl md:text-5xl font-bold text-white mb-6 relative"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#1e1e3a] p-4" style={{ background: '#00000033' }}>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
            Available for Withdrawal
          </p>
          <span
            className="text-lg md:text-xl font-bold"
            style={{ background: 'linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}
          >
            <AnimatedAmount value={availableForWithdrawal} className="" />
          </span>
        </div>
        <div className="rounded-xl border border-[#1e1e3a] p-4" style={{ background: '#00000033' }}>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
            Total Paid Out (YTD)
          </p>
          <AnimatedAmount
            value={totalPaidOut}
            className="text-lg md:text-xl font-bold text-white"
          />
        </div>
      </div>
    </div>
  );
}

WalletBalance.propTypes = {
  balance:                PropTypes.number.isRequired,
  availableForWithdrawal: PropTypes.number.isRequired,
  totalPaidOut:           PropTypes.number.isRequired,
};
