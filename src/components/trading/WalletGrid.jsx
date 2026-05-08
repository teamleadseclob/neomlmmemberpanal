import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getbalence } from '../../config/apiService';
import AnimatedAmount from '../common/AnimatedAmount';
import rewardImg from '../../assets/capital/reward.png';
import profitImg  from '../../assets/capital/profit.png';
import multiImg   from '../../assets/capital/multylevekl.png';
import swpImg     from '../../assets/capital/swp.png';
import incomeImg  from '../../assets/capital/income.png';

const BADGE_STYLES = {
  live:     'bg-green-500/20 text-green-400 border-green-500/30',
  positive: 'bg-green-500/20 text-green-400 border-green-500/30',
  notice:   'bg-red-500/20 text-red-400 border-red-500/30',
};

function buildWallets(data) {
  return [
    {
      id:          'main',
      label:       'Main Wallet',
      amount:      data?.walletBalance ?? 0,
      badge:       { text: 'LIVE', type: 'live' },
      hasWithdraw: true,
      icon:        <img src={incomeImg} alt="main" className="w-5 h-5 object-contain" />,
    },
    {
      id:             'reward',
      label:          'Reward Wallet Total',
      amount:         data?.roiAndMlrCombined?.gross ?? 0,
      cutOff:         data?.roiAndMlrCombined?.cutoff ?? 0,
      walletAmount:   data?.roiAndMlrCombined?.net ?? 0,
      hasViewHistory: true,
      historyRoute:   '/trading-capital/reward-history',
      icon:           <img src={rewardImg} alt="reward" className="w-5 h-5 object-contain" />,
    },
    {
      id:             'profit',
      label:          'Trading Profit',
      amount:         data?.roi?.gross ?? 0,
      cutOff:         data?.roi?.cutoff ?? 0,
      walletAmount:   data?.roi?.net ?? 0,
      hasViewHistory: true,
      historyRoute:   '/trading-capital/trading-history',
      icon:           <img src={profitImg} alt="profit" className="w-5 h-5 object-contain" />,
    },
    {
      id:             'multilevel',
      label:          'Multilevel Rewards',
      amount:         data?.mlr?.gross ?? 0,
      cutOff:         data?.mlr?.cutoff ?? 0,
      walletAmount:   data?.mlr?.net ?? 0,
      hasViewHistory: true,
      historyRoute:   '/trading-capital/multilevel-history',
      icon:           <img src={multiImg} alt="multilevel" className="w-5 h-5 object-contain" />,
    },
    {
      id:             'cashback',
      label:          'SWP Cashback',
      amount:         data?.referral?.gross ?? 0,
      cutOff:         data?.referral?.cutoff ?? 0,
      walletAmount:   data?.referral?.net ?? 0,
      hasViewHistory: true,
      historyRoute:   '/trading-capital/referral-commission-history',
      icon:           <img src={swpImg} alt="cashback" className="w-5 h-5 object-contain" />,
    },
    {
      id:           'total',
      label:        'Total Income',
      amount:       data?.totalEarnings?.gross ?? 0,
      cutOff:       data?.totalEarnings?.cutoff ?? 0,
      walletAmount: data?.totalEarnings?.net ?? 0,
      badge:        { text: 'NOTICE', type: 'notice' },
      notice:       '5% admin charge on transfers',
      icon:         <img src={incomeImg} alt="total" className="w-5 h-5 object-contain" />,
    },
  ];
}

function WalletItem({ wallet }) {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-xl border border-[#1e1e3a] bg-[#181F3066] p-4 md:p-5 transition-all duration-200 hover:border-purple-500/30 overflow-hidden">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 bg-[#A6E6FF1A]">
          {wallet.icon}
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile: always visible history button */}
          {wallet.hasViewHistory && (
            <button
              type="button"
              onClick={() => navigate(wallet.historyRoute)}
              className="md:hidden flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border border-purple-500/30 text-purple-400 bg-purple-500/10 cursor-pointer"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              History
            </button>
          )}
          {wallet.badge && (
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${BADGE_STYLES[wallet.badge.type]}`}>
                {wallet.badge.text}
              </span>
              {wallet.notice && (
                <span className="text-[9px] text-gray-500">{wallet.notice}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Label */}
      <p className="text-xs text-gray-400 mb-1">{wallet.label}</p>

      {/* Amount */}
      <AnimatedAmount
        value={wallet.amount}
        className="text-2xl md:text-3xl font-bold text-white mb-3 transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#CB3CFF] group-hover:to-[#7F25FB] group-hover:bg-clip-text group-hover:text-transparent"
      />

      {/* Withdraw button */}
      {wallet.hasWithdraw && (
        <button
          type="button"
          onClick={() => navigate('/payout')}
          className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide
                     bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                     hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        >
          WITHDRAW
        </button>
      )}

      {/* Cut off / Wallet Amount */}
      {!wallet.hasWithdraw && wallet.cutOff !== undefined && (
        <div className="flex items-center justify-between pt-2 border-t border-[#1e1e3a]">
          <div>
            <p className="text-[10px] text-gray-500 mb-0.5">Cut off</p>
            <AnimatedAmount value={wallet.cutOff} className="text-sm font-semibold text-white" />
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 mb-0.5">Wallet Amount</p>
            <AnimatedAmount value={wallet.walletAmount} className="text-sm font-semibold text-white" />
          </div>
        </div>
      )}

      {/* Hover: View History */}
      {wallet.hasViewHistory && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0920]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={() => navigate(wallet.historyRoute)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide
                       border border-purple-500/50 text-purple-300 bg-purple-500/15
                       hover:bg-purple-500/30 transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            View History
          </button>
        </div>
      )}
    </div>
  );
}

WalletItem.propTypes = {
  wallet: PropTypes.shape({
    id:             PropTypes.string.isRequired,
    label:          PropTypes.string.isRequired,
    amount:         PropTypes.number.isRequired,
    badge:          PropTypes.shape({ text: PropTypes.string.isRequired, type: PropTypes.string.isRequired }),
    notice:         PropTypes.string,
    hasWithdraw:    PropTypes.bool,
    hasViewHistory: PropTypes.bool,
    historyRoute:   PropTypes.string,
    cutOff:         PropTypes.number,
    walletAmount:   PropTypes.number,
    icon:           PropTypes.node.isRequired,
  }).isRequired,
};

function WalletGrid() {
  const [data, setData] = useState(null);

  const fetchBalance = useCallback(async () => {
    try {
      const res = await getbalence();
      setData(res.data);
    } catch {
      setData(null);
    }
  }, []);

  useEffect(() => { fetchBalance(); }, [fetchBalance]);

  const wallets = buildWallets(data);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Wallets</h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0d0b2e]/80 text-gray-300 border border-[#1e1e3a]">
          <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          5% Admin Charge Applies
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((wallet) => (
          <WalletItem key={wallet.id} wallet={wallet} />
        ))}
      </div>
    </div>
  );
}

export default WalletGrid;
