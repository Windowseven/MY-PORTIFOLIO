import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from '../features/CommandPalette';
import { Walkthrough, WalkthroughReplaySafeZone } from '../features/Walkthrough';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode, theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 flex flex-col",
      // Dark: restore original deep aesthetics. Light: CSS variables take over.
      theme === 'dark' && mode === 'cyber' ? "bg-[#050A14] text-cyan-50" :
      theme === 'dark' && mode === 'dev'   ? "bg-[#0B1120] text-green-50" :
      "bg-background text-foreground"
    )}>
      {/* Scanline Overlay for Cyber Mode */}
      {mode === 'cyber' && <div className="scanline-overlay" />}
      
      <Sidebar />
      <Header />
      <CommandPalette />
      <Walkthrough />
      
      <main className="flex-1 md:pl-[70px] pt-16 transition-all duration-300">
        {children}
      </main>

      <div className="md:pl-[70px]">
        <Footer />
      </div>
      
      <WalkthroughReplaySafeZone />
    </div>
  );
};