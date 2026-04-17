import { useState } from 'react';
import {
  CommunityHeader,
  CommunityStats,
  TreeControls,
  SponsorTree,
} from '../components/community';

function Community() {
  const [activeTab, setActiveTab] = useState('Sponsor Tree');

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Page title */}
      <CommunityHeader />

      {/* Stat cards row */}
      <CommunityStats />

      {/* Legend + tabs */}
      <TreeControls activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tree visualization */}
      <SponsorTree />
    </div>
  );
}

export default Community;
