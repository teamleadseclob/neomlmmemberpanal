import React from 'react';
import PropTypes from 'prop-types';

const STATUS_STYLES = {
  open:        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  resolved:    'bg-green-500/20 text-green-400 border-green-500/30',
  closed:      'bg-red-500/20 text-red-400 border-red-500/30',
}

function SupportHistory({ tickets = [], loading = false }) {
  const isEmpty = tickets.length === 0;

  const content = () => {
    if (loading) return (
      <div className="flex justify-center py-10">
        <span className="w-7 h-7 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
    if (isEmpty) return (
      <p className="text-sm text-gray-500 text-center py-10">No tickets found.</p>
    );
    return (
      <>
        {/* Mobile: cards */}
        <div className="md:hidden flex flex-col gap-3">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="rounded-xl p-4 flex flex-col gap-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-white leading-snug flex-1">{ticket.subject}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Ticket ID</span>
                  <span className="text-[10px] text-white/60 font-mono">{ticket.ticketId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Category</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {ticket.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Ticket ID', 'Subject', 'Category', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-[10px] text-white/50 uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, idx) => (
                  <tr key={ticket._id} className="transition-colors hover:bg-white/5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-4 text-xs text-white/50 font-mono whitespace-nowrap">{ticket.ticketId}</td>
                    <td className="px-4 py-4 text-xs text-white/80">{ticket.subject}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </>
    );
  };

  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <h3 className="text-base font-bold text-white mb-5">Support History</h3>
      {content()}
    </div>
  );
}

SupportHistory.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    _id:      PropTypes.string.isRequired,
    ticketId: PropTypes.string.isRequired,
    subject:  PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status:   PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
}

export default SupportHistory;
