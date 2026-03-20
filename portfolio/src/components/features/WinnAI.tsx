/**
 * src/components/features/WinnAI.tsx
 *
 * Winn — Junior's AI assistant, rendered as a right-side sliding panel.
 * Open/close state lives in ThemeContext (isWinnOpen / setWinnOpen).
 * The trigger button lives in Header.tsx.
 *
 * Mutex logic:
 *  - Header button toggles isWinnOpen
 *  - Sidebar calls setWinnOpen(false) when it opens (see Sidebar.tsx)
 *  - Winn calls setMobileMenuOpen(false) when it opens (below)
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Zap, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

// Gemini uses 'user' and 'model' (not 'assistant')
interface Message {
  role: 'user' | 'model';
  content: string;
}

// Backend URL — leave empty in production for same-origin Render deploys.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

// ─── Quick actions ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: '📁 Show projects',      prompt: 'Tell me about all of Junior\'s featured projects.' },
  { label: '⚡ Skills overview',    prompt: 'What are Junior\'s main technical skills?' },
  { label: '🎓 Certifications',     prompt: 'What certifications does Junior hold?' },
  { label: '✉️ Contact info',       prompt: 'How can I get in touch with Junior?' },
  { label: '📄 Summarise portfolio',prompt: 'Give me a quick summary of Junior\'s portfolio and what makes him stand out.' },
];

// ─── Typing dots ───────────────────────────────────────────────────────────────

function TypingDots({ mode }: { mode: string }) {
  return (
    <div className="flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={cn(
            'block w-1.5 h-1.5 rounded-full',
            mode === 'cyber' ? 'bg-cyan-400' :
            mode === 'dev'   ? 'bg-green-400' :
            'bg-primary'
          )}
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.16 }}
        />
      ))}
    </div>
  );
}

// ─── Message bubble ─────────────────────────────────────────────────────────────

function Bubble({ msg, mode, theme }: { msg: Message; mode: string; theme: string }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {/* Avatar — AI only */}
      {!isUser && (
        <div className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black font-mono mt-0.5',
          mode === 'cyber' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' :
          mode === 'dev'   ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
          theme === 'dark' ? 'bg-primary/20 text-primary border border-primary/30' :
                             'bg-blue-100 text-blue-600 border border-blue-200'
        )}>
          W
        </div>
      )}

      {/* Bubble */}
      <div className={cn(
        'max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
        isUser
          ? cn(
              'rounded-br-sm text-white font-medium',
              mode === 'cyber' ? 'bg-cyan-600' :
              mode === 'dev'   ? 'bg-green-600' :
              'bg-blue-600'
            )
          : cn(
              'rounded-bl-sm border',
              mode === 'cyber'
                ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-50'
                : mode === 'dev'
                ? 'bg-green-500/5 border-green-500/20 text-green-50'
                : theme === 'dark'
                ? 'bg-white/5 border-white/10 text-foreground'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            )
      )}>
        <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.content}</p>
      </div>
    </motion.div>
  );
}

// ─── Main panel ────────────────────────────────────────────────────────────────

export const WinnAI: React.FC = () => {
  const { theme, mode, isWinnOpen, setWinnOpen, setMobileMenuOpen } = useTheme();

  const [messages, setMessages] = useState<Message[]>([{
    role: 'model',
    content: "Hey 👋 I'm Winn, Junior's AI assistant. Ask me anything about his work, skills, or projects — or tap a quick action below.",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickActionsVisible, setQuickActionsVisible] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isWinnOpen) {
      // Mutex: close mobile menu when Winn opens
      setMobileMenuOpen(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isWinnOpen, setMobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWinnOpen) setWinnOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isWinnOpen, setWinnOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setQuickActionsVisible(false);
    const next: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      // Send conversation to our Express backend — API key stays server-side
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Convert to Gemini format: { role, parts: [{ text }] }
          messages: next.map((m) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Surface backend error messages (rate limit, validation, etc.)
        throw new Error(data.error || 'Unknown error');
      }

      setMessages((prev) => [...prev, { role: 'model', content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection error';
      setMessages((prev) => [...prev, {
        role: 'model',
        content: msg.includes('Too many')
          ? '⏳ You\'ve sent a lot of messages! Please wait a few minutes before trying again.'
          : `Something went wrong — ${msg}. Please try again.`,
      }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const resetConversation = () => {
    setMessages([{
      role: 'model',
      content: "Hey 👋 I'm Winn, Junior's AI assistant. Ask me anything about his work, skills, or projects — or tap a quick action below.",
    }]);
    setInput('');
    setQuickActionsVisible(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Accent colours per mode
  const accent = mode === 'cyber' ? 'text-cyan-400' : mode === 'dev' ? 'text-green-400' : 'text-blue-500';
  const accentBorder = mode === 'cyber' ? 'border-cyan-500/30' : mode === 'dev' ? 'border-green-500/30' : 'border-border';
  const accentBg = mode === 'cyber' ? 'bg-cyan-500/10' : mode === 'dev' ? 'bg-green-500/10' : theme === 'dark' ? 'bg-white/5' : 'bg-slate-50';

  return (
    <>
      {/* ── Backdrop (mobile only) ── */}
      <AnimatePresence>
        {isWinnOpen && (
          <motion.div
            key="winn-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setWinnOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sliding Panel ── */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: isWinnOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className={cn(
          // Position: below header (h-20 = 80px), full height to bottom
          'fixed top-20 right-0 bottom-0 z-[9999] w-[380px] max-w-full',
          'flex flex-col border-l',
          'backdrop-blur-xl',
          // Theme-aware background & border
          mode === 'cyber'
            ? theme === 'dark'
              ? 'bg-slate-950/95 border-cyan-500/30'
              : 'bg-cyan-50/95 border-cyan-500/40'
            : mode === 'dev'
            ? theme === 'dark'
              ? 'bg-[#0D1117]/95 border-green-500/30'
              : 'bg-emerald-50/95 border-green-500/30'
            : theme === 'dark'
            ? 'bg-slate-900/95 border-white/10'
            : 'bg-white/95 border-slate-200',
          // Mobile: full width
          'sm:w-[380px] w-full'
        )}
        aria-label="Winn AI assistant panel"
        role="complementary"
      >

        {/* ── Header ── */}
        <div className={cn(
          'flex items-center justify-between px-4 py-3 border-b flex-shrink-0',
          accentBorder
        )}>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center font-black text-sm font-mono flex-shrink-0 border',
              mode === 'cyber' ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40' :
              mode === 'dev'   ? 'bg-green-500/15 text-green-400 border-green-500/40' :
              theme === 'dark' ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' :
                                 'bg-blue-100 text-blue-600 border-blue-200'
            )}>
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide font-mono">Winn</span>
                <span className={cn(
                  'text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded font-mono border',
                  mode === 'cyber' ? 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10' :
                  mode === 'dev'   ? 'text-green-400 border-green-500/50 bg-green-500/10' :
                  'text-blue-500 border-blue-300 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/30'
                )}>AI</span>
              </div>
              <div className="text-[11px] text-muted-foreground">Junior's personal assistant</div>
            </div>
          </div>

          {/* Live indicator + actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-1">
              <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', 
                mode === 'cyber' ? 'bg-cyan-400' : mode === 'dev' ? 'bg-green-400' : 'bg-blue-500'
              )} />
              <span className={cn('text-[10px] font-mono', accent)}>online</span>
            </div>
            {/* New conversation */}
            <button
              onClick={resetConversation}
              className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center border transition-colors',
                'hover:bg-white/10 text-muted-foreground hover:text-foreground',
                accentBorder
              )}
              aria-label="New conversation"
              title="New conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            {/* Close */}
            <button
              onClick={() => setWinnOpen(false)}
              className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center border transition-colors',
                'hover:bg-white/10 text-muted-foreground hover:text-foreground',
                accentBorder
              )}
              aria-label="Close Winn"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Mode bar ── */}
        <div className={cn(
          'flex items-center gap-2 px-4 py-1.5 border-b flex-shrink-0',
          mode === 'cyber' ? 'bg-cyan-500/5 border-cyan-500/20' :
          mode === 'dev'   ? 'bg-green-500/5 border-green-500/20' :
          theme === 'dark' ? 'bg-white/3 border-white/5' :
                             'bg-slate-50 border-slate-100'
        )}>
          <Zap className={cn('w-3 h-3', accent)} />
          <span className={cn('text-[10px] font-mono tracking-wider', accent)}>
            {mode === 'cyber' ? 'CYBER_MODE · ACTIVE' : mode === 'dev' ? 'DEV_MODE · ACTIVE' : 'NORMAL · ACTIVE'}
          </span>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-hide">
          {messages.map((msg, i) => (
            <Bubble key={i} msg={msg} mode={mode} theme={theme} />
          ))}

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2.5"
            >
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black font-mono mt-0.5 border',
                mode === 'cyber' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' :
                mode === 'dev'   ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                theme === 'dark' ? 'bg-primary/20 text-primary border-primary/30' :
                                   'bg-blue-100 text-blue-600 border-blue-200'
              )}>W</div>
              <div className={cn(
                'px-3.5 py-2.5 rounded-2xl rounded-bl-sm border',
                mode === 'cyber' ? 'bg-cyan-500/5 border-cyan-500/20' :
                mode === 'dev'   ? 'bg-green-500/5 border-green-500/20' :
                theme === 'dark' ? 'bg-white/5 border-white/10' :
                                   'bg-slate-50 border-slate-200'
              )}>
                <TypingDots mode={mode} />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Quick Actions ── */}
        <AnimatePresence>
          {quickActionsVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className={cn('px-4 pb-3 flex-shrink-0 border-t', accentBorder)}
            >
              <p className={cn('text-[10px] font-mono font-semibold tracking-widest uppercase mt-3 mb-2', accent)}>
                Quick actions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => sendMessage(a.prompt)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full border font-medium transition-all',
                      mode === 'cyber'
                        ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-500/60'
                        : mode === 'dev'
                        ? 'border-green-500/40 text-green-400 bg-green-500/5 hover:bg-green-500/15 hover:border-green-500/60'
                        : theme === 'dark'
                        ? 'border-white/10 text-foreground bg-white/5 hover:bg-white/10 hover:border-white/20'
                        : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
                    )}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Input ── */}
        <div className={cn(
          'flex-shrink-0 px-3 py-3 border-t',
          accentBorder, accentBg
        )}>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              placeholder="Ask about Junior…"
              className={cn(
                'flex-1 bg-transparent border rounded-full px-4 py-2.5 text-sm outline-none transition-all',
                'placeholder:text-muted-foreground',
                mode === 'cyber'
                  ? 'border-cyan-500/30 focus:border-cyan-500/70 focus:shadow-[0_0_0_3px_rgba(0,245,255,0.1)] text-cyan-50 bg-slate-900/60'
                  : mode === 'dev'
                  ? 'border-green-500/30 focus:border-green-500/70 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)] text-green-50 bg-slate-900/60'
                  : theme === 'dark'
                  ? 'border-white/10 focus:border-white/30 text-white bg-white/5'
                  : 'border-slate-200 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] text-slate-900 bg-white'
              )}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                !input.trim() || loading
                  ? 'opacity-30 cursor-not-allowed bg-muted'
                  : mode === 'cyber'
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                  : mode === 'dev'
                  ? 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_2px_8px_rgba(59,130,246,0.4)]'
              )}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground font-mono mt-2 tracking-wide">
            Enter to send · Esc to close
          </p>
        </div>
      </motion.aside>
    </>
  );
};
