import React from 'react';
const ACHIEVEMENTS = [
  {
    rank: 'Gold Rank',
    date: 'Achieved on Oct 14, 2023',
    reward: 'REWARD: $5,000 BONUS',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  {
    rank: 'Silver Rank',
    date: 'Achieved on Aug 02, 2023',
    reward: 'REWARD: $2,000 BONUS',
    color: 'text-gray-300',
    bgColor: 'bg-gray-400/20',
  },
  {
    rank: 'Bronze Rank',
    date: 'Achieved on May 12, 2023',
    reward: 'REWARD: $500 BONUS',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
];

function AchievementHistory() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-5 md:p-6">
      <h3 className="text-base font-bold text-white mb-5">Achievement History</h3>

      <div className="flex flex-col gap-4">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.rank} className="flex items-start gap-3">
            {/* Medal icon */}
            <div className={`w-8 h-8 rounded-full ${a.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <svg className={`w-4 h-4 ${a.color}`} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.17a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
              </svg>
            </div>

            <div>
              <p className={`text-sm font-bold ${a.color}`}>{a.rank}</p>
              <p className="text-xs text-gray-400">{a.date}</p>
              <p className="text-[10px] text-yellow-500 uppercase tracking-wider font-semibold mt-0.5">
                {a.reward}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementHistory;
