import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Brain, Rocket, GraduationCap, FileText, Shield, BarChart, Mail, 
  Terminal, Lock, Moon, Sun, Search, X, Laptop
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

const menuItems = [
  { icon: Home, label: 'Home', href: '#hero' },
  { icon: User, label: 'About', href: '#about' },
  { icon: Brain, label: 'Skills', href: '#skills' },
  { icon: Rocket, label: 'Projects', href: '#projects' },
  { icon: GraduationCap, label: 'Education', href: '#education' },
  { icon: FileText, label: 'Certifications', href: '#certifications' },
  { icon: Shield, label: 'Philosophy', href: '#philosophy' },
  { icon: BarChart, label: 'Dashboard', href: '#dashboard' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, mode, toggleTheme, toggleMode, setCommandPaletteOpen, isMobileMenuOpen, setMobileMenuOpen, setWinnOpen } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mutex: close Winn whenever sidebar becomes visible
  useEffect(() => {
    if (isMobileMenuOpen || !isMobile) {
      setWinnOpen(false);
    }
  }, [isMobile, isMobileMenuOpen, setWinnOpen]);

  // Mobile Overlay
  if (isMobile && !isMobileMenuOpen) return null;

  return (
    <>
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <motion.aside
        initial={isMobile ? { x: -280 } : { width: 70 }}
        animate={isMobile ? { x: 0 } : { width: isExpanded ? 260 : 70 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 h-screen z-50 flex flex-col border-r backdrop-blur-xl transition-colors duration-300",
          // Dark: original deep backgrounds. Light: CSS variable bg-background.
          mode === 'cyber'
            ? theme === 'dark' ? "border-cyan-500/30 bg-slate-950/90"
                               : "border-cyan-500/30 bg-background/95"
            : mode === 'dev'
            ? theme === 'dark' ? "border-green-500/30 bg-[#0D1117]/95"
                               : "border-green-500/30 bg-background/95"
            : theme === 'dark' ? "border-border bg-background/95"
                               : "border-border/40 bg-background/95",
          isMobile ? "w-[280px]" : ""
        )}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/30">
          <AnimatePresence mode="wait">
            {(isExpanded || isMobile) ? (
              <motion.span
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold tracking-tighter"
              >
                Lespikius<span className="text-primary">.dev</span>
              </motion.span>
            ) : (
              <motion.span
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold"
              >
                LS
              </motion.span>
            )}
          </AnimatePresence>
          
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Search / Command Trigger */}
        <div className="p-2 border-b border-border/30">
          <button
            onClick={() => {
              setCommandPaletteOpen(true);
              if (isMobile) setMobileMenuOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-4 p-3 rounded-lg transition-all group relative overflow-hidden",
              "hover:bg-accent",
              mode === 'cyber' && "hover:bg-cyan-500/10 hover:text-cyan-400",
              mode === 'dev' && "hover:bg-green-500/10 hover:text-primary"
            )}
          >
            <Search className="w-5 h-5 min-w-[20px]" />
            <AnimatePresence>
              {(isExpanded || isMobile) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center justify-between w-full"
                >
                  <span className="whitespace-nowrap font-medium">Search</span>
                  <span className="text-xs opacity-50 border border-white/20 px-1.5 py-0.5 rounded">Ctrl K</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => isMobile && setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-all group relative overflow-hidden",
                "hover:bg-accent text-foreground",
                mode === 'cyber' && "hover:bg-cyan-500/10 hover:text-cyan-400",
                mode === 'dev' && "hover:bg-green-500/10 hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              <AnimatePresence>
                {(isExpanded || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Active Indicator */}
              {mode === 'dev' && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-green-500 transition-all group-hover:h-1/2" />
              )}
              {mode === 'cyber' && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-cyan-500 transition-all group-hover:h-full shadow-[0_0_10px_#00F5FF]" />
              )}
            </a>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border/30 flex flex-col gap-2">
          <button
            onClick={toggleMode}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent transition-colors w-full"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              {mode === 'normal' ? <Laptop className="w-4 h-4" /> :
               mode === 'dev' ? <Terminal className="w-4 h-4 text-green-400" /> :
               <Lock className="w-4 h-4 text-cyan-400" />}
            </div>
            <AnimatePresence>
              {(isExpanded || isMobile) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium text-left"
                >
                  <div className="opacity-50">Interface Mode</div>
                  <div className="capitalize">{mode}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent transition-colors w-full"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
            <AnimatePresence>
              {(isExpanded || isMobile) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium text-left"
                >
                  <div className="opacity-50">Theme</div>
                  <div className="capitalize">{theme}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
};