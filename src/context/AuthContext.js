"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userPrixzData");
      if (userData) {
        setIsRegistered(true);
        setUser(JSON.parse(userData));
      }
    }

    const handleStorageChange = () => {
      const userData = localStorage.getItem("userPrixzData");
      if (userData) {
        setIsRegistered(true);
        setUser(JSON.parse(userData));
      } else {
        setIsRegistered(false);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem("userPrixzData", JSON.stringify(userData));
    setIsRegistered(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userPrixzData");
    setIsRegistered(false);
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    localStorage.setItem("userPrixzData", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ isRegistered, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
