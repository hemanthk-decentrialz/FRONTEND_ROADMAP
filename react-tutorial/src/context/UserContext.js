// File: src/context/UserContext.js (Create this first)
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    isLoggedIn: true
  });

  const login = (userData) => {
    setUser({ 
      ...userData, 
      isLoggedIn: true 
    });
  };

  const logout = () => {
    setUser({ 
      name: '', 
      email: '', 
      isLoggedIn: false 
    });
  };

  const updateName = (newName) => {
    setUser(prev => ({
      ...prev,
      name: newName
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateName }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}