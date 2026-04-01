import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const contactInfo = [
  { id: 1, label: "Alamat Showroom", value: "Jl. Raya Otomotif No. 123, Jakarta Selatan, Indonesia", icon: <MapPin className="text-accent" size={24} /> },
  { id: 2, label: "Telepon", value: "+62 812 3456 789", icon: <Phone className="text-accent" size={24} /> },
  { id: 3, label: "WhatsApp", value: "+62 812 3456 789", icon: <MessageCircle className="text-accent" size={24} /> },
  { id: 4, label: "Email", value: "info@rasyidmobilindo.com", icon: <Mail className="text-accent" size={24} /> },
  { id: 5, label: "Jam Operasional", value: "Senin - Minggu: 09:00 - 18:00", icon: <Clock className="text-accent" size={24} /> }
];

export default function Contact() {
  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="bg-primary py-20 text-white mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-xl max-w-2xl mx-auto"
          >
            Punya pertanyaan mengenai unit mobil, simulasi kredit, atau tukar tambah? Tim kami siap membantu Anda kapan saja.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-primary">Informasi Kontak</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-primary">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-8 rounded-[40px] flex items-center gap-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-accent/20">
                <MessageCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Respon Cepat via WhatsApp</h3>
                <p className="text-slate-600 mb-4">Dapatkan jawaban instan untuk pertanyaan Anda melalui layanan WhatsApp kami.</p>
                <a 
                  href="https://wa.me/628123456789"
                  className="inline-flex items-center gap-2 text-accent font-black hover:gap-4 transition-all"
                >
                  Mulai Chat Sekarang <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black text-primary mb-8">Kirim Pesan</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama Anda" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="Contoh: 08123456789" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Subjek</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">
                  <option>Tanya Stok Mobil</option>
                  <option>Pengajuan Kredit</option>
                  <option>Tukar Tambah</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Pesan Anda</label>
                <textarea 
                  rows={4} 
                  placeholder="Apa yang bisa kami bantu?" 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
                <Send size={20} />
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-black text-primary mb-8 text-center">Lokasi Showroom Kami</h2>
          <div className="bg-white p-4 rounded-[40px] shadow-xl border border-slate-100 h-[500px] overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.7702410363!2d106.71186064335938!3d-6.285217999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1f6366579e5%3A0x33b8655865b833b8!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1711950000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[32px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
