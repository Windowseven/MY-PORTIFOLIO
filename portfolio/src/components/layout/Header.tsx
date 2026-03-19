import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sun, Moon, Terminal, Shield, Menu, X, ChevronRight, 
  Laptop
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

export const Header = () => {
  const { theme, mode, toggleTheme, toggleMode, setCommandPaletteOpen, setMobileMenuOpen, isMobileMenuOpen } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Simple scroll spy
      const sections = ['hero', 'about', 'projects', 'skills', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-300 border-b",
        scrolled ? "backdrop-blur-md bg-background/80" : "bg-transparent border-transparent",
        mode === 'cyber' ? "border-cyan-500/30" : 
        mode === 'dev' ? "border-green-500/30" : 
        "border-border/40 bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="h-full px-4 md:px-6 py-5 flex items-center justify-between">
        {/* Left: Toggle & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-accent transition-colors md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="hover:text-foreground transition-colors cursor-pointer">Lespikius</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className={cn(
              "transition-colors",
              mode === 'cyber' ? "text-cyan-400" :
              mode === 'dev' ? "text-green-400" :
              "text-foreground"
            )}>
              {activeSection}
            </span>
          </div>
        </div>

        {/* Center: Spacer */}
        <div className="flex-1" />

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <button
            id="header-search-btn"
            onClick={() => setCommandPaletteOpen(true)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all group",
              mode === 'cyber' ? "border-cyan-500/30 hover:bg-cyan-500/10" :
              mode === 'dev' ? "border-green-500/30 hover:bg-green-500/10" :
              "border-border hover:bg-accent"
            )}
          >
            <Search className={cn(
              "w-4 h-4",
              mode === 'cyber' ? "text-cyan-400" :
              mode === 'dev' ? "text-green-400" :
              "text-muted-foreground"
            )} />
            <span className="hidden md:inline text-xs text-muted-foreground group-hover:text-foreground">Search</span>
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent transition-colors relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div key="sun" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                  <Sun className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mode Switch */}
          <button
            id="header-mode-btn"
            onClick={toggleMode}
            className={cn(
              "p-2 rounded-md transition-colors relative group",
              mode === 'dev' ? "bg-green-500/10 text-green-400" :
              mode === 'cyber' ? "bg-cyan-500/10 text-cyan-400" :
              "hover:bg-accent text-muted-foreground"
            )}
          >
            {mode === 'dev' ? <Terminal className="w-5 h-5" /> :
             mode === 'cyber' ? <Shield className="w-5 h-5" /> :
             <Laptop className="w-5 h-5" />}
            
            {/* Status Indicator */}
            {(mode === 'dev' || mode === 'cyber') && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
};
