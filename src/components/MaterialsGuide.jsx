import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const materials = [
  {
    name: 'PLA', tag: 'Standard', color: 'rgba(255,255,255,0.12)',
    tg: '60°C', tensile: '~50 MPa',
    best: 'Prototypes, display models, scale builds',
    desc: 'Best surface finish and detail of any FDM material. Not suited for high-heat or load-bearing applications.',
    avoid: 'Direct sunlight, hot car interiors',
  },
  {
    name: 'PETG', tag: 'Functional', color: 'rgba(100,180,255,0.12)',
    tg: '80°C', tensile: '~50 MPa',
    best: 'Enclosures, brackets, mechanical parts',
    desc: 'Good impact resistance with dimensional stability. Moisture-resistant and reliable for everyday functional parts.',
    avoid: 'High precision fits (tends to string)',
  },
  {
    name: 'ASA', tag: 'Outdoor', color: 'rgba(100,220,130,0.12)',
    tg: '100°C', tensile: '~55 MPa',
    best: 'Outdoor, automotive, signage',
    desc: 'UV and weather resistant. Keeps colour and structure under prolonged sun exposure. Similar to ABS but without the warping.',
    avoid: 'Fine detail work',
  },
  {
    name: 'TPU', tag: 'Flexible', color: 'rgba(255,200,80,0.12)',
    tg: '—', tensile: '~40 MPa / >400% elongation',
    best: 'Gaskets, grips, seals, dampeners',
    desc: 'Rubber-like flexibility with high abrasion resistance. For parts that need to bend, compress, or absorb impact.',
    avoid: 'Rigid structural parts',
  },
  {
    name: 'PA6-CF', tag: 'High Strength', color: 'rgba(232,64,28,0.12)',
    tg: '185°C', tensile: '~110 MPa',
    best: 'Structural parts, jigs, load-bearing',
    desc: 'Carbon fibre reinforced Nylon 6. Exceptional stiffness-to-weight ratio. The go-to for high-performance and engineering builds.',
    avoid: 'Decorative parts (matte, industrial finish)',
  },
  {
    name: 'PA12-CF', tag: 'Industrial', color: 'rgba(180,100,255,0.12)',
    tg: '175°C', tensile: '~100 MPa',
    best: 'Chemical exposure, aerospace, fixtures',
    desc: 'Carbon fibre reinforced Nylon 12. Better chemical resistance than PA6-CF. Suited for demanding industrial environments.',
    avoid: 'Budget-sensitive projects',
  },
];

const tips = [
  { q: 'Just a visual model or display piece?', a: 'PLA' },
  { q: 'Functional part indoors?', a: 'PETG' },
  { q: 'Goes outside or in a car?', a: 'ASA' },
  { q: 'Needs to flex or grip?', a: 'TPU' },
  { q: 'Load-bearing or high strength?', a: 'PA6-CF' },
  { q: 'Chemical exposure or aerospace?', a: 'PA12-CF' },
  { q: 'Not sure?', a: 'Tell us the application — we advise free' },
];

export default function MaterialsGuide({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }} transition={{ type: 'tween', duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#080808] border border-white/10 overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.07) transparent' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[#080808] border-b border-white/08">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 mb-0.5">Dr.PrinT</p>
            <h2 className="font-black text-lg">Material Selection Guide</h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* Quick picker */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/28 mb-4">Quick Picker</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tips.map((t, i) => (
                <div key={i} className="flex items-center justify-between border border-white/07 bg-white/[0.02] px-4 py-3 gap-4">
                  <span className="text-sm text-white/40 font-light">{t.q}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70 border border-white/12 px-2.5 py-1 shrink-0">{t.a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full reference table */}
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/28 mb-4">Full Reference</p>
          <p className="text-white/30 text-xs font-light mb-5">Glass temp = how much heat it handles before deforming. Tensile strength = how much load before it fails.</p>

          <div className="space-y-3">
            {materials.map((m, i) => (
              <div key={i} className="border border-white/07 overflow-hidden" style={{ background: m.color }}>
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr_1fr_1fr] gap-0">
                  {/* Name + tag */}
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/06 flex flex-col justify-center">
                    <span className="font-black text-base text-white">{m.name}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mt-0.5">{m.tag}</span>
                  </div>
                  {/* Specs */}
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/06">
                    <p className="text-[9px] uppercase tracking-widest text-white/22 mb-1">Glass Temp · Tensile</p>
                    <p className="text-xs text-white/55 font-light">{m.tg} &nbsp;·&nbsp; {m.tensile}</p>
                    <p className="text-[9px] uppercase tracking-widest text-white/22 mt-2 mb-1">Best For</p>
                    <p className="text-xs text-white/55 font-light">{m.best}</p>
                  </div>
                  {/* Description */}
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/06">
                    <p className="text-[9px] uppercase tracking-widest text-white/22 mb-1">Why Use It</p>
                    <p className="text-xs text-white/50 font-light leading-relaxed">{m.desc}</p>
                  </div>
                  {/* Avoid */}
                  <div className="p-4">
                    <p className="text-[9px] uppercase tracking-widest text-white/22 mb-1">Avoid If</p>
                    <p className="text-xs text-white/38 font-light">{m.avoid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/18 text-xs text-center mt-6 font-light">
            Values are approximate and vary with print orientation, infill percentage and wall count.
            Still not sure? Tell us your application and we will advise.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
