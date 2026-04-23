import React from 'react';
import banner from "../../assets/service/banner.png";
function HeroBanner() {
  return (
    <div className="relative rounded-xl border border-[#1e1e3a] overflow-hidden mb-6" >
      {/* Background decorative chart lines */}
      <img src={banner} alt="Hero Banner" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Badge */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 mb-4">
          Featured Championship
        </span>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-0 leading-tight">Quantum</h2>
        <h2 className="text-4xl md:text-5xl font-bold italic mb-4 leading-tight" style={{ color: '#CB3CFF' }}>Observatory Cup</h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-6 max-w-lg leading-relaxed">
          The ultimate test of financial intelligence. Scale the leaderboard by predicting market shifts with surgical precision. $50,000 Prize Pool awaiting the top 3 analysts.
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide
                       bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                       hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
          >
            Join Tournament 🚀
          </button>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Registration Ends</p>
            <p className="text-lg font-bold text-white font-mono tracking-wider">02:14:55:08</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
