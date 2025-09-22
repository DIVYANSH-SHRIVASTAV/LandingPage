
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/auth";

export default function Navbar({ dark, setDark }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className={`${dark ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} flex justify-between items-center px-6 py-3`}>
      <Link to="/" className="font-bold text-xl">MERN Auth</Link>

      <div className="space-x-4 flex items-center">
        <button
          onClick={() => setDark(!dark)}
          className={`${dark ? "bg-gray-700" : "bg-gray-300"} px-3 py-1 rounded`}
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {isAuthenticated() ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}