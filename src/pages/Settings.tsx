import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Key, Globe, Bell, Thermometer, CheckCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import WeatherBackground from '../components/WeatherBackground'
import { useWeather } from '../context/WeatherContext'

const LANGUAGES = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'French', 'Spanish', 'Arabic']
const TEMP_UNITS = ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)']

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { current } = useWeather()
  const [apiKey, setApiKey] = useState(localStorage.getItem('openweather-api-key') || '')
  const [savedKey, setSavedKey] = useState(false)
  const [language, setLanguage] = useState('English')
  const [tempUnit, setTempUnit] = useState('Celsius (°C)')
  const [notifications, setNotifications] = useState({ alerts: true, daily: false, severe: true })
  const [windUnit, setWindUnit] = useState('km/h')

  const saveApiKey = () => {
    localStorage.setItem('openweather-api-key', apiKey)
    setSavedKey(true)
    setTimeout(() => setSavedKey(false), 2000)
  }

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{children}</p>
  )

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="w-12 h-6 rounded-full transition-all relative"
      style={{ background: value ? 'linear-gradient(135deg, #6c63ff, #a855f7)' : 'var(--muted)' }}
    >
      <motion.div
        animate={{ x: value ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  )

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-8">
      <WeatherBackground icon={current.icon} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Customize your WeatherAI experience</p>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <SectionTitle>Appearance</SectionTitle>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--muted)' }}>
                  {theme === 'dark' ? <Moon size={16} className="text-primary" /> : <Sun size={16} className="text-yellow-400" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                  <p className="text-xs text-muted-foreground">Toggle app theme</p>
                </div>
              </div>
              <Toggle value={theme === 'dark'} onChange={() => toggleTheme()} />
            </div>
          </div>
        </motion.div>

        {/* API Key */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SectionTitle>API Configuration</SectionTitle>
          <div className="glass rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Key size={16} className="text-primary" />
              <p className="text-sm font-medium">OpenWeather API Key</p>
            </div>
            <p className="text-xs text-muted-foreground">Get a free key at openweathermap.org/api — required for live data & maps.</p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Enter your API key..."
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--muted)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={saveApiKey}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2 transition-all"
                style={{ background: savedKey ? '#22c55e' : 'linear-gradient(135deg, #6c63ff, #a855f7)' }}
              >
                {savedKey ? <CheckCircle size={14} /> : <Key size={14} />}
                {savedKey ? 'Saved!' : 'Save'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Units */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <SectionTitle>Units & Display</SectionTitle>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-4 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Thermometer size={14} className="text-primary" />
                <p className="text-sm font-medium">Temperature Unit</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {TEMP_UNITS.map(u => (
                  <button key={u} onClick={() => setTempUnit(u)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${tempUnit === u ? 'text-white' : 'text-muted-foreground'}`}
                    style={{ background: tempUnit === u ? 'linear-gradient(135deg, #6c63ff, #a855f7)' : 'var(--muted)' }}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-sm font-medium mb-2">Wind Speed</p>
              <div className="flex gap-2">
                {['km/h', 'm/s', 'mph'].map(u => (
                  <button key={u} onClick={() => setWindUnit(u)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${windUnit === u ? 'text-white' : 'text-muted-foreground'}`}
                    style={{ background: windUnit === u ? 'linear-gradient(135deg, #6c63ff, #a855f7)' : 'var(--muted)' }}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SectionTitle>Language</SectionTitle>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-primary" />
              <p className="text-sm font-medium">App Language</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => (
                <button key={lang} onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${language === lang ? 'text-white' : 'text-muted-foreground'}`}
                  style={{ background: language === lang ? 'linear-gradient(135deg, #6c63ff, #a855f7)' : 'var(--muted)' }}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <SectionTitle>Notifications</SectionTitle>
          <div className="glass rounded-2xl overflow-hidden">
            {[
              { key: 'alerts', label: 'Weather Alerts', desc: 'Severe weather warnings' },
              { key: 'daily', label: 'Daily Forecast', desc: 'Morning weather briefing' },
              { key: 'severe', label: 'Severe Weather', desc: 'Emergency notifications' },
            ].map(({ key, label, desc }, i) => (
              <div key={key} className={`flex items-center justify-between px-4 py-3.5 ${i < 2 ? 'border-b' : ''}`} style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--muted)' }}>
                    <Bell size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <Toggle value={notifications[key as keyof typeof notifications]} onChange={v => setNotifications(n => ({ ...n, [key]: v }))} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-4 text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
            <span className="text-2xl">⛅</span>
          </div>
          <p className="font-bold gradient-text">WeatherAI v2.0</p>
          <p className="text-xs text-muted-foreground mt-1">AI-Powered Weather Intelligence</p>
          <p className="text-xs text-muted-foreground">Built with React + Tailwind + Framer Motion</p>
          <p className="text-xs text-muted-foreground mt-2">Final Year CS (AI & ML) Project</p>
        </motion.div>
      </div>
    </div>
  )
}
