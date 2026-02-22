import React from 'react';
import { motion } from 'framer-motion';

const machines = [
  {
    name: 'Bambu Lab X1 Carbon',
    type: 'Core XY · Multi-material',
    specs: [
      'Print speed up to 500 mm/s',
      '256 × 256 × 256 mm build volume',
      'Auto bed levelling & vibration compensation',
      'Multi-material via AMS (up to 16 colours)',
    ],
    materials: 'PLA · PETG · TPU · PA-CF · PET-CF',
    badge: 'Primary Machine',
    highlight: true,
  },
  {
    name: 'Bambu Lab P1S',
    type: 'Core XY · Enclosed',
    specs: [
      'Print speed up to 500 mm/s',
      'Fully enclosed — engineering materials',
      '256 × 256 × 256 mm build volume',
      'AMS compatible — multi-material capable',
    ],
    materials: 'PLA · ASA · PA6-CF · PA12-CF · PETG',
    badge: 'Engineering Machine',
    highlight: false,
  },
];

const why = [
  { stat: '±0.1mm', label: 'Dimensional Tolerance' },
  { stat: '500mm/s', label: 'Max Print Speed' },
  { stat: '280°C', label: 'Max Nozzle Temp' },
  { stat: '16', label: 'Colours in One Print' },
];

const EquipmentSection = () => {
  return (
    <section className="py-24 px-6 bg-black border-t border-white/05">
      <div className="container mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Equipment</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
            Powered by Bambu Lab
          </h2>
          <p className="text-white/35 text-sm font-light max-w-xl leading-relaxed">
            We print exclusively on Bambu Lab systems — the same machines used by professional studios and R&D teams globally. No budget printers. No compromises on quality.
          </p>
        </motion.div>

        {/* Machine cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {machines.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`border p-8 relative ${m.highlight ? 'border-white/18 bg-white/[0.03]' : 'border-white/08 bg-white/[0.015]'}`}
            >
              {m.badge && (
                <div className="absolute top-5 right-5 text-[9px] font-bold tracking-widest uppercase border border-white/15 px-2 py-0.5 text-white/35">
                  {m.badge}
                </div>
              )}

              <p className="text-[9px] tracking-[0.4em] text-white/25 uppercase mb-2">{m.type}</p>
              <h3 className="text-2xl font-black text-white mb-5">{m.name}</h3>

              <ul className="space-y-2 mb-6">
                {m.specs.map((s, si) => (
                  <li key={si} className="flex items-start gap-2 text-sm text-white/45 font-light">
                    <span className="text-white/20 mt-0.5 shrink-0">—</span>
                    {s}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/06">
                <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase mb-1">Compatible Materials</p>
                <p className="text-xs text-white/40 font-light">{m.materials}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key specs strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-white/08"
        >
          {why.map((w, i) => (
            <div key={i} className={`px-8 py-6 text-center ${i < why.length - 1 ? 'border-r border-white/08' : ''}`}>
              <div className="text-3xl font-black text-white mb-1">{w.stat}</div>
              <div className="text-[9px] tracking-[0.3em] text-white/25 uppercase">{w.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default EquipmentSection;
