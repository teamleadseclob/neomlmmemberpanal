import React from 'react';
import PropTypes from 'prop-types';
import tickets from "../../assets/support/tickets.png";
import active from "../../assets/support/active.png";
import resolved from "../../assets/support/resolved.png";

const STAT_CONFIG = [
  {
    key: 'total',
    label: 'Total Tickets',
    iconBg: 'bg-[#1E293B]',
    icon:tickets
  },
  {
    key: 'open',
    label: 'Active / Open',
    iconBg: 'bg-[#10B9811A]',
    icon: active
  },
  {
    key: 'resolved',
    label: 'Resolved',
    iconBg: 'bg-[#3B82F61A]',
    icon: resolved
  },
];

function TicketStats({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {STAT_CONFIG.map((stat) => (
        <div key={stat.key} className="rounded-2xl p-5" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
          <div className={`w-9 h-9 rounded-lg ${stat.iconBg} flex items-center justify-center mb-3`}>
            <img src={stat.icon} className='w-4' alt={stat.label} />
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-white">
            {summary ? String(summary[stat.key] ?? 0).padStart(2, '0') : '--'}
          </p>
        </div>
      ))}
    </div>
  );
}

TicketStats.propTypes = {
  summary: PropTypes.shape({
    total: PropTypes.number,
    open: PropTypes.number,
    inProgress: PropTypes.number,
    resolved: PropTypes.number,
    closed: PropTypes.number,
  }),
}

export default TicketStats;
