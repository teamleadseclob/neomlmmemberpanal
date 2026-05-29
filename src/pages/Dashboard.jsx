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
import { getdashboard, gettradingcapital, getrewardlimit, getprofile, getrewardwallet } from '../config/apiService';

function Dashboard() {
  const [data, setData]               = useState(null);
  const [capitalData, setCapitalData]  = useState(null);
  const [rewardLimit, setRewardLimit]  = useState(null);
  const [totalInvested, setTotalInvested]    = useState(0);
  const [rewardWallet, setRewardWallet] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const [dash, cap, reward, profile, rw] = await Promise.all([getdashboard(), gettradingcapital(), getrewardlimit(), getprofile(), getrewardwallet()]);
        if (!cancelled) {
          setData(dash.data);
          setCapitalData(cap.data);
          setRewardLimit(reward.data);
          setTotalInvested(profile?.data?.totalInvested ?? 0);
          setRewardWallet(rw?.data ?? null);
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
      <WalletCardsGrid data={data} rewardWallet={rewardWallet} />
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
