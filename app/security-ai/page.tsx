'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Bot, Lock, AlertTriangle, Sparkles, ArrowLeft, Send, Search, Brain, Database } from 'lucide-react';
import ShaderBackground from '@/components/ui/shader-background';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  provider?: string;
}

const SUGGESTED_QUESTIONS = [
  'What is penetration testing?',
  'How do I start a career in cybersecurity?',
  'What are the OWASP Top 10 vulnerabilities?',
  'How does a firewall protect my network?',
  'What is the difference between black hat and white hat hacking?',
];

const THINKING_STEPS = [
  { icon: Search, text: 'Analyzing your question...' },
  { icon: Brain, text: 'Accessing neural pathways...' },
  { icon: Database, text: 'Querying security database...' },
  { icon: Shield, text: 'Cross-referencing threat intel...' },
  { icon: Bot, text: 'Generating response...' },
];

export default function SecurityAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ShaderBackground />

      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/"
            className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-red to-red-800 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-foreground font-bold text-lg">AI Assistant</h1>
            <p className="text-muted-foreground text-xs">Cybersecurity AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 overflow-y-auto">
        {messages.length === 0 && !isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-red/20 to-red-800/20 border border-cyber-red/20 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-cyber-red" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Ask a Security Question</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Get instant answers about cybersecurity, ethical hacking, and network security.
              <span className="block mt-1 text-cyber-green text-sm">Unlimited free questions — ask anything!</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSubmit(q)}
                  className="text-left p-3 rounded-xl bg-white/5 border border-border text-muted-foreground text-sm hover:bg-white/10 hover:border-cyber-red/30 hover:text-foreground transition-all duration-200"
                >
                  <Sparkles className="w-3 h-3 text-cyber-red mb-1 inline mr-2" />
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    msg.role === 'user'
                      ? 'bg-cyber-red text-white'
                      : 'bg-white/5 border border-border text-foreground/90'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-cyber-red" />
                        <span className="text-xs text-cyber-red font-medium">AI</span>
                        {msg.provider && (
                          <span className="text-[10px] text-muted-foreground">via {msg.provider}</span>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking Animation */}
            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-white/5 border border-border rounded-2xl px-5 py-4 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-cyber-red" />
                    <span className="text-xs text-cyber-red font-medium">AI</span>
                    <span className="text-[10px] text-muted-foreground">thinking...</span>
                  </div>
                  <div className="space-y-2.5">
                    {THINKING_STEPS.map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = idx === thinkingStep;
                      const isDone = idx < thinkingStep;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isActive ? 1 : isDone ? 0.5 : 0.3, x: 0 }}
                          className="flex items-center gap-2.5"
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-cyber-red/20' : isDone ? 'bg-cyber-green/20' : 'bg-white/5'
                          }`}>
                            {isDone ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2.5 h-2.5 rounded-full bg-cyber-green"
                              />
                            ) : (
                              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyber-red' : 'text-muted-foreground'}`} />
                            )}
                          </div>
                          <span className={`text-sm ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                            {step.text}
                          </span>
                          {isActive && (
                            <motion.div
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-1.5 h-1.5 rounded-full bg-cyber-red ml-auto"
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* Scanning progress bar */}
                  <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyber-red via-cyber-red/60 to-cyber-red"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex justify-center">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Ask about cybersecurity..."
              rows={1}
              className="flex-1 rounded-2xl pl-5 pr-12 py-3.5 resize-none bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-red/50 focus:border-cyber-red/50 transition-all duration-200"
              style={{ minHeight: '52px', maxHeight: '150px' }}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-cyber-red flex items-center justify-center hover:bg-cyber-red/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
          <Lock className="w-3 h-3 text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground">
            This is an educational tool. For professional security advice, consult a certified expert.
          </p>
        </div>
      </div>
    </div>
  );
}
