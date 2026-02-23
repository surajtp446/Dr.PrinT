import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, X, Check, SlidersHorizontal } from 'lucide-react';
import CustomOrderPanel from '@/components/CustomOrderPanel.jsx';
import MaterialsGuide from '@/components/MaterialsGuide.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08 } }),
};

function ImageCarousel({ images, alt }) {
  const [cur, setCur] = useState(0);
  if (images.length === 1) return (
    <div className="w-full h-64 overflow-hidden bg-white/[0.02]">
      <img src={images[0]} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
  return (
    <div className="relative w-full h-64 overflow-hidden bg-white/[0.02] group">
      <img key={cur} src={images[cur]} alt={alt} className="w-full h-full object-cover" />
      <button onClick={() => setCur((cur - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={14} />
      </button>
      <button onClick={() => setCur((cur + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={14} />
      </button>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === cur ? 'bg-white scale-125' : 'bg-white/30'}`} />
        ))}
      </div>
      <div className="absolute top-3 right-3 bg-black/50 text-white/45 text-[9px] font-mono px-1.5 py-0.5">
        {cur + 1}/{images.length}
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: 'Adjustable Phone & Tablet Stand',
    price: 399,
    originalPrice: 799,
    tag: 'Bestseller',
    images: ['/products/stand_1.jpg','/products/stand_2.jpg','/products/stand_3.jpg','/products/penstand_1.jpg','/products/penstand_2.jpg'],
  },
  {
    id: 4,
    name: 'Coil Spring Pen Stand',
    price: 399,
    originalPrice: null,
    tag: 'New',
    images: ['/products/spring_penstand.webp'],
  },
  {
    id: 5,
    name: 'Brake Caliper Pen Stand',
    price: 599,
    originalPrice: null,
    tag: 'Motorsport',
    images: ['/products/caliper_penstand_1.webp', '/products/caliper_penstand_2.webp', '/products/caliper_penstand_3.webp'],
  },
  {
    id: 2,
    name: 'Brembo Brake Caliper Replica',
    price: 1299,
    originalPrice: null,
    tag: 'Statement Piece',
    images: ['/products/brembo_1.jpg', '/products/brembo_2.jpg'],
  },
  {
    id: 3,
    name: 'F1 2026 Season Calendar Plaque',
    price: 899,
    originalPrice: null,
    tag: 'F1 Edition',
    images: ['/products/f1_calendar.jpg'],
  },
];

function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.26 }}
        className="relative w-full max-w-sm bg-[#0a0a0a] border-l border-white/08 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/08">
          <h2 className="font-black text-lg">Cart <span className="text-white/30 font-light text-sm">({cart.length})</span></h2>
          <button onClick={onClose}><X size={18} className="text-white/40 hover:text-white transition-colors" /></button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-white/25 text-sm">Your cart is empty</div>
        ) : (
          <>
            <div className="flex-1 p-6 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-white/06 pb-4">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover border border-white/08 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold leading-tight mb-1 truncate">{item.name}</p>
                    <p className="text-white/50 text-xs mb-2">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onQtyChange(item.id, item.qty - 1)}
                        className="w-6 h-6 border border-white/14 text-white/50 hover:border-white/40 hover:text-white transition-all text-sm">−</button>
                      <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                      <button onClick={() => onQtyChange(item.id, item.qty + 1)}
                        className="w-6 h-6 border border-white/14 text-white/50 hover:border-white/40 hover:text-white transition-all text-sm">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-white/60 transition-colors self-start">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/08">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white/40 text-sm">Subtotal</span>
                <span className="font-black text-xl">₹{total.toLocaleString()}</span>
              </div>
              <p className="text-white/20 text-xs mb-5">Shipping calculated at checkout</p>
              <Link
                to={`/payment?total=${total}&items=${encodeURIComponent(JSON.stringify(cart.map(i => ({name:i.name,qty:i.qty,price:i.price}))))}`}
                onClick={onClose}
                className="block w-full py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] text-center hover:bg-white/88 transition-all">
                Checkout — ₹{total.toLocaleString()}
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [showCustom, setShowCustom] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    if (window.location.hash === '#custom') {
      setShowCustom(true);
      window.history.replaceState(null, '', '/shop');
    }
  }, []);

  function addToCart(product) {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
    setCartOpen(true);
  }
  function removeFromCart(id) { setCart(prev => prev.filter(i => i.id !== id)); }
  function changeQty(id, qty) {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      {cartCount > 0 && (
        <button onClick={() => setCartOpen(true)}
          className="fixed top-5 right-6 z-40 flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/88 transition-all">
          <ShoppingCart size={14} />
          {cartCount} item{cartCount > 1 ? 's' : ''}
        </button>
      )}

      <AnimatePresence>
        {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQtyChange={changeQty} />}
      </AnimatePresence>
      <AnimatePresence>
        {showMaterials && <MaterialsGuide onClose={() => setShowMaterials(false)} />}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-14 text-center">
          <p className="text-xs tracking-[0.5em] text-white/28 uppercase mb-4">Dr.PrinT Store</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Shop</h1>
          <div className="w-10 h-px bg-white/14 mx-auto mb-5" />
          <p className="text-white/35 text-sm font-light max-w-xs mx-auto leading-relaxed mb-5">
            Made to order. Shipped directly from our studio.
          </p>
          <button onClick={() => setShowMaterials(true)}
            className="mx-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-white/12 px-5 py-2.5 text-white/35 hover:border-white/30 hover:text-white/65 transition-all duration-200">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            Not sure which material? View Guide
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          {products.map((p, i) => (
            <motion.div key={p.id} custom={i} initial="hidden" animate="visible" variants={fadeUp}
              className="border border-white/08 bg-white/[0.015] hover:border-white/15 transition-colors duration-300 flex flex-col group">
              <div className="relative">
                <ImageCarousel images={p.images} alt={p.name} />
                {p.tag && (
                  <div className="absolute top-3 left-3 bg-white text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
                    {p.tag}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-black text-base leading-snug mb-3">{p.name}</h3>
                <div className="flex items-end justify-between mt-auto pt-3 border-t border-white/06">
                  <div>
                    <div className="text-2xl font-black">₹{p.price.toLocaleString()}</div>
                    {p.originalPrice && (
                      <div className="text-xs text-white/25 line-through">₹{p.originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                  <button onClick={() => addToCart(p)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300
                      ${addedId === p.id ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-white/85'}`}>
                    {addedId === p.id ? <><Check size={12} /> Added</> : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom order trigger */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6}
          id="custom"
          className="border border-white/08 p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-white/22 uppercase mb-2">Need Something Specific?</p>
            <h2 className="text-2xl font-black mb-1">Custom Print Order</h2>
            <p className="text-white/35 text-sm font-light max-w-xs leading-relaxed">
              Upload your file, set your print parameters and get a quote within 24 hours.
            </p>
          </div>
          <button
            onClick={() => setShowCustom(true)}
            className="shrink-0 flex items-center gap-2.5 px-8 py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.18em] hover:bg-white/85 transition-all duration-200">
            <SlidersHorizontal size={14} />
            Configure My Print
          </button>
        </motion.div>

        {/* Custom order slide-up panel */}
        {showCustom && (
          <CustomOrderPanel onClose={() => setShowCustom(false)} />
        )}
      </div>
    </div>
  );
}
