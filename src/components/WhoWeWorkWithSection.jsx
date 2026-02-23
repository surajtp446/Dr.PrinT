import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const clients = [
  {
    tag: '01',
    title: 'Startups & Product Teams',
    description: 'Rapid prototyping, design validation, and concept development support. Get from CAD to physical part in days, not weeks.',
    link: '/contact',
  },
  {
    tag: '02',
    title: 'Engineering & Industrial Clients',
    description: 'Functional parts, replacement components, and small-batch production with repeatable dimensional accuracy.',
    link: '/contact',
  },
  {
    tag: '03',
    title: 'Creators & Custom Projects',
    description: 'Precision-built custom assemblies, display builds, and collector-grade models crafted with professional finishing.',
    link: '/projects',
  },
];

const WhoWeWorkWithSection = () => {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Serving</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Who We Work With
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-xl overflow-hidden">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-10 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] border-r border-white/10 last:border-r-0 transition-all duration-300 group flex flex-col"
            >
              <span className="text-white/15 text-5xl font-black mb-8 block">{client.tag}</span>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">{client.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm flex-grow mb-8">
                {client.description}
              </p>
              <Link
                to={client.link}
                className="text-white/50 text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:text-white hover:border-white transition-all duration-300 self-start"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWithSection;
