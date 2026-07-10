import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemedComponent from './ThemedComponent';

const ContextWrapper = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
};

export default ContextWrapper;