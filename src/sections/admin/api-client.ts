import { clearAuthSession, getAuthToken } from "./auth-storage"

const BASE_URL = (import.meta.env.VITE_BASE_SERVER_URL || "").replace(/\/$/, "")

if (!BASE_URL) {
  console.warn("VITE_BASE_SERVER_URL is not defined. Admin API requests will fail.")
}

export class ApiError extends Error {
  status: number
  payload: any

  constructor(message: string, status: number, payload?: any) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

type ApiOptions = RequestInit & { auth?: boolean }

export const apiRequest = async <T = any>(path: string, options: ApiOptions = {}) => {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
  const headers = new Headers(options.headers || {})

  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  const token = getAuthToken()
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  })

  const text = await response.text()
  const payload = text ? safeJsonParse(text) : null

  if (response.status === 401) {
    clearAuthSession()
  }

  if (!response.ok) {
    throw new ApiError(payload?.message ?? "Permintaan gagal", response.status, payload)
  }

  return payload as T
}

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
