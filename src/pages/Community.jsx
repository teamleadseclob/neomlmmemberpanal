import { useState } from 'react';
import {
  CommunityHeader,
  CommunityStats,
  TreeControls,
  SponsorTree,
  ReferralsTable,
} from '../components/community';

function Community() {
  const [activeTab, setActiveTab] = useState('Sponsor Tree');

  return (
    <div className="max-w-screen mx-auto">
      <CommunityHeader />
      <CommunityStats />
      <TreeControls activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'Referrals' ? <ReferralsTable /> : <SponsorTree />}
    </div>
  );
}

export default Community;
