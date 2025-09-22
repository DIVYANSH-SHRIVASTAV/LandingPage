
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { isAuthenticated } from "./utils/auth";
import { useState } from "react";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

// ✅ Wrapper to decide where Navbar should show
function Layout({ children, dark, setDark }) {
  const location = useLocation();

  // Hide navbar ONLY on login and register routes
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      {!hideNavbar && <Navbar dark={dark} setDark={setDark} />}
      {children}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <Router>
      <Toaster />

      {/* Use Layout around all routes */}
      <Layout dark={dark} setDark={setDark}>
        <Routes>
          <Route path="/" element={<Landing dark={dark} />} />
          <Route path="/login" element={<Login dark={dark} />} />
          <Route path="/register" element={<Register dark={dark} />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard dark={dark} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile dark={dark} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}