import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from '../features/CommandPalette';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useTheme();

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 flex flex-col",
      mode === 'cyber' ? "bg-[#050A14] text-cyan-50" :
      mode === 'dev' ? "bg-[#0B1120] text-green-50" :
      "bg-background text-foreground"
    )}>
      {/* Scanline Overlay for Cyber Mode */}
      {mode === 'cyber' && <div className="scanline-overlay" />}
      
      <Sidebar />
      <Header />
      <CommandPalette />
      
      <main className="flex-1 md:pl-[70px] pt-16 transition-all duration-300">
        {children}
      </main>

      <div className="md:pl-[70px]">
        <Footer />
      </div>
    </div>
  );
};
