import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Zap, 
  RefreshCcw, 
  CheckCircle2,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Calculator,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

// --- Components ---

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
          alt="Hero Car" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-3 py-1 rounded-full text-sm font-bold mb-6">
            <Zap size={16} />
            <span>Promo Lebaran: DP Mulai 5 Juta!</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Mobil Impian Anda, <br />
            <span className="text-accent italic">Lebih Mudah</span> Dimiliki
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-lg">
            Dapatkan mobil berkualitas dengan cicilan ringan, proses cepat, dan transparan. Rasyid Mobilindo - Solusi berkendara keluarga Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/inventory" className="btn-primary flex items-center justify-center gap-2 text-lg">
              Lihat Koleksi Mobil
              <ChevronRight size={20} />
            </Link>
            <Link to="/kredit" className="btn-secondary flex items-center justify-center gap-2 text-lg border border-white/20">
              Simulasi Kredit
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="font-bold">4.9/5 Google Rating</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="font-medium text-slate-300">
              <span className="text-white font-bold">500+</span> Pelanggan Puas
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="glass-card p-8 rounded-2xl border-white/10">
            <h3 className="text-2xl font-bold text-primary mb-6">Cari Mobil Cepat</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Merek Mobil</label>
                <select className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-accent outline-none">
                  <option>Semua Merek</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Mitsubishi</option>
                  <option>Suzuki</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Budget Cicilan (Per Bulan)</label>
                <select className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-accent outline-none">
                  <option>Semua Budget</option>
                  <option>Dibawah 3 Juta</option>
                  <option>3 - 5 Juta</option>
                  <option>Diatas 5 Juta</option>
                </select>
              </div>
              <Link to="/inventory" className="w-full btn-primary mt-4 flex items-center justify-center">
                Cari Sekarang
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.model} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {car.transmission}
          </span>
          {car.featured && !car.isSoldOut && (
            <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              Featured
            </span>
          )}
          {car.isSoldOut && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              SOLD OUT
            </span>
          )}
        </div>
        {car.isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="bg-red-600 text-white font-black px-6 py-2 rounded-lg transform -rotate-12 border-4 border-white shadow-2xl text-xl">
              SOLD OUT
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-primary">{car.brand} {car.model}</h3>
            <p className="text-slate-500 font-medium">{car.year} • {car.km.toLocaleString()} KM</p>
          </div>
        </div>
        
        <div className="my-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Harga Cash</p>
              <p className="text-2xl font-black text-primary">Rp {(car.price / 1000000).toFixed(1)} Juta</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">Cicilan Mulai</p>
              <p className="text-lg font-bold text-accent">{(car.installment / 1000000).toFixed(1)} Jt/bln</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Link to={`/inventory/${car.id}`} className="btn-secondary py-2 px-0 text-sm flex items-center justify-center">Detail</Link>
          <a 
            href={`https://wa.me/628123456789?text=Halo Rasyid Mobilindo, saya tertarik dengan ${car.brand} ${car.model} ${car.year}`}
            className="btn-whatsapp py-2 px-0 text-sm"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={40} className="text-accent" />,
      title: "Kualitas Terjamin",
      desc: "Setiap unit telah melalui inspeksi ketat 175 titik oleh teknisi ahli kami."
    },
    {
      icon: <Zap size={40} className="text-accent" />,
      title: "Proses Cepat",
      desc: "Pengajuan kredit dibantu sampai goal. Approval bisa dalam 1x24 jam."
    },
    {
      icon: <RefreshCcw size={40} className="text-accent" />,
      title: "Tukar Tambah",
      desc: "Terima tukar tambah semua merek dengan harga kompetitif & transparan."
    },
    {
      icon: <CheckCircle2 size={40} className="text-accent" />,
      title: "Dokumen Lengkap",
      desc: "Semua surat-surat (BPKB, STNK, Faktur) dijamin keaslian dan kelengkapannya."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary mb-4">Kenapa Pilih Rasyid Mobilindo?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Kami bukan sekadar dealer mobil, kami adalah mitra Anda dalam menemukan kendaraan impian yang aman dan nyaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50 hover:bg-primary hover:text-white transition-all group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-500 group-hover:text-slate-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const reviews = [
    {
      name: "Budi Santoso",
      role: "Pembeli Toyota Avanza",
      text: "Pelayanan sangat memuaskan. Proses kredit dibantu sampai goal hanya dalam 2 hari. Kondisi mobil sangat istimewa sesuai deskripsi.",
      avatar: "https://i.pravatar.cc/150?u=budi"
    },
    {
      name: "Siti Aminah",
      role: "Pembeli Honda Brio",
      text: "Awalnya ragu beli mobil bekas, tapi di Rasyid Mobilindo semua transparan. Ada laporan inspeksinya jadi tenang. Sukses terus!",
      avatar: "https://i.pravatar.cc/150?u=siti"
    },
    {
      name: "Andi Wijaya",
      role: "Tukar Tambah Xpander",
      text: "Harga tukar tambah paling tinggi dibanding dealer lain. Prosesnya juga gak ribet, mobil lama langsung laku, mobil baru langsung bawa pulang.",
      avatar: "https://i.pravatar.cc/150?u=andi"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary mb-4">Apa Kata Mereka?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Kepercayaan pelanggan adalah prioritas utama kami. Berikut adalah pengalaman nyata dari mereka yang telah memilih kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100"
            >
              <div className="flex text-accent mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 italic mb-8 text-lg leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-primary">{r.name}</h4>
                  <p className="text-sm text-slate-400">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CreditCalculator = () => {
  const [price, setPrice] = useState(200000000);
  const [dp, setDp] = useState(20000000);
  const [tenor, setTenor] = useState(60);
  const [interest, setInterest] = useState(5);

  const calculateInstallment = () => {
    const principal = price - dp;
    const totalInterest = (principal * (interest / 100) * (tenor / 12));
    const totalPayment = principal + totalInterest;
    return Math.round(totalPayment / tenor);
  };

  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <Calculator size={600} className="rotate-12 translate-x-1/4" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6">Simulasi Kredit Ringan</h2>
            <p className="text-xl text-slate-300 mb-10">
              Hitung estimasi cicilan bulanan Anda dengan kalkulator pintar kami. Kami bekerja sama dengan leasing terkemuka untuk memberikan bunga terendah.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-accent/20 p-3 rounded-full"><CheckCircle2 className="text-accent" /></div>
                <span className="text-lg font-medium">Bunga mulai dari 2.9% per tahun</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-accent/20 p-3 rounded-full"><CheckCircle2 className="text-accent" /></div>
                <span className="text-lg font-medium">Tenor fleksibel hingga 6 tahun</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-accent/20 p-3 rounded-full"><CheckCircle2 className="text-accent" /></div>
                <span className="text-lg font-medium">DP ringan mulai dari 10%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 text-primary shadow-2xl">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-500">Harga Mobil</label>
                  <span className="font-black text-primary">Rp {price.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="50000000" 
                  max="1000000000" 
                  step="5000000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-500">Uang Muka (DP)</label>
                  <span className="font-black text-primary">Rp {dp.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={price * 0.1} 
                  max={price * 0.5} 
                  step="1000000"
                  value={dp}
                  onChange={(e) => setDp(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 mb-2">Tenor (Bulan)</label>
                  <select 
                    value={tenor}
                    onChange={(e) => setTenor(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value={12}>12 Bulan</option>
                    <option value={24}>24 Bulan</option>
                    <option value={36}>36 Bulan</option>
                    <option value={48}>48 Bulan</option>
                    <option value={60}>60 Bulan</option>
                    <option value={72}>72 Bulan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-2">Bunga (%/Thn)</label>
                  <input 
                    type="number" 
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Estimasi Cicilan</p>
                <p className="text-4xl font-black text-primary">Rp {calculateInstallment().toLocaleString()}<span className="text-lg text-slate-400">/bln</span></p>
              </div>

              <button className="w-full btn-primary py-4 text-xl">
                Ajukan Kredit Sekarang
              </button>
              <p className="text-center text-xs text-slate-400">
                *Estimasi di atas belum termasuk biaya admin, asuransi, dan provisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
