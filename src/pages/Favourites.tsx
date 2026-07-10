import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Plus, Trash2 } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'
import { WEATHER_ICONS, MOCK_CITIES } from '../data/mockWeather'

export default function Favourites() {
  const { favourites, addFavourite, removeFavourite, fetchWeather, current } = useWeather()
  const navigate = useNavigate()

  const otherCities = MOCK_CITIES.filter(c => !favourites.includes(c.city))

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Heart size={20} className="text-red-400" fill="currentColor" />
            Favourite Locations
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{favourites.length} saved cities</p>
        </motion.div>

        {/* Saved cities */}
        <div className="space-y-3">
          <AnimatePresence>
            {favourites.map((city, i) => {
              const data = MOCK_CITIES.find(c => c.city === city) || { city, country: 'IN', temp: current.temp, icon: current.icon, desc: current.description }
              return (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'var(--muted)' }}>
                    {WEATHER_ICONS[data.icon] || '🌤️'}
                  </div>
                  <button
                    className="flex-1 text-left"
                    onClick={async () => { await fetchWeather(city); navigate('/home') }}
                  >
                    <p className="font-semibold text-sm">{city}</p>
                    <p className="text-xs text-muted-foreground">{data.desc}</p>
                  </button>
                  <span className="text-xl font-bold mr-2">{data.temp}°</span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => removeFavourite(city)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {favourites.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8 text-center">
              <span className="text-4xl block mb-3">📍</span>
              <p className="text-sm font-medium">No saved cities yet</p>
              <p className="text-xs text-muted-foreground mt-1">Search and add cities to access them quickly</p>
            </motion.div>
          )}
        </div>

        {/* Add more */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Plus size={14} className="text-primary" />
            Add Cities
          </p>
          <div className="grid grid-cols-2 gap-3">
            {otherCities.map((city, i) => (
              <motion.button
                key={city.city}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addFavourite(city.city)}
                className="glass rounded-2xl p-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
              >
                <span className="text-2xl">{WEATHER_ICONS[city.icon] || '🌤️'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{city.city}</p>
                  <p className="text-[10px] text-muted-foreground">{city.temp}°C</p>
                </div>
                <Plus size={14} className="text-primary flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
