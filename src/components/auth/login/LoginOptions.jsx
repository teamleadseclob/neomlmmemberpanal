import React from 'react';
import PropTypes from 'prop-types'

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3" />
  </svg>
)

export default function LoginOptions({ remember, onRememberChange }) {
  const checkboxClass = remember
    ? 'bg-gradient-to-br from-purple-600 to-purple-500 border-transparent shadow-[0_0_10px_rgba(147,51,234,0.4)]'
    : 'bg-white/5 border-purple-400/40'

  return (
    <div className="flex items-center justify-between mt-1 mb-6">
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input type="checkbox" checked={remember} onChange={onRememberChange} className="hidden" />
        <span className={`w-5 h-5 rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${checkboxClass}`}>
          {remember && <CheckIcon />}
        </span>
        <span className="text-white/70 text-sm font-medium">Remember Me</span>
      </label>
      <button type="button" className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors cursor-pointer bg-transparent border-none">
        Forgot Password?
      </button>
    </div>
  )
}

LoginOptions.propTypes = {
  remember: PropTypes.bool.isRequired,
  onRememberChange: PropTypes.func.isRequired,
}
