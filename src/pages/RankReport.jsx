import { useEffect, useState } from 'react';
import {
  RankHeader,
  TopStatsRow,
  TierBenefitsBanner,
  PlatinumRequirements,
  AchievementHistory,
  MilestoneBonus,
  BenefitComparison,
} from '../components/rank';
import { getrankstatus } from '../config/apiService';

function RankReport() {
  const [rankData, setRankData] = useState(null);

  useEffect(() => {
    getrankstatus()
      .then((res) => setRankData(res.data))
      .catch(() => {});
  }, []);

  // next unachieved rank
  const nextRank = rankData?.ranks?.find((r) => !r.isAchieved) ?? null;
  // achieved ranks sorted latest first
  const achievedRanks = rankData?.ranks?.filter((r) => r.isAchieved).reverse() ?? [];

  return (
    <div className="max-w-screen mx-auto">
      <RankHeader />
      <TopStatsRow currentRank={rankData?.currentRank} nextRank={nextRank} />
      <TierBenefitsBanner nextRank={nextRank} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-3">
          <PlatinumRequirements nextRank={nextRank} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AchievementHistory achievedRanks={achievedRanks} />
          <MilestoneBonus nextRank={nextRank} />
        </div>
      </div>

      <BenefitComparison ranks={rankData?.ranks ?? []} currentRank={rankData?.currentRank} />
    </div>
  );
}

export default RankReport;
