import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE } from '../paths';

const navLinks = [
  { href: '/#Home Page', label: 'Home' },
  { href: '/#About', label: 'About Us' },
  { href: '/#Service', label: 'Services' },
  { href: '/#Partners', label: 'Partners' },
  { href: '/#Access', label: 'Access' },
  { href: '/#Contact', label: 'Contact Us' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .landing-header {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 9999;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 15px 40px; display: flex; align-items: center; justify-content: space-between;
        }
        .landing-header__logo img { width: 120px; border-radius: 0 !important; }
        .landing-header__nav { display: flex !important; align-items: center; gap: 8px; list-style: none; margin: 0; padding: 0; }
        .landing-header__nav a { color: #fff; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: 300; padding: 8px 15px; transition: color 0.2s; }
        .landing-header__nav a:hover { color: var(--e-global-color-primary, #8b5cf6); }
        .landing-header__login a { color: #fff; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; padding: 10px 20px; border: 1px solid var(--e-global-color-primary, #8b5cf6); border-radius: 999px; background: var(--e-global-color-8a1f65a, #1a1a2e); transition: background 0.2s; }
        .landing-header__login a:hover { background: var(--e-global-color-primary, #8b5cf6); }
        .landing-header__hamburger { display: none; background: transparent !important; border: none !important; cursor: pointer; padding: 8px; border-radius: 0 !important; box-shadow: none !important; }
        .landing-header__hamburger span { display: block; width: 24px; height: 2px; background: #fff; margin: 5px 0; transition: 0.3s; }
        .landing-header__hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .landing-header__hamburger.open span:nth-child(2) { opacity: 0; }
        .landing-header__hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

        .landing-mobile-menu { display: none; position: fixed; top: 0; right: 0; width: 280px; height: 100vh; background: rgba(1,1,1,0.95); z-index: 10000; padding: 80px 30px 30px; flex-direction: column; gap: 0; }
        .landing-mobile-menu.open { display: flex; }
        .landing-mobile-menu a { color: #fff; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: block; }
        .landing-mobile-menu a:hover { color: var(--e-global-color-primary, #8b5cf6); }
        .landing-mobile-menu__close { position: absolute; top: 20px; right: 20px; background: transparent !important; border: none !important; cursor: pointer; width: 32px; height: 32px; border-radius: 0 !important; box-shadow: none !important; outline: none !important; padding: 0 !important; }
        .landing-mobile-menu__close::before, .landing-mobile-menu__close::after { content: ''; position: absolute; top: 50%; left: 50%; width: 20px; height: 2px; background: #fff; border-radius: 2px; }
        .landing-mobile-menu__close::before { transform: translate(-50%, -50%) rotate(45deg); }
        .landing-mobile-menu__close::after { transform: translate(-50%, -50%) rotate(-45deg); }
        .landing-mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; }
        .landing-mobile-overlay.open { display: block; }

        @media (max-width: 1024px) {
          .landing-header { padding: 15px 20px; }
          .landing-header__nav, .landing-header__login { display: none !important; }
          .landing-header__hamburger { display: block !important; }
        }
      `}</style>

      <header className="landing-header">
        <div className="landing-header__logo">
          <img src={`${BASE}/wp-content/uploads/2026/05/Neofi-Academy-Logo2.png`} alt="Neofi Academy" />
        </div>
        <ul className="landing-header__nav">
          {navLinks.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <div className="landing-header__login">
          <Link to="/login">Client Login</Link>
        </div>
        <button className={`landing-header__hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      <div className={`landing-mobile-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
      <nav className={`landing-mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="landing-mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
        {navLinks.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
        <Link to="/login" onClick={() => setMenuOpen(false)} style={{marginTop:'20px', color:'var(--e-global-color-primary, #8b5cf6)'}}>Client Login</Link>
      </nav>
    </>
  );
}
