import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Layers } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'
import WeatherBackground from '../components/WeatherBackground'

const MAP_LAYERS = [
  { id: 'temp', label: 'Temperature', icon: '🌡️', color: '#ef4444' },
  { id: 'wind', label: 'Wind', icon: '💨', color: '#6c63ff' },
  { id: 'rain', label: 'Precipitation', icon: '🌧️', color: '#00d4ff' },
  { id: 'cloud', label: 'Cloud Cover', icon: '☁️', color: '#94a3b8' },
  { id: 'pressure', label: 'Pressure', icon: '📊', color: '#a855f7' },
]

export default function WeatherMaps() {
  const { current } = useWeather()
  const [activeLayer, setActiveLayer] = useState('temp')
  const apiKey = localStorage.getItem('openweather-api-key') || ''

  const layerMap: Record<string, string> = {
    temp: 'temp_new',
    wind: 'wind_new',
    rain: 'precipitation_new',
    cloud: 'clouds_new',
    pressure: 'pressure_new',
  }

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <Link to="/home" className="w-9 h-9 glass rounded-xl flex items-center justify-center">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Weather Maps</h1>
            <p className="text-xs text-muted-foreground">Live weather layers</p>
          </div>
        </motion.div>

        {/* Layer selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-1">
          {MAP_LAYERS.map(layer => (
            <motion.button
              key={layer.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${activeLayer === layer.id ? 'border-primary/50 text-primary' : 'border-transparent text-muted-foreground'}`}
              style={{ background: activeLayer === layer.id ? `${layer.color}20` : 'var(--card)', backdropFilter: 'blur(20px)' }}
            >
              <span>{layer.icon}</span>
              {layer.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Map display */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
          className="glass rounded-2xl overflow-hidden" style={{ height: 380 }}>
          {apiKey ? (
            <iframe
              src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=${layerMap[activeLayer]}&lat=20&lon=77&zoom=4`}
              className="w-full h-full border-0"
              title="Weather Map"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
              {/* Visual map placeholder */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a2a4a 0%, #1a3a5a 40%, #0d4a2a 100%)' }}>
                {/* Grid lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute w-full h-px opacity-20" style={{ top: `${(i + 1) * 12.5}%`, background: 'white' }} />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute h-full w-px opacity-20" style={{ left: `${(i + 1) * 10}%`, background: 'white' }} />
                ))}
                {/* Weather data points */}
                {[
                  { x: '20%', y: '30%', temp: 38, color: '#ef4444' },
                  { x: '45%', y: '45%', temp: 31, color: '#f97316' },
                  { x: '65%', y: '35%', temp: 26, color: '#22c55e' },
                  { x: '30%', y: '65%', temp: 33, color: '#eab308' },
                  { x: '75%', y: '60%', temp: 29, color: '#00d4ff' },
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: point.x, top: point.y }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs border-2"
                      style={{ background: `${point.color}80`, borderColor: point.color }}>
                      {point.temp}°
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="relative z-10 text-center">
                <Layers size={40} className="text-white/40 mx-auto mb-3" />
                <p className="text-sm font-medium text-white/80">Add OpenWeather API Key</p>
                <p className="text-xs text-white/50 mt-1">in Settings to view live maps</p>
                <Link to="/settings" className="mt-3 inline-block px-4 py-2 rounded-xl text-xs font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}>
                  Go to Settings
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-2xl p-4">
          <p className="text-xs font-semibold mb-3 text-muted-foreground">Temperature Scale</p>
          <div className="h-3 rounded-full" style={{ background: 'linear-gradient(90deg, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)' }} />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>-20°C</span><span>0°C</span><span>10°C</span><span>20°C</span><span>40°C</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
