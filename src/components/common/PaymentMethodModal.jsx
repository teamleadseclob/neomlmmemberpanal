import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import transactionsIcon from '../../assets/dashboard/transactions.png'
import tradingIcon from '../../assets/dashboard/trading.png'

const isTestMode = import.meta.env.VITE_TEST_MODE === 'true'

export default function PaymentMethodModal({ amount, systemBalance, onSelectSystem, onSelectCrypto, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#0d0d1f] border border-[#1e1e3a] p-6"
        style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-white">Choose Payment Method</h3>
          <button type="button" onClick={onClose}
            className="text-gray-400 hover:text-white bg-transparent border-none cursor-pointer transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          Amount: <span className="text-white font-semibold">${amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </p>

        <div className="flex flex-col gap-3">

          {/* System Wallet */}
          <button
            type="button"
            onClick={onSelectSystem}
            className="w-full rounded-xl p-4 border text-left transition-all duration-200 cursor-pointer border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/70"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img src={transactionsIcon} alt="system wallet icon" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Main Wallet</p>
                <p className="text-xs text-gray-400">
                  Balance: <span className="text-green-400">
                    ${systemBalance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
              <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>

          {/* Crypto Wallet */}
          <button
            type="button"
            onClick={onSelectCrypto}
            className="w-full rounded-xl p-4 border text-left transition-all duration-200 cursor-pointer border-[#2a2a4a] bg-white/3 hover:bg-white/5 hover:border-purple-500/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img src={tradingIcon} alt="crypto wallet icon" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Crypto Wallet</p>
                <p className="text-xs text-gray-400">
                  {isTestMode ? <span className="text-yellow-400">Test mode — no wallet required</span> : 'Pay with USDT on BSC'}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>

        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

PaymentMethodModal.propTypes = {
  amount:         PropTypes.number.isRequired,
  systemBalance:  PropTypes.number.isRequired,
  onSelectSystem: PropTypes.func.isRequired,
  onSelectCrypto: PropTypes.func.isRequired,
  onClose:        PropTypes.func.isRequired,
}
