import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Shield, Code, User, Briefcase, FileText, X, Cpu, Github, Globe, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

interface Command {
  id: string;
  label: string;
  icon: any;
  action: () => void | React.ReactNode;
  type?: 'navigation' | 'mode' | 'interactive';
  keywords: string[];
}

// Helper icon
function MailIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> }

export const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output', content: React.ReactNode }>>([]);
  const { mode, setMode, isCommandPaletteOpen, setCommandPaletteOpen } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      // Force focus with a slight delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isCommandPaletteOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const addToHistory = (input: string, output: React.ReactNode) => {
    setHistory(prev => [
      ...prev, 
      { type: 'input', content: input },
      { type: 'output', content: output }
    ]);
  };

  const sectionAlias: Record<string, { hash: string; path: string; available: boolean }> = {
    projects: { hash: '#projects', path: '/portfolio/projects', available: true },
    about: { hash: '#about', path: '/portfolio/about', available: true },
    blog: { hash: '#projects', path: '/portfolio/blog', available: false },
    contact: { hash: '#contact', path: '/portfolio/contact', available: true },
    certs: { hash: '#education', path: '/portfolio/certs', available: true },
  };

  const currentPathByHash: Record<string, string> = {
    '#hero': '/portfolio/home',
    '#about': '/portfolio/about',
    '#skills': '/portfolio/skills',
    '#projects': '/portfolio/projects',
    '#education': '/portfolio/certs',
    '#contact': '/portfolio/contact',
  };

  const fileAlias: Record<string, { file: string; type: 'pdf' | 'image' }> = {
    'cv.pdf': { file: '/assets/cv.pdf', type: 'pdf' },
    cv: { file: '/assets/cv.pdf', type: 'pdf' },
    'google-cert.pdf': { file: '/assets/google-cert.pdf', type: 'pdf' },
    'google-cert': { file: '/assets/google-cert.pdf', type: 'pdf' },
    'cisco-cert.pdf': { file: '/assets/cisco-cyber-security.pdf', type: 'pdf' },
    'cisco-cert': { file: '/assets/cisco-cyber-security.pdf', type: 'pdf' },
    'cisco-cyber-security.pdf': { file: '/assets/cisco-cyber-security.pdf', type: 'pdf' },
    'cisco-ethical-hacker.pdf': { file: '/assets/cisco-ethical-hacker.pdf', type: 'pdf' },
    'smart-class.png': { file: '/assets/smart-class.png', type: 'image' },
    'linux-buddy.png': { file: '/assets/linux-buddy.png', type: 'image' },
    'wifi-billing.png': { file: '/assets/wifi-billing.png', type: 'image' },
    'event-booking.png': { file: '/assets/event-booking.png', type: 'image' },
  };

  const caseStudyAlias: Record<string, { title: string; summary: string; stack: string }> = {
    'smart-class': {
      title: 'Smart Class System',
      summary: 'Geolocation attendance system with anti-proxy checks and admin analytics.',
      stack: 'React, Node.js, Express, MySQL, Tailwind',
    },
    'linux-buddy': {
      title: 'Linux Buddy (Shell)',
      summary: 'Interactive Linux-learning toolkit in Swahili with safe command simulation.',
      stack: 'Bash, Shell Scripting, Linux',
    },
    'wifi-billing': {
      title: 'WiFi Billing System',
      summary: 'Voucher-based access control with expiry tracking and bandwidth controls.',
      stack: 'HTML, JavaScript, Shell, MySQL',
    },
    'event-booking': {
      title: 'Event Booking System',
      summary: 'Secure booking pipeline with realtime availability and payment integration.',
      stack: 'React, Node.js, Stripe, MySQL',
    },
  };

  const normalizeArg = (prefix: RegExp) => query.toLowerCase().replace(prefix, '').trim().replace(/^["']|["']$/g, '');
  const multiline = (text: string) => <span className="block whitespace-pre-line">{text}</span>;

  const commands: Command[] = [
    { id: 'ls', label: 'ls', icon: FileText, keywords: ['ls'], type: 'interactive', action: () => 'Projects  About  Blog  Contact  Certs' },
    { id: 'pwd', label: 'pwd', icon: Globe, keywords: ['pwd'], type: 'interactive', action: () => currentPathByHash[window.location.hash || '#hero'] || '/portfolio/home' },
    {
      id: 'cd',
      label: 'cd [section]',
      icon: Briefcase,
      keywords: ['cd ', 'cd'],
      type: 'navigation',
      action: () => {
        const arg = normalizeArg(/^cd/);
        if (!arg) return 'Usage: cd [projects|about|blog|contact|certs]';
        const section = sectionAlias[arg];
        if (!section) return `cd: no such section: ${arg}`;
        window.location.hash = section.hash;
        return section.available ? `Changed directory to ${section.path}` : 'Blog is planned. Redirected to /portfolio/projects';
      },
    },
    {
      id: 'tree',
      label: 'tree',
      icon: FileText,
      keywords: ['tree'],
      type: 'interactive',
      action: () => multiline(`portfolio
|-- sections
|   |-- about
|   |-- projects
|   \`-- contact
|-- projects
|   |-- smart-class
|   |-- linux-buddy
|   |-- wifi-billing
|   \`-- event-booking
\`-- certs
    |-- cv.pdf
    |-- google-cert.pdf
    \`-- cisco-cert.pdf`),
    },
    {
      id: 'history',
      label: 'history',
      icon: Monitor,
      keywords: ['history'],
      type: 'interactive',
      action: () => {
        const lines: string[] = [];
        for (let i = 0; i < history.length; i += 2) {
          const input = history[i];
          const output = history[i + 1];
          if (!input || input.type !== 'input') continue;
          let summary = 'interactive output';
          if (output?.type === 'output' && typeof output.content === 'string') summary = output.content.slice(0, 40);
          lines.push(`${lines.length + 1}. ${String(input.content)} -> ${summary}`);
        }
        return lines.length ? multiline(lines.slice(-8).join('\n')) : 'No history yet.';
      },
    },
    {
      id: 'cat',
      label: 'cat [file]',
      icon: FileText,
      keywords: ['cat ', 'cat'],
      type: 'interactive',
      action: () => {
        const arg = normalizeArg(/^cat/);
        if (!arg) return 'Usage: cat [cv.pdf|google-cert.pdf|cisco-cert.pdf|cisco-ethical-hacker.pdf]';
        const file = fileAlias[arg];
        if (!file) return `cat: ${arg}: file not found`;
        if (file.type !== 'pdf') return `cat: ${arg}: not a pdf. use 'open ${arg}'`;
        window.open(file.file, '_blank', 'noopener,noreferrer');
        return `Opened ${file.file}`;
      },
    },
    {
      id: 'open',
      label: 'open [file]',
      icon: Globe,
      keywords: ['open ', 'open'],
      type: 'interactive',
      action: () => {
        const arg = normalizeArg(/^open/);
        if (!arg) return 'Usage: open [file]';
        const file = fileAlias[arg];
        if (!file) return `open: ${arg}: file not found`;
        window.open(file.file, '_blank', 'noopener,noreferrer');
        return `Opening ${file.file}`;
      },
    },
    {
      id: 'whoami',
      label: 'whoami',
      icon: User,
      keywords: ['whoami'],
      type: 'interactive',
      action: () => 'Junior Lespikius | Full-Stack Engineer & Security Enthusiast | Building secure systems end-to-end.',
    },
    {
      id: 'show-skills',
      label: 'show skills',
      icon: Code,
      keywords: ['show skills', 'skills'],
      type: 'interactive',
      action: () => 'Frontend: React/TS/Tailwind | Backend: Node/Express/SQL | Networking: TCP-IP/Routing | Cyber: Auth/Threat-Modeling/Hardening',
    },
    { id: 'show-certs', label: 'show certs', icon: FileText, keywords: ['show certs', 'show certifications'], type: 'interactive', action: () => 'Cisco Cyber Security | Cisco Ethical Hacker | Google Certificate' },
    { id: 'show-philosophy', label: 'show philosophy', icon: FileText, keywords: ['show philosophy'], type: 'interactive', action: () => 'Security-first architecture, maintainable code, practical automation, measurable outcomes.' },
    { id: 'stack', label: 'stack', icon: Code, keywords: ['stack'], type: 'interactive', action: () => 'React + TypeScript + Vite + Tailwind + Node.js + MySQL + Linux' },
    { id: 'dependencies', label: 'dependencies', icon: Github, keywords: ['dependencies'], type: 'interactive', action: () => 'react, vite, tailwindcss, framer-motion, lucide-react, react-router-dom, i18next' },
    { id: 'env', label: 'env', icon: Terminal, keywords: ['env'], type: 'interactive', action: () => 'MODE=' + mode + ' | Runtime=Browser | Build=Vite | Theme=light/dark/dev/cyber' },
    { id: 'mode-dev', label: 'mode dev', icon: Terminal, keywords: ['mode dev'], type: 'mode', action: () => { setMode('dev'); return 'Developer mode active.'; } },
    { id: 'mode-cyber', label: 'mode cyber', icon: Shield, keywords: ['mode cyber'], type: 'mode', action: () => { setMode('cyber'); return 'Cyber mode active.'; } },
    { id: 'mode-light', label: 'mode light', icon: Sun, keywords: ['mode light'], type: 'mode', action: () => { setMode('light'); return 'Light mode active.'; } },
    { id: 'mode-dark', label: 'mode dark', icon: Moon, keywords: ['mode dark'], type: 'mode', action: () => { setMode('dark'); return 'Dark mode active.'; } },
    { id: 'goto-projects', label: 'goto projects', icon: Briefcase, keywords: ['goto projects'], type: 'navigation', action: () => { window.location.hash = '#projects'; return 'Navigated to Projects'; } },
    { id: 'goto-about', label: 'goto about', icon: User, keywords: ['goto about'], type: 'navigation', action: () => { window.location.hash = '#about'; return 'Navigated to About'; } },
    { id: 'goto-contact', label: 'goto contact', icon: MailIcon, keywords: ['goto contact'], type: 'navigation', action: () => { window.location.hash = '#contact'; return 'Navigated to Contact'; } },
    { id: 'goto-blog', label: 'goto blog', icon: Globe, keywords: ['goto blog'], type: 'navigation', action: () => { window.location.hash = '#projects'; return 'Blog is planned. Redirected to Projects.'; } },
    {
      id: 'case-study',
      label: 'case study [project]',
      icon: Briefcase,
      keywords: ['case study ', 'case study'],
      type: 'interactive',
      action: () => {
        const arg = normalizeArg(/^case study/).replace(/\s+/g, '-');
        if (!arg) return 'Usage: case study [smart-class|linux-buddy|wifi-billing|event-booking]';
        const cs = caseStudyAlias[arg];
        if (!cs) return `case study: unknown project '${arg}'`;
        window.location.hash = '#projects';
        return multiline(`${cs.title}\n${cs.summary}\nStack: ${cs.stack}`);
      },
    },
    { id: 'dashboard', label: 'dashboard', icon: Monitor, keywords: ['dashboard'], type: 'interactive', action: () => 'Projects: 4 | Focus: API + Security | Uptime: 99.9% | Status: Available for collaboration' },
    { id: 'network-map', label: 'network map', icon: Globe, keywords: ['network map'], type: 'interactive', action: () => 'Client -> TLS -> Reverse Proxy -> API -> DB | Logs + Rate-limit + RBAC' },
    { id: 'show-protocols', label: 'show protocols', icon: Shield, keywords: ['show protocols'], type: 'interactive', action: () => 'HTTP/HTTPS, TLS, DNS, TCP/IP, SSH, OAuth2/JWT' },
    { id: 'show-osi', label: 'show osi', icon: Code, keywords: ['show osi'], type: 'interactive', action: () => '7 App | 6 Presentation | 5 Session | 4 Transport | 3 Network | 2 Data Link | 1 Physical' },
    {
      id: 'scan-system',
      label: 'scan system',
      icon: Shield,
      keywords: ['scan system'],
      type: 'interactive',
      action: () => multiline(`[OK] Input validation
[OK] Auth boundaries
[OK] Secure transport
[INFO] Rotate secrets regularly`),
    },
    { id: 'auth-flow', label: 'auth flow', icon: User, keywords: ['auth flow'], type: 'interactive', action: () => 'Login -> Validate -> Issue token/session -> RBAC middleware -> Protected resources' },
    { id: 'encryption', label: 'encryption', icon: Shield, keywords: ['encryption'], type: 'interactive', action: () => 'In-transit: TLS | At-rest: hashed credentials + managed secrets | Integrity: signed tokens' },
    { id: 'threat-model', label: 'threat-model', icon: Shield, keywords: ['threat-model'], type: 'interactive', action: () => 'STRIDE: spoofing, tampering, repudiation, disclosure, DoS, elevation controls applied.' },
    { id: 'sudo-hire-me', label: 'sudo hire me', icon: User, keywords: ['sudo hire me'], type: 'navigation', action: () => { window.location.hash = '#contact'; return '[sudo] accepted. Opening contact section...'; } },
    { id: 'matrix', label: 'matrix', icon: Monitor, keywords: ['matrix'], type: 'mode', action: () => { setMode('cyber'); return 'Cyber overlay engaged.'; } },
    { id: 'clear', label: 'clear', icon: X, keywords: ['clear'], type: 'interactive', action: () => { setHistory([]); } },
    { id: 'version', label: 'version', icon: Cpu, keywords: ['version'], type: 'interactive', action: () => 'Lespikius Terminal v3.0.0' },
    {
      id: 'help',
      label: 'help',
      icon: Search,
      keywords: ['help', '?'],
      type: 'interactive',
      action: () => multiline(`ls
pwd
cd [section]
tree
history
cat [file]
open [file]
whoami
show skills
show certs
show philosophy
stack
dependencies
env
mode dev
mode cyber
mode light
mode dark
goto projects
goto about
goto contact
goto blog
case study [project]
dashboard
network map
show protocols
show osi
scan system
auth flow
encryption
threat-model
sudo hire me
matrix
clear
version
help`),
    },
  ];

  const executeCommand = (cmd: Command) => {
    const result = cmd.action();
    if (result) {
      addToHistory(cmd.label, result);
    }
    setQuery('');
    // Don't close if it's an interactive command that returns UI
    if (cmd.type !== 'interactive') {
      setTimeout(() => setCommandPaletteOpen(false), 800);
    }
  };

  const handleInputSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const lowerQuery = query.toLowerCase();
    const matchedCommand = commands.find(c => 
      c.keywords.some(k => lowerQuery.includes(k)) || 
      c.label.toLowerCase().includes(lowerQuery)
    );

    if (matchedCommand) {
      executeCommand(matchedCommand);
    } else {
      addToHistory(query, <span className="text-red-400">Command not found: {query}. Type 'help' for available commands.</span>);
      setQuery('');
    }
  };

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.keywords.some(k => k.includes(query.toLowerCase()))
  );

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 pt-[10vh] md:pt-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCommandPaletteOpen(false)}
      />
      
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-3xl h-[600px] rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm z-[100000] pointer-events-auto",
          mode === 'cyber' ? "bg-slate-900/95 border border-cyan-500/50 shadow-[0_0_30px_rgba(0,245,255,0.2)]" :
          mode === 'dev' ? "bg-[#0D1117]/95 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]" :
          "bg-slate-900/95 border border-slate-700 shadow-2xl text-gray-200"
        )}
      >
        {/* Terminal Header */}
        <div className={cn(
          "flex items-center justify-between px-4 py-2 border-b select-none",
          mode === 'cyber' ? "bg-cyan-950/30 border-cyan-500/30" :
          mode === 'dev' ? "bg-green-950/30 border-green-500/30" :
          "bg-slate-800/50 border-slate-700"
        )}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-3 text-xs opacity-50">user@lespikius:~</span>
          </div>
          <button onClick={() => setCommandPaletteOpen(false)}>
            <X className="w-4 h-4 opacity-50 hover:opacity-100" />
          </button>
        </div>

        {/* Terminal Output Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {/* Welcome Message */}
          <div className="text-gray-400 mb-4">
            Welcome to Lespikius Terminal v2.0.0<br/>
            Type <span className="text-green-400">'help'</span> to see available commands.
          </div>

          {/* History */}
          {history.map((entry, i) => (
            <div key={i} className="space-y-1">
              {entry.type === 'input' && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className={cn(
                    "font-bold",
                    mode === 'cyber' ? "text-cyan-400" :
                    mode === 'dev' ? "text-green-400" :
                    "text-blue-400"
                  )}>➜</span>
                  <span>~</span>
                  <span className="text-white">{entry.content}</span>
                </div>
              )}
              {entry.type === 'output' && (
                <div className="pl-6 text-gray-300">
                  {entry.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div 
          className={cn(
            "p-4 border-t cursor-text relative z-[100002]",
            mode === 'cyber' ? "border-cyan-500/30" :
            mode === 'dev' ? "border-green-500/30" :
            "border-slate-700"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 w-full">
            <span className={cn(
              "font-bold animate-pulse select-none",
              mode === 'cyber' ? "text-cyan-400" :
              mode === 'dev' ? "text-green-400" :
              "text-blue-400"
            )}>➜</span>
            <span className="text-gray-400 select-none">~</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputSubmit(e);
                }
              }}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600 caret-white w-full h-full py-1 font-mono"
              placeholder="Type a command..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              style={{ opacity: 1, visibility: 'visible' }}
            />
          </div>

          {/* Suggestions */}
          {query && (
            <div className="mt-2 flex flex-wrap gap-2">
              {filteredCommands.slice(0, 5).map(cmd => (
                <button
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  className={cn(
                    "text-xs px-2 py-1 rounded border transition-colors",
                    mode === 'cyber' ? "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10" :
                    mode === 'dev' ? "border-green-500/30 text-green-400 hover:bg-green-500/10" :
                    "border-slate-600 text-gray-400 hover:bg-slate-800"
                  )}
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

