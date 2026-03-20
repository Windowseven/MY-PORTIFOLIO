import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Cpu, Code, Database, Server, Command } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { cn } from '../ui/Button';

const TYPING_STRINGS = [
  "Building Secure APIs",
  "Crafting Modern UI Systems",
  "Designing Developer-First Platforms",
  "Exploring Ethical Hacking"
];

const TECH_STACK = [
  { name: "React", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Box },
  { name: "Linux", icon: Terminal },
  { name: "AWS", icon: Cloud },
  { name: "Tailwind", icon: Wind },
];

// Icon placeholders
function Box(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> }
function Cloud(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M19 19h-1.5"/><path d="M6.5 19H5"/><path d="M12 13.5V10"/><path d="M12 6a3 3 0 0 0-3 3"/><path d="M15 9a3 3 0 0 0-3-3"/></svg> }
function Wind(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg> }

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % TYPING_STRINGS.length;
      const fullText = TYPING_STRINGS[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export const Hero = () => {
  const { theme, mode, setCommandPaletteOpen } = useTheme();

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
      <div className={cn(
        "absolute inset-0 opacity-20 z-0 transition-all duration-1000",
        mode === 'cyber' ? "grid-bg bg-[size:30px_30px]" : 
        mode === 'dev' ? "grid-bg bg-[size:50px_50px]" : 
        "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
      )} />
      
      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000 z-0" />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Identity Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-medium text-muted-foreground mb-2">
                Hi, I'm <span className="text-foreground font-bold">Junior Lespikius</span>
              </h2>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r",
                  mode === 'cyber' ? "from-cyan-400 to-blue-600" :
                  mode === 'dev' ? "from-green-400 to-emerald-600" :
                  "from-primary to-blue-600"
                )}>
                  Also known as
                </span>
                <br />
                <span className="text-foreground text-4xl lg:text-6xl">
                  Windowseven 👨‍💻
                </span>
              </h1>
            </div>

            <div className="text-xl md:text-2xl text-muted-foreground font-mono h-16">
              <span className="text-primary mr-2">Wait for it...</span>
              <TypingEffect />
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Full-Stack Developer & Cybersecurity Enthusiast.
              I specialize in backend APIs, secure system design, and network security protocols — combining development precision with cybersecurity discipline.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant={mode === 'cyber' ? 'cyber' : mode === 'dev' ? 'dev' : 'default'} 
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => setCommandPaletteOpen(true)}
                className="group"
              >
                Open Command Center <Command className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* RIGHT: Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Mode-Aware Profile Card */}
            <div className={cn(
              "relative w-80 h-96 rounded-2xl overflow-hidden transition-all duration-500",
              mode === 'cyber' ? "border-2 border-cyan-500 shadow-[0_0_30px_rgba(0,245,255,0.3)]" :
              mode === 'dev'
                ? theme === 'dark'
                  ? "border border-green-500/50 bg-black/80 font-mono"
                  : "border border-green-500/50 bg-background/90 font-mono"
                : "glass border border-border/20 shadow-2xl"
            )}>
              
              {/* Dev Mode Terminal Header */}
              {mode === 'dev' && (
                <div className="bg-green-500/10 p-2 border-b border-green-500/30 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-green-400 ml-2">bash --login</span>
                </div>
              )}

              {/* Cyber Mode Scanner Overlay */}
              {mode === 'cyber' && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_10px_#00F5FF] animate-scanline" />
                  <div className="absolute inset-0 border-[1px] border-cyan-500/20 m-2 rounded-xl" />
                  <div className="absolute bottom-4 right-4 text-xs text-cyan-400 font-mono animate-pulse">SCANNING...</div>
                </div>
              )}

              {/* Content */}
              <div className="h-full flex flex-col items-center justify-center p-6 relative z-10">
                {/* Profile Image */}
                <div className={cn(
                  "w-40 h-40 rounded-2xl mb-6 overflow-hidden transition-all relative",
                  mode === 'cyber' ? "ring-2 ring-cyan-500 ring-offset-4 ring-offset-background" :
                  mode === 'dev' ? "rounded-none border border-green-500" :
                  "shadow-lg"
                )}>
                  <img 
                    src="/assets/profile.jpeg" 
                    alt="Junior Lespikius" 
                    className="w-full h-full object-cover object-top"
                  />
                  {mode === 'cyber' && <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay" />}
                  {mode === 'dev' && <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay" />}
                </div>

                {mode === 'dev' ? (
                  <div className="w-full text-sm space-y-2 text-green-400">
                    <div><span className="text-blue-400">user:</span> lespikius</div>
                    <div><span className="text-blue-400">role:</span> full-stack</div>
                    <div><span className="text-blue-400">status:</span> <span className="animate-pulse">active</span></div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">Junior Lespikius</h3>
                    <p className="text-sm text-muted-foreground">Windowseven</p>
                    
                    {mode === 'cyber' && (
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/30">SECURE</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Identity Strip */}
      <div className={cn("w-full border-y backdrop-blur-sm py-3 mt-12", theme === 'dark' ? "border-white/5 bg-black/20" : "border-border/30 bg-background/80")}>
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
          <div className={cn("flex items-center gap-2", mode === 'dev' && "text-green-400")}>
            <Terminal className="w-4 h-4" /> Developer Mode {mode === 'dev' ? 'Active' : 'Ready'}
          </div>
          <div className={cn("flex items-center gap-2", mode === 'cyber' && "text-cyan-400")}>
            <Shield className="w-4 h-4" /> Cyber Mode {mode === 'cyber' ? 'Active' : 'Ready'}
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Cpu className="w-4 h-4" /> Open to Collaborations
          </div>
        </div>
      </div>

      {/* Tech Stack Visual */}
      <div className={cn("w-full py-8 overflow-hidden border-b", theme === 'dark' ? "bg-background/50 border-white/5" : "bg-background/50 border-border/20")}>
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-widest">Powering Next-Gen Systems</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 rounded-xl bg-secondary/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <tech.icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-medium group-hover:text-primary transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};