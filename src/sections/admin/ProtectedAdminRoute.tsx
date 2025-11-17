import type { ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAdminAuth } from "@/sections/admin/auth-context"

const ProtectedAdminRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, initialized } = useAdminAuth()
  const location = useLocation()

  if (!initialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white/70">
        Memuat...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedAdminRoute
