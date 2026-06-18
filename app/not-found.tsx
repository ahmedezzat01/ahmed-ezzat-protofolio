'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block select-none">
      <span className="relative z-10">{text}</span>
      {glitch && (
        <>
          <span className="absolute top-0 left-0 text-[var(--cyber-red)] opacity-80" style={{ clipPath: 'inset(20% 0 30% 0)', transform: 'translate(-2px, 0)' }}>
            {text}
          </span>
          <span className="absolute top-0 left-0 text-[var(--cyber-red)] opacity-80" style={{ clipPath: 'inset(60% 0 10% 0)', transform: 'translate(2px, 0)' }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(223,37,49,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(223,37,49,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--cyber-red)]/5 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-xl text-center">
            {/* Shield icon */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-[var(--cyber-red)]/20 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full border border-[var(--cyber-red)]/10 animate-[spin_12s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert className="w-14 h-14 text-[var(--cyber-red)]/70" strokeWidth={1.5} />
              </div>
            </div>

            {/* 404 */}
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold leading-none mb-2 font-mono">
              <GlitchText text="404" />
            </h1>

            {/* Divider */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[var(--cyber-red)]/40 to-transparent mx-auto my-6" />

            {/* Message */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Page Not Found
            </h3>
            <p className="text-white/40 mb-8 text-sm font-mono">
              ERROR_CODE: PAGE_NOT_FOUND
            </p>
            <p className="text-white/30 mb-10 text-sm max-w-sm mx-auto leading-relaxed">
              The resource you are trying to access does not exist or has been moved.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--cyber-red)] text-white font-semibold rounded-lg hover:bg-[var(--cyber-red)]/80 hover:shadow-[0_0_25px_rgba(223,37,49,0.3)] transition-all duration-300 text-sm"
              >
                <Home className="w-4 h-4" />
                Return Home
              </button>
              <button
                onClick={() => { if (window.history.length > 1) { router.back(); } else { router.push('/'); } }}
                className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white/60 rounded-lg hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>

            {/* Terminal footer */}
            <div className="mt-14 font-mono text-xs text-white/15 space-y-1">
              <p>$ curl -I https://portfolio.ahmedezzat.com/unknown</p>
              <p className="text-[var(--cyber-red)]/40">HTTP/1.1 404 Not Found</p>
              <p className="text-white/10">Connection: close</p>
              <p><span className="animate-pulse">_</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
