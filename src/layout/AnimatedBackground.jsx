import { useEffect, useRef } from "react";

export default function AnimatedBackground({ dark = true }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef([]);
  const animFrame = useRef(null);
  const darkRef = useRef(dark);

  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const PARTICLE_COUNT = 80;
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const isDark = darkRef.current;

      // Dark:  amber + blue
      // Light: charcoal + slate gray
      const particleColor = isDark ? "245, 166, 35"  : "148, 163, 184";
      const lineColorNear = isDark ? "245, 166, 35"  : "100, 116, 139";
      const lineColorFar  = isDark ? "77, 157, 224"  : "148, 163, 184";
      const glowColor1    = isDark ? "245, 166, 35"  : "148, 163, 184";
      const glowColor2    = isDark ? "77, 157, 224"  : "148, 163, 184";

      // Higher opacity in light mode so particles are visible on white
      const glowOpacity1  = isDark ? 0.03 : 0.08;
      const glowOpacity2  = isDark ? 0.02 : 0.05;
      const lineOpacityMul = isDark ? 0.15 : 0.35;
      const particleOpacityMul = isDark ? 1 : 0.75;

      // Cursor glow
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      glow.addColorStop(0, `rgba(${glowColor1}, ${glowOpacity1})`);
      glow.addColorStop(0.5, `rgba(${glowColor2}, ${glowOpacity2})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 120;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity * particleOpacityMul})`;
        ctx.fill();
      });

      // Connecting lines
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * lineOpacityMul;
            const cursorDistA = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2);
            const isNearCursor = cursorDistA < 200;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isNearCursor
              ? `rgba(${lineColorNear}, ${opacity * 2.5})`
              : `rgba(${lineColorFar}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animFrame.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}