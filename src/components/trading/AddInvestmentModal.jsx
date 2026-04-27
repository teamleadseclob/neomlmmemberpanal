import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { addinvestments } from '../../config/apiService';

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

function AddInvestmentModal({ onClose, onSuccess }) {
  const [amount, setAmount]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const backdropRef = useRef(null);
  const panelRef    = useRef(null);

  /* ── lock scroll on the layout's main container ── */
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const prev = main.style.overflow;
    main.style.overflow = 'hidden';
    return () => { main.style.overflow = prev; };
  }, []);

  /* ── enter ── */
  useEffect(() => {
    backdropRef.current?.animate(
      [{ opacity: 0, backdropFilter: 'blur(0px)' },
       { opacity: 1, backdropFilter: 'blur(8px)' }],
      { duration: 350, easing: 'ease-out', fill: 'forwards' }
    );
    panelRef.current?.animate(
      [{ opacity: 0, transform: 'translateY(40px) scale(0.92)' },
       { opacity: 0.6, transform: 'translateY(-6px) scale(1.01)' },
       { opacity: 1, transform: 'translateY(0px) scale(1)' }],
      { duration: 520, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    );
  }, []);

  /* ── exit ── */
  const handleClose = () => {
    const pa = panelRef.current?.animate(
      [{ opacity: 1, transform: 'translateY(0) scale(1)' },
       { opacity: 0, transform: 'translateY(32px) scale(0.93)' }],
      { duration: 280, easing: 'cubic-bezier(0.4,0,1,1)', fill: 'forwards' }
    );
    backdropRef.current?.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 280, easing: 'ease-in', fill: 'forwards' }
    );
    pa?.finished.then(onClose);
  };

  const isValidAmount = (val) => val > 0 && !Number.isNaN(val);

  const handleInvest = async () => {
    const parsed = parseFloat(amount);
    if (!isValidAmount(parsed)) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await addinvestments(parsed);
      /* slide out → slide in success */
      await panelRef.current?.animate(
        [{ opacity: 1, transform: 'translateX(0)' },
         { opacity: 0, transform: 'translateX(-40px)' }],
        { duration: 220, easing: 'ease-in', fill: 'forwards' }
      ).finished;
      panelRef.current?.animate(
        [{ opacity: 0, transform: 'translateX(40px)' },
         { opacity: 1, transform: 'translateX(0)' }],
        { duration: 320, easing: 'cubic-bezier(0.34,1.3,0.64,1)', fill: 'forwards' }
      );
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Investment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      ref={backdropRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center px-4 bg-black/70"
    >
      <div
        ref={panelRef}
        style={{ opacity: 0 }}
        className="relative w-full max-w-md rounded-2xl bg-[#272938] p-7 shadow-2xl border border-[#CB3CFF] my-auto"
      >
        {success ? (
          /* ── Success ── */
          <div className="flex flex-col items-center text-center pt-6 pb-2">
            <div className="relative w-20 h-20 flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-2xl bg-teal-500/10 blur-md" />
              <div className="relative w-20 h-20 rounded-2xl border border-teal-500/40 bg-[#0f1f1f] flex items-center justify-center shadow-[0_0_24px_rgba(20,184,166,0.3)]">
                <svg className="w-9 h-9 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Investment Successful!</h2>
            <p className="text-sm text-gray-400 mb-7">
              <span className="text-white font-semibold">${parseFloat(amount).toLocaleString()} USDT</span> has been
              added to your trading capital.
            </p>

            <div className="w-full border border-[#2a2a4a] rounded-xl bg-[#0f0f1e] px-4 py-3 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Details</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Status</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Trading Capital</p>
                    <p className="text-[10px] text-gray-500">+${parseFloat(amount).toLocaleString()} USDT</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Confirmed
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer border-none
                         bg-linear-to-r from-[#7F25FB] to-[#CB3CFF]
                         hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 mb-3"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer"
            >
              Return to Trading Capital
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Add Trading Capital</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Deposit USDT to increase your trading capital limit and unlock higher earning potential.
            </p>

            {/* Amount input */}
            <label htmlFor="invest-amount" className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">
              Amount (USDT)
            </label>
            <div className="relative mb-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
              <input
                id="invest-amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(''); }}
                placeholder="0.00"
                className="w-full bg-[#0f0f1e] border border-[#2a2a4a] rounded-lg pl-8 pr-16 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">USDT</span>
            </div>
            {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

            {/* Quick select */}
            <div className="flex gap-2 mt-3 mb-6">
              {QUICK_AMOUNTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => { setAmount(String(q)); setError(''); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 cursor-pointer
                    ${parseFloat(amount) === q
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-[#2a2a4a] bg-[#0f0f1e] text-gray-400 hover:border-purple-500/50 hover:text-gray-200'}`}
                >
                  ${q.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Info box */}
            <div className="flex items-start gap-3 mb-6 bg-[#0f0f1e]/60 border border-[#2a2a4a] rounded-lg px-4 py-3">
              <span className="text-purple-400 text-lg leading-none mt-0.5">✦</span>
              <p className="text-xs text-gray-400">
                Investments are reflected immediately. Refer members to unlock a <span className="text-purple-300 font-semibold">2X capital limit</span> multiplier.
              </p>
            </div>

            <button
              type="button"
              onClick={handleInvest}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer border-none
                         bg-linear-to-r from-[#7F25FB] to-[#CB3CFF]
                         hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing…' : 'Invest Now ➤'}
            </button>
          </>
        )}

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-linear-to-r from-[#7F25FB] to-[#CB3CFF]" />
      </div>
    </div>,
    document.body
  );
}

AddInvestmentModal.propTypes = {
  onClose:   PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

AddInvestmentModal.defaultProps = {
  onSuccess: null,
};

export default AddInvestmentModal;
