import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_EMAIL = 'admin@strip.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [admin, setAdmin] = useState(null);

  function loginCustomer(name, email) {
    setCustomer({ name: name || email.split('@')[0], email });
  }
  function logoutCustomer() {
    setCustomer(null);
  }

  function loginAdmin(email, password) {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdmin({ email: ADMIN_EMAIL });
      return true;
    }
    return false;
  }
  function logoutAdmin() {
    setAdmin(null);
  }

  const value = {
    customer,
    loginCustomer,
    logoutCustomer,
    admin,
    loginAdmin,
    logoutAdmin,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
