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

export default function RegisterInput({ id, name, label, type, placeholder, value, onChange, readOnly, autoComplete }) {
  const [showPw, setShowPw] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPw ? 'text' : type

  return (
    <div className="mb-1">
      <label htmlFor={id} className="block text-white text-sm font-semibold mb-2">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          autoComplete={autoComplete}
          className={`w-full border rounded-xl px-4 py-[14px] lg:py-[16px] text-sm lg:text-base placeholder-white/25 outline-none transition-all duration-200 block
            ${readOnly
              ? 'bg-white/3 border-white/5 text-white/40 cursor-not-allowed select-none'
              : 'bg-white/5 border-white/10 text-white focus:border-purple-500/60 focus:shadow-[0_0_0_3px_rgba(147,51,234,0.15)] caret-purple-400 cursor-default focus:cursor-text'}`}
          style={{            WebkitBoxShadow: '0 0 0px 1000px rgba(255,255,255,0.0) inset',
            WebkitTextFillColor: '#ffffff',
            caretColor: '#a855f7',
            transition: 'background-color 5000s ease-in-out 0s', paddingRight: isPassword ? '48px' : undefined }}
        />
        {readOnly && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </span>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors p-1 cursor-pointer bg-transparent border-none"
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
    </div>
  )
}

RegisterInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.string,
}

RegisterInput.defaultProps = {
  type: 'text',
  placeholder: '',
  readOnly: false,
  autoComplete: 'off',
}
