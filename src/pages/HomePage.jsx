import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection.jsx';
import StatsStrip from '@/components/StatsStrip.jsx';
import WhoWeWorkWithSection from '@/components/WhoWeWorkWithSection.jsx';
import HowItWorksSection from '@/components/HowItWorksSection.jsx';
import WhyChooseDrPrintSection from '@/components/WhyChooseDrPrintSection.jsx';
import CommercialProductionSection from '@/components/CommercialProductionSection.jsx';

const teasers = [
  {
    label: 'Capabilities',
    title: 'What we actually build',
    body: 'Rapid prototypes, functional parts, small batch runs, multi-part assemblies. If you have a file, we can print it. If you have an idea, we can help you get there.',
    link: '/custom',
    cta: 'Submit a file',
  },
  {
    label: 'Materials',
    title: 'PLA to Carbon Fibre Nylon',
    body: 'Seven material options from standard PLA to industrial PA12-CF. Each with different strength, heat resistance and finish. Not sure what you need? We advise.',
    link: '/custom',
    cta: 'Get material advice',
  },
  {
    label: 'Process',
    title: 'File in. Part out.',
    body: 'Send a file, pick your settings, get a quote in 24 hours. We print on Bambu Lab X1 Carbon and P1S at up to 500mm/s with 0.1mm tolerance.',
    link: '/custom',
    cta: 'Start a request',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12 } }),
};

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen font-poppins">
      <HeroSection />
      <StatsStrip />
      <WhoWeWorkWithSection />
      <HowItWorksSection />

      {/* Teaser section — slim info cards replacing the full sections */}
      <section className="py-24 px-6 bg-[#080808] border-t border-white/05">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.45em] text-white/25 uppercase mb-4">More Detail</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Know what you need?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/08">
            {teasers.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`p-8 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-200
                  ${i < teasers.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/08' : ''}`}
              >
                <div>
                  <p className="text-[9px] tracking-[0.4em] uppercase text-white/22 mb-3">{t.label}</p>
                  <h3 className="text-xl font-black text-white mb-3 leading-tight">{t.title}</h3>
                  <p className="text-sm text-white/42 font-light leading-relaxed">{t.body}</p>
                </div>
                <Link
                  to={t.link}
                  className="mt-6 self-start text-[10px] font-bold uppercase tracking-widest text-white/35 border-b border-white/14 pb-0.5 hover:text-white hover:border-white transition-all duration-200"
                >
                  {t.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseDrPrintSection />
      <CommercialProductionSection />
    </div>
  );
};

export default HomePage;
