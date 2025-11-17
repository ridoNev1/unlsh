import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  type AdminUser,
} from "@/sections/admin/auth-storage"

interface AdminAuthValue {
  user: AdminUser | null
  token: string | null
  isAuthenticated: boolean
  initialized: boolean
  refreshSession: () => void
  signOut: () => void
}

const AdminAuthContext = createContext<AdminAuthValue | undefined>(undefined)

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const refreshSession = useCallback(() => {
    setUser(getAuthUser())
    setToken(getAuthToken())
  }, [])

  useEffect(() => {
    refreshSession()
    setInitialized(true)

    const handleStorage = () => refreshSession()
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [refreshSession])

  const signOut = useCallback(() => {
    clearAuthSession()
    refreshSession()
  }, [refreshSession])

  const value = useMemo<AdminAuthValue>(
    () => ({
      user,
      token,
      initialized,
      isAuthenticated: Boolean(user && token),
      refreshSession,
      signOut,
    }),
    [user, token, initialized, refreshSession, signOut]
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider")
  }
  return context
}
