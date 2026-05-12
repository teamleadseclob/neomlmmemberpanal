import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default function ProfileConfirmModal({ onConfirm, onCancel, loading }) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[99999]"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
        onClick={onCancel}
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
        aria-hidden="true"
      />
      <dialog
        open
        className="fixed inset-0 z-[100000] m-auto w-full max-w-sm rounded-2xl bg-[#0d0d1f] border border-[#1e1e3a] p-6 text-white"
        style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
        onClose={onCancel}
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931z" />
          </svg>
        </div>
        <h3 id="confirm-title" className="text-lg font-bold text-white text-center mb-1">Save Changes?</h3>
        <p id="confirm-desc" className="text-sm text-gray-400 text-center mb-6">
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
      </dialog>
    </>,
    document.getElementById('modal-root')
  );
}

ProfileConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel:  PropTypes.func.isRequired,
  loading:   PropTypes.bool.isRequired,
};
