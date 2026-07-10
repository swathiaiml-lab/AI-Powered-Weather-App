import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { MOCK_CURRENT, MOCK_HOURLY, MOCK_FORECAST, MOCK_AQI } from '../data/mockWeather'

interface WeatherData {
  current: typeof MOCK_CURRENT
  hourly: typeof MOCK_HOURLY
  forecast: typeof MOCK_FORECAST
  aqi: typeof MOCK_AQI
  loading: boolean
  city: string
}

interface WeatherContextType extends WeatherData {
  fetchWeather: (city: string) => Promise<void>
  favourites: string[]
  addFavourite: (city: string) => void
  removeFavourite: (city: string) => void
  recentSearches: string[]
}

const WeatherContext = createContext<WeatherContextType | null>(null)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('Mumbai')
  const [current, setCurrent] = useState(MOCK_CURRENT)
  const [hourly] = useState(MOCK_HOURLY)
  const [forecast] = useState(MOCK_FORECAST)
  const [aqi] = useState(MOCK_AQI)
  const [favourites, setFavourites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('favourites') || '["Mumbai","Delhi"]') } catch { return ['Mumbai', 'Delhi'] }
  })
  const [recentSearches, setRecentSearches] = useState<string[]>(['Mumbai', 'Delhi', 'Bangalore'])

  const fetchWeather = useCallback(async (cityName: string) => {
    setLoading(true)
    setCity(cityName)

    const apiKey = localStorage.getItem('openweather-api-key')
    if (apiKey) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        )
        if (res.ok) {
          const data = await res.json()
          setCurrent({
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind_speed: Math.round(data.wind.speed * 3.6),
            pressure: data.main.pressure,
            visibility: Math.round((data.visibility || 10000) / 1000),
            uv_index: 5,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            rain_prob: data.rain ? 60 : 10,
            aqi: 100,
          })
        }
      } catch { /* use mock */ }
    } else {
      // Simulate loading with mock data
      await new Promise(r => setTimeout(r, 800))
      setCurrent({ ...MOCK_CURRENT, city: cityName })
    }

    setRecentSearches(prev => [cityName, ...prev.filter(c => c !== cityName)].slice(0, 5))
    setLoading(false)
  }, [])

  const addFavourite = (c: string) => {
    setFavourites(prev => {
      const next = [...new Set([...prev, c])]
      localStorage.setItem('favourites', JSON.stringify(next))
      return next
    })
  }

  const removeFavourite = (c: string) => {
    setFavourites(prev => {
      const next = prev.filter(x => x !== c)
      localStorage.setItem('favourites', JSON.stringify(next))
      return next
    })
  }

  return (
    <WeatherContext.Provider value={{ current, hourly, forecast, aqi, loading, city, fetchWeather, favourites, addFavourite, removeFavourite, recentSearches }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error('useWeather must be inside WeatherProvider')
  return ctx
}
