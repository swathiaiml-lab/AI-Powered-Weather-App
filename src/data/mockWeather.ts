export const WEATHER_ICONS: Record<string, string> = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
}

export const MOCK_CURRENT = {
  city: 'Mumbai',
  country: 'IN',
  temp: 31,
  feels_like: 35,
  description: 'Partly Cloudy',
  icon: '02d',
  humidity: 72,
  wind_speed: 14,
  pressure: 1008,
  visibility: 8,
  uv_index: 7,
  sunrise: '06:14',
  sunset: '19:28',
  rain_prob: 40,
  aqi: 156,
}

export const MOCK_HOURLY = [
  { time: 'Now', temp: 31, icon: '02d' },
  { time: '1 PM', temp: 33, icon: '01d' },
  { time: '2 PM', temp: 34, icon: '01d' },
  { time: '3 PM', temp: 34, icon: '02d' },
  { time: '4 PM', temp: 32, icon: '10d' },
  { time: '5 PM', temp: 30, icon: '10d' },
  { time: '6 PM', temp: 29, icon: '09d' },
  { time: '7 PM', temp: 28, icon: '02n' },
]

export const MOCK_FORECAST = [
  { day: 'Today', high: 34, low: 27, icon: '02d', desc: 'Partly Cloudy', rain: 40 },
  { day: 'Tue', high: 36, low: 28, icon: '01d', desc: 'Sunny', rain: 5 },
  { day: 'Wed', high: 32, low: 26, icon: '10d', desc: 'Light Rain', rain: 70 },
  { day: 'Thu', high: 29, low: 25, icon: '11d', desc: 'Thunderstorm', rain: 90 },
  { day: 'Fri', high: 31, low: 26, icon: '02d', desc: 'Partly Cloudy', rain: 30 },
  { day: 'Sat', high: 33, low: 27, icon: '01d', desc: 'Sunny', rain: 10 },
  { day: 'Sun', high: 35, low: 28, icon: '01d', desc: 'Clear Sky', rain: 5 },
]

export const MOCK_AQI = {
  aqi: 156,
  level: 'Unhealthy',
  color: '#ff6b35',
  pm25: 67.4,
  pm10: 112.3,
  o3: 89.2,
  no2: 34.1,
  so2: 12.8,
  co: 0.9,
}

export const MOCK_CITIES = [
  { city: 'Mumbai', country: 'IN', temp: 31, icon: '02d', desc: 'Partly Cloudy' },
  { city: 'Delhi', country: 'IN', temp: 38, icon: '01d', desc: 'Sunny' },
  { city: 'Bangalore', country: 'IN', temp: 26, icon: '10d', desc: 'Light Rain' },
  { city: 'Chennai', country: 'IN', temp: 33, icon: '02d', desc: 'Partly Cloudy' },
  { city: 'Hyderabad', country: 'IN', temp: 35, icon: '01d', desc: 'Clear Sky' },
  { city: 'Kolkata', country: 'IN', temp: 30, icon: '09d', desc: 'Drizzle' },
]

export const MOCK_CHART_DATA = [
  { time: '6 AM', temp: 27, humidity: 80, wind: 10 },
  { time: '9 AM', temp: 29, humidity: 75, wind: 12 },
  { time: '12 PM', temp: 33, humidity: 68, wind: 15 },
  { time: '3 PM', temp: 34, humidity: 65, wind: 18 },
  { time: '6 PM', temp: 31, humidity: 70, wind: 14 },
  { time: '9 PM', temp: 29, humidity: 78, wind: 11 },
  { time: '12 AM', temp: 27, humidity: 82, wind: 8 },
]

export const AI_RECOMMENDATIONS = [
  { icon: '👕', title: 'Clothing', tip: 'Light cotton clothes recommended. High humidity expected — avoid synthetic fabrics.' },
  { icon: '🚗', title: 'Travel', tip: 'Good travel conditions in the morning. Afternoon rain expected — carry an umbrella.' },
  { icon: '🌾', title: 'Crop Advisory', tip: 'Moderate rainfall expected. Ideal for paddy cultivation. Avoid pesticide spraying.' },
  { icon: '💊', title: 'Health Alert', tip: 'High UV index (7). Apply sunscreen SPF 50+. Stay hydrated — drink 3L water.' },
]
