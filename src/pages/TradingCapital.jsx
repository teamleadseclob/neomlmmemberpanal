import { useEffect, useState } from 'react';
import {
  TradingHeader,
  CapitalOverview,
  WalletGrid,
  InviteBanner,
} from '../components/trading';
import { gettradingcapital } from '../config/apiService';

function TradingCapital() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gettradingcapital()
        setData(response?.data)
      } catch {
        setData(null)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="max-w-screen mx-auto">
      {/* Page header */}
      <TradingHeader />

      {/* Capital overview with Referral multiplier */}
      <CapitalOverview data={data} />

      {/* Wallets grid */}
      <WalletGrid />

      {/* Invite banner */}
      <InviteBanner />
    </div>
  );
}

export default TradingCapital;
