'use client';

import { useEffect, useRef } from 'react';

export function HackingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Matrix rain columns
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    // Network nodes
    interface Node { x: number; y: number; vx: number; vy: number; radius: number; }
    const nodes: Node[] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    // Hex data streams
    interface HexStream { x: number; y: number; speed: number; chars: string[]; opacity: number; }
    const hexStreams: HexStream[] = [];
    for (let i = 0; i < 8; i++) {
      hexStreams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 1 + 0.5,
        chars: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')),
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let time = 0;

    const draw = () => {
      // Dark background with slight fade for trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      // Draw network connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(223, 37, 49, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = 'rgba(223, 37, 49, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Matrix rain
      ctx.fillStyle = 'rgba(223, 37, 49, 0.12)';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Hex data streams
      for (const stream of hexStreams) {
        ctx.fillStyle = `rgba(223, 37, 49, ${stream.opacity})`;
        ctx.font = '11px monospace';
        stream.y += stream.speed;
        if (stream.y > height + 60) {
          stream.y = -60;
          stream.x = Math.random() * width;
        }
        for (let i = 0; i < stream.chars.length; i++) {
          if (Math.random() > 0.95) {
            stream.chars[i] = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
          }
          ctx.fillText(stream.chars[i], stream.x, stream.y + i * 16);
        }
      }

      // Scanning line
      const scanY = (time * 100) % height;
      const gradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      gradient.addColorStop(0, 'rgba(223, 37, 49, 0)');
      gradient.addColorStop(0.5, 'rgba(223, 37, 49, 0.15)');
      gradient.addColorStop(1, 'rgba(223, 37, 49, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 2, width, 4);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#0a0a0a' }}
    />
  );
}
