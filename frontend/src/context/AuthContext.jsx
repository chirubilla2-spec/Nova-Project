import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const KEY = "nova_auth_v1";

const defaultUser = null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch {}
  }, [user]);

  const signup = ({ email, password, method = "email" }) => {
    const u = {
      id: `u_${Date.now()}`,
      email: email || `${method}_${Date.now()}@nova.app`,
      method,
      name: "",
      business: "",
      interests: [],
      notifications: false,
      onboarded: false,
      payments: [],
      createdAt: new Date().toISOString(),
    };
    setUser(u);
    return u;
  };

  const login = ({ email, password, method = "email" }) => {
    const u = {
      id: `u_${Date.now()}`,
      email: email || `${method}_${Date.now()}@nova.app`,
      method,
      name: "Aanya Kapoor",
      business: "Kapoor Studios LLP",
      interests: ["Branding", "AI"],
      notifications: true,
      onboarded: true,
      payments: [],
      createdAt: new Date().toISOString(),
    };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  const updateUser = (patch) => setUser((u) => (u ? { ...u, ...patch } : u));

  const completeOnboarding = (data) => updateUser({ ...data, onboarded: true });

  const recordPayment = (payment) =>
    setUser((u) =>
      u ? { ...u, payments: [{ ...payment, ts: new Date().toISOString() }, ...(u.payments || [])] } : u
    );

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser, completeOnboarding, recordPayment }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
