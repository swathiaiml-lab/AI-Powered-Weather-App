import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import WeatherBackground from '../components/WeatherBackground'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) return
    setLoading(true)
    await register(name, email, password)
    setLoading(false)
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <WeatherBackground icon="02d" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 pulse-glow"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
            <span className="text-3xl">⛅</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join WeatherAI today</p>
        </div>

        <div className="glass p-6 space-y-4">
          {[
            { icon: <User size={16} />, type: 'text', placeholder: 'Full Name', value: name, onChange: setName },
            { icon: <Mail size={16} />, type: 'email', placeholder: 'Email address', value: email, onChange: setEmail },
            { icon: <Lock size={16} />, type: 'password', placeholder: 'Password (min. 8 chars)', value: password, onChange: setPassword },
          ].map(({ icon, type, placeholder, value, onChange }, i) => (
            <div key={i} className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--muted)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
          ))}

          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our <span className="text-primary cursor-pointer">Terms</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>.
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}
          >
            {loading
              ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              : <><span>Create Account</span><ArrowRight size={16} /></>
            }
          </motion.button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  )
}
