import { useState } from 'react';
import {
  WalletBalance,
  PendingRequests,
  WithdrawFunds,
  WithdrawalHistory,
  SecurityFooter,
} from '../components/payout';

export default function Payout() {
  const [walletData, setWalletData]   = useState({ balance: 0, availableForWithdrawal: 0, totalPaidOut: 0 });
  const [pendingTxs, setPendingTxs]   = useState([]);

  const handleWithdraw = (data) => {
    console.log('Withdrawal request:', data);
  };

  return (
    <div className="max-w-screen mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Payout</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your ascension and unlock premium tier benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <WalletBalance
            balance={walletData.balance}
            availableForWithdrawal={walletData.availableForWithdrawal}
            totalPaidOut={walletData.totalPaidOut}
          />
        </div>
        <div className="lg:col-span-2">
          <PendingRequests requests={pendingTxs} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-2">
          <WithdrawFunds maxAmount={walletData.availableForWithdrawal} onSubmit={handleWithdraw} />
        </div>
        <div className="lg:col-span-3">
          <WithdrawalHistory onWalletData={setWalletData} onPendingData={setPendingTxs} />
        </div>
      </div>

      <SecurityFooter />
    </div>
  );
}
