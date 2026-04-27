import PropTypes from 'prop-types';

export default function PendingRequests({ requests, queueCount }) {
  return (
    <div className="rounded-xl border border-[#1e1e3a] p-5 md:p-6 flex flex-col h-full">
      <p className="text-[10px] text-gray-500 uppercase tracking-[3px] font-semibold mb-5">
        Pending Requests
      </p>

      {requests.length > 0 ? (
        <div className="flex-1 flex flex-col">
          {requests.map((req) => (
            <div key={req.id} className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-white">{req.id}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Initiated {req.timeAgo}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-400">
                  ${req.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-yellow-500/15 text-yellow-400 border-yellow-500/30 mt-1 inline-block">
                  Pending
                </span>
              </div>
            </div>
          ))}

          <div className="border-t border-[#1e1e3a] pt-4 mt-auto">
            <p className="text-xs text-gray-500 text-center mb-2">
              {queueCount} other request{queueCount !== 1 ? 's' : ''} in queue
            </p>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 bg-transparent border-none cursor-pointer py-1"
            >
              View Queue
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-gray-500">No pending requests</p>
        </div>
      )}
    </div>
  );
}

PendingRequests.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      timeAgo: PropTypes.string.isRequired,
    })
  ).isRequired,
  queueCount: PropTypes.number.isRequired,
};
