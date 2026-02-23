import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Wrench silhouette — t=0 is bottom (open jaw), t=1 is top (hex head)
    function profile(t) {
      // Open jaw at base
      if (t < 0.04) return 0.55 + (t / 0.04) * 0.10;
      if (t < 0.10) return 0.65;
      if (t < 0.14) return 0.65 - ((t - 0.10) / 0.04) * 0.30;
      if (t < 0.18) return 0.35;
      if (t < 0.22) return 0.35 + ((t - 0.18) / 0.04) * 0.12;
      // Long slender handle
      if (t < 0.26) return 0.47 - ((t - 0.22) / 0.04) * 0.20;
      if (t < 0.68) return 0.27;
      if (t < 0.72) return 0.27 + ((t - 0.68) / 0.04) * 0.15;
      // Hex socket head — hexagonal cross-section alternates wide/narrow
      const headT = (t - 0.72) / 0.28;
      const hexWave = Math.abs(Math.cos(headT * Math.PI * 3));
      if (t < 0.76) return 0.42 + hexWave * 0.10;
      if (t < 0.94) return 0.52 + hexWave * 0.14;
      if (t < 0.98) return 0.52 - ((t - 0.94) / 0.04) * 0.35;
      return 0.17 - ((t - 0.98) / 0.02) * 0.17;
    }

    let bp = 0;
    let t  = 0;
    const SPEED = 0.0016;

    function draw() {
      animId = requestAnimationFrame(draw);
      t += 0.01;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      bp += SPEED;
      if (bp >= 1) bp = 0;

      // On mobile, centre the build. On desktop, push to right 72%
      const isMobile = W < 768;
      const cx2   = isMobile ? W * 0.5 : W * 0.76;
      const baseY = isMobile ? H * 0.82 : H * 0.80;
      const OBJ_H = Math.min(W, H) * (isMobile ? 0.38 : 0.52);
      const OBJ_R = Math.min(W, H) * (isMobile ? 0.10 : 0.115);
      const LH    = 2.2;
      const nl    = Math.floor(bp * OBJ_H / LH);

      // Platform glow
      const pg = ctx.createRadialGradient(cx2, baseY, 0, cx2, baseY, OBJ_R * 3.2);
      pg.addColorStop(0,   'rgba(255,140,30,0.28)');
      pg.addColorStop(0.5, 'rgba(255,90,15,0.12)');
      pg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = pg;
      ctx.fillRect(0, baseY - 60, W, 100);

      // Platform line
      ctx.beginPath();
      ctx.moveTo(cx2 - OBJ_R * 3.2, baseY);
      ctx.lineTo(cx2 + OBJ_R * 3.2, baseY);
      const pl = ctx.createLinearGradient(cx2 - OBJ_R * 3, 0, cx2 + OBJ_R * 3, 0);
      pl.addColorStop(0,   'rgba(255,130,30,0)');
      pl.addColorStop(0.5, 'rgba(255,170,60,0.80)');
      pl.addColorStop(1,   'rgba(255,130,30,0)');
      ctx.strokeStyle = pl; ctx.lineWidth = 1.5; ctx.stroke();

      // Grid dots
      for (let gx = cx2 - OBJ_R * 3; gx < cx2 + OBJ_R * 3; gx += 22) {
        const d = Math.abs(gx - cx2) / (OBJ_R * 3);
        ctx.beginPath(); ctx.arc(gx, baseY, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,130,30,${(1 - d) * 0.13})`; ctx.fill();
      }

      // Layers
      for (let li = 0; li < nl; li++) {
        const layerT = li / (OBJ_H / LH);
        const hw     = profile(layerT) * OBJ_R;
        const y      = baseY - li * LH;
        if (hw < 0.5) continue;

        const br  = 0.16 + layerT * 0.28;
        const bv  = Math.round(br * 255);
        const isTop = li === nl - 1;

        ctx.beginPath();
        ctx.rect(cx2 - hw, y - LH, hw * 2, LH + 0.5);
        ctx.fillStyle = `rgb(${bv},${bv},${bv + 4})`;
        ctx.fill();

        if (!isTop) {
          ctx.beginPath();
          ctx.moveTo(cx2 - hw, y); ctx.lineTo(cx2 + hw, y);
          ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = 0.4; ctx.stroke();
        }

        if (isTop) {
          // Orange glow on active edge
          const ag = ctx.createLinearGradient(0, y - LH - 10, 0, y);
          ag.addColorStop(0, 'rgba(255,150,35,0)');
          ag.addColorStop(1, 'rgba(255,180,60,0.75)');
          ctx.fillStyle = ag;
          ctx.fillRect(cx2 - hw - 2, y - LH - 10, hw * 2 + 4, LH + 10);

          ctx.beginPath();
          ctx.moveTo(cx2 - hw, y - LH); ctx.lineTo(cx2 + hw, y - LH);
          const eg = ctx.createLinearGradient(cx2 - hw, 0, cx2 + hw, 0);
          eg.addColorStop(0, 'rgba(255,140,40,0)');
          eg.addColorStop(0.5, 'rgba(255,210,90,1)');
          eg.addColorStop(1, 'rgba(255,140,40,0)');
          ctx.strokeStyle = eg; ctx.lineWidth = 2;
          ctx.shadowColor = 'rgba(255,170,40,1)'; ctx.shadowBlur = 16;
          ctx.stroke(); ctx.shadowBlur = 0;

          const nx2 = cx2 + Math.sin(t * 5) * hw * 0.75;
          ctx.beginPath(); ctx.arc(nx2, y - LH, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,230,110,1)';
          ctx.shadowColor = 'rgba(255,190,50,1)'; ctx.shadowBlur = 28;
          ctx.fill(); ctx.shadowBlur = 0;
        }
      }
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Vignette — stronger on left so text stays readable */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)',
        zIndex: 1
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 80% at 20% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
        zIndex: 1
      }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '25%',
        background: 'linear-gradient(to bottom, transparent, #000)',
        zIndex: 2
      }} />

      {/* Corner marks */}
      {[
        { top: 28, left: 28,   borderTop: '1px solid #fff', borderLeft:   '1px solid #fff' },
        { top: 28, right: 28,  borderTop: '1px solid #fff', borderRight:  '1px solid #fff' },
        { bottom: 44, left: 28,  borderBottom: '1px solid #fff', borderLeft:  '1px solid #fff' },
        { bottom: 44, right: 28, borderBottom: '1px solid #fff', borderRight: '1px solid #fff' },
      ].map((style, i) => (
        <div key={i} className="absolute w-5 h-5 pointer-events-none hidden md:block" style={{ ...style, opacity: 0.18, zIndex: 5 }} />
      ))}

      {/* HUD top left */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-14 z-10 hidden md:block">
        <div style={{ fontSize: 8, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Material</div>
        <div style={{ fontSize: 16, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>PLA+</div>
      </motion.div>

      {/* HUD top right */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
        className="absolute top-8 right-14 z-10 text-right hidden md:block">
        <div style={{ fontSize: 8, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Layer Height</div>
        <div style={{ fontSize: 16, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>0.12mm</div>
      </motion.div>

      {/* LEFT-ALIGNED text content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-xl w-full">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
          style={{ fontSize: 9, letterSpacing: '0.55em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', fontWeight: 400, marginBottom: 24 }}>
          Precision &nbsp;·&nbsp; Fabrication &nbsp;·&nbsp; Engineering
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="font-black text-white"
          style={{ fontSize: 'clamp(3.5rem,10vw,8.5rem)', letterSpacing: '-0.045em', lineHeight: 0.92, marginBottom: 0 }}>
          Dr.PrinT
        </motion.h1>

        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}
          style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.2)', margin: '20px 0', transformOrigin: 'left' }} />

        <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
          className="font-light uppercase"
          style={{ fontSize: 'clamp(0.6rem,1.1vw,0.85rem)', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>
          Precision Prototyping &amp; Fabrication
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
          className="font-light"
          style={{ fontSize: 'clamp(0.72rem,0.9vw,0.82rem)', color: 'rgba(255,255,255,0.32)', maxWidth: 380, lineHeight: 1.9, marginBottom: 40 }}>
          From rapid prototypes to functional components. Engineered for accuracy, strength and consistency.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-3">
          <Link to="/projects"
            className="font-bold uppercase transition-all duration-300 hover:bg-white hover:text-black text-center"
            style={{ padding: '13px 32px', border: '1px solid rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', display: 'inline-block' }}>
            Explore Projects
          </Link>
          <Link to="/contact"
            className="font-bold uppercase bg-white text-black transition-all duration-300 hover:bg-transparent hover:text-white text-center"
            style={{ padding: '13px 32px', border: '1px solid #fff', fontSize: 10, letterSpacing: '0.22em', textDecoration: 'none', display: 'inline-block' }}>
            Request Quote
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-7 left-0 right-0 z-10 flex items-end justify-between px-7 hidden md:flex">
        <span style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Basavanagudi, Bengaluru</span>
        <div className="flex flex-col items-center gap-2">
          <span style={{ fontSize: 8, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
        <span style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>@dr.print_3d</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
