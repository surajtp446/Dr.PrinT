import React from 'react';
import { motion } from 'framer-motion';

const capabilities = [
  { title: 'Rapid Prototyping', desc: 'Fast iteration from digital file to physical part.' },
  { title: 'Functional Part Production', desc: 'End-use components built for real-world performance.' },
  { title: 'Small Batch Manufacturing', desc: 'Repeatable quality across production runs.' },
  { title: 'Multi-Part Assembly', desc: 'Complex assemblies with precise fitment and alignment.' },
  { title: 'Design Optimization', desc: 'Geometry review and print orientation guidance.' },
  { title: 'Material Selection', desc: 'Engineering-grade material recommendation for your use case.' },
];

const FabricationCapabilitiesSection = () => {
  return (
    <section id="capabilities" className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Fabrication Capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-xl overflow-hidden border border-white/8">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-black hover:bg-[#111] transition-colors duration-300 p-8 flex flex-col gap-3 group"
            >
              <span className="text-white/10 text-4xl font-black leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight group-hover:text-white transition-colors">
                {cap.title}
              </h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FabricationCapabilitiesSection;
