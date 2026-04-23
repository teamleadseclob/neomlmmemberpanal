function TradingHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
      <div>
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Trading Capital</h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/15 text-green-400 border border-green-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
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
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          OPEN
        </span>
      </div>
    </div>
  );
}

export default TradingHeader;
