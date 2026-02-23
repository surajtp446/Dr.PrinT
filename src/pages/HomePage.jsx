import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection.jsx';
import StatsStrip from '@/components/StatsStrip.jsx';
import WhoWeWorkWithSection from '@/components/WhoWeWorkWithSection.jsx';
import HowItWorksSection from '@/components/HowItWorksSection.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

// Featured products — pulled directly here, shop page has the full list
const featured = [
  {
    id: 4,
    name: 'Coil Spring Pen Stand',
    price: 399,
    tag: 'New',
    image: '/products/spring_penstand.webp',
  },
  {
    id: 5,
    name: 'Brake Caliper Pen Stand',
    price: 599,
    tag: 'Motorsport',
    image: '/products/caliper_penstand_1.webp',
  },
  {
    id: 3,
    name: 'F1 2026 Season Calendar Plaque',
    price: 899,
    tag: 'F1 Edition',
    image: '/products/f1_calendar.jpg',
  },
];

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen font-poppins">
      <HeroSection />

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 px-6 bg-black border-t border-white/05">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <p className="text-xs tracking-[0.45em] text-white/25 uppercase mb-3">Ready to Ship</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">From Our Studio</h2>
            </div>
            <Link to="/shop"
              className="text-[10px] font-black uppercase tracking-widest text-white/35 border border-white/12 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-200">
              View All Products →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={fadeUp}
                className="border border-white/08 bg-white/[0.015] hover:border-white/18 transition-colors duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
                    {p.tag}
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm leading-snug mb-1">{p.name}</h3>
                    <p className="text-white/45 text-sm font-light">₹{p.price.toLocaleString()}</p>
                  </div>
                  <Link to="/shop"
                    className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-white/15 text-white/40 hover:bg-white hover:text-black transition-all duration-200 shrink-0">
                    Buy
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM ORDER CTA ── */}
      <section className="py-10 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/08 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]">
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Have a File or Idea?</p>
              <h3 className="text-xl font-black text-white">Custom Print Request</h3>
              <p className="text-white/38 text-sm font-light mt-1">Upload your STL, pick your settings and get a quote in 24 hours.</p>
            </div>
            <Link to="/shop#custom"
              className="shrink-0 px-7 py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.18em] hover:bg-white/85 transition-all duration-200">
              Start Custom Order
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorksSection />

      {/* ── STATS + WHO WE WORK WITH ── */}
      <StatsStrip />
      <WhoWeWorkWithSection />
    </div>
  );
};

export default HomePage;
