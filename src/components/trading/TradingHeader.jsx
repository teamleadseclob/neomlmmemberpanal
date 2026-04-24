function TradingHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
      <div>
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Trading Capital</h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-[#14CA7480] text-white border border-green-500/30">
            Account Active
          </span>
        </div>
        <p className="text-sm text-gray-400">
          Manage And Consolidate Your Diversified Earnings.
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e1e3a] bg-[#0d0b2e]/60 flex-shrink-0">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
          Global Market Status
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)' }}
          />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)' }}
          >
            OPEN
          </span>
        </span>
      </div>
    </div>
  );
}

export default TradingHeader;
