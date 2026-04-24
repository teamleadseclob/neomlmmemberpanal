import React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types'

const EyeOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeClosedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10 10 0 0 1 12 20C5 20 1 12 1 12a18 18 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

export default function InputField({ label, type, placeholder, value, onChange }) {
  const [showPw, setShowPw] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPw ? 'text' : type

  return (
    <div className="mb-5">
      <label className="block text-white text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/25 outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_0_3px_rgba(147,51,234,0.15)] caret-purple-400 cursor-default focus:cursor-text"
          style={{
            paddingRight: isPassword ? '48px' : undefined,
            WebkitBoxShadow: '0 0 0px 1000px rgba(255,255,255,0.0) inset',
            WebkitTextFillColor: '#ffffff',
            caretColor: '#a855f7',
            transition: 'background-color 5000s ease-in-out 0s',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors p-1 cursor-pointer bg-transparent border-none"
          >
            {showPw ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
}
