import {
  TradingHeader,
  CapitalOverview,
  WalletGrid,
  InviteBanner,
} from '../components/trading';

function TradingCapital() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Page header */}
      <TradingHeader />

      {/* Capital overview with Referral multiplier */}
      <CapitalOverview />

      {/* Wallets grid */}
      <WalletGrid />

      {/* Invite banner */}
      <InviteBanner />
    </div>
  );
}

export default TradingCapital;
