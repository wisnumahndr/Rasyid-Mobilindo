import React from 'react';
import { Tag, Calendar, Gift, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const promos = [
  {
    id: 1,
    title: "Promo DP Ringan",
    description: "Bawa pulang mobil impian dengan DP mulai dari 10% saja. Proses cepat dan data dibantu sampai approve!",
    icon: <Tag className="text-accent" size={32} />,
    validUntil: "30 April 2026",
    badge: "Terpopuler"
  },
  {
    id: 2,
    title: "Bunga 0% Tenor 1 Tahun",
    description: "Nikmati cicilan tanpa bunga untuk tenor 1 tahun. Berlaku untuk unit Toyota dan Honda pilihan.",
    icon: <Calendar className="text-accent" size={32} />,
    validUntil: "15 April 2026",
    badge: "Terbatas"
  },
  {
    id: 3,
    title: "Bonus Aksesoris Lengkap",
    description: "Setiap pembelian unit bulan ini mendapatkan bonus Kaca Film, Karpet Dasar, dan Dashcam gratis.",
    icon: <Gift className="text-accent" size={32} />,
    validUntil: "30 April 2026",
    badge: "Bonus"
  },
  {
    id: 4,
    title: "Cashback Tukar Tambah",
    description: "Tukarkan mobil lama Anda dan dapatkan tambahan cashback hingga Rp 10 Juta untuk unit baru.",
    icon: <ArrowRight className="text-accent" size={32} />,
    validUntil: "Selama Persediaan Ada",
    badge: "Trade-in"
  }
];

export default function Promo() {
  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="bg-primary py-20 text-white mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Promo Spesial Bulan Ini
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-xl max-w-2xl mx-auto"
          >
            Dapatkan penawaran terbaik dan bonus melimpah hanya di Rasyid Mobilindo. Jangan lewatkan kesempatan terbatas ini!
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promos.map((promo, index) => (
            <motion.div 
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="absolute top-4 right-4 bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {promo.badge}
              </div>
              <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {promo.icon}
              </div>
              <h3 className="text-2xl font-black text-primary mb-4">{promo.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {promo.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="text-sm">
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Berlaku Hingga</p>
                  <p className="text-primary font-bold">{promo.validUntil}</p>
                </div>
                <a 
                  href={`https://wa.me/628123456789?text=Halo Rasyid Mobilindo, saya ingin tanya tentang ${promo.title}`}
                  className="flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all"
                >
                  Ambil Promo <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-primary rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Punya Pertanyaan Mengenai Promo?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Tim sales kami siap membantu Anda mendapatkan simulasi kredit terbaik sesuai budget Anda.
            </p>
            <a 
              href="https://wa.me/628123456789"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle size={24} />
              Hubungi Sales via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
