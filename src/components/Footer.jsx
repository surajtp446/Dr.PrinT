import React from 'react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP = 'https://wa.me/919449214905?text=Hi%2C%20I%20have%20a%20query%20about%20Dr.PrinT';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/08 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 mb-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black text-white mb-1 tracking-tighter">Dr.PrinT</h3>
            <p className="text-white/35 text-xs uppercase tracking-widest mb-6 font-medium">
              Precision Prototyping & Fabrication
            </p>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              Open to B2B and production work. Based in Basavanagudi, Bengaluru.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white/35 uppercase tracking-widest mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Home', to: '/' },
                { name: 'Projects', to: '/projects' },
                { name: 'Shop', to: '/shop' },
                { name: 'Custom Order', to: '/custom' },
                { name: 'About', to: '/about' },
                { name: 'Contact', to: '/contact' },
              ].map(link => (
                <Link key={link.name} to={link.to}
                  className="text-white/55 hover:text-white transition-colors duration-200 text-sm font-light">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white/35 uppercase tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-4">

              {/* WhatsApp */}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-400/80 hover:text-green-400 transition-colors group">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.057 23.486a.5.5 0 00.603.633l5.826-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.976.994-3.633-.234-.374A9.818 9.818 0 1112 21.818z"/>
                </svg>
                <span className="text-sm font-medium">WhatsApp us</span>
              </a>

              <a href="mailto:drprint.3dwork@gmail.com"
                className="flex items-center gap-3 text-white/55 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="text-sm font-light">drprint.3dwork@gmail.com</span>
              </a>

              <a href="tel:+919449214905"
                className="flex items-center gap-3 text-white/55 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-sm font-light">+91 94492 14905</span>
              </a>

              <a href="https://www.instagram.com/dr.print_3d/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/55 hover:text-white transition-colors">
                <Instagram className="w-4 h-4 shrink-0" />
                <span className="text-sm font-light">@dr.print_3d</span>
              </a>

              <div className="flex items-start gap-3 text-white/40">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-sm font-light leading-snug">Basavanagudi, Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/05 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs font-light">&copy; {new Date().getFullYear()} Dr.PrinT. All rights reserved.</p>
          <p className="text-white/15 text-xs font-light">Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
