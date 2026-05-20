import { useEffect, useState, useContext } from 'react';
import { getnetworkstats } from '../../config/apiService';
import AuthContext from '../../context/AuthContext';

function CommunityStats() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;
    getnetworkstats(user.userId)
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, [user?.userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 cursor-default">
      {/* Total Community */}
      <div className="rounded-xl p-4 hover:border-purple-600/30 transition-all duration-200" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Total Community</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {stats ? stats.totalDownline.toLocaleString() : '—'}
          </span>
        </div>
      </div>

      {/* Direct Referrals */}
      <div className="rounded-xl p-4 hover:border-purple-600/30 transition-all duration-200" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Direct Referrals</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {stats ? stats.directReferrals.toLocaleString() : '—'}
          </span>
        </div>
      </div>

      <div className="rounded-xl p-4 hover:border-purple-600/30 transition-all duration-200" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Team SWP Volume</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {stats ? stats.teamSwpVolume.toLocaleString() : '—'}
          </span>
        </div>
      </div>

      <div className="rounded-xl p-4 hover:border-purple-600/30 transition-all duration-200" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Team Investment Volume</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {stats ? stats.teamInvestmentVolume.toLocaleString() : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommunityStats;
