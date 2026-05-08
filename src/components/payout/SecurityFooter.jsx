export default function SecurityFooter() {
  return (
    <div
      className="rounded-xl p-5 flex bg-[#131B2E] items-start gap-4"
      style={{
        border: '1px solid rgba(30,30,58,0.6)',
      }}
    >
      {/* Shield icon */}
      <div className="w-10 h-10 rounded-xl bg-[#006C491A] flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-white mb-1">Secured by Echelon Prime Protocols</p>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          All high-value withdrawals are manually reviewed within 24 hours to ensure the safety of your
          sanctuary assets. Transaction IDs are cryptographically hashed for your privacy.
        </p>
      </div>
    </div>
  );
}
