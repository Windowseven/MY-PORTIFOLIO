import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

export const Footer = () => {
  const { theme, mode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={cn(
      "relative pt-20 pb-10 overflow-hidden transition-colors duration-300",
      theme === 'dark'
        ? mode === 'cyber'
          ? "bg-slate-950/90"
          : mode === 'dev'
            ? "bg-emerald-950/40"
            : "bg-secondary/20"
        : mode === 'cyber'
          ? "bg-cyan-50/80"
          : mode === 'dev'
            ? "bg-emerald-50/80"
            : "bg-secondary/20"
    )}>
      {/* Background Effects */}
      {mode === 'cyber' && (
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      )}
      {mode === 'dev' && (
        <div className="absolute inset-0 opacity-5 pointer-events-none font-mono text-xs overflow-hidden p-4 select-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>importbox.system.secure_layer_{i};</div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              Junior Lespikius
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Building Scalable & Secure Digital Systems.
              Full-Stack Engineer & Cybersecurity Enthusiast.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              {['About', 'Projects', 'Blog', 'Certifications', 'Dashboard', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-foreground transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/Windowseven" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-4 h-4" /> Windowseven
              </a>
              <a href="https://linkedin.com/in/Lespikius Junior" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-4 h-4" /> Lespikius Junior
              </a>
              <a href="mailto:lespikiusjunior@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> lespikiusjunior@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Junior Lespikius. All rights reserved.</p>
          
          {mode === 'dev' && (
            <div className="hidden md:flex items-center gap-2 text-xs font-mono opacity-50">
              <Terminal className="w-3 h-3" />
              <span>Type "whoami" in Command Center</span>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className={cn(
              "fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all z-50",
              mode === 'cyber' ? "bg-cyan-500 text-black hover:bg-cyan-400" :
              mode === 'dev' ? "bg-green-500 text-black hover:bg-green-400" :
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
