import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'File Review' },
  { number: '02', title: 'Print Optimization' },
  { number: '03', title: 'Precision Fabrication' },
  { number: '04', title: 'Quality Check' },
  { number: '05', title: 'Delivery' },
];

const PrototypingWorkflowSection = () => {
  return (
    <section className="py-20 px-6 bg-black overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-20 text-center"
        >
          Our Prototyping Workflow
        </motion.h2>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium text-white max-w-[150px]">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrototypingWorkflowSection;