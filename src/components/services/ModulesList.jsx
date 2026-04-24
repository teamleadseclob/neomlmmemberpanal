import React from 'react';
import PropTypes from 'prop-types'

const MODULES = [
  {
    id: 'heatmap',
    badge: 'Featured',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    version: 'V4.2 LIVE',
    title: 'Market Volatility Heatmap',
    description: 'Visualize global market turbulence in real-time. Proprietary algorithms cross-reference 48 asset classes to identify non-linear risk expansion before it triggers.',
    iconBg: 'from-[#1a1a3e] to-[#0d0b2e]',
  },
  {
    id: 'simulator',
    badge: 'Utility',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    version: 'STABLE',
    title: 'Portfolio Stress Simulator',
    description: 'Run your portfolio through historical black swan events and hypothetical macro shifts to determine your true liquidation threshold.',
    iconBg: 'from-[#1a1a3e] to-[#0d0b2e]',
  },
  {
    id: 'scraper',
    badge: 'Institutional',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    version: 'BETA',
    title: 'Neural Sentiment Scraper',
    description: 'Aggregates and analyzes sentiment across 15,000+ sources including earnings calls, federal memos, and social flows to detect hidden conviction.',
    iconBg: 'from-[#1a1a3e] to-[#0d0b2e]',
  },
];

function ToolIcon({ type }) {
  if (type === 'heatmap') {
    return (
      <svg className="w-14 h-14 text-gray-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 44 L28 28 L36 36 L44 20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 48 L12 16" strokeLinecap="round" />
        <path d="M12 48 L52 48" strokeLinecap="round" />
        <circle cx="20" cy="44" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="44" cy="20" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }
  // Wrench icon for simulator and scraper
  return (
    <svg className="w-14 h-14 text-gray-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M40 14c-4 0-7.5 2.5-9 6l-14 14c-2.5 2.5-2.5 6.5 0 9s6.5 2.5 9 0l14-14c3.5-1.5 6-5 6-9 0-1-.2-2-.5-3l-5 5-4-4 5-5c-1-.3-2-.5-3-.5z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="42" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

ToolIcon.propTypes = {
  type: PropTypes.string.isRequired,
}

function ModuleCard({ module }) {
  return (
    <div
      className="rounded-xl p-5 flex gap-5 items-start transition-all duration-200 hover:border-purple-500/30"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Image/Icon area */}
      <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-[#1a1a3e] to-[#0a0920] border border-[#1e1e3a] flex items-center justify-center flex-shrink-0">
        <ToolIcon type={module.id} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Badge + Version row */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${module.badgeColor}`}>
            {module.badge}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            {module.version}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2">{module.title}</h3>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed mb-4">{module.description}</p>

        {/* Button */}
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wide
                     bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                     hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Module
        </button>
      </div>
    </div>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    badgeColor: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

function ModulesList({ modules = MODULES, loading = false }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!modules.length) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-gray-500">No results found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  )
}

ModulesList.propTypes = {
  modules: PropTypes.array,
  loading: PropTypes.bool,
}

export default ModulesList;
