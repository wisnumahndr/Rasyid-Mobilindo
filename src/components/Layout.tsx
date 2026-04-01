import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Daftar Mobil', href: '/inventory' },
    { name: 'Kredit', href: '/kredit' },
    { name: 'Tukar Tambah', href: '/trade-in' },
    { name: 'Promo', href: '/promo' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <span className="text-white font-black text-xl italic tracking-tighter">RM</span>
            </div>
            <span className={`font-bold text-xl ${isScrolled || !isHome ? 'text-primary' : 'text-white'}`}>Rasyid Mobilindo</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`font-medium hover:text-accent transition-colors ${isScrolled || !isHome ? 'text-primary' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <a href="https://wa.me/628123456789" className="btn-whatsapp py-2 px-4 text-sm">
              <MessageCircle size={18} />
              Chat WA
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className={`md:hidden ${isScrolled || !isHome ? 'text-primary' : 'text-accent'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden p-6 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-primary font-semibold text-lg border-b border-slate-100 pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <a href="tel:+628123456789" className="btn-secondary flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Hubungi Kami
                </a>
                <a href="https://wa.me/628123456789" className="btn-whatsapp">
                  <MessageCircle size={20} />
                  WhatsApp Sekarang
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-accent p-2 rounded-lg">
                  <span className="text-white font-black text-xl italic tracking-tighter">RM</span>
                </div>
                <span className="font-bold text-2xl">Rasyid Mobilindo</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Dealer mobil berkualitas terpercaya di Indonesia. Kami hadir untuk memberikan solusi berkendara terbaik bagi keluarga Anda dengan proses yang transparan dan mudah.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors"><Instagram size={20} /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors"><Facebook size={20} /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Navigasi</h4>
              <ul className="space-y-4 text-slate-400">
                {navLinks.map(link => (
                  <li key={link.name}><Link to={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Kontak Kami</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex gap-3">
                  <MapPin className="text-accent shrink-0" />
                  <span>Jl. Raya Otomotif No. 123, Jakarta Selatan, Indonesia</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="text-accent shrink-0" />
                  <span>+62 812 3456 789</span>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="text-accent shrink-0" />
                  <span>+62 812 3456 789 (WhatsApp)</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="text-accent shrink-0" />
                  <span>Senin - Minggu: 09:00 - 18:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Lokasi Showroom</h4>
              <div className="rounded-2xl overflow-hidden h-48 bg-slate-800 border border-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.24948313364!2d106.789156!3d-6.285492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1f000000000%3A0x0!2zNsKwMTcnMDcuOCJTIDEwNsKwNDcnMjEuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 text-center text-slate-500 text-sm">
            <p>© 2026 Rasyid Mobilindo. All Rights Reserved. Built for conversion.</p>
          </div>
        </div>
      </footer>

      <a 
        href="https://wa.me/628123456789" 
        className="fixed bottom-8 right-8 z-50 bg-whatsapp text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-lg font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Tanya Stok via WA
        </span>
      </a>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 flex gap-3">
        <a href="tel:+628123456789" className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2">
          <Phone size={20} />
          Telepon
        </a>
        <a href="https://wa.me/628123456789" className="flex-1 btn-whatsapp py-3 flex items-center justify-center gap-2">
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>
    </div>
  );
};
