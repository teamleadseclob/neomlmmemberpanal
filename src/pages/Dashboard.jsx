import { useState, useEffect, useCallback } from 'react';
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
import { getdashboard, gettradingcapital } from '../config/apiService';

function Dashboard() {
  const [data, setData]               = useState(null);
  const [capitalData, setCapitalData]  = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      const [dash, cap] = await Promise.all([getdashboard(), gettradingcapital()]);
      setData(dash.data);
      setCapitalData(cap.data);
    } catch {
      setData(null);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <div className="max-w-screen mx-auto">
      <WelcomeSection />
      <WalletCardsGrid data={data} />
      <RevenueChart />
      <TeamPerformance data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <TradingCapitalStatus data={capitalData} />
        </div>
        <div className="lg:col-span-2">
          <AcceleratorCard />
        </div>
      </div>

      <TermsSection />
      <DashboardFooter />
    </div>
  );
}

export default Dashboard;
