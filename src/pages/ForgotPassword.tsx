import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import WeatherBackground from '../components/WeatherBackground'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <WeatherBackground icon="02n" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <Link to="/login" className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft size={16} /> Back to Sign In
        </Link>

        {sent ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(108,99,255,0.2)' }}>
              <CheckCircle size={32} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold">Email Sent!</h2>
            <p className="text-sm text-muted-foreground">We sent a password reset link to <strong>{email}</strong>. Check your inbox.</p>
            <Link to="/login" className="block w-full py-3 rounded-xl font-semibold text-white text-sm text-center" style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}>
              Back to Sign In
            </Link>
          </motion.div>
        ) : (
          <div className="glass p-6 space-y-4">
            <div className="mb-2">
              <h2 className="text-xl font-bold gradient-text">Reset Password</h2>
              <p className="text-sm text-muted-foreground mt-1">Enter your email to receive a reset link</p>
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--muted)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}
            >
              {loading
                ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                : 'Send Reset Link'}
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
