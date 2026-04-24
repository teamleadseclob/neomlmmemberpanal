import React from 'react';
export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e3a] mt-auto">
      <div className="flex flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between">
        <p className="text-[9px] text-gray-600 tracking-widest uppercase text-center sm:text-left">
          © 2024 NEOFI KINETIC OBSERVATORY. ALL RIGHTS RESERVED.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:flex-nowrap sm:gap-6">
          {['Terms of Service', 'Privacy Policy', 'Regulatory Disclosure', 'Cookies'].map((link) => (
            <a
              key={link}
              href="https://www.neofi.com/legal" target="_blank" rel="noopener noreferrer"
              className="text-[9px] text-gray-600 tracking-widest uppercase hover:text-gray-400 transition-colors duration-200 whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
