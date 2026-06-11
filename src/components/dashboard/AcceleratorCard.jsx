import React from 'react';
import { Link } from 'react-router-dom';
function AcceleratorCard() {
  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#181F3066] p-5 flex flex-col items-center text-center">
      {/* Rocket icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3">
        <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#rocketGrad)" strokeWidth={1.5}>
          <defs>
            <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(128.49)">
              <stop offset="19.86%" stopColor="#CB3CFF" />
              <stop offset="68.34%" stopColor="#7F25FB" />
            </linearGradient>
          </defs>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 1-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </div>

      <h3 className="text-base font-bold text-white mb-1.5">Accelerator Active</h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-4">
        You are currently positioned to earn an estimated 6%–12% monthly trading profit.
      </p>

      <Link
        to="/swp-purchase"
        className="px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer
                   border border-purple-500 text-purple-400
                   hover:bg-purple-500/10 transition-colors duration-200"
      >
        Upgrade Package
      </Link>
    </div>
  );
}

export default AcceleratorCard;
