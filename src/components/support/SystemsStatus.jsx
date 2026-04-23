const SYSTEMS = [
  { name: 'Vault Servers', status: 'Operational', color: 'text-green-400' },
  { name: 'Payout Engine', status: 'Operational', color: 'text-green-400' },
  { name: 'Trading API', status: 'Degraded', color: 'text-orange-400' },
];

function SystemsStatus() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
        <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Systems Status</h3>
      </div>

      {/* Status rows */}
      <div className="flex flex-col gap-2.5">
        {SYSTEMS.map((sys) => (
          <div key={sys.name} className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{sys.name}</span>
            <span className={`text-[10px] uppercase tracking-wider font-bold ${sys.color}`}>
              {sys.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemsStatus;
