import React from 'react';
import WhyChooseDrPrintSection from '@/components/WhyChooseDrPrintSection.jsx';
import CommercialProductionSection from '@/components/CommercialProductionSection.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black font-poppins">
      {/* Header */}
      <section className="pt-40 pb-16 px-8 bg-black">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-5">About</p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-none">
              About Dr.PrinT
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              A precision 3D printing studio built for creators, startups, and engineering teams — with the discipline of a fabrication lab.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Focus */}
      <section className="py-20 px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-5">01 — Focus</p>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Our Focus</h2>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Precision prototyping and fabrication for creators, startups, and engineering teams. We transform digital designs into functional, production-ready components.
              </p>
            </div>
            <div className="space-y-4">
              {['Rapid Prototyping', 'Functional Part Production', 'Small Batch Manufacturing', 'Custom Display Builds'].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/8 last:border-0">
                  <span className="text-white/15 text-xs font-black">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-white/70 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 px-8 bg-black">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 md:order-1">
              <div className="rounded-xl bg-[#111] border border-white/8 p-10 space-y-6">
                {[
                  { label: 'Platform', value: 'Bambu Lab — Calibrated' },
                  { label: 'Layer Tolerance', value: '±0.1mm' },
                  { label: 'Materials Supported', value: '6 Engineering Grades' },
                  { label: 'Max Build Volume', value: 'Up to 256×256×256mm' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/8 pb-4 last:border-0 last:pb-0">
                    <span className="text-white/35 text-xs uppercase tracking-widest font-bold">{spec.label}</span>
                    <span className="text-white text-sm font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-5">02 — Equipment</p>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Our Equipment</h2>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Calibrated Bambu Lab systems optimized for repeatable output and dimensional accuracy. Every build is produced on professionally maintained hardware, consistently tuned for engineering-grade results.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-5">03 — Approach</p>
            <h2 className="text-3xl font-black text-white mb-12 tracking-tight">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Structured Workflow', desc: 'Every project follows a structured review, optimization, and inspection process — no guesswork, no shortcuts.' },
                { title: 'Material-Focused Decisions', desc: 'Material selection is matched to mechanical requirements and real-world use, not just cost or availability.' },
                { title: 'Clear Communication', desc: 'You stay informed at every stage — from quote to delivery. We are transparent about timelines and technical constraints.' },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black border border-white/8 rounded-xl hover:border-white/20 transition-colors duration-300">
                  <span className="text-white/10 text-3xl font-black block mb-4">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/45 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-32 px-8 bg-black text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Built for precision today.
              <br />
              <span className="text-white/25">Designed to scale tomorrow.</span>
            </h2>
            <p className="text-white/40 text-lg font-light mb-12 max-w-xl mx-auto">
              Whether you're a maker with an idea or a company needing production support — we're ready.
            </p>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-all duration-300"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>
      <WhyChooseDrPrintSection />
      <CommercialProductionSection />
    </div>
  );
};

export default AboutPage;
