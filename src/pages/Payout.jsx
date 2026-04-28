import {
  WalletBalance,
  PendingRequests,
  WithdrawFunds,
  WithdrawalHistory,
  SecurityFooter,
} from '../components/payout';

/* ── Sample data (replace with API data) ─────────────────────────── */
const PENDING = [
  { id: '#TRX-88210', amount: 1250, timeAgo: '2h ago' },
];

const HISTORY = [
  { id: 1, date: 'Oct 24, 2023', time: '14:22 PM', txid: '...88210', amount: 1250, method: 'USDT', status: 'Pending' },
  { id: 2, date: 'Oct 20, 2023', time: '09:10 AM', txid: '...77391', amount: 4000, method: 'USDT', status: 'Success' },
  { id: 3, date: 'Oct 15, 2023', time: '18:45 PM', txid: '...55281', amount: 800,  method: 'USDT', status: 'Pending' },
  { id: 4, date: 'Oct 02, 2023', time: '11:05 AM', txid: '...22194', amount: 2100, method: 'USDT', status: 'Success' },
];

export default function Payout() {
  const handleWithdraw = (data) => {
    // TODO: integrate with withdrawal API
    console.log('Withdrawal request:', data);
  };

  return (
    <div className="max-w-screen mx-auto">
      {/* ── Page Header ──────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Payout</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your ascension and unlock premium tier benefits.
        </p>
      </div>

      {/* ── Top Row: Wallet Balance + Pending Requests ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <WalletBalance
            balance={12845.50}
            availableForWithdrawal={11200.00}
            totalPaidOut={45600.00}
          />
        </div>
        <div className="lg:col-span-2">
          <PendingRequests
            requests={PENDING}
            queueCount={1}
          />
        </div>
      </div>

      {/* ── Bottom Row: Withdraw Form + History ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-2">
          <WithdrawFunds
            maxAmount={11200.00}
            onSubmit={handleWithdraw}
          />
        </div>
        <div className="lg:col-span-3">
          <WithdrawalHistory transactions={HISTORY} />
        </div>
      </div>

      {/* ── Security Footer ────────────────────────────── */}
      <SecurityFooter />
    </div>
  );
}
