import React from 'react';
const TICKETS = [
  {
    id: '#WS-9281',
    subject: 'Delay in ETH Withdrawal',
    category: 'Payout',
    categoryColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    status: 'In Progress',
    statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    action: 'Reply',
  },
  {
    id: '#WS-8102',
    subject: 'API Key Verification Error',
    category: 'Technical',
    categoryColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    status: 'Resolved',
    statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    action: 'View',
  },
  {
    id: '#WS-7742',
    subject: 'Referral Reward Missing',
    category: 'Rewards',
    categoryColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    status: 'Closed',
    statusColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    action: 'View',
  },
];

function SupportHistory() {
  return (
    <div className="rounded-xl border border-[#1e1e3a]  p-5 md:p-6">
      <h3 className="text-base font-bold text-white mb-5">Support History</h3>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#1e1e3a] scrollbar-track-transparent">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Ticket ID</th>
              <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Subject</th>
              <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Category</th>
              <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Status</th>
              <th className="px-4 py-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {TICKETS.map((ticket) => (
              <tr key={ticket.id} className="border-b border-[#1e1e3a] last:border-b-0 hover:bg-[#1a1a3e]/40 transition-colors">
                <td className="px-4 whitespace-nowrap py-4 text-xs text-gray-400 whitespace-nowrap">{ticket.id}</td>
                <td className="px-4 whitespace-nowrap py-4 text-xs text-white">{ticket.subject}</td>
                <td className="px-4 whitespace-nowrap py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${ticket.categoryColor}`}>
                    {ticket.category}
                  </span>
                </td>
                <td className="px-4 whitespace-nowrap py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${ticket.statusColor}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 whitespace-nowrap py-4">
                  <button
                    type="button"
                    className="text-xs text-purple-400 font-semibold hover:text-purple-300 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    {ticket.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupportHistory;
