import React from 'react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    title: 'Industrial-Grade Materials',
    description: 'Access to premium materials including ABS, PLA, PETG, Nylon, and specialized composites for demanding applications.'
  },
  {
    title: 'Precision Tolerances',
    description: 'Achieve tolerances down to ±0.1mm with our calibrated equipment and rigorous quality control processes.'
  },
  {
    title: 'Rapid Prototyping',
    description: 'From concept to physical model in days, not weeks. Perfect for iterative design and accelerated testing.'
  },
  {
    title: 'Custom Manufacturing',
    description: 'Scalable production runs from single prototypes to small batch manufacturing with consistent quality.'
  }
];

const CapabilitySection = () => {
  return (
    <section id="services" className="py-16 px-4" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16"
        >
          Our Capabilities
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ 
                y: -8, 
                borderColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)'
              }}
              className="p-8 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {capability.title}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitySection;