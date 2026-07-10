import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Droplets, Wind, Gauge, Eye, Thermometer, Sun } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'
import { WEATHER_ICONS, MOCK_CHART_DATA } from '../data/mockWeather'
import { useTheme } from '../context/ThemeContext'

export default function WeatherDetails() {
  const { current } = useWeather()
  const { theme } = useTheme()

  const stats = [
    { icon: <Droplets size={18} />, label: 'Humidity', value: `${current.humidity}%`, color: '#00d4ff' },
    { icon: <Wind size={18} />, label: 'Wind Speed', value: `${current.wind_speed} km/h`, color: '#6c63ff' },
    { icon: <Gauge size={18} />, label: 'Pressure', value: `${current.pressure} hPa`, color: '#a855f7' },
    { icon: <Eye size={18} />, label: 'Visibility', value: `${current.visibility} km`, color: '#22c55e' },
    { icon: <Thermometer size={18} />, label: 'Feels Like', value: `${current.feels_like}°C`, color: '#f97316' },
    { icon: <Sun size={18} />, label: 'UV Index', value: `${current.uv_index}`, color: '#eab308' },
  ]

  const textColor = theme === 'dark' ? '#9ca3c8' : '#6b7280'

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <Link to="/home" className="w-9 h-9 glass rounded-xl flex items-center justify-center">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{current.city} Details</h1>
            <p className="text-xs text-muted-foreground">Detailed weather analysis</p>
          </div>
        </motion.div>

        {/* Hero weather card */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 text-center">
          <div className="float inline-block mb-2">
            <span className="text-8xl">{WEATHER_ICONS[current.icon] || '🌤️'}</span>
          </div>
          <div className="text-6xl font-black mb-1">{current.temp}°C</div>
          <p className="text-muted-foreground capitalize text-sm">{current.description}</p>
          <p className="text-xs text-muted-foreground mt-0.5">H: {current.temp + 2}° · L: {current.temp - 5}°</p>

          <div className="flex justify-center gap-6 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Sunrise</p>
              <p className="text-sm font-bold">🌅 {current.sunrise}</p>
            </div>
            <div className="w-px" style={{ background: 'var(--border)' }} />
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Sunset</p>
              <p className="text-sm font-bold">🌇 {current.sunset}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3">
          {stats.map(({ icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="glass rounded-2xl p-3 text-center"
            >
              <div className="flex justify-center mb-2" style={{ color }}>{icon}</div>
              <p className="text-sm font-bold">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Temperature Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold mb-4">24h Temperature Trend</p>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ background: 'rgba(10,14,39,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                labelStyle={{ color: '#9ca3c8' }}
                itemStyle={{ color: '#6c63ff' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#6c63ff" strokeWidth={2} fill="url(#tempGrad)" name="Temp °C" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Humidity Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold mb-4">Humidity & Wind</p>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'rgba(10,14,39,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} labelStyle={{ color: '#9ca3c8' }} />
              <Area type="monotone" dataKey="humidity" stroke="#00d4ff" strokeWidth={2} fill="url(#humidGrad)" name="Humidity %" />
              <Area type="monotone" dataKey="wind" stroke="#a855f7" strokeWidth={2} fill="none" name="Wind km/h" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
