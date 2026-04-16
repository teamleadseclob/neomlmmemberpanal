import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const navItems = [
  { icon: '⊞', label: 'Dashboard' },
  { icon: '🔗', label: 'Referral Links' },
  { icon: '👤', label: 'Register' },
  { icon: '👥', label: 'Community' },
  { icon: '🛒', label: 'SWP Purchase' },
  { icon: '📊', label: 'Trading Capital' },
  { icon: '🏛', label: 'Rank Report' },
  { icon: '💸', label: 'Payout' },
  { icon: '⚙', label: 'Services' },
  { icon: '📄', label: 'Reports' },
  { icon: '🛠', label: 'Support' },
]

export default function Layout() {
  const [active, setActive] = useState('Dashboard')

  return (
    <div className="flex h-screen bg-[#0d0d1a] text-gray-200 font-sans overflow-hidden">

      {/* Aside / Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-[#12122a] border-r border-[#1e1e3a] flex flex-col py-6">
        <div className="px-5 pb-5 border-b border-[#1e1e3a]">
          <p className="text-purple-500 font-bold tracking-widest text-lg">NEOFI</p>
          <p className="text-[10px] text-gray-500 tracking-widest">FINANCIAL OBSERVATORY</p>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 px-2.5 py-4 overflow-y-auto">
          {navItems.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left w-full transition-colors cursor-pointer
                ${active === label
                  ? 'bg-[#D946EF1A] text-white font-medium'
                  : 'text-gray-500 hover:bg-[#1a1a2e] hover:text-gray-200'}`}
            >
              <span className="w-5 text-center">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-2.5 px-3 py-2.5 mx-2.5 rounded-lg text-sm text-red-400 hover:bg-[#1a1a2e] cursor-pointer">
          <span className="w-5 text-center">↩</span>
          Logout
        </button>
      </aside>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-15 flex-shrink-0 bg-[#12122a] border-b border-[#1e1e3a] flex items-center justify-between px-6">
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#1e1e3a] rounded-lg px-3.5 py-2 w-72">
            <span className="text-gray-500 text-sm">🔍</span>
            <input
              className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500 w-full"
              placeholder="Search observatory data..."
            />
          </div>

          <div className="flex items-center gap-3">
            {['🌙', '🌐', '🔔'].map((icon) => (
              <button key={icon} className="text-gray-500 hover:text-gray-200 text-lg cursor-pointer bg-transparent border-none">
                {icon}
              </button>
            ))}
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#1e1e3a]">
              <div className="text-right">
                <p className="text-sm font-semibold leading-tight">Alex Rivera</p>
                <p className="text-[10px] text-purple-400 tracking-widest">GOLD MEMBER</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-purple-700 flex items-center justify-center text-xs font-bold">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0d0d1a]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
