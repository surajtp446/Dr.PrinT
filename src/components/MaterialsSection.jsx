import React from 'react';
import { motion } from 'framer-motion';

const materials = [
  {
    name: 'PLA',
    tag: 'Standard',
    tg: '60°C',
    tensile: '~50 MPa',
    best: 'Prototypes, display models, scale builds',
    desc: 'Best surface finish and detail resolution of any FDM material. Not suited for high-heat or load-bearing use — ideal for visual and display parts.',
  },
  {
    name: 'PETG',
    tag: 'Functional',
    tg: '80°C',
    tensile: '~50 MPa',
    best: 'Enclosures, brackets, mechanical parts',
    desc: 'Combines good impact resistance with dimensional stability. Moisture-resistant and food-safe capable — a reliable all-rounder for functional parts.',
  },
  {
    name: 'ASA',
    tag: 'Outdoor',
    tg: '100°C',
    tensile: '~55 MPa',
    best: 'Outdoor, automotive, signage',
    desc: 'UV and weather resistant. Maintains colour and structural integrity under prolonged sun exposure — purpose-built for external applications.',
  },
  {
    name: 'TPU',
    tag: 'Flexible',
    tg: '—',
    tensile: '~40 MPa / >400% elongation',
    best: 'Gaskets, grips, seals, dampeners',
    desc: 'Rubber-like flexibility with high abrasion resistance. Wherever you need a part that bends, stretches, or absorbs impact without cracking.',
  },
  {
    name: 'PA6-CF',
    tag: 'High Strength',
    tg: '185°C',
    tensile: '~110 MPa',
    best: 'Structural parts, jigs, load-bearing',
    desc: 'Carbon fibre reinforced Nylon 6. Exceptional stiffness-to-weight ratio with minimal warping — the go-to for high-performance engineering builds.',
  },
  {
    name: 'PA12-CF',
    tag: 'Industrial',
    tg: '175°C',
    tensile: '~100 MPa',
    best: 'Chemical-exposure parts, aerospace, tooling',
    desc: 'Carbon fibre reinforced Nylon 12. Superior chemical resistance and fatigue performance — suited for the most demanding industrial environments.',
  },
  {
    name: 'On Demand',
    tag: 'Custom',
    tg: 'Varies',
    tensile: 'Varies',
    best: 'Specialty & composite requirements',
    desc: 'High-temp polymers, composites, and specialty filaments sourced on request. Tell us your application and we will recommend the right material.',
  },
];

const MaterialsSection = () => {
  return (
    <section className="py-24 px-6 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Materials</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
            Materials We Work With
          </h2>
          <p className="text-white/35 text-sm font-light max-w-xl">
            Choose the right material for your application. Glass transition temperature indicates the heat limit; tensile strength indicates load capacity.
          </p>
        </motion.div>

        {/* Column headers — desktop only */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 mb-0 border-t border-x border-white/8 bg-white/[0.015]">
          <div className="col-span-2 text-[9px] tracking-[0.35em] uppercase text-white/20">Material</div>
          <div className="col-span-1 text-[9px] tracking-[0.35em] uppercase text-white/20 text-center">Glass Temp</div>
          <div className="col-span-3 text-[9px] tracking-[0.35em] uppercase text-white/20">Tensile Strength</div>
          <div className="col-span-2 text-[9px] tracking-[0.35em] uppercase text-white/20">Best For</div>
          <div className="col-span-4 text-[9px] tracking-[0.35em] uppercase text-white/20">Notes</div>
        </div>

        {/* Rows */}
        <div className="border border-white/8">
          {materials.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col md:grid md:grid-cols-12 md:items-center gap-2 md:gap-4 px-6 py-5 border-b border-white/8 last:border-0 hover:bg-white/[0.025] transition-colors duration-200 group"
            >
              {/* Name + tag */}
              <div className="col-span-2 flex items-center gap-3">
                <h3 className="text-lg font-black text-white">{m.name}</h3>
                <span className="text-[8px] uppercase tracking-widest font-bold text-white/20 border border-white/10 px-2 py-0.5 hidden xl:block">
                  {m.tag}
                </span>
              </div>

              {/* Glass transition temp */}
              <div className="col-span-1 flex items-center gap-2 md:justify-center">
                <span className="md:hidden text-[9px] text-white/20 uppercase tracking-widest">Tg:</span>
                <span className="text-sm font-bold text-white/65 font-mono">{m.tg}</span>
              </div>

              {/* Tensile */}
              <div className="col-span-3 flex items-center gap-2">
                <span className="md:hidden text-[9px] text-white/20 uppercase tracking-widest">Strength:</span>
                <span className="text-xs font-mono text-white/50">{m.tensile}</span>
              </div>

              {/* Best for */}
              <div className="col-span-2 flex items-start gap-2">
                <span className="md:hidden text-[9px] text-white/20 uppercase tracking-widest shrink-0">Best for:</span>
                <span className="text-xs text-white/38 leading-snug">{m.best}</span>
              </div>

              {/* Description */}
              <div className="col-span-4">
                <p className="text-white/38 text-xs font-light leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-white/18 text-xs mt-4 font-light">
          * Tensile strength values are approximate and depend on print orientation, infill density, and wall count. Contact us for application-specific guidance.
        </p>
      </div>
    </section>
  );
};

export default MaterialsSection;
