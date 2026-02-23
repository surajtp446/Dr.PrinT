import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '6', label: 'Engineering Materials' },
  { value: '±0.1mm', label: 'Tolerance Accuracy' },
  { value: '24h', label: 'Quote Response' },
];

const StatsStrip = () => {
  return (
    <section className="py-14 px-6 bg-[#111111] border-y border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-6"
            >
              <span className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-white/40 text-xs uppercase tracking-widest font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
