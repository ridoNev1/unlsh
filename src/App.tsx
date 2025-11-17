import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import UpcomingEventsPage from "./pages/UpcomingEventsPage";
import FormPage from "./pages/FormPage";
import AdminPage from "./pages/admin/dashboard/admin-page";
import { Toaster } from "./components/ui/sonner";
import LoginPage from "./pages/admin/login";
import { AdminAuthProvider } from "@/sections/admin/auth-context";
import ProtectedAdminRoute from "@/sections/admin/ProtectedAdminRoute";

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => {
  return (
    <AdminAuthProvider>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
        <Route path="/contact" element={<FormPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </AdminAuthProvider>
  );
};

export default App;
