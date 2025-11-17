export type AdminUser = {
  id: string
  email: string
  role: string
}

const TOKEN_KEY = "unlsh:admin:token"
const USER_KEY = "unlsh:admin:user"

const isBrowser = () => typeof window !== "undefined"

export const getAuthToken = () => {
  if (!isBrowser()) return null
  return localStorage.getItem(TOKEN_KEY)
}

export const getAuthUser = (): AdminUser | null => {
  if (!isBrowser()) return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AdminUser
  } catch {
    return null
  }
}

export const setAuthSession = (token: string, user: AdminUser) => {
  if (!isBrowser()) return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const clearAuthSession = () => {
  if (!isBrowser()) return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
