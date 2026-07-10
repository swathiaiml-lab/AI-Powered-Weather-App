import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Bell, MessageCircle, ChevronRight, Droplets, Wind, Eye, Gauge } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import WeatherBackground from '../components/WeatherBackground'
import AIAssistant from '../components/AIAssistant'
import SkeletonLoader from '../components/SkeletonLoader'
import { WEATHER_ICONS, AI_RECOMMENDATIONS } from '../data/mockWeather'

export default function Home() {
  const { current, hourly, loading, fetchWeather, favourites } = useWeather()
  const { user } = useAuth()
  useTheme()
  const [showAI, setShowAI] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchWeather(current.city)
  }, [])

  const aqiColor = current.aqi > 150 ? '#ef4444' : current.aqi > 100 ? '#f97316' : '#22c55e'

  return (
    <div className="min-h-screen pb-24 md:pb-8 pt-16">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'},</p>
            <h2 className="text-lg font-bold">{user?.name?.split(' ')[0] || 'Guest'} 👋</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 glass rounded-xl flex items-center justify-center">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
            </button>
          </div>
        </div>

        {/* Weather Alert */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass border border-yellow-400/30 rounded-xl px-3 py-2 flex items-center justify-between"
              style={{ background: 'rgba(251,191,36,0.08)' }}
            >
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <p className="text-xs font-medium text-yellow-400">Heat alert: Temperature may reach 36°C today</p>
              </div>
              <button onClick={() => setShowAlert(false)} className="text-muted-foreground text-xs">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? <SkeletonLoader /> : (
          <>
            {/* Main Weather Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-3xl p-6 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <button onClick={() => navigate('/search')} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-1">
                    <MapPin size={14} />
                    {current.city}, {current.country}
                    <ChevronRight size={14} />
                  </button>
                  <div className="flex items-end gap-2">
                    <span className="text-7xl font-black leading-none">{current.temp}°</span>
                    <div className="mb-2">
                      <span className="text-lg font-medium text-muted-foreground">C</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize mt-1">{current.description}</p>
                  <p className="text-xs text-muted-foreground">Feels like {current.feels_like}°C</p>
                </div>
                <div className="float">
                  <span className="text-7xl">{WEATHER_ICONS[current.icon] || '🌤️'}</span>
                </div>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { icon: <Droplets size={14} />, label: 'Humidity', value: `${current.humidity}%` },
                  { icon: <Wind size={14} />, label: 'Wind', value: `${current.wind_speed}km/h` },
                  { icon: <Eye size={14} />, label: 'Visibility', value: `${current.visibility}km` },
                  { icon: <Gauge size={14} />, label: 'Pressure', value: `${current.pressure}` },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="glass rounded-xl p-2 text-center">
                    <div className="flex justify-center text-primary mb-1">{icon}</div>
                    <p className="text-xs font-semibold">{value}</p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hourly Forecast */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Hourly Forecast</p>
                <Link to="/forecast" className="text-xs text-primary">7-Day →</Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {hourly.map((h, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-xl ${i === 0 ? 'bg-primary/20' : ''}`}>
                    <p className="text-[10px] text-muted-foreground font-medium">{h.time}</p>
                    <span className="text-xl">{WEATHER_ICONS[h.icon] || '🌤️'}</span>
                    <p className="text-xs font-bold">{h.temp}°</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sun + UV + Rain row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-3">
              <div className="glass rounded-2xl p-3 text-center">
                <span className="text-2xl">🌅</span>
                <p className="text-xs text-muted-foreground mt-1">Sunrise</p>
                <p className="text-sm font-bold">{current.sunrise}</p>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <span className="text-2xl">🌇</span>
                <p className="text-xs text-muted-foreground mt-1">Sunset</p>
                <p className="text-sm font-bold">{current.sunset}</p>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <span className="text-2xl">☔</span>
                <p className="text-xs text-muted-foreground mt-1">Rain Prob.</p>
                <p className="text-sm font-bold">{current.rain_prob}%</p>
              </div>
            </motion.div>

            {/* UV + AQI */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-medium">UV Index</p>
                  <span className="text-lg">🌞</span>
                </div>
                <p className="text-3xl font-black">{current.uv_index}</p>
                <p className="text-xs font-medium" style={{ color: current.uv_index >= 6 ? '#f97316' : '#22c55e' }}>
                  {current.uv_index >= 8 ? 'Very High' : current.uv_index >= 6 ? 'High' : current.uv_index >= 3 ? 'Moderate' : 'Low'}
                </p>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(current.uv_index / 11) * 100}%`, background: 'linear-gradient(90deg, #22c55e, #f97316, #ef4444)' }} />
                </div>
              </div>

              <Link to="/air-quality">
                <div className="glass rounded-2xl p-4 h-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground font-medium">Air Quality</p>
                    <span className="text-lg">💨</span>
                  </div>
                  <p className="text-3xl font-black">{current.aqi}</p>
                  <p className="text-xs font-medium" style={{ color: aqiColor }}>
                    {current.aqi > 150 ? 'Unhealthy' : current.aqi > 100 ? 'Moderate' : 'Good'} AQI
                  </p>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min((current.aqi / 300) * 100, 100)}%`, background: 'linear-gradient(90deg, #22c55e, #f97316, #ef4444)' }} />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg flex items-center justify-center text-xs" style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>✨</span>
                  AI Recommendations
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {AI_RECOMMENDATIONS.map(({ icon, title, tip }) => (
                  <div key={title} className="glass rounded-2xl p-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <p className="text-xs font-semibold">{title}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-3 gap-3">
              {[
                { to: '/forecast', icon: '📅', label: '7-Day' },
                { to: '/air-quality', icon: '🌬️', label: 'Air Quality' },
                { to: '/maps', icon: '🗺️', label: 'Weather Map' },
              ].map(({ to, icon, label }) => (
                <Link key={to} to={to}>
                  <motion.div whileTap={{ scale: 0.95 }} className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                    <span className="text-2xl">{icon}</span>
                    <p className="text-xs font-medium mt-1">{label}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Favourites */}
            {favourites.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">Saved Locations</p>
                  <Link to="/favourites" className="text-xs text-primary">View all →</Link>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {favourites.slice(0, 4).map(city => (
                    <motion.button
                      key={city}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fetchWeather(city)}
                      className="flex-shrink-0 glass rounded-xl px-4 py-3 text-center min-w-[100px]"
                    >
                      <span className="text-xl">🌤️</span>
                      <p className="text-xs font-medium mt-1">{city}</p>
                      <p className="text-sm font-bold">{current.temp}°</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* AI Assistant FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAI(v => !v)}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl pulse-glow"
        style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}
      >
        <MessageCircle size={22} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
      </AnimatePresence>
    </div>
  )
}
