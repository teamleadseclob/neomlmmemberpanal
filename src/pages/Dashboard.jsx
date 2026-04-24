import { useState, useEffect } from 'react';
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
import { getdashboard } from '../config/apiService';

function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getdashboard()
        setData(res.data)
      } catch {
        setData(null)
      }
    }
    fetchDashboard()
  }, [])

  return (
    <div className="max-w-screen mx-auto">
      <WelcomeSection />
      <WalletCardsGrid data={data} />
      <RevenueChart />
      <TeamPerformance data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <TradingCapitalStatus data={data} />
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
