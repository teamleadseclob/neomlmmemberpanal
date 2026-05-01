import {
  ReferralHeader,
  InviteLab,
} from '../components/referral';

function ReferralHub() {
  return (
    <div className="max-w-screen mx-auto">
      <ReferralHeader />
      <div className="mb-6">
        <InviteLab />
      </div>
      {/* <ReferralStatsGrid /> */}
    </div>
  );
}

export default ReferralHub;
