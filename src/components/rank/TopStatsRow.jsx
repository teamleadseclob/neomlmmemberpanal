import React from 'react';
function CurrentAchievement() {
  const progress = 72;

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 h-full flex flex-col">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] text-green-400 uppercase tracking-[2px] font-bold mb-1">
            Current Achievement
          </p>
          <h2 className="text-4xl font-bold text-white">Gold</h2>
        </div>
        {/* Trophy icon */}
        <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
      </div>

      {/* Progress to Platinum */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-gray-400">
            Progress to <span className="text-white font-medium">Platinum</span>
          </p>
          <span className="text-lg font-bold text-white">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-500">
          <span className="text-gray-400">⊕</span> Complete 2 more direct referrals to qualify.
        </p>
      </div>
    </div>
  );
}

function TotalTeamSize() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 h-full flex flex-col">
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>

      <p className="text-xs text-gray-400 mb-1">Total Team Size</p>
      <h2 className="text-3xl font-bold text-white mb-3">1,284</h2>

      <p className="text-[11px] text-green-400 mt-auto flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
        +12% from last month
      </p>
    </div>
  );
}

function GlobalRanking() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 h-full flex flex-col">
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-3">
        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      </div>

      <p className="text-xs text-gray-400 mb-1">Global Ranking</p>
      <h2 className="text-3xl font-bold text-white mb-3">#42</h2>

      <span className="text-[10px] text-gray-400 border border-[#1e1e3a] rounded-full px-2.5 py-1 mt-auto self-start">
        Top 5% of all members
      </span>
    </div>
  );
}

function TopStatsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <CurrentAchievement />
      <TotalTeamSize />
      <GlobalRanking />
    </div>
  );
}

export default TopStatsRow;
