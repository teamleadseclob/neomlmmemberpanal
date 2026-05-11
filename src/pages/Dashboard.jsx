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
import { getdashboard, gettradingcapital, getrewardlimit } from '../config/apiService';

function Dashboard() {
  const [data, setData]               = useState(null);
  const [capitalData, setCapitalData]  = useState(null);
  const [rewardLimit, setRewardLimit]  = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const [dash, cap, reward] = await Promise.all([getdashboard(), gettradingcapital(), getrewardlimit()]);
        if (!cancelled) {
          setData(dash.data);
          setCapitalData(cap.data);
          setRewardLimit(reward.data);
        }
      } catch {
        if (!cancelled) setData(null);
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="max-w-screen mx-auto">
      <WelcomeSection />
      <WalletCardsGrid data={data} />
      <TeamPerformance data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <TradingCapitalStatus data={capitalData} rewardLimit={rewardLimit} />
        </div>
        <div className="lg:col-span-2">
          <AcceleratorCard />
        </div>
      </div>
      <RevenueChart />

      <TermsSection />
      <DashboardFooter />
    </div>
  );
}

export default Dashboard;
