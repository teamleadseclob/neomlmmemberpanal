import React from 'react';
import { Link } from "react-router-dom";

function CustomCapacity() {
  return (
    <div className="rounded-4xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ background: '#070E1E80', border: '1px solid #EEB1FF1A' }}>
      <div>
        <h3 className="text-base font-bold text-white mb-1.5">Need a Custom Capacity Scale?</h3>
        <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
          Our institutional tier offers unlimited ceiling potential with dedicated account management.
        </p>
      </div>

      <button
        type="button"
        className="flex-shrink-0 px-6 py-3 w-40 rounded-2xl text-xs font-bold uppercase tracking-wider
                   border border-[#2a2a4a] bg-[#ffffff] text-black
                   hover:border-purple-500/30 hover:text-gray-800 transition-all duration-200 cursor-pointer"
      >
        <Link to="/support" className="block w-full h-full">
          Contact Support
        </Link>
      </button>
    </div>
  );
}

export default CustomCapacity;
