import PropTypes from 'prop-types';

function Pagination({ page, totalPages, total, pageSize, setPage }) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#1e1e3a] bg-[#0f0f1e]">
      <p className="text-xs text-gray-500">
        {`Showing `}<span className="text-white font-semibold">{from}</span>{`–`}<span className="text-white font-semibold">{to}</span>{` of `}<span className="text-white font-semibold">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="w-8 h-8 rounded-lg border border-[#2a2a4a] bg-transparent text-gray-400
                     hover:border-purple-500/50 hover:text-white transition-all
                     disabled:opacity-30 disabled:cursor-not-allowed
                     flex items-center justify-center cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all cursor-pointer
              ${p === page
                ? 'bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white border-transparent shadow-lg shadow-purple-500/20'
                : 'border-[#2a2a4a] bg-transparent text-gray-400 hover:border-purple-500/50 hover:text-white'}`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 rounded-lg border border-[#2a2a4a] bg-transparent text-gray-400
                     hover:border-purple-500/50 hover:text-white transition-all
                     disabled:opacity-30 disabled:cursor-not-allowed
                     flex items-center justify-center cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page:      PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  total:     PropTypes.number.isRequired,
  pageSize:  PropTypes.number.isRequired,
  setPage:   PropTypes.func.isRequired,
};

export default Pagination;
