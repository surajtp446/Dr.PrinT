import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Rapid Prototype Assembly',
    application: 'Product Development',
    material: 'PETG',
    description: 'Multi-part assembly designed for functional testing and design validation. Reduced development cycle by eliminating costly early-stage tooling.',
    image: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/815d78399882293fd919ab915af4a9be.jpg',
    align: 'left',
  },
  {
    title: 'Structural Component',
    application: 'Industrial Use',
    material: 'PA12-CF',
    description: 'Carbon fiber reinforced part engineered for load-bearing applications. Maintains dimensional stability under continuous mechanical stress.',
    image: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/211fde32b228c460e740b93ac49f70bb.jpg',
    align: 'right',
  },
  {
    title: 'F1 Display Build',
    application: 'Custom Showcase',
    material: 'PLA',
    description: 'Precision-built multi-part assembly with integrated acrylic enclosure and lighting. Demonstrates high-resolution detail and surface finish capability.',
    image: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/30875e7bf8328af3379d9fa2a8890fc5.jpg',
    align: 'left',
  },
];

const ProjectHighlightsSection = () => {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Project Highlights
          </h2>
        </motion.div>

        <div className="space-y-28">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${project.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 overflow-hidden rounded-lg group">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = '<div class="w-full h-72 md:h-96 bg-[#1a1a1a] border border-white/10 rounded-lg flex items-center justify-center"><span class="text-white/10 text-4xl font-black">IMG</span></div>';
                  }}
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-wrap gap-3 mb-5 text-xs font-bold uppercase tracking-widest text-white/35">
                  <span>{project.application}</span>
                  <span>·</span>
                  <span>{project.material}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="text-white/60 text-base leading-relaxed mb-8 font-light">
                  {project.description}
                </p>
                <a
                  href="/projects"
                  className="text-white/50 text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:text-white hover:border-white transition-all duration-300"
                >
                  View All Projects →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectHighlightsSection;
