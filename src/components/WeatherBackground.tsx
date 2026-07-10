import { useTheme } from '../context/ThemeContext'

interface Props { icon?: string }

export default function WeatherBackground({ icon = '01d' }: Props) {
  const { theme } = useTheme()

  const isRain = icon.startsWith('09') || icon.startsWith('10')
  const isSnow = icon.startsWith('13')
  const isThunder = icon.startsWith('11')
  const isClear = icon.startsWith('01')
  const isNight = icon.endsWith('n')

  const darkBg = isThunder
    ? 'linear-gradient(135deg, #0d0a1a 0%, #1a1040 40%, #0d1525 100%)'
    : isRain
    ? 'linear-gradient(135deg, #0a1628 0%, #1a2a4a 40%, #0d2035 100%)'
    : isNight
    ? 'linear-gradient(135deg, #020818 0%, #0d1240 40%, #1a0a35 100%)'
    : isClear
    ? 'linear-gradient(135deg, #0a1a4a 0%, #1a2a7a 40%, #0d3060 100%)'
    : 'linear-gradient(135deg, #0a0e27 0%, #1a1040 35%, #0d1b4b 65%, #0a2a3d 100%)'

  const lightBg = isClear
    ? 'linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 50%, #bae6fd 100%)'
    : isRain
    ? 'linear-gradient(135deg, #94a3b8 0%, #c7d2fe 50%, #93c5fd 100%)'
    : 'linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 35%, #bae6fd 65%, #e0f2fe 100%)'

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: theme === 'dark' ? darkBg : lightBg }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: 600, height: 600,
          top: -200, left: -100,
          background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          width: 500, height: 500,
          bottom: -150, right: -100,
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: 400, height: 400,
          top: '40%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
        }}
      />

      {/* Rain drops */}
      {isRain && Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute opacity-30"
          style={{
            width: 1,
            height: 20 + Math.random() * 30,
            left: `${Math.random() * 100}%`,
            background: 'linear-gradient(180deg, transparent, rgba(147,197,253,0.8))',
            animation: `rain ${0.5 + Math.random() * 0.5}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Snow */}
      {isSnow && Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-40"
          style={{
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            left: `${Math.random() * 100}%`,
            animation: `snowfall ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Stars for night */}
      {isNight && Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            opacity: 0.3 + Math.random() * 0.5,
            animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}
