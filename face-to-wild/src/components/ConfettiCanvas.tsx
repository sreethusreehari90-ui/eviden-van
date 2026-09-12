import React, { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  primaryColor?: string;
  accentColor?: string;
  active?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  shape: 'rect' | 'circle' | 'sparkle';
  life: number;
  maxLife: number;
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({
  primaryColor = '#10b981',
  accentColor = '#f59e0b',
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      primaryColor,
      accentColor,
      '#10b981',
      '#06b6d4',
      '#a855f7',
      '#fbbf24',
      '#f43f5e',
      '#34d399',
    ];

    const particles: Particle[] = [];
    const count = Math.min(80, Math.floor(width / 15));

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) / 2 + Math.PI / 4; // upward burst
      const speed = Math.random() * 8 + 4;
      const shapes: ('rect' | 'circle' | 'sparkle')[] = ['rect', 'circle', 'sparkle'];
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 120,
        y: height * 0.45 + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * 1.6,
        vy: -Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        life: 0,
        maxLife: Math.random() * 90 + 90,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      for (const p of particles) {
        p.life++;
        if (p.life < p.maxLife) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.18; // gravity
          p.vx *= 0.985; // drag
          p.rotation += p.rotSpeed;

          const progress = p.life / p.maxLife;
          const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.fillStyle = p.color;

          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else {
            // Sparkle / diamond star
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size / 3, 0);
            ctx.lineTo(0, p.size);
            ctx.lineTo(-p.size / 3, 0);
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();
        }
      }

      if (alive) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, primaryColor, accentColor]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};
