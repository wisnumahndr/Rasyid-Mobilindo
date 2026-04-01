import React from 'react';
import { RefreshCcw, CheckCircle2, MessageCircle, Phone } from 'lucide-react';

export default function TukarTambah() {
  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="bg-primary py-16 text-white mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Tukar Tambah (Trade-In)</h1>
          <p className="text-slate-300 text-lg">Tukarkan mobil lama Anda dengan harga terbaik dan transparan.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-primary mb-6">Kenapa Tukar Tambah di Sini?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-accent/20 p-3 rounded-2xl h-fit"><RefreshCcw className="text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Harga Kompetitif</h3>
                    <p className="text-slate-500">Kami memberikan penawaran harga terbaik sesuai kondisi pasar dan kendaraan Anda.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent/20 p-3 rounded-2xl h-fit"><CheckCircle2 className="text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Proses Transparan</h3>
                    <p className="text-slate-500">Inspeksi dilakukan secara terbuka di depan Anda. Tidak ada biaya tersembunyi.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent/20 p-3 rounded-2xl h-fit"><MessageCircle className="text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Langsung Laku</h3>
                    <p className="text-slate-500">Tidak perlu menunggu pembeli. Mobil lama Anda langsung kami beli saat deal mobil baru.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-6">Estimasi Harga Mobil Anda</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Merek Mobil</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" placeholder="Contoh: Toyota" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Model / Tipe</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" placeholder="Contoh: Avanza G" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Tahun</label>
                  <input type="number" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" placeholder="Contoh: 2018" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Transmisi</label>
                  <select className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent">
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Kilometer (Estimasi)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" placeholder="Contoh: 50.000" />
              </div>
              <hr className="my-4 border-slate-100" />
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Nama Anda</label>
                <input type="text" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Nomor WhatsApp</label>
                <input type="tel" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <button type="button" className="w-full btn-primary py-4 text-lg">
                Dapatkan Estimasi Harga
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
