import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { getprofile } from '../config/apiService';

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
  // { icon: reportIcon,    iconSelected: reportSelected,    label: 'Reports',          path: '/reports' },
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
            draggable="false"
          />
          <span className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
            {isActive ? (
              <span className="bg-linear-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent">
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
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-2 pl-2 border-l border-[#1e1e3a]">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold leading-tight capitalize text-white">{user?.name || 'Hello'}</p>
          <p className="text-[10px] text-purple-400 tracking-widest">{user?.email}</p>
        </div>
        <Link to="/profile">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg capitalize bg-purple-700 flex items-center justify-center text-md font-bold flex-shrink-0 text-white hover:ring-2 hover:ring-purple-500 transition-all cursor-pointer">
            {user?.name ? user.name[0] : 'H'}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [swpBalance, setSwpBalance] = useState(null);
  const [directReferralEarnings, setDirectReferralEarnings] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getprofile()
        setSwpBalance(res?.data?.swpBalance ?? 0)
        setDirectReferralEarnings(res?.data?.directReferralEarnings ?? 0)
      } catch {
        setSwpBalance(0)
      }
    }
    fetchProfile()
  }, [])

  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

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
          fixed md:static z-20 h-full flex flex-col py-6
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
          onClick={() => setShowLogoutModal(true)}
        >
          <img src={logoutIcon} alt="" className="w-4 h-4 object-contain flex-shrink-0" draggable="false"/>
          <span className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
        </button>
      </aside>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <header className="h-14 flex-shrink-0 border-b border-[#1e1e3a] flex items-center justify-between px-4 md:px-6 gap-3">
          {/* Hamburger + Brand (mobile) */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white flex-shrink-0 bg-transparent border-none cursor-pointer"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <p
              className="font-bold bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent"
              style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, letterSpacing: '-1px' }}
            >
              NEOFI
            </p>
          </div>
          <div className="hidden md:block" />
          <HeaderActions />
        </header>

        <main ref={mainRef} className="flex-1 overflow-y-auto p-4 md:p-6">
          <div key={useLocation().pathname} className="page-enter">
            <Outlet context={{ swpBalance, directReferralEarnings }} />
          </div>
        </main>
        {/* <Footer /> */}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full border-none cursor-default"
            onClick={() => setShowLogoutModal(false)}
            aria-label="Close modal"
          />
          <div
            className="relative z-10 w-full max-w-sm mx-4 rounded-2xl p-6"
            style={{
              background: 'rgba(10,8,35,0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(127,37,251,0.25)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset',
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-1">Sign Out</h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              Are you sure you want to sign out of your account?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-300 border border-[#1e1e3a] bg-transparent hover:bg-[#1a1a2e] transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500/80 hover:bg-red-500 transition-colors duration-200 cursor-pointer border-none"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
