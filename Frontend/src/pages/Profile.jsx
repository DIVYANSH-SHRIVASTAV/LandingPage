import { useState } from "react";
import axios from "axios";
import { getToken, getUserInfo, setToken } from "../utils/auth";
import toast from "react-hot-toast";

export default function Profile() {
  const { name, email } = getUserInfo();
  const [newName, setNewName] = useState(name);

  const updateProfile = async () => {
    try {
      const token = getToken();
      const { data } = await axios.put(
        "http://localhost:5000/api/protected/profile",
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setToken(token, data.name, data.email);
      toast.success("Profile updated 👍");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl mb-4 font-bold">Profile</h2>
      <p className="mb-2">Email: {email}</p>
      <input
        className="border p-2 mb-4 w-64 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        onClick={updateProfile}
      >
        Update Name
      </button>
    </div>
  );
}