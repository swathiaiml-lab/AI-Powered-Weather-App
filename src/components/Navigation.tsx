import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Heart, User, Settings, CloudSun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/favourites', icon: Heart, label: 'Saved' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Navigation() {
  const location = useLocation()
  const { theme } = useTheme()

  const hiddenRoutes = ['/', '/login', '/register', '/forgot-password']
  if (hiddenRoutes.includes(location.pathname)) return null

  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 nav-blur"
        style={{ background: theme === 'dark' ? 'rgba(10,14,39,0.8)' : 'rgba(238,242,255,0.85)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <NavLink to="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
              <CloudSun size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm gradient-text">WeatherAI</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`
                }
                style={{ '--tw-text-opacity': 1 } as React.CSSProperties}
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Mobile bottom nav */}
      <motion.nav
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 nav-blur px-4 pb-safe"
        style={{ background: theme === 'dark' ? 'rgba(10,14,39,0.9)' : 'rgba(238,242,255,0.9)', borderTop: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl">
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-primary/20' : ''}`}>
                    <Icon size={18} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
