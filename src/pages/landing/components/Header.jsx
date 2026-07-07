import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE } from '../paths';

const navLinks = [
  { href: '/#Home Page', label: 'Home Page' },
  { href: '/#About', label: 'About Us' },
  { href: '/#Service', label: 'Services' },
  { href: '/#Partners', label: 'Partners' },
  { href: '/#Access', label: 'Access' },
  { href: '/#Contact', label: 'Contact Us' },
];

const socialLinks = [
  { href: 'https://www.youtube.com/@NEOFIACADEMY', icon: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z', vb: '0 0 576 512' },
  { href: 'https://t.me/NEOFIACADEMY', icon: 'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z', vb: '0 0 496 512' },
  { href: 'https://www.instagram.com/neofiacademy/', icon: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z', vb: '0 0 448 512' },
  { href: 'https://www.facebook.com/share/18X17pYmbf/', icon: 'M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z', vb: '0 0 512 512' },
  { href: 'https://x.com/NeoFiAcademy', icon: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z', vb: '0 0 512 512' },
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

        /* Mobile Sidebar */
        .landing-mobile-sidebar { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: #0d1117; z-index: 10000; display: flex; flex-direction: column; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; }
        .landing-mobile-sidebar.open { transform: translateX(0); }
        .landing-mobile-sidebar__header { display: flex; align-items: center; justify-content: space-between; padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .landing-mobile-sidebar__header img { width: 100px; border-radius: 0 !important; }
        .landing-mobile-sidebar__close-wrap { display: flex; align-items: center; gap: 8px; }
        .landing-mobile-sidebar__dash { width: 16px; height: 2px; background: #f5c518; }
        .landing-mobile-sidebar__close { background: none !important; border: none !important; cursor: pointer; padding: 4px; }
        .landing-mobile-sidebar__close svg { width: 22px; height: 22px; stroke: #f5c518; stroke-width: 2.5; }
        .landing-mobile-sidebar__body { padding: 30px 25px; flex: 1; display: flex; flex-direction: column; }
        .landing-mobile-sidebar__logo { margin-bottom: 30px; }
        .landing-mobile-sidebar__logo img { width: 160px; border-radius: 0 !important; }
        .landing-mobile-sidebar__nav { display: flex; flex-direction: column; gap: 4px; margin-bottom: 30px; }
        .landing-mobile-sidebar__nav a { color: #fff; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 400; padding: 10px 0; display: flex; align-items: center; gap: 12px; }
        .landing-mobile-sidebar__nav a:hover { color: #f5c518; }
        .landing-mobile-sidebar__arrow { width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .landing-mobile-sidebar__arrow svg { width: 14px; height: 14px; stroke: #fff; stroke-width: 2; fill: none; }
        .landing-mobile-sidebar__login { display: inline-block; color: #fff; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-size: 15px; padding: 10px 28px; border: 1px solid #f5c518; border-radius: 999px; margin-bottom: 30px; width: fit-content; }
        .landing-mobile-sidebar__login:hover { background: #f5c518; color: #000; }
        .landing-mobile-sidebar__social { display: flex; gap: 16px; margin-bottom: 30px; }
        .landing-mobile-sidebar__social a { display: flex; align-items: center; justify-content: center; }
        .landing-mobile-sidebar__social svg { width: 22px; height: 22px; fill: #fff; }
        .landing-mobile-sidebar__footer { margin-top: auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
        .landing-mobile-sidebar__disclaimer { color: #999; font-family: 'Bricolage Grotesque', sans-serif; font-size: 13px; line-height: 1.5; margin-bottom: 16px; }
        .landing-mobile-sidebar__copyright { color: #999; font-family: 'Bricolage Grotesque', sans-serif; font-size: 12px; text-align: center; }
        .landing-mobile-sidebar__copyright a { color: #f5c518; text-decoration: none; }

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
        <button className="landing-header__hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile Sidebar */}
      <nav className={`landing-mobile-sidebar${menuOpen ? ' open' : ''}`}>
        <div className="landing-mobile-sidebar__header">
          <img src={`${BASE}/wp-content/uploads/2026/05/Neofi-Academy-Logo2.png`} alt="Neofi Academy" />
          <button className="landing-mobile-sidebar__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none"><line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /></svg>
          </button>
        </div>
        <div className="landing-mobile-sidebar__body">

          <div className="landing-mobile-sidebar__nav">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
          <Link to="/login" className="landing-mobile-sidebar__login" onClick={() => setMenuOpen(false)}>Client Login</Link>
          <div className="landing-mobile-sidebar__social">
            {socialLinks.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                <svg viewBox={s.vb} xmlns="http://www.w3.org/2000/svg"><path d={s.icon} /></svg>
              </a>
            ))}
          </div>
          <div className="landing-mobile-sidebar__footer">
            <p className="landing-mobile-sidebar__disclaimer">Disclaimer: All trading and investing involve risk, including the potential loss of your entire invested capital.</p>
            <p className="landing-mobile-sidebar__copyright">© {new Date().getFullYear()} NeoFi Academy. All Rights Reserved.</p>
          </div>
        </div>
      </nav>
    </>
  );
}
