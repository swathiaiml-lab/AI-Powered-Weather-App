import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'
import { MOCK_AQI } from '../data/mockWeather'

const AQI_LEVELS = [
  { range: '0-50', level: 'Good', color: '#22c55e', desc: 'Air quality is satisfactory.' },
  { range: '51-100', level: 'Moderate', color: '#eab308', desc: 'Acceptable; sensitive groups may experience minor issues.' },
  { range: '101-150', level: 'Unhealthy (Sensitive)', color: '#f97316', desc: 'Sensitive groups may experience health effects.' },
  { range: '151-200', level: 'Unhealthy', color: '#ef4444', desc: 'Everyone may begin to experience health effects.' },
  { range: '201-300', level: 'Very Unhealthy', color: '#a855f7', desc: 'Health alert: everyone may experience serious effects.' },
  { range: '300+', level: 'Hazardous', color: '#7f1d1d', desc: 'Health warnings of emergency conditions.' },
]

const POLLUTANTS = [
  { key: 'pm25', label: 'PM2.5', value: MOCK_AQI.pm25, unit: 'µg/m³', safe: 35, color: '#ef4444' },
  { key: 'pm10', label: 'PM10', value: MOCK_AQI.pm10, unit: 'µg/m³', safe: 150, color: '#f97316' },
  { key: 'o3', label: 'O₃ (Ozone)', value: MOCK_AQI.o3, unit: 'µg/m³', safe: 100, color: '#eab308' },
  { key: 'no2', label: 'NO₂', value: MOCK_AQI.no2, unit: 'µg/m³', safe: 40, color: '#6c63ff' },
  { key: 'so2', label: 'SO₂', value: MOCK_AQI.so2, unit: 'µg/m³', safe: 20, color: '#a855f7' },
  { key: 'co', label: 'CO', value: MOCK_AQI.co, unit: 'mg/m³', safe: 4, color: '#00d4ff' },
]

const radarData = POLLUTANTS.map(p => ({
  subject: p.label,
  value: Math.min((p.value / (p.safe * 2)) * 100, 100),
}))

const currentLevel = AQI_LEVELS.find((_, i) => {
  const aqi = MOCK_AQI.aqi
  const ranges = [[0,50],[51,100],[101,150],[151,200],[201,300],[301,999]]
  return aqi >= ranges[i][0] && aqi <= ranges[i][1]
}) || AQI_LEVELS[2]

export default function AirQuality() {
  const { current } = useWeather()

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <Link to="/home" className="w-9 h-9 glass rounded-xl flex items-center justify-center">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Air Quality</h1>
            <p className="text-xs text-muted-foreground">{current.city}</p>
          </div>
        </motion.div>

        {/* AQI hero */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 0%, ${currentLevel.color}, transparent 70%)` }} />

          <div className="relative">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-3 border-4"
              style={{ borderColor: currentLevel.color, background: `${currentLevel.color}20` }}>
              <div>
                <p className="text-4xl font-black" style={{ color: currentLevel.color }}>{MOCK_AQI.aqi}</p>
                <p className="text-[10px] text-muted-foreground">AQI</p>
              </div>
            </div>
            <p className="text-lg font-bold mb-1" style={{ color: currentLevel.color }}>{currentLevel.level}</p>
            <p className="text-sm text-muted-foreground">{currentLevel.desc}</p>

            {/* Progress bar */}
            <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((MOCK_AQI.aqi / 300) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #22c55e, #eab308, #ef4444)` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Good</span><span>Moderate</span><span>Unhealthy</span><span>Hazardous</span>
            </div>
          </div>
        </motion.div>

        {/* Pollutants */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold mb-4">Pollutant Levels</p>
          <div className="space-y-3">
            {POLLUTANTS.map((p, i) => {
              const pct = Math.min((p.value / (p.safe * 2)) * 100, 100)
              const isHigh = p.value > p.safe
              return (
                <motion.div key={p.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{p.label}</span>
                    <span className="text-xs" style={{ color: isHigh ? '#ef4444' : '#22c55e' }}>
                      {p.value} {p.unit} {isHigh ? '▲' : '✓'}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span>0</span><span>Safe: {p.safe}</span><span>{p.safe * 2}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Radar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-2xl p-4">
          <p className="text-sm font-semibold mb-2">Pollution Profile</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3c8', fontSize: 10 }} />
              <Radar name="AQI" dataKey="value" stroke="#6c63ff" fill="#6c63ff" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Health advice */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-4 space-y-2">
          <p className="text-sm font-semibold">Health Advisory</p>
          {[
            { icon: '😷', text: 'Wear N95 mask when outdoors' },
            { icon: '🏃', text: 'Avoid intense outdoor exercise between 12-4 PM' },
            { icon: '🪟', text: 'Keep windows closed; use air purifier indoors' },
            { icon: '💧', text: 'Stay hydrated — drink 3-4 liters of water daily' },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg">{icon}</span>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
