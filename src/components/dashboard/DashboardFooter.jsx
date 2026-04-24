import React from 'react';
const FOOTER_LINKS = ['Basic Terms', 'General T&Cs', 'Privacy Policy'];

function DashboardFooter() {
  return (
    <footer className="border-t border-[#1e1e3a] pt-6 pb-2 mt-4">
      {/* Links row */}
      <div className="flex justify-center gap-6 mb-3">
        {FOOTER_LINKS.map((link) => (
          <button
            key={link}
            type="button"
            className="text-[11px] text-gray-500 uppercase tracking-widest
                       hover:text-purple-400 transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
          >
            {link}
          </button>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-center text-[11px] text-gray-600">
        © 2024 NEOFI. ALL RIGHTS RESERVED.{' '}
        <span className="text-purple-400 underline cursor-pointer hover:text-purple-300 transition-colors">
          5% ADMIN CHARGE APPLIES TO TOTAL INCOME.
        </span>
      </p>
    </footer>
  );
}

export default DashboardFooter;
