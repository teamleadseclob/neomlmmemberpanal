function CommunityStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 cursor-default">
      {/* Total Community */}
      <div className="rounded-xl border border-[#1e1e3a]   p-4 hover:border-purple-600/30 transition-all duration-200">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Total Community</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">1,429</span>
          <span className="text-[10px] font-semibold text-green-400">+12 today</span>
        </div>
      </div>

      {/* Active Clusters */}
      <div className="rounded-xl border border-[#1e1e3a]   p-4 hover:border-purple-600/30 transition-all duration-200">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Active Clusters</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">84</span>
          <span className="text-xs text-gray-500">94% efficiency</span>
        </div>
      </div>

      {/* Community Volume */}
      <div className="rounded-xl border border-[#1e1e3a]   p-4 hover:border-purple-600/30 transition-all duration-200">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Community Volume</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">$124.5k</span>
          <span className="text-xs text-gray-500">USDT</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-[#1e1e3a]   p-4 hover:border-purple-600/30 transition-all duration-200">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2">Recent Activity</p>
        <div className="flex items-center gap-0">
          {/* Stacked avatars */}
          {['#7F25FB', '#D946EF', '#CB3CFF'].map((color, i) => (
            <div
              key={`avatar-${color}`}
              className="w-8 h-8 rounded-full border-2 border-[#0d0b2e] flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: color, marginLeft: i > 0 ? '-8px' : '0', zIndex: 3 - i }}
            >
              {['DA', 'NV', 'AL'][i]}
            </div>
          ))}
          <span
            className="w-8 h-8 rounded-full border-2 border-[#0d0b2e] bg-[#1a1a3e] flex items-center justify-center text-[10px] font-semibold text-gray-400"
            style={{ marginLeft: '-8px' }}
          >
            +13
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommunityStats;
