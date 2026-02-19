import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Persistence: Check browser memory on load
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') setIsAdmin(true);
  }, []);

  const login = (email, pass) => {
    if (email === 'kailash24052005@gmail.com' && pass === 'admin@123') {
      setIsAdmin(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);