import React from 'react';
import PropTypes from 'prop-types'

function TreeControls({ activeTab, onTabChange }) {
  const tabs = ['Sponsor Tree', 'Referrals'];

  const legendItems = [
    { color: 'bg-green-500', label: 'Active Nodes' },
    { color: 'bg-blue-500', label: 'New Clusters' },
    { color: 'border-2 border-gray-500 bg-transparent', label: 'Open Slots' },
  ];

  return (
    <div className="flex items-center justify-end gap-4 mb-6">
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 rounded-lg border border-[#1e1e3a] ">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 border-none cursor-pointer whitespace-nowrap
              ${activeTab === tab
                ? 'bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white shadow-lg shadow-purple-500/20'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1a1a3e]'}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

TreeControls.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

export default TreeControls;
