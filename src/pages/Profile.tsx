import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit3, LogOut, Settings as SettingsIcon, Heart, MapPin, Mail, Bell, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'

export default function Profile() {
  const { user, logout } = useAuth()
  const { current, favourites } = useWeather()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const menuItems: { icon: React.ReactNode; label: string; to: string }[] = [
    { icon: <Bell size={16} />, label: 'Notifications', to: '/settings' },
    { icon: <MapPin size={16} />, label: 'Location Settings', to: '/settings' },
    { icon: <Shield size={16} />, label: 'Privacy & Security', to: '/settings' },
    { icon: <SettingsIcon size={16} />, label: 'App Settings', to: '/settings' },
  ]

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">

        {/* Profile hero */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />

          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}>
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #6c63ff)' }}>
                <Edit3 size={12} className="text-white" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name || 'Weather User'}</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Mail size={11} /> {user?.email}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin size={11} /> {user?.location || 'Mumbai, India'}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white" style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}>
                  Pro Member
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
            {[
              { label: 'Saved Cities', value: favourites.length },
              { label: 'Searches', value: 24 },
              { label: 'Alerts Set', value: 3 },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black gradient-text">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Current location weather */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current Location</p>
            <p className="font-semibold">{current.city}, {current.country}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black">{current.temp}°C</p>
            <p className="text-xs text-muted-foreground capitalize">{current.description}</p>
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass rounded-2xl overflow-hidden">
          {menuItems.map(({ icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-all border-b last:border-b-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--muted)', color: 'var(--primary)' }}>
                {icon}
              </div>
              <span className="text-sm font-medium flex-1">{label}</span>
              <span className="text-muted-foreground text-xs">›</span>
            </Link>
          ))}
        </motion.div>

        {/* Favourite cities shortcut */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/favourites" className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all block">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)' }}>
              <Heart size={16} className="text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Favourite Locations</p>
              <p className="text-xs text-muted-foreground">{favourites.join(', ') || 'None saved'}</p>
            </div>
            <span className="text-muted-foreground text-xs">›</span>
          </Link>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3 hover:bg-red-400/10 transition-all border border-red-400/20"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-400/15">
            <LogOut size={16} className="text-red-400" />
          </div>
          <span className="text-sm font-medium text-red-400">Sign Out</span>
        </motion.button>
      </div>
    </div>
  )
}
