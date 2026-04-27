import { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AddInvestmentModal from './AddInvestmentModal';

function CapitalOverview({data, onRefresh}) {
  const [showModal, setShowModal] = useState(false);
  const utilized         = data?.totalInvested ?? 0
  const total            = data?.maxInvestmentLimit ?? 0
  const tradingCapital   = data?.totalInvested ?? 0
  const remainingCapacity = data?.remainingInvestment ?? 0
  const percentage       = total > 0 ? Math.round((utilized / total) * 100) : 0

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#181F3066] p-5 md:p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Left: Capital info ─────────────────────────────── */}
        <div className="flex-1 flex flex-col">
          {/* Icon + Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">Trading Capital</h3>
          </div>

          {/* Amount row */}
          <div className="flex items-end justify-between mb-1">
            <span />
            <p className="text-2xl md:text-3xl font-bold text-white">
              ${utilized}
            </p>
          </div>

          {/* Utilized limit + total */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Utilized Limit</p>
            <p className="text-sm text-gray-500 font-normal">/ ${total}</p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-[#1a1a3e] rounded-full overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Trading Capital & Remaining Capacity sub-cards */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="rounded-xl border border-[#1e1e3a] bg-[#0a0920]/80 p-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
                Trading Capital
              </p>
              <p className="text-xl md:text-2xl font-bold text-white">
                ${tradingCapital.toFixed(2)}
              </p>
            </div>
            <div className="rounded-xl border border-[#1e1e3a] bg-[#0a0920]/80 p-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
                Remaining Capacity
              </p>
              <p className="text-xl md:text-2xl font-bold text-white">
                ${remainingCapacity.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Referral Multiplier panel ───────────────── */}
        <div className="w-full lg:w-[260px] flex-shrink-0 rounded-xl border border-[#1e1e3a] bg-[#0a0920]/80 p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white">Referral Multiplier</h4>
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#CB3CFF] text-white border border-purple-500/30">
              Active
            </span>
          </div>

          {/* With Referral row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs text-purple-400 font-medium">With Referral</span>
            <span className="text-xs font-bold text-purple-300">2X LIMIT</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 mt-auto">
            <button
              type="button"
              className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center gap-2
               border border-[#1e1e3a] bg-[#0a0920] text-white
               hover:bg-[#1a1a3e] transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <Link to="/payout" className="hover:underline">
              Withdraw Profits
              </Link>
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center gap-2
                         bg-linear-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                         hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Trading Capital
            </button>
          </div>
        </div>

      </div>

      {showModal && (
        <AddInvestmentModal
          onClose={() => setShowModal(false)}
          onSuccess={onRefresh}
        />
      )}
    </div>
  );
}

CapitalOverview.propTypes = {
  data: PropTypes.shape({
    totalInvested: PropTypes.number,
    maxInvestmentLimit: PropTypes.number,
    remainingInvestment: PropTypes.number,
    swpBalance: PropTypes.number,
  }),
  onRefresh: PropTypes.func,
}

CapitalOverview.defaultProps = {
  data: null,
  onRefresh: null,
}

export default CapitalOverview;
