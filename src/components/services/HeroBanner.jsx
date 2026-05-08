import React, { useState, useEffect } from 'react';
import banner from "../../assets/service/banner.png";

const TARGET = new Date('2026-10-08T00:00:00');

function useCountdown() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setTime('00:00:00:00'); return; }
      const d  = Math.floor(diff / 86400000);
      const h  = Math.floor((diff % 86400000) / 3600000);
      const m  = Math.floor((diff % 3600000)  / 60000);
      const s  = Math.floor((diff % 60000)    / 1000);
      setTime(`${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
function HeroBanner() {
  const countdown = useCountdown();
  return (
    <div className="relative rounded-xl border border-[#1e1e3a] overflow-hidden mb-6" >
      {/* Background decorative chart lines */}
      <img src={banner} alt="Hero Banner" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Badge */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#8A2BE233] text-[#DCB8FF] border border-[#8A2BE266] mb-4">
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
            className="px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide inline-flex items-center gap-2
                       bg-[#8A2BE2] text-white
                       hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
          >
            Join Tournament
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 1-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Registration Ends</p>
            <p className="text-lg font-bold text-white font-mono tracking-wider">{countdown}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
