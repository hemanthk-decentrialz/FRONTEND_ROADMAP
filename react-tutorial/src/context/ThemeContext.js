// File: src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Contexts
const ThemeContext = createContext();
const SettingsContext = createContext();

// Theme Provider (combines both contexts)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    notifications: true,
    language: 'en'
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        {children}
      </SettingsContext.Provider>
    </ThemeContext.Provider>
  );
};

// Custom hooks for consuming context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within ThemeProvider');
  }
  return context;
};