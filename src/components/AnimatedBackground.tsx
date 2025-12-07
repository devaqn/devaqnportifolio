import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  waveOffset: number;
  waveSpeed: number;
  waveAmplitude: number;
  baseY: number;
  pulsePhase: number;
}

interface AnimatedBackgroundProps {
  isDark: boolean;
}

const AnimatedBackground = ({ isDark }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect mobile - but DON'T reduce particle quality
    isMobileRef.current = window.innerWidth < 768 || 'ontouchstart' in window;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      isMobileRef.current = window.innerWidth < 768 || 'ontouchstart' in window;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Same particle count and size for mobile and desktop
    const screenArea = window.innerWidth * window.innerHeight;
    const baseCount = Math.floor(screenArea / 12000);
    const particleCount = isDark 
      ? Math.floor(baseCount * 1.2)
      : Math.floor(baseCount * 1.8);
    
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const y = Math.random() * window.innerHeight;
      return {
        x: Math.random() * window.innerWidth,
        y: y,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2,
        // Same size on mobile as desktop
        radius: isDark ? Math.random() * 3 + 2 : Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.3,
        targetOpacity: Math.random() * 0.4 + 0.1,
        waveOffset: Math.random() * Math.PI * 2,
        waveSpeed: 0.015 + Math.random() * 0.025,
        waveAmplitude: 15 + Math.random() * 35,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    let lastTime = 0;
    // Slightly reduced FPS on mobile for battery, but particles remain same
    const targetFps = isMobileRef.current ? 45 : 60;
    const frameInterval = 1000 / targetFps;

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return;

      // Frame rate limiting for mobile performance
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime - (deltaTime % frameInterval);

      timeRef.current += 0.016;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        
        // Full wave motion on all devices
        const wave1 = Math.sin(timeRef.current * particle.waveSpeed + particle.waveOffset) * particle.waveAmplitude;
        const wave2 = Math.cos(timeRef.current * particle.waveSpeed * 0.7 + particle.waveOffset * 1.5) * (particle.waveAmplitude * 0.5);
        const wave3 = Math.sin(timeRef.current * particle.waveSpeed * 1.3 + index * 0.1) * (particle.waveAmplitude * 0.3);
        
        particle.y = particle.baseY + wave1 + wave2 + wave3;
        particle.baseY += particle.vy * 0.3;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < -50) {
          particle.y = height + 50;
          particle.baseY = height + 50;
        }
        if (particle.y > height + 50) {
          particle.y = -50;
          particle.baseY = -50;
        }

        // Animate opacity
        if (Math.abs(particle.opacity - particle.targetOpacity) < 0.01) {
          particle.targetOpacity = Math.random() * (isDark ? 0.4 : 0.6) + 0.1;
        }
        particle.opacity += (particle.targetOpacity - particle.opacity) * (isDark ? 0.01 : 0.02);

        // Pulsating radius - works on all devices
        let currentRadius = particle.radius;
        if (!isDark) {
          const pulse = Math.sin(timeRef.current * 2 + particle.pulsePhase) * 0.5 + 1;
          currentRadius = particle.radius * pulse;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);

        if (isDark) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 3
          );
          gradient.addColorStop(0, `hsla(350, 70%, 35%, ${particle.opacity})`);
          gradient.addColorStop(1, `hsla(0, 85%, 45%, ${particle.opacity * 0.3})`);
          ctx.fillStyle = gradient;
        } else {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, currentRadius * 6
          );
          const intensifiedOpacity = particle.opacity * 1.5;
          gradient.addColorStop(0, `hsla(270, 85%, 50%, ${intensifiedOpacity})`);
          gradient.addColorStop(0.3, `hsla(275, 80%, 58%, ${intensifiedOpacity * 0.8})`);
          gradient.addColorStop(0.6, `hsla(280, 70%, 65%, ${intensifiedOpacity * 0.5})`);
          gradient.addColorStop(1, `hsla(285, 60%, 75%, ${intensifiedOpacity * 0.1})`);
          ctx.fillStyle = gradient;
        }

        ctx.fill();
      });

      // Draw connecting lines - same on all devices
      const connectionDistance = isDark ? 140 : 150;
      const skipFactor = isMobileRef.current ? 2 : 1;
      
      for (let i = 0; i < particlesRef.current.length; i += skipFactor) {
        const p1 = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j += skipFactor) {
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const waveOffset = Math.sin(timeRef.current * 2 + midX * 0.01) * 12;
            
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(midX, midY + waveOffset, p2.x, p2.y);
            
            const opacity = (1 - distance / connectionDistance) * (isDark ? 0.2 : 0.25);
            
            if (isDark) {
              ctx.strokeStyle = `hsla(350, 75%, 40%, ${opacity})`;
            } else {
              ctx.strokeStyle = `hsla(270, 75%, 55%, ${opacity})`;
            }
            
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Floating orbs - same on all devices
      const orbCount = isDark ? 4 : 5;
      for (let i = 0; i < orbCount; i++) {
        const orbX = width * (0.15 + (i * 0.18));
        const orbY = height / 2 + Math.sin(timeRef.current * 0.5 + i * 1.2) * (height * 0.25);
        const orbRadius = 70 + Math.sin(timeRef.current * 0.8 + i) * 25;
        
        const orbGradient = ctx.createRadialGradient(
          orbX, orbY, 0,
          orbX, orbY, orbRadius
        );
        
        if (isDark) {
          orbGradient.addColorStop(0, `hsla(350, 70%, 35%, 0.06)`);
          orbGradient.addColorStop(0.5, `hsla(0, 75%, 40%, 0.03)`);
          orbGradient.addColorStop(1, `hsla(350, 60%, 30%, 0)`);
        } else {
          orbGradient.addColorStop(0, `hsla(270, 70%, 60%, 0.08)`);
          orbGradient.addColorStop(0.5, `hsla(275, 65%, 65%, 0.04)`);
          orbGradient.addColorStop(1, `hsla(280, 60%, 70%, 0)`);
        }
        
        ctx.beginPath();
        ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ 
        opacity: isDark ? 0.8 : 0.9,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default AnimatedBackground;
