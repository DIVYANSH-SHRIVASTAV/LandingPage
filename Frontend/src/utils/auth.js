import { jwtDecode } from "jwt-decode";

export const setToken = (token, name, email) => {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
};

export const getToken = () => localStorage.getItem("token");

export const getUserInfo = () => ({
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
});

export const removeToken = () => localStorage.clear();

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};