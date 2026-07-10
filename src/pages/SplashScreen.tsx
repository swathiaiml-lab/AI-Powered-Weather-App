import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import WeatherBackground from '../components/WeatherBackground'
import { useAuth } from '../context/AuthContext'

export default function SplashScreen() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(isAuthenticated ? '/home' : '/login')
    }, 3000)
    return () => clearTimeout(t)
  }, [navigate, isAuthenticated])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <WeatherBackground icon="01d" />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.4) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 pulse-glow"
          style={{ background: 'linear-gradient(135deg, #6c63ff 0%, #a855f7 50%, #00d4ff 100%)' }}
        >
          <span className="text-6xl">⛅</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black mb-2 gradient-text"
        >
          WeatherAI
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-center text-sm font-medium mb-12"
        >
          AI-Powered Weather Intelligence
        </motion.p>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}
            />
          ))}
        </div>
      </motion.div>

      {/* Version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-xs text-muted-foreground"
      >
        v2.0 • Powered by OpenWeather & Claude AI
      </motion.p>
    </div>
  )
}
