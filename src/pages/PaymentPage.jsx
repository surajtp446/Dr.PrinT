import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Copy, AlertCircle } from 'lucide-react';

// ── REPLACE THESE WITH YOUR REAL DETAILS ──
const PAYMENT_DETAILS = {
  upiId: '9449214905@ybl',
  accountName: 'Suraj TP',
  bankName: 'Bank of Baroda',
  accountNumber: '31410100011213',
  ifsc: 'BARB0TUMKUR',
  accountType: 'Savings',
  beneficiaryName: 'Suraj TP',
};

const WHATSAPP_NUMBER = '919449214905';
const WHATSAPP_MESSAGE = 'Hi, I just placed an order on Dr.PrinT and would like to share my payment details.';

export default function PaymentPage() {
  const [params] = useSearchParams();
  const total = parseInt(params.get('total') || '0');
  const itemsRaw = params.get('items');
  const items = itemsRaw ? JSON.parse(decodeURIComponent(itemsRaw)) : [];

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  function copy(text, which) {
    navigator.clipboard.writeText(text);
    if (which === 'upi') { setCopiedUpi(true); setTimeout(() => setCopiedUpi(false), 2000); }
    else { setCopiedAcc(true); setTimeout(() => setCopiedAcc(false), 2000); }
  }

  async function handleConfirm(e) {
    e.preventDefault();
    if (!txnId.trim() || !name.trim() || !phone.trim()) return;
    // Email notification via Formspree
    try {
      await fetch('https://formspree.io/f/mykdnjqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New Dr.PrinT ORDER — ${name} — ₹${total}`,
          customer_name: name,
          customer_phone: phone,
          transaction_id: txnId,
          order_total: `₹${total}`,
          items: items.map(i => `${i.name} x${i.qty} @ ₹${i.price}`).join(', '),
        }),
      });
    } catch (err) {
      console.error('Formspree error:', err);
    }
    setConfirmed(true);
  }

  if (confirmed) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-sm">
        <div className="w-14 h-14 border border-white/18 flex items-center justify-center mx-auto mb-8">
          <Check className="w-6 h-6 text-white/60" />
        </div>
        <p className="text-xs tracking-[0.45em] text-white/28 uppercase mb-4">Order Placed</p>
        <h2 className="text-3xl font-black mb-4">Payment confirmed.</h2>
        <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
          We got your transaction ID. Your order will be dispatched once payment is verified — usually within a few hours during business hours.
        </p>
        <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest border border-white/18 px-6 py-3 text-white/45 hover:text-white hover:border-white transition-all">
          Back to Shop
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <p className="text-xs tracking-[0.5em] text-white/28 uppercase mb-4">Checkout</p>
          <h1 className="text-4xl font-black tracking-tight mb-2">Complete Payment</h1>
          <div className="w-10 h-px bg-white/14 mx-auto mt-5" />
        </motion.div>

        {/* Order summary */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="border border-white/08 p-6 mb-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">Order Summary</p>
          {items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b border-white/05 last:border-0">
              <span className="text-white/65">{item.name} <span className="text-white/30">x{item.qty}</span></span>
              <span className="font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
            <span className="text-white/45 text-sm">Total</span>
            <span className="text-2xl font-black">₹{total.toLocaleString()}</span>
          </div>
        </motion.div>

        {/* UPI payment */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="border border-white/08 p-6 mb-4">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-5">Pay via UPI</p>

          {/* QR code placeholder — replace src with your actual QR image */}
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
            <div className="w-36 h-36 border border-white/12 flex items-center justify-center bg-white/[0.02] shrink-0">
              <div className="text-center">
                <p className="text-[9px] text-white/25 uppercase tracking-widest">QR Code</p>
                <p className="text-[8px] text-white/15 mt-1">Add your UPI QR</p>
                <p className="text-[8px] text-white/15">image here</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-xs mb-4 leading-relaxed">
                Scan the QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) or copy the UPI ID below.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/[0.03] border border-white/10 px-4 py-2.5">
                  <p className="text-[9px] text-white/22 uppercase tracking-widest mb-0.5">UPI ID</p>
                  <p className="font-mono text-sm text-white/80">{PAYMENT_DETAILS.upiId}</p>
                </div>
                <button onClick={() => copy(PAYMENT_DETAILS.upiId, 'upi')}
                  className="flex items-center gap-1.5 px-4 py-2.5 border border-white/14 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:border-white/35 hover:text-white transition-all shrink-0">
                  {copiedUpi ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bank transfer */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="border border-white/08 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/25">Bank Transfer</p>
            <button onClick={() => copy(PAYMENT_DETAILS.accountNumber, 'acc')}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              {copiedAcc ? <><Check size={10}/> Copied</> : <><Copy size={10}/> Copy Account No.</>}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Beneficiary Name', PAYMENT_DETAILS.beneficiaryName],
              ['Bank', PAYMENT_DETAILS.bankName],
              ['Account Number', PAYMENT_DETAILS.accountNumber],
              ['IFSC Code', PAYMENT_DETAILS.ifsc],
              ['Account Type', PAYMENT_DETAILS.accountType],
            ].map(([label, val]) => (
              <div key={label} className="bg-white/[0.02] border border-white/06 px-4 py-3">
                <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">{label}</p>
                <p className="text-sm font-mono text-white/65">{val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Confirm payment */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="border border-white/08 p-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-2">Confirm Payment</p>
          <p className="text-white/35 text-xs font-light mb-5 leading-relaxed">
            After paying, enter your transaction ID and contact details so we can match your payment and confirm your order.
          </p>

          <div className="flex items-start gap-2 bg-white/[0.02] border border-white/08 px-4 py-3 mb-5">
            <AlertCircle size={14} className="text-white/30 mt-0.5 shrink-0" />
            <p className="text-xs text-white/30 font-light leading-relaxed">
              Send your transaction ID to us on WhatsApp or Instagram if you prefer — we will confirm manually.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 w-full py-3 border border-green-500/30 text-green-400/80 text-[11px] font-bold uppercase tracking-widest justify-center hover:border-green-500/60 hover:text-green-400 transition-all mb-4"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.057 23.486a.5.5 0 00.603.633l5.826-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.976.994-3.633-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
            Message us on WhatsApp
          </a>

          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/55 mb-2">Your Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-white/30 placeholder:text-white/18 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/55 mb-2">Phone / WhatsApp</label>
              <input required value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9+\s]/g, ''))} placeholder="+91 9XXXXXXXXX"
                className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-white/30 placeholder:text-white/18 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/55 mb-2">Transaction ID / UTR Number</label>
              <input required value={txnId} onChange={e => setTxnId(e.target.value)} placeholder="12-digit UTR or UPI transaction ID"
                className="w-full bg-white/[0.02] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-white/30 placeholder:text-white/18 transition-colors" />
            </div>
            <button type="submit" disabled={!name || !phone || !txnId}
              className="w-full py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/85 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              Confirm Order
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
