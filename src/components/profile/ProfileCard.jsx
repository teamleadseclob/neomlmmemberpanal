import { useState } from 'react';
import { createPortal } from 'react-dom';
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

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

function ConfirmModal({ onConfirm, onCancel, loading }) {
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={onCancel}>
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0d0d1f] border border-[#1e1e3a] p-6"
        style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}>

        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931z" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-white text-center mb-1">Save Changes?</h3>
        <p className="text-sm text-gray-400 text-center mb-6">
          Are you sure you want to update your profile information?
        </p>

        <div className="flex gap-3">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-300 border border-[#1e1e3a] bg-transparent hover:bg-white/5 transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_8px_24px_rgba(147,51,234,0.4)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading
              ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : 'Confirm'}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default function ProfileCard({ user, onSave }) {
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const initial = (user?.name?.[0] || 'U').toUpperCase();

  const handleCancel = () => {
    setFullName(user?.name || '');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setEditing(false);
  };

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (password) {
      if (password.length < 6) e.password = 'Password must be at least 6 characters';
      else if (!/[A-Z]/.test(password)) e.password = 'Must contain at least one uppercase letter';
      else if (!/[0-9]/.test(password)) e.password = 'Must contain at least one number';
      if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
      else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    return e;
  };

  const handleSaveClick = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onSave({ fullName, password, confirmPassword });
    setLoading(false);
    setShowConfirmModal(false);
    setEditing(false);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-8">

          {/* Avatar */}
          <div className="flex-shrink-0 flex items-start justify-center sm:justify-start">
            <div className="w-32 h-32 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] flex items-center justify-center"
              style={{ boxShadow: '0 0 32px rgba(147,51,234,0.15)' }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                {initial}
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Header row */}
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-base">{user?.name || '—'}</p>
              {!editing && (
                <button type="button" onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-purple-400 border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 transition-colors cursor-pointer">
                  <EditIcon /> Edit Profile
                </button>
              )}
            </div>

            {/* Full Name */}
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Full Name</p>
              {editing
                ? <>
                    <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: '' })); }}
                      className={`w-full bg-transparent border-b text-white text-base pb-1.5 outline-none transition-colors ${errors.fullName ? 'border-red-500/60' : 'border-[#2a2a4a] focus:border-purple-500'}`} />
                    {errors.fullName && <p className="mt-1 text-red-400 text-xs">{errors.fullName}</p>}
                  </>
                : <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5">{user?.name || '—'}</p>
              }
            </div>

            {/* Password */}
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Password</p>
              {editing
                ? <>
                    <div className={`flex items-center border-b transition-colors ${errors.password ? 'border-red-500/60' : 'border-[#2a2a4a] focus-within:border-purple-500'}`}>
                      <input type={showPw ? 'text' : 'password'} value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                        placeholder="Enter new password"
                        className="flex-1 bg-transparent text-white text-base pb-1.5 outline-none placeholder-gray-600" />
                      <button type="button" onClick={() => setShowPw(p => !p)}
                        className="text-gray-500 hover:text-gray-300 bg-transparent border-none cursor-pointer pb-1">
                        {showPw ? <EyeIcon /> : <EyeOffIcon />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password}</p>}
                  </>
                : <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5 tracking-widest">••••••••••</p>
              }
            </div>

            {/* Confirm Password */}
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Confirm Password</p>
              {editing
                ? <>
                    <div className={`flex items-center border-b transition-colors ${errors.confirmPassword ? 'border-red-500/60' : 'border-[#2a2a4a] focus-within:border-purple-500'}`}>
                      <input type={showConfirm ? 'text' : 'password'} value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })); }}
                        placeholder="Confirm new password"
                        className="flex-1 bg-transparent text-white text-base pb-1.5 outline-none placeholder-gray-600" />
                      <button type="button" onClick={() => setShowConfirm(p => !p)}
                        className="text-gray-500 hover:text-gray-300 bg-transparent border-none cursor-pointer pb-1">
                        {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-red-400 text-xs">{errors.confirmPassword}</p>}
                  </>
                : <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5 tracking-widest">••••••••••</p>
              }
            </div>

            {/* Email */}
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Email Address</p>
              <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5">{user?.email || '—'}</p>
            </div>

            {/* Actions */}
            {editing && (
              <div className="flex gap-4 mt-2">
                <button type="button" onClick={handleCancel}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white border border-[#2a2a4a] bg-transparent hover:bg-white/5 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="button" onClick={handleSaveClick}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_8px_24px_rgba(147,51,234,0.4)] transition-all duration-200">
                  Save
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmModal(false)}
          loading={loading}
        />
      )}
    </>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
