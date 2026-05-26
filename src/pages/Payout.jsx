import { useState, useRef, useCallback } from 'react';
import {
  WalletBalance,
  PendingRequests,
  WithdrawFunds,
  WithdrawalHistory,
  SecurityFooter,
} from '../components/payout';

export default function Payout() {
  const [walletData, setWalletData] = useState({ balance: 0, availableForWithdrawal: 0, totalPaidOut: 0 });
  const [pendingTxs, setPendingTxs] = useState([]);
  const historyRefresh = useRef(null);
  const handleWithdrawSuccess = useCallback(() => historyRefresh.current?.(), []);

  return (
    <div className="max-w-screen mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Payout</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your ascension and unlock premium tier benefits.
        </p>
      </div>

      {/* Top row — wallet balance + pending */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <WalletBalance
            balance={walletData.balance}
            availableForWithdrawal={walletData.availableForWithdrawal}
            totalPaidOut={walletData.totalPaidOut}
          />
        </div>
        <div className="lg:col-span-2 max-h-[20px]:">
          <PendingRequests requests={pendingTxs} />
        </div>
      </div>

      {/* Bottom row — withdraw + history */}
      <div className="grid grid-cols-12 gap-8 mb-6 items-stretch">
        <div className="col-span-12 lg:col-span-5 h-full">
          <WithdrawFunds maxAmount={walletData.availableForWithdrawal} onSuccess={handleWithdrawSuccess} />
        </div>

        <div className="col-span-12 lg:col-span-7">
          <WithdrawalHistory onWalletData={setWalletData} onPendingData={setPendingTxs} onRefreshRef={historyRefresh} />
        </div>
      </div>

      <SecurityFooter />
    </div>
  );
}
