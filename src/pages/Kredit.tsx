import React, { useState } from 'react';
import { Calculator, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

export default function Kredit() {
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
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="bg-primary py-16 text-white mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Kredit & Pembiayaan</h1>
          <p className="text-slate-300 text-lg">Proses mudah, bunga ringan, dan approval cepat.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-primary mb-6">Simulasi Kredit</h2>
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
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-primary mb-6">Form Pengajuan Cepat</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Nomor WhatsApp</label>
                  <input type="tel" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" placeholder="0812xxxx" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Pekerjaan</label>
                  <select className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent">
                    <option>Karyawan Swasta</option>
                    <option>PNS / BUMN</option>
                    <option>Wiraswasta</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <button type="button" className="w-full btn-primary py-4 text-lg">
                  Kirim Pengajuan
                </button>
              </form>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-primary mb-4">Persyaratan Kredit:</h3>
              <ul className="space-y-3">
                {['KTP Suami & Istri', 'Kartu Keluarga', 'NPWP', 'Slip Gaji / Bukti Penghasilan', 'Rekening Koran 3 Bulan Terakhir'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 font-medium">
                    <CheckCircle2 size={18} className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
