import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Bot, Sparkles } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'

interface Message { role: 'user' | 'ai'; text: string }

const AI_RESPONSES = (weather: { city: string; temp: number; description: string; humidity: number; wind_speed: number }) => ({
  default: [
    `Based on current conditions in ${weather.city} (${weather.temp}°C, ${weather.description}), expect a warm and partly cloudy day. UV index is elevated — use SPF 50+.`,
    `The ${weather.humidity}% humidity in ${weather.city} will make it feel warmer. Light cotton clothing is recommended. Stay hydrated!`,
    `With ${weather.wind_speed} km/h winds and ${weather.description.toLowerCase()} skies, outdoor activities are suitable in the morning. Afternoon may get warm.`,
  ],
  rain: ['Rain is expected today. Carry an umbrella and wear waterproof footwear. Avoid low-lying areas prone to flooding.'],
  clothing: [`For ${weather.temp}°C in ${weather.city}: Light cotton shirt and shorts/skirt. Sunscreen SPF 50. Sunglasses recommended.`],
  travel: [`Good travel conditions this morning. If driving, ${weather.wind_speed > 30 ? 'be cautious of strong winds' : 'roads are clear'}. Rainfall chance increases in the evening.`],
  crops: [`Moderate temperature (${weather.temp}°C) and humidity (${weather.humidity}%) are good for most crops. Check soil moisture before irrigation.`],
  health: [`High UV index and ${weather.humidity}% humidity today. Drink 3-4L of water, avoid outdoor activity between 11am-3pm.`],
})

export default function AIAssistant({ onClose }: { onClose: () => void }) {
  const { current } = useWeather()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Hello! I'm your AI Weather Assistant. I can help with clothing advice, travel recommendations, crop advisories, and more for ${current.city}. What would you like to know?` }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const responses = AI_RESPONSES(current)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', text: userMsg }])
    setTyping(true)
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))

    const lower = userMsg.toLowerCase()
    let reply = responses.default[Math.floor(Math.random() * responses.default.length)]
    if (lower.includes('rain') || lower.includes('umbrella')) reply = responses.rain[0]
    else if (lower.includes('cloth') || lower.includes('wear') || lower.includes('dress')) reply = responses.clothing[0]
    else if (lower.includes('travel') || lower.includes('drive') || lower.includes('go')) reply = responses.travel[0]
    else if (lower.includes('crop') || lower.includes('farm') || lower.includes('agri')) reply = responses.crops[0]
    else if (lower.includes('health') || lower.includes('uv') || lower.includes('safe')) reply = responses.health[0]

    setTyping(false)
    setMessages(m => [...m, { role: 'ai', text: reply }])
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-80 md:w-96 flex flex-col"
      style={{ height: 480 }}
    >
      <div className="glass-strong flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(168,85,247,0.2))' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Weather Assistant</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
                  <Bot size={12} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-white'
                    : 'text-foreground'
                }`}
                style={{
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #6c63ff, #a855f7)'
                    : 'var(--muted)',
                  borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '0 1rem 1rem 1rem',
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
                <Bot size={12} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl flex gap-1" style={{ background: 'var(--muted)', borderRadius: '0 1rem 1rem 1rem' }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary" />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="px-3 py-2 flex gap-2 overflow-x-auto">
          {['Clothing?', 'Travel tips', 'Crop advice', 'Health tips'].map(q => (
            <button key={q} onClick={() => { setInput(q); }}
              className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs border transition-all hover:bg-primary/20"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 pb-3 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about weather..."
            className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
            style={{ background: 'var(--muted)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}
          >
            <Send size={14} className="text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
