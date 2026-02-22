import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, PackageCheck, ChevronDown } from 'lucide-react';

const fullMaterials = [
  { name: 'PLA', tag: 'Standard', tg: '60°C', tensile: '~50 MPa', best: 'Prototypes, display models, scale builds', desc: 'Best surface finish and detail of any FDM material. Not suited for high-heat or load-bearing use.' },
  { name: 'PETG', tag: 'Functional', tg: '80°C', tensile: '~50 MPa', best: 'Enclosures, brackets, mechanical parts', desc: 'Good impact resistance with dimensional stability. Moisture-resistant and a reliable choice for functional parts.' },
  { name: 'ASA', tag: 'Outdoor', tg: '100°C', tensile: '~55 MPa', best: 'Outdoor, automotive, signage', desc: 'UV and weather resistant. Keeps its colour and structure under prolonged sun exposure.' },
  { name: 'TPU', tag: 'Flexible', tg: '—', tensile: '~40 MPa / >400% elongation', best: 'Gaskets, grips, seals, dampeners', desc: 'Rubber-like flexibility with high abrasion resistance. For parts that need to bend or absorb impact.' },
  { name: 'PA6-CF', tag: 'High Strength', tg: '185°C', tensile: '~110 MPa', best: 'Structural parts, jigs, load-bearing', desc: 'Carbon fibre reinforced Nylon 6. Exceptional stiffness-to-weight ratio. The go-to for high-performance builds.' },
  { name: 'PA12-CF', tag: 'Industrial', tg: '175°C', tensile: '~100 MPa', best: 'Chemical-exposure parts, aerospace, tooling', desc: 'Carbon fibre reinforced Nylon 12. Superior chemical resistance for the most demanding environments.' },
  { name: 'On Demand', tag: 'Custom', tg: 'Varies', tensile: 'Varies', best: 'Specialty and composite requirements', desc: 'High-temp polymers and specialty filaments sourced on request. Tell us your application.' },
];



const infillPatterns = [
  { value: 'gyroid', label: 'Gyroid', desc: 'Best all-round strength & flexibility' },
  { value: 'grid', label: 'Grid', desc: 'Fast, strong, standard choice' },
  { value: 'honeycomb', label: 'Honeycomb', desc: 'Great lateral strength' },
  { value: 'cubic', label: 'Cubic', desc: 'Isotropic — equal strength all directions' },
  { value: 'lines', label: 'Lines', desc: 'Fastest print, lower strength' },
  { value: 'lightning', label: 'Lightning', desc: 'Minimal material, visual models only' },
  { value: 'concentric', label: 'Concentric', desc: 'Good for flexible parts (TPU)' },
  { value: 'unsure', label: "I'm not sure — advise me", desc: 'We will recommend based on your use case' },
];

const materials = [
  { value: 'pla', label: 'PLA', desc: 'Standard — prototypes & display' },
  { value: 'petg', label: 'PETG', desc: 'Functional — impact resistant' },
  { value: 'asa', label: 'ASA', desc: 'Outdoor — UV stable' },
  { value: 'tpu', label: 'TPU', desc: 'Flexible — gaskets & grips' },
  { value: 'pa6cf', label: 'PA6-CF', desc: 'High strength — carbon fibre nylon' },
  { value: 'pa12cf', label: 'PA12-CF', desc: 'Industrial — thermal resistance' },
  { value: 'custom', label: 'Not sure — advise me', desc: 'We will recommend the best fit' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function CustomPage() {
  const [files, setFiles]           = useState([]);
  const [material, setMaterial]     = useState('');
  const [infillPct, setInfillPct]   = useState(20);
  const [infillPattern, setInfillPattern] = useState('');
  const [walls, setWalls]           = useState(3);
  const [layerHeight, setLayerHeight] = useState('0.20');
  const [quantity, setQuantity]     = useState(1);
  const [description, setDescription] = useState('');
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [phone, setPhone]           = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [dragging, setDragging]     = useState(false);

  function handleDrop(e) {
    e.preventDefault(); setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  }

  function handleFileInput(e) {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
  }

  function removeFile(i) {
    setFiles(prev => prev.filter((_, j) => j !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Send all details to Formspree — emails drprint automatically
    try {
      await fetch('https://formspree.io/f/mykdnjqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New Dr.PrinT Print Request — ${material} — ${name}`,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          material: material,
          infill_percent: `${infillPct}%`,
          infill_pattern: infillPattern,
          wall_count: wallCount,
          layer_height: `${layerHeight}mm`,
          quantity: quantity,
          files_attached: files.map(f => f.name).join(', ') || 'None',
          notes: description || 'None',
        }),
      });
    } catch (err) {
      console.error('Formspree error:', err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
          <div className="w-14 h-14 border border-white/20 flex items-center justify-center mx-auto mb-8">
            <PackageCheck className="w-6 h-6 text-white/60" />
          </div>
          <p className="text-xs tracking-[0.45em] text-white/30 uppercase mb-4">Request Received</p>
          <h2 className="text-3xl font-black mb-4">We've got your request.</h2>
          <p className="text-white/45 text-sm font-light leading-relaxed mb-8">
            We'll review your files and print settings and get back to you with a quote within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFiles([]); setDescription(''); setName(''); setEmail(''); setPhone(''); }}
            className="text-[10px] font-bold uppercase tracking-widest border border-white/20 px-6 py-3 text-white/50 hover:text-white hover:border-white transition-all"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-14 text-center">
          <p className="text-xs tracking-[0.5em] text-white/30 uppercase mb-4">Custom Order</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Submit Your Request</h1>
          <div className="w-10 h-px bg-white/15 mx-auto mb-5" />
          <p className="text-white/38 text-sm font-light max-w-md mx-auto leading-relaxed">
            Upload your files, set your print preferences, and add any notes. We'll review and send you a quote within 24 hours.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>

          {/* ── SECTION 1: File Upload ─────────────────────────── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="mb-8">
            <div className="border border-white/08 p-5 md:p-8">
              <h2 className="text-lg font-black mb-1">Upload Files</h2>
              <p className="text-white/55 text-xs font-light mb-6">STL · STEP · OBJ · 3MF · any CAD format</p>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-none transition-all duration-200 h-44 flex flex-col items-center justify-center cursor-pointer
                  ${dragging ? 'border-white/50 bg-white/[0.04]' : 'border-white/14 bg-white/[0.015] hover:border-white/28 hover:bg-white/[0.025]'}`}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input id="fileInput" type="file" multiple accept=".stl,.step,.stp,.obj,.3mf,.iges,.igs" onChange={handleFileInput} className="hidden" />
                <Upload className="w-8 h-8 text-white/25 mb-3" />
                <span className="text-white/45 text-sm font-medium">Drag & drop files here</span>
                <span className="text-white/22 text-xs mt-1">or click to browse</span>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border border-white/08">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 border border-white/12 px-1.5 py-0.5">
                          {f.name.split('.').pop().toUpperCase()}
                        </span>
                        <span className="text-sm text-white/65 truncate max-w-xs">{f.name}</span>
                        <span className="text-xs text-white/25">{(f.size / 1024).toFixed(0)} KB</span>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-white/25 hover:text-white/70 transition-colors text-sm px-2">×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>


          {/* Materials reference table */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1.5} className="mb-8">
            <div className="border border-white/08 p-5 md:p-8">
              <h2 className="text-lg font-black mb-1">Materials Reference</h2>
              <p className="text-white/55 text-xs font-light mb-6">Not sure what material to pick? Use this as a guide. Glass temp tells you how much heat it can handle before deforming. Tensile strength is how much load it can take.</p>

              {/* Header row */}
              <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 bg-white/[0.015] border border-white/06 mb-0">
                <div className="col-span-2 text-[9px] tracking-[0.3em] uppercase text-white/20">Material</div>
                <div className="col-span-1 text-[9px] tracking-[0.3em] uppercase text-white/20 text-center">Glass Temp</div>
                <div className="col-span-3 text-[9px] tracking-[0.3em] uppercase text-white/20">Tensile Strength</div>
                <div className="col-span-3 text-[9px] tracking-[0.3em] uppercase text-white/20">Best For</div>
                <div className="col-span-3 text-[9px] tracking-[0.3em] uppercase text-white/20">Notes</div>
              </div>

              <div className="border border-white/06">
                {fullMaterials.map((m, i) => (
                  <div key={i}
                    className="flex flex-col md:grid md:grid-cols-12 md:items-center gap-2 md:gap-3 px-4 py-4 border-b border-white/06 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="font-black text-white text-sm">{m.name}</span>
                      <span className="text-[8px] border border-white/10 px-1.5 py-0.5 text-white/22 uppercase tracking-wide hidden xl:block">{m.tag}</span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="font-mono text-sm font-bold text-white/65">{m.tg}</span>
                    </div>
                    <div className="col-span-3">
                      <span className="font-mono text-xs text-white/48">{m.tensile}</span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-xs text-white/38 leading-snug">{m.best}</span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-xs text-white/30 font-light leading-snug">{m.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/15 text-[10px] mt-3">Strength values are approximate and vary with print orientation, infill, and wall count.</p>
            </div>
          </motion.div>

          {/* ── SECTION 2: Material & Print Settings ───────────── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mb-8">
            <div className="border border-white/08 p-5 md:p-8">
              <h2 className="text-lg font-black mb-1">Material & Print Settings</h2>
              <p className="text-white/55 text-xs font-light mb-8">These settings directly affect strength, print time, and cost. Leave anything blank if you're unsure — we'll advise.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Material */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">Material</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {materials.map(m => (
                      <button
                        key={m.value} type="button"
                        onClick={() => setMaterial(m.value)}
                        className={`p-3 text-left border transition-all duration-150 ${material === m.value ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/25'}`}
                      >
                        <div className="text-sm font-bold text-white mb-0.5">{m.label}</div>
                        <div className="text-[10px] text-white/55 leading-snug">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Infill % */}
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">
                    Infill Density — <span className="text-white/65 font-bold">{infillPct}%</span>
                  </label>
                  <input
                    type="range" min="5" max="100" step="5"
                    value={infillPct}
                    onChange={e => setInfillPct(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-white/20 mt-1">
                    <span>5% — Light / Display</span>
                    <span>100% — Solid</span>
                  </div>
                  <div className="mt-2 text-[10px] text-white/35">
                    {infillPct <= 15 && 'Low density — visual models only, not structural'}
                    {infillPct > 15 && infillPct <= 35 && 'Standard — good for most non-load-bearing parts'}
                    {infillPct > 35 && infillPct <= 60 && 'Medium-high — functional parts with moderate loads'}
                    {infillPct > 60 && infillPct <= 85 && 'High density — structural or high-stress applications'}
                    {infillPct > 85 && 'Near-solid — maximum strength, heavier and slower'}
                  </div>
                </div>

                {/* Infill Pattern */}
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">Infill Pattern</label>
                  <div className="relative">
                    <select
                      value={infillPattern}
                      onChange={e => setInfillPattern(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/12 text-white/70 text-sm px-4 py-3 appearance-none cursor-pointer focus:outline-none focus:border-white/35 hover:border-white/22 transition-colors"
                    >
                      <option value="" className="bg-black">Select pattern...</option>
                      {infillPatterns.map(p => (
                        <option key={p.value} value={p.value} className="bg-black">{p.label} — {p.desc}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                  </div>
                </div>

                {/* Wall count */}
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">
                    Wall Count (Perimeters) — <span className="text-white/65 font-bold">{walls}</span>
                  </label>
                  <input
                    type="range" min="1" max="8" step="1"
                    value={walls}
                    onChange={e => setWalls(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-white/20 mt-1">
                    <span>1 — Thin shell</span>
                    <span>8 — Very thick</span>
                  </div>
                  <div className="mt-2 text-[10px] text-white/35">
                    {walls <= 2 && 'Thin walls — visual models, decorative only'}
                    {walls === 3 && 'Standard — most functional parts (recommended)'}
                    {walls >= 4 && walls <= 5 && 'Thick walls — impact resistance & durability'}
                    {walls >= 6 && 'Very thick — near-solid shell, maximum surface strength'}
                  </div>
                </div>

                {/* Layer height */}
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">Layer Height</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['0.08', '0.12', '0.16', '0.20', '0.24', '0.28', '0.32', '0.40'].map(lh => (
                      <button
                        key={lh} type="button"
                        onClick={() => setLayerHeight(lh)}
                        className={`py-2.5 text-sm font-mono border transition-all duration-150 ${layerHeight === lh ? 'border-white bg-white/10 text-white' : 'border-white/10 text-white/50 hover:border-white/25'}`}
                      >
                        {lh}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] text-white/35">
                    {parseFloat(layerHeight) <= 0.12 && 'Ultra-fine detail — slow, highest quality surface'}
                    {parseFloat(layerHeight) > 0.12 && parseFloat(layerHeight) <= 0.16 && 'Fine — good detail, moderate speed'}
                    {parseFloat(layerHeight) > 0.16 && parseFloat(layerHeight) <= 0.24 && 'Standard — best balance of quality and speed'}
                    {parseFloat(layerHeight) > 0.24 && parseFloat(layerHeight) <= 0.32 && 'Draft — faster print, visible layer lines'}
                    {parseFloat(layerHeight) > 0.32 && 'Rapid draft — maximum speed, rough surface'}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">Quantity</label>
                  <div className="flex items-center">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 border border-white/12 text-white/50 hover:border-white/35 hover:text-white transition-all text-lg font-light flex-shrink-0">−</button>
                    <input
                      type="number" min="1" max="999"
                      value={quantity}
                      onChange={e => {
                        const v = parseInt(e.target.value);
                        if (!isNaN(v) && v >= 1) setQuantity(v);
                        else if (e.target.value === '') setQuantity('');
                      }}
                      onBlur={e => { if (!e.target.value || parseInt(e.target.value) < 1) setQuantity(1); }}
                      className="w-16 h-11 border-t border-b border-white/12 bg-transparent text-white font-bold text-center text-sm focus:outline-none focus:border-white/35 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button type="button" onClick={() => setQuantity((parseInt(quantity) || 1) + 1)}
                      className="w-11 h-11 border border-white/12 text-white/50 hover:border-white/35 hover:text-white transition-all text-lg font-light flex-shrink-0">+</button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ── SECTION 3: Description ─────────────────────────── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mb-8">
            <div className="border border-white/08 p-5 md:p-8">
              <h2 className="text-lg font-black mb-1">Additional Notes</h2>
              <p className="text-white/55 text-xs font-light mb-6">Tell us about your use case, specific requirements, colour preferences, post-processing needs, or anything else we should know.</p>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={5}
                placeholder="e.g. This bracket will be load-bearing — it needs to handle approx 5kg. Prefer black or grey colour. Final assembly is outdoors so UV resistance matters. Happy to discuss material choice..."
                className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-5 py-4 resize-none focus:outline-none focus:border-white/30 hover:border-white/18 transition-colors placeholder:text-white/20 leading-relaxed"
              />
            </div>
          </motion.div>

          {/* ── SECTION 4: Contact ─────────────────────────────── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="mb-10">
            <div className="border border-white/08 p-5 md:p-8">
              <h2 className="text-lg font-black mb-1">Your Contact Details</h2>
              <p className="text-white/55 text-xs font-light mb-6">So we can send you the quote.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">Name *</label>
                  <input required value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/18 transition-colors placeholder:text-white/18" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">Email *</label>
                  <input required type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                    placeholder="you@email.com"
                    className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/18 transition-colors placeholder:text-white/18 invalid:border-red-500/40" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">Phone / WhatsApp *</label>
                  <input required value={phone}
                    onChange={e => setPhone(e.target.value.replace(/[^0-9+\s\-()]/g, ''))}
                    minLength={7} maxLength={15}
                    placeholder="+91 9XXXXXXXXX"
                    title="Enter a valid phone number (min 7 digits)"
                    className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-white/30 hover:border-white/18 transition-colors placeholder:text-white/18" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="text-center">
            <button type="submit"
              className="px-14 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.25em] hover:bg-white/85 transition-all duration-300 disabled:opacity-40"
              disabled={!name || !email}
            >
              Submit Request
            </button>
            <p className="text-white/18 text-xs mt-4 font-light">We'll review your files and settings and reply with a quote within 24 hours.</p>
          </motion.div>

        </form>
      </div>
    </div>
  );
}
