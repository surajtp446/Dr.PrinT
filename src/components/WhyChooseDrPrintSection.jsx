import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { num: '01', title: 'Calibrated Bambu Lab Systems', desc: 'Professional-grade hardware maintained for consistent dimensional accuracy on every build.' },
  { num: '02', title: 'Structured Print Optimization', desc: 'Every file undergoes orientation review, support strategy, and slicing optimization before production.' },
  { num: '03', title: 'Material-Focused Engineering', desc: 'Material selection is matched to mechanical requirements — not just availability.' },
  { num: '04', title: 'Project Transparency', desc: 'Clear communication from inquiry to delivery. You always know where your project stands.' },
  { num: '05', title: 'One-Off to Production Runs', desc: 'We handle single prototypes and repeat batch orders with the same attention to quality.' },
];

const WhyChooseDrPrintSection = () => {
  return (
    <section className="py-24 px-6 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Trust</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Why Choose Dr.PrinT
          </h2>
        </motion.div>

        <div className="space-y-0">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-white/8 last:border-0 hover:bg-white/[0.02] px-4 transition-colors duration-300 rounded-lg group"
            >
              <span className="text-white/10 text-2xl font-black md:w-16 flex-shrink-0 group-hover:text-white/20 transition-colors">
                {reason.num}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseDrPrintSection;
