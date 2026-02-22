import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }),
};

function ImageCarousel({ images, alt }) {
  const [current, setCurrent] = useState(0);
  if (images.length === 1) {
    return (
      <div className="w-full h-full min-h-[340px] overflow-hidden">
        <img src={images[0]} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="relative w-full h-full min-h-[340px] overflow-hidden group">
      <img
        key={current}
        src={images[current]}
        alt={`${alt} ${current + 1}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={16} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: 'FV01 — Full-Scale 3D Printed F1 Model',
    category: 'Scale Modelling',
    tag: 'Flagship Build',
    description: 'The FV01 is one of the most advanced 3D printed F1 scale models built in India — a full multi-part build of the Mercedes W11 #44, printed across hundreds of components in high-detail PLA. Assembled with accurate aerodynamic surfaces, carbon-look livery, and housed in a custom acrylic showcase. A benchmark in what precision FDM printing can achieve.',
    images: ['/projects/fv01_model.jpg'],
    specs: [
      'Multi-part PLA assembly — 100+ components',
      'Custom acrylic display case',
      'Mercedes W11 #44 accurate livery',
      'Full aerodynamic surface detail',
    ],
  },
  {
    id: 2,
    title: "India's Fastest FPV Drone — 329 km/h",
    category: 'Aerospace · High Performance',
    tag: 'Record Build',
    description: "A fully custom high-speed FPV racing drone with a 3D printed structural frame, motor mounts, and aerodynamic shrouds — this build hit 329 km/h, making it India's fastest recorded drone. Every printed component was engineered for aerodynamic efficiency and weight minimisation while surviving extreme thrust loads.",
    images: ['/projects/drone_fast.png'],
    specs: [
      'Top speed: 329 km/h',
      '3D printed frame, mounts and shrouds',
      'Aerodynamic profile optimised for speed',
      'Lightweight PLA + carbon fibre hybrid',
    ],
  },
  {
    id: 3,
    title: 'Autonomous Disaster Management Drone',
    category: 'Aerospace · Autonomous Systems',
    tag: 'Runner-Up · Aerothon',
    description: 'Built for Aerothon — a national-level autonomous UAV competition — this hexacopter had to complete a full mission without any human intervention, from takeoff through waypoint navigation to payload drop and safe return. The system used a state machine architecture with deterministic phase transitions, sensor-driven decision making, and layered failsafe logic. The hardest engineering was in the edge cases: sensor noise, timing mismatches, and conditions that worked in simulation but failed in the field. Runner-up at the national final.',
    images: ['/projects/drone_disaster.jpg'],
    specs: [
      'Fully autonomous — zero human intervention during mission',
      'State machine architecture with failsafe recovery',
      '3D printed payload drop mechanism and landing legs',
      'Runner-up at Aerothon national competition',
    ],
  },
  {
    id: 4,
    title: 'Low-Bypass Turbofan Engine — Full Assembly',
    category: 'Mechanical Engineering',
    tag: 'Showcase Build',
    description: 'A fully 3D printed low-bypass turbofan based on 1960s jet engine architecture — the same configuration that powered the Boeing 727 and DC-9. Built across multiple print sessions with two-tone PLA (white casing, bronze-tan blades), the model shows the actual internal layout: fan stages, axial compressor, combustion section and turbine stages. Every blade row is printed separately and assembled by hand.',
    images: ['/projects/turbofan_1.webp', '/projects/turbofan_2.webp', '/projects/turbofan_3.webp'],
    specs: [
      '10+ compressor and turbine stages',
      '100+ individually printed and assembled parts',
      'Dual-tone PLA — white casing, bronze-tan blades',
      'Based on 1960s low-bypass turbofan architecture',
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 text-center">
          <p className="text-xs tracking-[0.5em] text-white/30 uppercase mb-4">Our Work</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Projects</h1>
          <div className="w-10 h-px bg-white/15 mx-auto mb-5" />
          <p className="text-white/40 text-sm font-light max-w-md mx-auto leading-relaxed">
            From scale models to aerospace systems — a selection of builds that define what Dr.PrinT is capable of.
          </p>
        </motion.div>

        {/* Projects — alternating layout */}
        <div className="space-y-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`grid grid-cols-1 md:grid-cols-2 border border-white/08 hover:border-white/14 transition-colors duration-300 overflow-hidden`}
            >
              {/* Image — alternate sides */}
              <div className={`min-h-[340px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <ImageCarousel images={project.images} alt={project.title} />
              </div>

              {/* Content */}
              <div className={`p-5 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="text-[9px] tracking-[0.4em] text-white/25 uppercase">{project.category}</span>
                  {project.tag && (
                    <span className="text-[9px] font-bold tracking-widest uppercase border border-white/15 px-2 py-0.5 text-white/38">
                      {project.tag}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4">{project.title}</h2>
                <p className="text-white/48 text-sm leading-relaxed mb-6 font-light">{project.description}</p>

                <ul className="space-y-2">
                  {project.specs.map((s, si) => (
                    <li key={si} className="flex items-start gap-2 text-xs text-white/32">
                      <span className="text-white/18 mt-0.5 shrink-0">—</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={projects.length + 1}
          className="mt-14 border border-white/08 p-10 text-center"
        >
          <p className="text-[10px] tracking-[0.5em] text-white/25 uppercase mb-3">Have a Project in Mind?</p>
          <h2 className="text-2xl font-bold mb-3">Let's Build Something</h2>
          <p className="text-white/40 text-sm font-light max-w-sm mx-auto mb-6 leading-relaxed">
            Whether it's a replica, a prototype, or an aerospace component — we're ready to take it on.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white/85 transition-all duration-300"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
