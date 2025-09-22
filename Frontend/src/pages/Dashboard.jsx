import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserInfo, removeToken } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const { name, email } = getUserInfo();
  const [joined, setJoined] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const { data } = await axios.get("http://localhost:5000/api/protected/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJoined(new Date(data.joined).toDateString());
      } catch {
        removeToken();
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl">Welcome back, {name} 🎉</h1>
      <p>Email: {email}</p>
      <p>Joined: {joined}</p>
    </div>
  );
}