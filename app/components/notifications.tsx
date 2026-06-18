'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Bell, X, AlertTriangle, Info, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '@/types';

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastFetch, setLastFetch] = useState(0);

  // Close AI chat when notifications open
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('close-ai-chat'));
    }
  }, [isOpen]);

  // Listen for close event from AI chat
  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('close-notifications', handleClose);
    return () => window.removeEventListener('close-notifications', handleClose);
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch('/api/security-news');
      const data = await res.json();
      if (data.news && data.news.length > 0) {
        const newNotifs: Notification[] = data.news.map((item: { title: string; description: string; source: string; url: string; publishedAt: string }, i: number) => ({
          id: `news_${Date.now()}_${i}`,
          title: item.title,
          message: item.description,
          type: i < 2 ? 'critical' : i < 4 ? 'warning' : 'info',
          timestamp: new Date(item.publishedAt || Date.now()),
          read: false,
          url: item.url,
          source: item.source,
        }));
        setNotifications(prev => {
          const existing = new Set(prev.map(n => n.title));
          const unique = newNotifs.filter((n: Notification) => !existing.has(n.title));
          return [...unique, ...prev].slice(0, 15);
        });
        setUnreadCount(prev => prev + newNotifs.filter((n: Notification) => !n.read).length);
      }
    } catch {
      // silent fail
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchNews(), 1000);
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastFetch > 300000) {
        fetchNews();
        setLastFetch(now);
      }
    }, 60000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [fetchNews, lastFetch]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const notif = notifications.find((n) => n.id === id);
    if (notif && !notif.read) setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-cyber-red" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-cyber-red" />;
      default: return <Info className="w-4 h-4 text-cyber-red" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-cyber-red';
      case 'warning': return 'border-l-cyber-red';
      default: return 'border-l-cyber-red';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 bg-card border border-border rounded-full shadow-lg hover:bg-muted transition-colors flex items-center justify-center"
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#b01e28] text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-foreground font-semibold">Security News</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-cyber-red hover:text-cyber-red/80 transition-colors"
                >
                  Mark all read
                </button>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b border-border/50 border-l-2 ${getTypeColor(notif.type)} ${!notif.read ? 'bg-muted/50' : ''} hover:bg-muted/50 transition-colors cursor-pointer`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getIcon(notif.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm text-foreground font-medium truncate">{notif.title}</h4>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notif.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground/60">
                            {formatTime(notif.timestamp)}
                            {notif.source && <span className="ml-1">· {notif.source}</span>}
                          </span>
                          {notif.url && (
                            <a href={notif.url} target="_blank" rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-cyber-red hover:text-cyber-red/80">
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  Loading security news...
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-border text-center">
              <button onClick={fetchNews}
                className="text-xs text-cyber-red hover:text-cyber-red/80 transition-colors">
                Refresh news
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
