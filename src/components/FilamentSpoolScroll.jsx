import React, { useEffect, useRef } from 'react';

// Floating filament spool on the right edge that reacts to scroll
const FilamentSpoolScroll = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 100, H = 340;
    canvas.width = W; canvas.height = H;

    let rotation = 0;
    let filamentY = 0; // 0 = filament going down, cycles up and down with scroll

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    function drawSpool(rot) {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2, cy = 155;
      const outerR = 36, innerR = 16, hubR = 10;

      // Glow behind spool
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR * 1.8);
      glow.addColorStop(0, 'rgba(255,140,30,0.08)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, outerR * 1.8, 0, Math.PI * 2); ctx.fill();

      // Outer spool rim
      ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 2.5; ctx.stroke();

      // Filament wound on spool — drawn as arcs rotated
      const spokes = 8;
      for (let i = 0; i < spokes; i++) {
        const angle = rot + (i / spokes) * Math.PI * 2;
        const r = innerR + 6;
        ctx.beginPath();
        ctx.arc(cx, cy, r, angle, angle + Math.PI / spokes);
        ctx.strokeStyle = `rgba(255,${160 - i * 8},40,${0.6 - i * 0.04})`;
        ctx.lineWidth = 3; ctx.stroke();
      }

      // Wound filament layers
      for (let layer = 0; layer < 4; layer++) {
        const lr = innerR + 3 + layer * 4;
        for (let i = 0; i < 6; i++) {
          const a = rot * (1 + layer * 0.3) + (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(cx, cy, lr, a, a + 0.4);
          ctx.strokeStyle = `rgba(255,${150 - layer * 15},${30 + layer * 5},${0.55 - layer * 0.08})`;
          ctx.lineWidth = 2.5; ctx.stroke();
        }
      }

      // Inner hub
      ctx.beginPath(); ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,30,35,0.95)';
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1; ctx.fill(); ctx.stroke();

      // Spoke lines
      for (let i = 0; i < 5; i++) {
        const a = rot + (i / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * hubR, cy + Math.sin(a) * hubR);
        ctx.lineTo(cx + Math.cos(a) * innerR, cy + Math.sin(a) * innerR);
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 1; ctx.stroke();
      }

      // Centre dot
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fill();

      // Filament strand coming off top of spool, going up
      // or bottom going down — alternates with scroll direction
      const spoolTop = cy - outerR;
      const spoolBot = cy + outerR;
      const exitAngle = rot % (Math.PI * 2);
      const exitX = cx + Math.cos(exitAngle - Math.PI / 2) * outerR;

      // Strand going UP (to nozzle above)
      const strandLen = 80 + Math.abs(Math.sin(rotation * 0.5)) * 30;
      const wobble = Math.sin(rotation * 2) * 4;
      ctx.beginPath();
      ctx.moveTo(exitX, spoolTop);
      ctx.bezierCurveTo(
        exitX + wobble, spoolTop - strandLen * 0.4,
        cx + wobble * 0.5, spoolTop - strandLen * 0.7,
        cx, spoolTop - strandLen
      );
      const strandGrad = ctx.createLinearGradient(0, spoolTop, 0, spoolTop - strandLen);
      strandGrad.addColorStop(0, 'rgba(255,160,40,0.8)');
      strandGrad.addColorStop(0.5, 'rgba(255,140,30,0.4)');
      strandGrad.addColorStop(1, 'rgba(255,120,20,0)');
      ctx.strokeStyle = strandGrad;
      ctx.lineWidth = 1.8; ctx.lineCap = 'round'; ctx.stroke();

      // Strand going DOWN (to bed below)
      const downLen = 60 + Math.abs(Math.cos(rotation * 0.5)) * 20;
      const exitBotX = cx + Math.cos(exitAngle + Math.PI / 2) * outerR;
      ctx.beginPath();
      ctx.moveTo(exitBotX, spoolBot);
      ctx.bezierCurveTo(
        exitBotX - wobble * 0.5, spoolBot + downLen * 0.4,
        cx - wobble * 0.3, spoolBot + downLen * 0.7,
        cx + wobble * 0.2, spoolBot + downLen
      );
      const downGrad = ctx.createLinearGradient(0, spoolBot, 0, spoolBot + downLen);
      downGrad.addColorStop(0, 'rgba(255,160,40,0.7)');
      downGrad.addColorStop(1, 'rgba(255,100,10,0)');
      ctx.strokeStyle = downGrad; ctx.lineWidth = 1.8; ctx.stroke();

      // Labels
      ctx.font = '7px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.textAlign = 'center';
      ctx.fillText('PA6-CF', cx, cy + outerR + 14);
      ctx.fillText('1.75mm', cx, cy + outerR + 24);
    }

    function loop() {
      // Smooth scroll lerp
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.08;
      // Rotate spool based on scroll amount
      const scrollDelta = targetScrollRef.current - scrollRef.current;
      rotation += scrollDelta * 0.003 + 0.008; // base slow rotation + scroll boost
      drawSpool(rotation);
      animRef.current = requestAnimationFrame(loop);
    }

    loop();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
      style={{ opacity: 0.75 }}
    >
      <canvas ref={canvasRef} style={{ width: 100, height: 340, display: 'block' }} />
    </div>
  );
};

export default FilamentSpoolScroll;
