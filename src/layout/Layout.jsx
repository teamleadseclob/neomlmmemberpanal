import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import dashboardIcon from '../assets/icons/dashboard.png';
import dashboardSelected from '../assets/icons/dashboardselected.png';
import referalIcon from '../assets/icons/referal.png';
import referalSelected from '../assets/icons/referalseleted.png';
import communityIcon from '../assets/icons/community.png';
import communitySelected from '../assets/icons/communityseleted.png';
import purchaseIcon from '../assets/icons/purchase.png';
import purchaseSelected from '../assets/icons/purchaseseleted.png';
import capitalIcon from '../assets/icons/capital.png';
import capitalSelected from '../assets/icons/capitalseleted.png';
import rankIcon from '../assets/icons/rank.png';
import rankSelected from '../assets/icons/rankseleted.png';
import payoutIcon from '../assets/icons/payout.png';
import payoutSelected from '../assets/icons/payoutseleted.png';
import serviceIcon from '../assets/icons/service.png';
import serviceSelected from '../assets/icons/serviceseleted.png';
import reportIcon from '../assets/icons/report.png';
import reportSelected from '../assets/icons/reportseleted.png';
import supportIcon from '../assets/icons/supprt.png';
import supportSelected from '../assets/icons/supportseleted.png';
import logoutIcon from '../assets/icons/logout.png';

const NAV_ITEMS = [
  { icon: dashboardIcon, iconSelected: dashboardSelected, label: 'Dashboard',       path: '/' },
  { icon: referalIcon,   iconSelected: referalSelected,   label: 'Referral Hub',    path: '/referral-links' },
  { icon: communityIcon, iconSelected: communitySelected, label: 'Community',        path: '/community' },
  { icon: purchaseIcon,  iconSelected: purchaseSelected,  label: 'SWP Purchase',     path: '/swp-purchase' },
  { icon: capitalIcon,   iconSelected: capitalSelected,   label: 'Trading Capital',  path: '/trading-capital' },
  { icon: rankIcon,      iconSelected: rankSelected,      label: 'Rank Report',      path: '/rank-report' },
  { icon: payoutIcon,    iconSelected: payoutSelected,    label: 'Payout',           path: '/payout' },
  { icon: serviceIcon,   iconSelected: serviceSelected,   label: 'Services',         path: '/services' },
  { icon: reportIcon,    iconSelected: reportSelected,    label: 'Reports',          path: '/reports' },
  { icon: supportIcon,   iconSelected: supportSelected,   label: 'Support',          path: '/support' },
];

SidebarNavItem.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconSelected: PropTypes.string.isRequired,
  }).isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

function SidebarNavItem({ item, sidebarOpen, onNavigate }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      onClick={onNavigate}
      title={item.label}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-xs text-left w-full transition-colors whitespace-nowrap no-underline
        ${isActive
          ? 'bg-[#D946EF1A] font-medium border-r-2 border-[#CB3CFF]'
          : 'text-[#AEB9E1] hover:bg-[#1a1a2e] hover:text-gray-200'}`
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? item.iconSelected : item.icon}
            alt=""
            className="w-4 h-4 object-contain flex-shrink-0"
          />
          <span className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
            {isActive ? (
              <span className="bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent">
                {item.label}
              </span>
            ) : (
              item.label
            )}
          </span>
        </>
      )}
    </NavLink>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">

      <div className="flex items-center gap-2 pl-2 border-l border-[#1e1e3a]">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold leading-tight text-white">Alex Rivera</p>
          <p className="text-[10px] text-purple-400 tracking-widest">GOLD MEMBER</p>
        </div>
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
          AR
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#020717] text-gray-200 overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/60 z-20 md:hidden w-full h-full border-none cursor-default"
          onClick={handleNavigate}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-30 h-full flex flex-col py-6
          border-r border-[#1e1e3a] bg-[#020717]
          transition-all duration-300
          ${sidebarOpen ? 'w-52' : 'w-0 md:w-16 lg:w-52'}
          overflow-hidden
        `}
      >
        {/* Brand */}
        <div className="px-4 pb-5 whitespace-nowrap">
          <p
            className="font-bold bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent"
            style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 700, lineHeight: '32px', letterSpacing: '-1.2px' }}
          >
            NEOFI
          </p>
          <p className="text-[10px] text-gray-500 tracking-widest lg:block hidden">FINANCIAL OBSERVATORY</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 px-2 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.label}
              item={item}
              sidebarOpen={sidebarOpen}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>

        {/* Logout */}
        <button
          type="button"
          className="flex items-center gap-2.5 px-3 py-2.5 mx-2 rounded-lg text-sm text-[#FFB4AB] hover:bg-[#1a1a2e] cursor-pointer whitespace-nowrap bg-transparent border-none"
          onClick={handleLogout}
        >
          <img src={logoutIcon} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
          <span className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
        </button>
      </aside>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <header className="h-14 flex-shrink-0 border-b border-[#1e1e3a] flex items-center justify-end px-4 md:px-6 gap-3">
          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="md:hidden text-gray-400 hover:text-white flex-shrink-0 bg-transparent border-none cursor-pointer"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search */}
          {/* <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#1e1e3a] rounded-lg px-3 py-2 w-full max-w-xs">
            <span className="text-gray-500 text-sm flex-shrink-0">🔍</span>
            <input
              className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500 w-full border-none"
              placeholder="Search observatory data..."
              aria-label="Search observatory data"
            />
          </div> */}

          {/* Header actions */}
          <HeaderActions />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
