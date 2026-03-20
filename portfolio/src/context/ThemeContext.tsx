import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type InterfaceMode = 'normal' | 'dev' | 'cyber';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: InterfaceMode;
  setMode: (mode: InterfaceMode) => void;
  toggleTheme: () => void;
  toggleMode: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isWinnOpen: boolean;
  setWinnOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Backward-compatible migration from legacy combined mode.
    const legacy = localStorage.getItem('theme-mode');
    return legacy === 'light' ? 'light' : 'dark';
  });

  const [mode, setMode] = useState<InterfaceMode>(() => {
    const savedMode = localStorage.getItem('interface-mode');
    if (savedMode === 'normal' || savedMode === 'dev' || savedMode === 'cyber') {
      return savedMode;
    }

    // Backward-compatible migration from legacy combined mode.
    const legacy = localStorage.getItem('theme-mode');
    if (legacy === 'dev' || legacy === 'cyber') {
      return legacy;
    }
    return 'normal';
  });

  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWinnOpen, setWinnOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    root.removeAttribute('data-mode');
    if (mode !== 'normal') {
      root.setAttribute('data-mode', mode);
    }

    localStorage.setItem('theme', theme);
    localStorage.setItem('interface-mode', mode);
  }, [theme, mode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'normal' ? 'dev' : prev === 'dev' ? 'cyber' : 'normal'));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme,
      setTheme,
      mode, 
      setMode, 
      toggleTheme,
      toggleMode,
      isCommandPaletteOpen,
      setCommandPaletteOpen,
      isMobileMenuOpen,
      setMobileMenuOpen,
      isWinnOpen,
      setWinnOpen,
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