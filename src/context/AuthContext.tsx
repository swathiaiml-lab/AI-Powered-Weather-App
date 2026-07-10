import { createContext, useContext, useState, type ReactNode } from 'react'

interface User {
  name: string
  email: string
  avatar?: string
  location?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem('weather-user') || 'null') } catch { return null }
  })

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1000))
    const u = { name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()), email, location: 'Mumbai, India' }
    setUser(u)
    localStorage.setItem('weather-user', JSON.stringify(u))
    return true
  }

  const register = async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1000))
    const u = { name, email, location: 'Mumbai, India' }
    setUser(u)
    localStorage.setItem('weather-user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('weather-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
