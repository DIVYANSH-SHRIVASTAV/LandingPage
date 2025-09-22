import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../utils/auth";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setToken(data.token, data.name, data.email);
      toast.success("Registration successful 🎉");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account ✨
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-200">Full Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-200">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-200">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-100 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}