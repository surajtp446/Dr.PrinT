import React from 'react';
import { motion } from 'framer-motion';

const DualCTASection = () => {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm shadow-2xl"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              For Creators
            </h3>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Bring your creative visions to life with custom 3D printing. Perfect for artists, hobbyists, and makers who demand quality and precision in every detail.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Custom Personal Print
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm shadow-2xl"
            style={{ backgroundColor: '#252525' }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              For Companies
            </h3>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Scale your production with industrial-grade 3D printing. From rapid prototyping to small batch manufacturing with consistent quality and reliability.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Request Industrial Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualCTASection;