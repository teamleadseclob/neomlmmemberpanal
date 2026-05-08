import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { getReferralLink } from '../common/referralLink';
import { sendreferallink } from '../../config/apiService';

function SendInvitationModal({ onClose }) {
  const referralLink = getReferralLink();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const isValidEmail = (val) => /\S+@\S+\.\S+/.test(val);

  const handleSend = async () => {
    if (!email || !isValidEmail(email)) { setError('Please enter a valid email address.'); return; }
    setError('');
    setLoading(true);
    await sendreferallink(email);
    setLoading(false);
    setSuccess(true);
  };

  return createPortal(
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{
        backgroundColor: visible ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0)',
        transition: 'background-color 300ms',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-[#272938] p-7 shadow-2xl border border-[#CB3CFF]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
          transition: 'opacity 300ms, transform 300ms',
        }}
      >
        {success ? (
          <div className="flex flex-col items-center justify-center text-center pt-8 pb-4">
            <div className="relative w-20 h-20 flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-2xl bg-teal-500/10 blur-md" />
              <div className="relative w-20 h-20 rounded-2xl border border-teal-500/40 bg-[#0f1f1f] flex items-center justify-center shadow-[0_0_24px_rgba(20,184,166,0.3)]">
                <svg className="w-9 h-9 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Referral Sent Successfully!</h2>
            <p className="text-sm text-gray-400 mb-7">An invitation has been sent to the<br />email provided.</p>
            <div className="w-full border border-[#2a2a4a] rounded-xl bg-[#0f0f1e] px-4 py-3 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Details</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Status</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Referral Program</p>
                    <p className="text-[10px] text-gray-500">Invited: {email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">Delivered</span>
              </div>
            </div>
            <button type="button" onClick={handleClose}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer border-none bg-linear-to-r from-[#D946EF] to-[#CB3CFF] hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 mb-3">
              Close
            </button>
            <button type="button" onClick={handleClose}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer">
              Return to Referrals Hub
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Send Invitation</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Invite a new collaborator to join your referral network. They will receive an email with instructions on how to set up their NeoFi account.
            </p>
            <p className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Referral Link</p>
            <div className="w-full bg-[#0f0f1e] border border-[#2a2a4a] rounded-lg px-4 py-3 text-sm text-gray-300 font-mono mb-5 select-all">
              {referralLink}
            </div>
            <label htmlFor="invite-email" className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">
              Enter Email Address
            </label>
            <input
              id="invite-email" type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="name@example.com"
              className="w-full bg-[#0f0f1e] border border-[#2a2a4a] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors mb-1"
            />
            {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
            <div className="flex items-start gap-3 mt-4 mb-6 bg-[#0f0f1e]/60 border border-[#2a2a4a] rounded-lg px-4 py-3">
              <span className="text-purple-400 text-lg leading-none mt-0.5">✦</span>
              <p className="text-xs text-gray-400 italic">
                &quot;Join me on Astra Finance and get access to institutional-grade DeFi tools with a 10% bonus on your first staking deposit.&quot;
              </p>
            </div>
            <button type="button" onClick={handleSend} disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer border-none bg-linear-to-r from-[#D946EF] to-[#CB3CFF] hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Sending…' : 'Send Referral ➤'}
            </button>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

SendInvitationModal.propTypes = { onClose: PropTypes.func.isRequired };

export default SendInvitationModal;
