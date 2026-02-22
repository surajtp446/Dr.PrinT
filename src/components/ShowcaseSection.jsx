import React from 'react';
import { motion } from 'framer-motion';

const showcaseImages = [
  {
    url: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/815d78399882293fd919ab915af4a9be.jpg',
    alt: 'Precision 3D printed mechanical component with intricate engineering details'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/211fde32b228c460e740b93ac49f70bb.jpg',
    alt: 'High-quality 3D printed prototype demonstrating advanced manufacturing capabilities'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/30875e7bf8328af3379d9fa2a8890fc5.jpg',
    alt: 'Custom 3D printed model showcasing precision engineering and detail'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/a9999c970354b113a93f8fc176ba36c8.jpg',
    alt: 'Industrial-grade 3D printed part with exceptional surface finish'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/509ad00197aad6fd7dc1b6b6d8c3c393.jpg',
    alt: 'Professional 3D printed model demonstrating rapid prototyping excellence'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/d2040485-e7c6-4e63-84f8-e5bb47e7a260/38e0e32ce4581f45b47a843ff154d065.jpg',
    alt: 'Complex 3D printed structure showcasing advanced printing technology'
  }
];

const ShowcaseSection = () => {
  return (
    <section id="portfolio" className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16"
        >
          From Concept to Precision Build
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-white/20 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;