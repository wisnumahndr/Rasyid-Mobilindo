import React, { useEffect } from 'react';
import { ShieldCheck, Users, Trophy, Star, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { id: 1, label: "Tahun Berdiri", value: "2015", icon: <Calendar className="text-accent" size={24} /> },
  { id: 2, label: "Mobil Terjual", value: "2,500+", icon: <Trophy className="text-accent" size={24} /> },
  { id: 3, label: "Kepuasan Pelanggan", value: "4.9/5", icon: <Star className="text-accent" size={24} /> },
  { id: 4, label: "Tim Profesional", value: "50+", icon: <Users className="text-accent" size={24} /> }
];

function Calendar({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "Tentang Kami - Dealer Mobil Bekas Rasyid Mobilindo";
  }, []);

  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Sejarah Kami
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">
              Dealer Mobil Terpercaya Sejak 2015.
            </h1>
            <p className="text-slate-500 text-xl leading-relaxed">
              Rasyid Mobilindo hadir dengan misi memberikan solusi berkendara terbaik bagi keluarga Indonesia. Kami percaya bahwa membeli mobil adalah momen spesial, dan kami di sini untuk menjadikannya mudah, transparan, dan menyenangkan.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/inventory" className="btn-primary px-8 py-4">Lihat Koleksi Mobil</a>
              <a href="/contact" className="btn-secondary px-8 py-4">Hubungi Kami</a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000" 
                alt="Showroom Rasyid Mobilindo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
              <p className="text-4xl font-black text-accent mb-1">100%</p>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Garansi Kepuasan</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"
            >
              <div className="mb-4 bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                {stat.icon}
              </div>
              <p className="text-3xl font-black text-primary mb-2">{stat.value}</p>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="bg-primary rounded-[60px] p-12 md:p-24 text-white mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-5 skew-x-12 translate-x-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-black mb-4">Visi Kami</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Menjadi dealer mobil nomor satu di Indonesia yang dikenal karena integritas, kualitas unit, dan layanan purna jual yang luar biasa.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-black mb-4">Misi Kami</h2>
              <ul className="space-y-4 text-slate-300 text-lg">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-accent shrink-0 mt-1" size={20} />
                  <span>Menyediakan unit berkualitas tinggi yang telah lulus inspeksi 175 titik.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-accent shrink-0 mt-1" size={20} />
                  <span>Memberikan transparansi penuh mengenai kondisi mobil dan riwayat servis.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-accent shrink-0 mt-1" size={20} />
                  <span>Mempermudah proses kepemilikan mobil melalui skema kredit yang fleksibel.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-black text-primary">Siap Menemukan Mobil Impian Anda?</h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto">
            Kunjungi showroom kami hari ini atau hubungi tim sales kami untuk konsultasi gratis mengenai unit yang Anda cari.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://wa.me/628123456789"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-green-500/20"
            >
              <MessageCircle size={24} />
              Chat via WhatsApp
            </a>
            <a href="/inventory" className="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all">
              Lihat Daftar Mobil <ArrowRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
