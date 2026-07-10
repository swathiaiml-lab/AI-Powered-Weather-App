import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Droplets } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'
import { WEATHER_ICONS } from '../data/mockWeather'
import { useTheme } from '../context/ThemeContext'

export default function Forecast() {
  const { forecast, current } = useWeather()
  const { theme } = useTheme()

  const barData = forecast.map(d => ({ day: d.day, high: d.high, low: d.low }))
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
            <h1 className="text-xl font-bold">7-Day Forecast</h1>
            <p className="text-xs text-muted-foreground">{current.city}, {current.country}</p>
          </div>
        </motion.div>

        {/* Temp bar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold mb-4">Temperature Range</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ background: 'rgba(10,14,39,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                labelStyle={{ color: '#9ca3c8' }}
              />
              <Bar dataKey="high" name="High °C" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={`rgba(239,68,68,${0.5 + i * 0.05})`} />
                ))}
              </Bar>
              <Bar dataKey="low" name="Low °C" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={`rgba(96,165,250,${0.5 + i * 0.05})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />High</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-3 rounded-full bg-blue-400 opacity-80" />Low</div>
          </div>
        </motion.div>

        {/* Daily rows */}
        <div className="space-y-2">
          {forecast.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="glass rounded-2xl px-4 py-3 flex items-center gap-4"
            >
              <div className="w-14 text-sm font-semibold">{day.day}</div>
              <span className="text-2xl">{WEATHER_ICONS[day.icon] || '🌤️'}</span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{day.desc}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Droplets size={10} className="text-blue-400" />
                  <span className="text-[10px] text-blue-400">{day.rain}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-red-400">{day.high}°</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-blue-400">{day.low}°</span>
              </div>

              {/* Temp bar */}
              <div className="w-20 h-1.5 rounded-full overflow-hidden hidden sm:block" style={{ background: 'var(--muted)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    marginLeft: `${((day.low - 20) / 20) * 100}%`,
                    width: `${((day.high - day.low) / 20) * 100}%`,
                    background: 'linear-gradient(90deg, #60a5fa, #f97316)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold mb-2">Weekly Summary</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Temperatures will range from {Math.min(...forecast.map(d => d.low))}°C to {Math.max(...forecast.map(d => d.high))}°C this week.
            Expect rainfall mid-week with clearing skies by the weekend. UV levels remain elevated — sun protection is advised daily.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
