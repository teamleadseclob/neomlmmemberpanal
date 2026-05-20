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
import { getdashboard, gettradingcapital, getrewardlimit, getprofile } from '../config/apiService';

function Dashboard() {
  const [data, setData]               = useState(null);
  const [capitalData, setCapitalData]  = useState(null);
  const [rewardLimit, setRewardLimit]  = useState(null);
  const [totalInvested, setTotalInvested]    = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const [dash, cap, reward, profile] = await Promise.all([getdashboard(), gettradingcapital(), getrewardlimit(), getprofile()]);
        if (!cancelled) {
          setData(dash.data);
          setCapitalData(cap.data);
          setRewardLimit(reward.data);
          setTotalInvested(profile?.data?.totalInvested ?? 0);
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
      <TeamPerformance data={data} totalInvested={totalInvested} />

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
