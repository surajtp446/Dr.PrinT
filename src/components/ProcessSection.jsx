import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileSearch, Printer, CheckCircle, Truck } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Consult',
    description: 'Discuss your project requirements and specifications'
  },
  {
    icon: FileSearch,
    title: 'Design Review',
    description: 'Analyze and optimize your 3D models for printing'
  },
  {
    icon: Printer,
    title: 'Print',
    description: 'Precision manufacturing with industrial-grade equipment'
  },
  {
    icon: CheckCircle,
    title: 'Quality Check',
    description: 'Rigorous inspection to ensure perfect results'
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Secure packaging and timely delivery to your door'
  }
];

const ProcessSection = () => {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-20"
        >
          Your Path to Precision
        </motion.h2>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:flex items-start justify-between relative">
          <div className="absolute top-14 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="flex flex-col items-center relative z-10 flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 flex items-center justify-center mb-6 shadow-xl"
                >
                  <Icon className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-white/70 text-center text-sm max-w-[180px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;