import { useState, useEffect } from 'react';
import { ReferralHeader, InviteLab } from '../components/referral';
import { getprofile } from '../config/apiService';

function ReferralHub() {
  const [directReferralEarnings, setDirectReferralEarnings] = useState(0);

  useEffect(() => {
    getprofile()
      .then((res) => setDirectReferralEarnings(res?.data?.directReferralEarnings ?? 0))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-screen mx-auto">
      <ReferralHeader />
      <div className="mb-6">
        <InviteLab directReferralEarnings={directReferralEarnings} />
      </div>
      {/* <ReferralStatsGrid /> */}
    </div>
  );
}

export default ReferralHub;
