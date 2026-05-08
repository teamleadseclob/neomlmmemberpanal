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
    <div className="rounded-xl p-5 md:p-6 h-full flex flex-col cursor-default select-none" style={{ background: '#181F3066', border: '1px solid #EEB1FF1A' }}>
      <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        Capacity Logic
      </h3>

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
