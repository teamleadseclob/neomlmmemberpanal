import {
  WelcomeSection,
  WalletCardsGrid,
  RevenueChart,
  TeamPerformance,
  TradingCapitalStatus,
  AcceleratorCard,
  TermsSection,
  DashboardFooter,
} from '../components/dashboard';

function Dashboard() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Welcome banner */}
      <WelcomeSection />

      {/* Wallet cards grid */}
      <WalletCardsGrid />

      {/* Revenue chart */}
      <RevenueChart />

      {/* Team performance metrics */}
      <TeamPerformance />

      {/* Trading Capital + Accelerator row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <TradingCapitalStatus />
        </div>
        <div className="lg:col-span-2">
          <AcceleratorCard />
        </div>
      </div>

      {/* Terms & conditions */}
      <TermsSection />

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
}

export default Dashboard;
