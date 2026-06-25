import React from 'react';

const TAB_DATA = {
  contest: {
    badge: 'Contest Updates',
    title: 'NEOFI Contest',
    description: 'Rise above the competition and unlock a world of opportunity with exclusive rewards and elite recognition.',
    btnText: 'Join Contest',
  },
  learning: {
    badge: 'Learning Updates',
    title: 'NEOFI Learning Hub',
    description: 'Unlock your potential through powerful learning resources designed for growth and success.',
    btnText: 'Explore Resources',
  },
  tools: {
    badge: 'Tools Updates',
    title: 'NEOFI Tools Hub',
    description: 'Empower your business growth with ready-to-use marketing and presentation assets.',
    btnText: 'Explore Tools',
  },
};

function HeroBanner({ activeTab }) {
  const data = TAB_DATA[activeTab] || TAB_DATA.learning;

  return (
    <div className="relative rounded-xl border border-[#1e1e3a] overflow-hidden mb-6">
      <div className="relative z-10 p-6 md:p-8">
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#8A2BE233] text-[#DCB8FF] border border-[#8A2BE266] mb-4">
          {data.badge}
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{data.title}</h2>

        <p className="text-sm text-gray-400 mb-6 max-w-lg leading-relaxed">
          {data.description}
        </p>

        <button
          type="button"
          className="px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide inline-flex items-center gap-2
                     bg-[#8A2BE2] text-white hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        >
          {data.btnText}
        </button>
      </div>
    </div>
  );
}

export default HeroBanner;
