import PropTypes from 'prop-types'

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
}

function SearchBar({ search, onSearch, currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">

      {/* Glass Search input */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl" style={glassStyle}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="flex-shrink-0">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search analytical tools, calculators, or datasets..."
          className="flex-1 bg-transparent outline-none text-sm placeholder-white/20 cursor-default focus:cursor-text"
          style={{ color: 'rgba(255,255,255,0.6)', caretColor: 'rgba(255,255,255,0.7)' }}
        />
      </div>

      {/* Glass Pagination */}
      <div className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl sm:flex-shrink-0" style={glassStyle}>
        <button
          type="button"
          onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer bg-transparent border-none disabled:cursor-not-allowed"
          style={{ color: currentPage === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer border-none"
            style={
              page === currentPage
                ? { background: 'linear-gradient(135deg, #7F25FB, #CB3CFF)', color: '#fff', boxShadow: '0 0 12px rgba(127,37,251,0.5)' }
                : { color: 'rgba(255,255,255,0.4)', background: 'transparent' }
            }
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer bg-transparent border-none disabled:cursor-not-allowed"
          style={{ color: currentPage === totalPages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

    </div>
  )
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default SearchBar
