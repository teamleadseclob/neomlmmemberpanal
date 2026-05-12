import { useState } from 'react';
import PropTypes from 'prop-types';

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10 10 0 0 1 12 20C5 20 1 12 1 12a18 18 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function PwInput({ label, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">{label}</p>
      <div className={`flex items-center border-b transition-colors ${error ? 'border-red-500/60' : 'border-[#2a2a4a] focus-within:border-purple-500'}`}>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="flex-1 bg-transparent text-white text-base pb-1.5 outline-none placeholder-gray-600"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="text-gray-500 hover:text-gray-300 bg-transparent border-none cursor-pointer pb-1"
        >
          {show ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  );
}

PwInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
PwInput.defaultProps = { error: '' };

export default function ProfilePasswordFields({ editing, password, confirmPassword, onPasswordChange, onConfirmChange, errors }) {
  if (!editing) {
    return (
      <>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Password</p>
          <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5 tracking-widest">••••••••••</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Re-Enter Password</p>
          <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5 tracking-widest">••••••••••</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PwInput label="Password" value={password} onChange={onPasswordChange} error={errors.password} />
      <PwInput label="Re-Enter Password" value={confirmPassword} onChange={onConfirmChange} error={errors.confirmPassword} />
    </>
  );
}

ProfilePasswordFields.propTypes = {
  editing:         PropTypes.bool.isRequired,
  password:        PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onConfirmChange:  PropTypes.func.isRequired,
  errors:          PropTypes.object.isRequired,
};
