import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const links = [
    { label: 'Terms of Service', to: '/terms-conditions' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Regulatory Disclosure', to: null },
    { label: 'Cookies', to: null },
  ];

  return (
    <footer className="border-t border-[#1e1e3a] mt-auto">
      <div className="flex flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between">
        <p className="text-[9px] text-gray-600 tracking-widest uppercase text-center sm:text-left">
          © 2024 NEOFI KINETIC OBSERVATORY. ALL RIGHTS RESERVED.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:flex-nowrap sm:gap-6">
          {links.map(({ label, to }) =>
            to ? (
              <Link key={label} to={to} className="text-[9px] text-gray-600 tracking-widest uppercase hover:text-gray-400 transition-colors duration-200 whitespace-nowrap">
                {label}
              </Link>
            ) : (
              <a key={label} href="https://www.neofi.com/legal" target="_blank" rel="noopener noreferrer" className="text-[9px] text-gray-600 tracking-widest uppercase hover:text-gray-400 transition-colors duration-200 whitespace-nowrap">
                {label}
              </a>
            )
          )}
        </nav>
      </div>
    </footer>
  )
}
