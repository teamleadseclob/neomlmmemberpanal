import { useState,useMemo  } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { MdOutlineMoneyOff, MdOutlineAccountBalanceWallet, MdWarningAmber } from 'react-icons/md';
import { withdraw } from '../../config/apiService';
import { getSignupAddress } from '../wallet/useWeb3Payment';
import { useAccount } from 'wagmi';

export default function WithdrawFunds({ maxAmount, onSuccess }) {
  const [amount,  setAmount]  = useState('');
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount()


  const handleSetMax = () => setAmount(maxAmount.toFixed(2));

  const walletAddress = useMemo(() => getSignupAddress(address), [address]);

  const handleSubmit = async () => {
    const parsed = Number.parseFloat(amount);
    if(!isConnected){
      toast.error('Please connect your wallet first');
      return;
    }
    if (!parsed || parsed <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }
    if (parsed > maxAmount) {
      toast.error('Amount exceeds available balance.');
      return;
    }

    setLoading(true);
    try {
      await withdraw(parsed,walletAddress||'0xA33888fC1B280CA64BCb344eF435B18bE105AEb1');
      toast.success('Withdrawal request submitted successfully!');
      setAmount('');
      onSuccess?.();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Withdrawal failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl p-5 md:p-6 h-full flex flex-col" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <h2 className="text-lg font-bold text-white mb-5">Withdraw Funds</h2>

      {/* Amount */}
      <div className="mb-4">
        <label
          htmlFor="payout-amount-input"
          className="block text-[10px] text-gray-500 uppercase tracking-[3px] font-semibold mb-2.5"
        >
          Amount to Withdraw (USD)
        </label>
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-3.5"
          style={{ background: '#000000', border: '1px solid rgba(30,30,58,0.8)' }}
        >
          <span className="text-gray-500 text-lg font-semibold">$</span>
          <input
            id="payout-amount-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-transparent border-none outline-none text-white text-lg font-semibold placeholder:text-gray-600"
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-gray-500">Available: ${maxAmount.toFixed(2)}</p>
          <button
            type="button"
            onClick={handleSetMax}
            className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors bg-transparent border-none cursor-pointer"
          >
            Withdraw Max
          </button>
        </div>
      </div>

      {/* Method */}
      <div className="mb-5">
        <p className="text-[10px] text-gray-500 uppercase tracking-[3px] font-semibold mb-2.5">
          Withdrawal Method
        </p>
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3.5"
          style={{ background: '#000000', border: '1px solid rgba(127,37,251,0.35)' }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex items-center justify-center shrink-0">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">USDT-BEP20</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Processing: 15–30 mins</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#26A17B]/15 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-[#26A17B]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" opacity="0.15"/>
              <path d="M13.4 10.5v-1.9h3.7V6H6.9v2.6h3.7v1.9c-3.3.2-5.8 1-5.8 2 0 1.2 3 2.1 6.7 2.1s6.7-.9 6.7-2.1c0-1-2.5-1.8-5.8-2zm-.9 3.3c-3 0-5.4-.6-5.4-1.3s2.4-1.3 5.4-1.3 5.4.6 5.4 1.3-2.4 1.3-5.4 1.3z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="mb-4 rounded-lg p-3 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Withdrawal Notice</p>
        {[
          { icon: <MdOutlineMoneyOff className="text-yellow-400/60" size={13} />, text: 'A 5% admin charge applies to all withdrawals.' },
          { icon: <MdOutlineAccountBalanceWallet className="text-green-400/60" size={13} />, text: 'Only USDT-BEP20 (BSC) is supported.' },
          { icon: <MdWarningAmber className="text-orange-400/60" size={13} />, text: 'Withdrawal requests are reviewed and accepted by admin.' },
        ].map((item) => (
          <div key={item.text} className="flex items-start gap-2">
            <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
            <p className="text-[11px] text-white/25 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        id="payout-submit-btn"
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 mt-3.5 rounded-xl text-xs font-bold text-white border-none cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #7F25FB 0%, #CB3CFF 100%)' }}
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            {' Processing…'}
          </span>
        ) : 'Submit Withdrawal Request'}
      </button>
    </div>
  );
}

WithdrawFunds.propTypes = {
  maxAmount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func,
};

WithdrawFunds.defaultProps = {
  onSuccess: null,
};
