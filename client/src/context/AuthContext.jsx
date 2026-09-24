import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, logout as logoutRequest, me, register as registerRequest } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    me()
      .then((res) => setUser(res.data?.user ?? res.data))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  const login = async (payload) => {
    const res = await loginRequest(payload);
    setUser(res.data?.user ?? res.data);
    return res;
  };

  const register = async (payload) => {
    const res = await registerRequest(payload);
    setUser(res.data?.user ?? res.data);
    return res;
  };

  const logout = async () => {
    try { await logoutRequest(); } finally { setUser(null); }
  };

  return (
    <AuthContext.Provider value={{ user, checking, authenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);