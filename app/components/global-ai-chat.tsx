'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, AlertTriangle, MessageSquare, Brain, Database, Shield, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  provider?: string;
}

const THINKING_STEPS = [
  { icon: Search, text: 'Analyzing your question...' },
  { icon: Brain, text: 'Accessing neural pathways...' },
  { icon: Database, text: 'Querying security database...' },
  { icon: Shield, text: 'Cross-referencing threat intel...' },
  { icon: Bot, text: 'Generating response...' },
];

export function GlobalAIChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hideOnPage = pathname === '/security-ai' || pathname === '/safe-gateway';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) { setThinkingStep(0); return; }
    const interval = setInterval(() => {
      setThinkingStep(prev => (prev + 1) % THINKING_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('close-notifications'));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('close-ai-chat', handleClose);
    return () => window.removeEventListener('close-ai-chat', handleClose);
  }, []);

  const handleSubmit = async (question?: string) => {
    const q = question || input.trim();
    if (!q || isLoading) return;

    setInput('');
    setIsLoading(true);
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: q }]);

    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get answer');

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content || data.answer || 'No response',
        provider: data.provider,
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (hideOnPage) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-5 z-[90] w-12 h-12 rounded-full bg-cyber-red shadow-lg shadow-cyber-red/30 flex items-center justify-center hover:bg-cyber-red/80 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageSquare className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-2 z-[90] w-[calc(100vw-1rem)] md:right-5 md:w-[380px] md:max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 'min(500px, calc(100vh - 100px))' }}
          >
            {/* Header */}
            <div className="bg-cyber-red/10 border-b border-border px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyber-red/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyber-red" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-foreground">AI Assistant</h3>
                <p className="text-[10px] text-muted-foreground">Ask me anything — cybersecurity, coding, general knowledge</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <Bot className="w-10 h-10 text-cyber-red/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">How can I help you today?</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-cyber-red text-white text-sm'
                      : 'bg-white/5 border border-border text-foreground/90'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Bot className="w-3 h-3 text-cyber-red" />
                        <span className="text-[10px] text-cyber-red font-medium">AI</span>
                        {msg.provider && (
                          <span className="text-[9px] text-muted-foreground">via {msg.provider}</span>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-border rounded-2xl px-4 py-3 max-w-[85%]">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Bot className="w-3 h-3 text-cyber-red" />
                      <span className="text-[10px] text-cyber-red font-medium">AI</span>
                      <span className="text-[9px] text-muted-foreground">thinking...</span>
                    </div>
                    <div className="space-y-2">
                      {THINKING_STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx === thinkingStep;
                        const isDone = idx < thinkingStep;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isActive ? 1 : isDone ? 0.5 : 0.3, x: 0 }}
                            className="flex items-center gap-2"
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isActive ? 'bg-cyber-red/20' : isDone ? 'bg-cyber-green/20' : 'bg-white/5'
                            }`}>
                              {isDone ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full bg-cyber-green" />
                              ) : (
                                <Icon className={`w-3 h-3 ${isActive ? 'text-cyber-red' : 'text-muted-foreground'}`} />
                              )}
                            </div>
                            <span className={`text-[11px] ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.text}
                            </span>
                            {isActive && (
                              <motion.div animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-1 h-1 rounded-full bg-cyber-red ml-auto" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyber-red via-cyber-red/60 to-cyber-red"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl pl-4 pr-10 py-2.5 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-cyber-red/50"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-10 h-10 rounded-lg bg-cyber-red flex items-center justify-center hover:bg-cyber-red/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
