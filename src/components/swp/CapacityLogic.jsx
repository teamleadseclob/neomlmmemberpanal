import React from 'react';
const STEPS = [
  {
    number: '1',
    title: 'Activation Multiplier',
    description: (
      <>
        Your total Investment Limit is automatically calculated at{' '}
        <span className="text-white font-medium">10x</span> your Package Price.
      </>
    ),
  },
  {
    number: '2',
    title: 'Limit Thresholds',
    description: (
      <>
        Once your limit is reached, choose to{' '}
        <span className="text-white font-medium">Repurchase</span> (refresh the same limit) or{' '}
        <span className="text-white font-medium">Upgrade</span> (next tier).
      </>
    ),
  },
];

function CapacityLogic() {
  return (
    <div className="rounded-xl border border-[#1e1e3a]  p-5 md:p-6 h-full flex flex-col cursor-default select-none">
      <h3 className="text-base font-bold text-white mb-5">⚙️ Capacity Logic</h3>

      <div className="flex flex-col gap-4 mb-6 flex-1">
        {STEPS.map((step) => (
          <div key={step.number} className="flex gap-3">
            {/* Step number */}
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-purple-400">{step.number}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1 cursor-default">{step.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed cursor-default">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide
                   border border-purple-500/50 text-purple-400
                   hover:bg-purple-500/10 transition-colors duration-200 cursor-pointer bg-transparent"
      >
        View Detailed Terms
      </button>
    </div>
  );
}

export default CapacityLogic;
