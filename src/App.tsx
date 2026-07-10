import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { WeatherProvider } from './context/WeatherContext'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import SplashScreen from './pages/SplashScreen'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import SearchCity from './pages/SearchCity'
import WeatherDetails from './pages/WeatherDetails'
import Forecast from './pages/Forecast'
import AirQuality from './pages/AirQuality'
import WeatherMaps from './pages/WeatherMaps'
import Favourites from './pages/Favourites'
import Profile from './pages/Profile'
import SettingsPage from './pages/Settings'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WeatherProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchCity />} />
              <Route path="/details" element={<WeatherDetails />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/air-quality" element={<AirQuality />} />
              <Route path="/maps" element={<WeatherMaps />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WeatherProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
