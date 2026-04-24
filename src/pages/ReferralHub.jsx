import React from 'react';
import {
  ReferralHeader,
  InviteLab,
  KineticLimitUnlock,
  ReferralStatsGrid,
} from '../components/referral';

function ReferralHub() {
  return (
    <div className="max-w-screen mx-auto">
      {/* Page header with title + action buttons */}
      <ReferralHeader />

      {/* Invite Lab + Kinetic Limit row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3">
          <InviteLab />
        </div>
        <div className="lg:col-span-2">
          <KineticLimitUnlock />
        </div>
      </div>

      {/* Stats grid */}
      <ReferralStatsGrid />
    </div>
  );
}

export default ReferralHub;
