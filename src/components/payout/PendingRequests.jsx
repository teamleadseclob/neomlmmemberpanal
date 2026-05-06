import PropTypes from 'prop-types';

export default function PendingRequests({ requests }) {
  return (
    <div className="rounded-xl p-5 md:p-6 flex flex-col h-full" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <p className="text-[10px] text-gray-500 uppercase tracking-[3px] font-semibold mb-5">
        Pending Requests
      </p>

      {requests.length > 0 ? (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          {requests.map((req) => (
            <div key={req._id} className="flex items-start justify-between p-3 rounded-lg border border-[#1e1e3a] bg-[#0f0f1e]/60">
              <div>
                <p className="text-xs font-bold text-white font-mono">
                  {req._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </p>
                {req.walletAddress && (
                  <p className="text-[10px] text-gray-600 font-mono mt-0.5">
                    {`${req.walletAddress.slice(0, 6)}...${req.walletAddress.slice(-4)}`}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">
                  ${req.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-yellow-500/15 text-yellow-400 border-yellow-500/30 mt-1 inline-block">
                  Pending
                </span>
              </div>
            </div>
          ))}
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
      _id:           PropTypes.string.isRequired,
      amount:        PropTypes.number.isRequired,
      walletAddress: PropTypes.string,
      createdAt:     PropTypes.string.isRequired,
    })
  ).isRequired,
};
