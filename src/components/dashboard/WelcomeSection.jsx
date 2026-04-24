import React from 'react';
import { Link } from "react-router-dom";

function WelcomeSection() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Welcome back, Alex.
        </h1>
        <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />{' '}
          Observatory is live. Market data synchronized.
        </p>
      </div>
      <button
        type="button"
        className="px-14 py-3 rounded-lg text-white cursor-pointer
                   bg-linear-to-r from-[#7F25FB] to-[#CB3CFF]
                   hover:from-[#6B1FD4] hover:to-[#B835E0]
                   transition-all duration-200 shadow-lg shadow-purple-500/20
                   whitespace-nowrap text-center align-middle"
        style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '13px', lineHeight: '24px', letterSpacing: '0px' }}
      >
        <Link to="/trading-capital" className="flex items-center gap-2">
        Quick Deposit
        </Link>
      </button>
    </div>
  );
}

export default WelcomeSection;
