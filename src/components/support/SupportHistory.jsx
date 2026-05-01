import React from 'react';
import PropTypes from 'prop-types';

const STATUS_STYLES = {
  open:        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  resolved:    'bg-green-500/20 text-green-400 border-green-500/30',
  closed:      'bg-red-500/20 text-red-400 border-red-500/30',
}

function SupportHistory({ tickets = [], loading = false }) {
  return (
    <div className="rounded-xl border border-[#1e1e3a] p-5 md:p-6">
      <h3 className="text-base font-bold text-white mb-5">Support History</h3>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="w-7 h-7 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : !tickets.length ? (
        <p className="text-sm text-gray-500 text-center py-10">No tickets found.</p>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#1e1e3a] scrollbar-track-transparent">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e1e3a]">
                <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Ticket ID</th>
                <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Subject</th>
                <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Category</th>
                <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                  <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">{ticket.ticketId}</td>
                  <td className="px-4 py-4 text-xs text-white">{ticket.subject}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

SupportHistory.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ticketId: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
}

export default SupportHistory;
