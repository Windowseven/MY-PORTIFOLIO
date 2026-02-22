import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'dev' | 'cyber';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'dark';
  });

  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Reset classes and attributes
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-mode');

    // Apply new state
    if (mode === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }

    if (mode === 'dev' || mode === 'cyber') {
      root.setAttribute('data-mode', mode);
    }

    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      setMode, 
      toggleTheme,
      isCommandPaletteOpen,
      setCommandPaletteOpen,
      isMobileMenuOpen,
      setMobileMenuOpen
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
