import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import WeatherBackground from '../components/WeatherBackground'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill all fields'); return }
    setLoading(true)
    setError('')
    const ok = await login(email, password)
    setLoading(false)
    if (ok) navigate('/home')
    else setError('Invalid credentials')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <WeatherBackground icon="01n" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 pulse-glow"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
            <span className="text-3xl">⛅</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">WeatherAI</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Form card */}
        <div className="glass p-6 space-y-4">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
              {error}
            </motion.div>
          )}

          <InputField
            icon={<Mail size={16} />}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={setEmail}
          />

          <div className="relative">
            <InputField
              icon={<Lock size={16} />}
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <><span>Sign In</span><ArrowRight size={16} /></>
            )}
          </motion.button>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <button
            onClick={() => { login('demo@weatherai.com', 'demo'); navigate('/home') }}
            className="w-full py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-white/5 flex items-center justify-center gap-2"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            <span className="text-lg">🌤️</span> Guest / Demo Mode
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don"t have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}

function InputField({ icon, type, placeholder, value, onChange }: {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-1 transition-all"
        style={{
          background: 'var(--muted)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
          '--tw-ring-color': 'var(--primary)',
        } as React.CSSProperties}
      />
    </div>
  )
}
