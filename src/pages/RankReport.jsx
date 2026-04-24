import {
  RankHeader,
  TopStatsRow,
  TierBenefitsBanner,
  PlatinumRequirements,
  AchievementHistory,
  MilestoneBonus,
  BenefitComparison,
} from '../components/rank';

function RankReport() {
  return (
    <div className="max-w-screen mx-auto">
      {/* Page header */}
      <RankHeader />

      {/* Top stats: Achievement, Team Size, Ranking */}
      <TopStatsRow />

      {/* Platinum tier benefits banner */}
      <TierBenefitsBanner />

      {/* Middle row: Requirements + Achievement History + Milestone */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-3">
          <PlatinumRequirements />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AchievementHistory />
          <MilestoneBonus />
        </div>
      </div>

      {/* Rank benefit comparison table */}
      <BenefitComparison />
    </div>
  );
}

export default RankReport;
