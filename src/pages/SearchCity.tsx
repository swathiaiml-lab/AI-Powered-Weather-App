import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Clock, TrendingUp, MapPin } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'
import { MOCK_CITIES, WEATHER_ICONS } from '../data/mockWeather'

export default function SearchCity() {
  const [query, setQuery] = useState('')
  const { fetchWeather, recentSearches, current } = useWeather()
  const navigate = useNavigate()

  const filtered = query.length > 1
    ? MOCK_CITIES.filter(c => c.city.toLowerCase().includes(query.toLowerCase()))
    : []

  const handleSelect = async (city: string) => {
    await fetchWeather(city)
    navigate('/home')
  }

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-5">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold mb-1">Search City</h1>
          <p className="text-sm text-muted-foreground">Find weather for any city worldwide</p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-10 py-3.5 rounded-2xl text-sm outline-none"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)', backdropFilter: 'blur(20px)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          )}
        </motion.div>

        {/* Search results */}
        {filtered.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl overflow-hidden">
            {filtered.map((city, i) => (
              <motion.button
                key={city.city}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(city.city)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all border-b last:border-b-0"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--muted)' }}>
                    <span className="text-lg">{WEATHER_ICONS[city.icon] || '🌤️'}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{city.city}</p>
                    <p className="text-xs text-muted-foreground">{city.country} • {city.desc}</p>
                  </div>
                </div>
                <span className="text-lg font-bold">{city.temp}°</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Recent Searches */}
        {!query && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-muted-foreground" />
              <p className="text-sm font-semibold">Recent Searches</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map(city => (
                <motion.button
                  key={city}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(city)}
                  className="glass px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 hover:bg-white/10 transition-all"
                >
                  <MapPin size={11} className="text-primary" />
                  {city}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Popular Cities */}
        {!query && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-muted-foreground" />
              <p className="text-sm font-semibold">Popular Cities</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_CITIES.map((city, i) => (
                <motion.button
                  key={city.city}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(city.city)}
                  className="glass rounded-2xl p-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
                >
                  <span className="text-2xl">{WEATHER_ICONS[city.icon] || '🌤️'}</span>
                  <div>
                    <p className="text-sm font-semibold">{city.city}</p>
                    <p className="text-xs text-muted-foreground">{city.desc}</p>
                  </div>
                  <span className="ml-auto text-base font-bold">{city.temp}°</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
