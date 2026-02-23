import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07 } }),
};

function ImageCarousel({ images, alt }) {
  const [current, setCurrent] = useState(0);
  if (images.length === 1) return (
    <div className="w-full h-52 overflow-hidden">
      <img src={images[0]} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
  return (
    <div className="relative w-full h-52 overflow-hidden group">
      <img key={current} src={images[current]} alt={`${alt} ${current + 1}`}
        className="w-full h-full object-cover" />
      <button onClick={e => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={13} />
      </button>
      <button onClick={e => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={13} />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }}
            className={`w-1 h-1 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/35'}`} />
        ))}
      </div>
    </div>
  );
}

// Detail modal shown when card is clicked
function ProjectModal({ project, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/88 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }} transition={{ type: 'tween', duration: 0.24 }}
        className="relative w-full max-w-2xl max-h-[88vh] bg-[#0a0a0a] border border-white/10 overflow-y-auto">

        {/* Image */}
        <div className="w-full h-64 overflow-hidden">
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors bg-black/60 rounded-full p-1.5">
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-[9px] tracking-[0.38em] text-white/22 uppercase">{project.category}</span>
            {project.tag && (
              <span className="text-[9px] font-black tracking-widest uppercase border border-white/12 px-2 py-0.5 text-white/35">
                {project.tag}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-black leading-tight mb-4">{project.title}</h2>
          <p className="text-white/50 text-sm leading-relaxed font-light mb-7">{project.description}</p>

          <ul className="space-y-2.5 border-t border-white/07 pt-6">
            {project.specs.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-white/35">
                <span className="w-1 h-1 rounded-full bg-white/22 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Card — shows image, category, title, tag and "Read more" only
function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      onClick={onClick}
      className="border border-white/08 bg-white/[0.012] hover:border-white/18 transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="w-full h-52">
          <img src={project.images[0]} alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        {/* Tag badge */}
        {project.tag && (
          <div className="absolute top-3 left-3 bg-white text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
            {project.tag}
          </div>
        )}
        {/* Image count if multiple */}
        {project.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 text-white/50 text-[9px] font-mono px-1.5 py-0.5">
            {project.images.length} photos
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="p-5">
        <p className="text-[9px] tracking-[0.38em] text-white/22 uppercase mb-2">{project.category}</p>
        <h3 className="font-black text-sm leading-snug mb-3 group-hover:text-white/90 transition-colors">{project.title}</h3>
        <span className="text-[9px] font-black uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors flex items-center gap-1">
          Read more
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </motion.div>
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
    specs: ['Multi-part PLA assembly — 100+ components','Custom acrylic display case','Mercedes W11 #44 accurate livery','Full aerodynamic surface detail'],
  },
  {
    id: 2,
    title: "India's Fastest FPV Drone — 329 km/h",
    category: 'Aerospace · High Performance',
    tag: 'Record Build',
    description: "A fully custom high-speed FPV racing drone with a 3D printed structural frame, motor mounts, and aerodynamic shrouds — this build hit 329 km/h, making it India's fastest recorded drone. Every printed component was engineered for aerodynamic efficiency and weight minimisation while surviving extreme thrust loads.",
    images: ['/projects/drone_fast.png'],
    specs: ['Top speed: 329 km/h','3D printed frame, mounts and shrouds','Aerodynamic profile optimised for speed','Lightweight PLA + carbon fibre hybrid'],
  },
  {
    id: 3,
    title: 'Autonomous Disaster Management Drone',
    category: 'Aerospace · Autonomous Systems',
    tag: 'Runner-Up · Aerothon',
    description: 'Built for Aerothon — a national-level autonomous UAV competition — this hexacopter completed a full mission without any human intervention, from takeoff through waypoint navigation to payload drop and safe return. State machine architecture, sensor-driven decision making, and layered failsafe logic. Runner-up at the national final.',
    images: ['/projects/drone_disaster.jpg'],
    specs: ['Fully autonomous — zero human intervention during mission','State machine architecture with failsafe recovery','3D printed payload drop mechanism and landing legs','Runner-up at Aerothon national competition'],
  },
  {
    id: 4,
    title: 'Low-Bypass Turbofan Engine — Full Assembly',
    category: 'Mechanical Engineering',
    tag: 'Showcase Build',
    description: 'A fully 3D printed low-bypass turbofan based on 1960s jet engine architecture — the same configuration that powered the Boeing 727 and DC-9. Built with two-tone PLA (white casing, bronze-tan blades), the model shows the actual internal layout: fan stages, axial compressor, combustion section and turbine stages. Every blade row printed and assembled by hand.',
    images: ['/projects/turbofan_1.webp', '/projects/turbofan_2.webp', '/projects/turbofan_3.webp'],
    specs: ['10+ compressor and turbine stages','100+ individually printed and assembled parts','Dual-tone PLA — white casing, bronze-tan blades','Based on 1960s low-bypass turbofan architecture'],
  },
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-14 text-center">
          <p className="text-xs tracking-[0.5em] text-white/28 uppercase mb-4">Our Work</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Projects</h1>
          <div className="w-10 h-px bg-white/12 mx-auto mb-5" />
          <p className="text-white/38 text-sm font-light max-w-md mx-auto leading-relaxed">
            From scale models to aerospace systems. Click any project to learn more.
          </p>
        </motion.div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i}
              onClick={() => setSelected(project)} />
          ))}
        </div>

        {/* CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={5}
          className="border border-white/08 p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-white/22 uppercase mb-2">Have a Project in Mind?</p>
            <h2 className="text-2xl font-black">Let's Build Something</h2>
            <p className="text-white/38 text-sm font-light mt-1 max-w-xs leading-relaxed">
              Replica, prototype, or aerospace component — we are ready.
            </p>
          </div>
          <Link to="/contact"
            className="shrink-0 px-8 py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.18em] hover:bg-white/85 transition-all duration-300">
            Start a Project
          </Link>
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
