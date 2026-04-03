import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MOCK_CARS } from '../constants';
import { 
  MessageCircle, 
  ChevronLeft, 
  Calendar, 
  Gauge, 
  Settings, 
  Fuel, 
  CheckCircle2, 
  ShieldCheck,
  Phone,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export default function VehicleDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (car) {
      document.title = `${car.brand} ${car.model} ${car.year} - Jual Mobil Bekas Jakarta Selatan | Rasyid Mobilindo`;
    }
  }, [car]);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        const carDoc = await getDoc(doc(db, 'cars', id));
        if (carDoc.exists()) {
          setCar({ id: carDoc.id, ...carDoc.data() } as Car);
        } else {
          // Fallback check in case it's a seed ID or not in Firestore yet
          const foundCar = MOCK_CARS.find((_, i) => String(i + 1) === id);
          if (foundCar) setCar({ id: id, ...foundCar } as Car);
        }
      } catch (error) {
        console.error("Error fetching car from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!car) return <div className="pt-32 text-center">Mobil tidak ditemukan.</div>;

  return (
    <div className="pt-24 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/inventory" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-primary transition-colors">
          <ChevronLeft size={20} />
          Kembali ke Daftar Mobil
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Images & Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <ImageWithFallback 
                src={car.image} 
                alt={car.model} 
                className="w-full aspect-video object-cover"
              />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl">
                  <Calendar className="text-accent" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Tahun</p>
                    <p className="font-bold text-primary">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl">
                  <Gauge className="text-accent" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Kilometer</p>
                    <p className="font-bold text-primary">{car.km.toLocaleString()} KM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl">
                  <Settings className="text-accent" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Transmisi</p>
                    <p className="font-bold text-primary">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl">
                  <Fuel className="text-accent" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Bahan Bakar</p>
                    <p className="font-bold text-primary">{car.fuel}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-black text-primary mb-4">Deskripsi Kendaraan</h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {car.description}
              </p>

              <h2 className="text-2xl font-black text-primary mb-4">Fitur Utama</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Airbags', 'ABS', 'Power Steering', 'Power Window', 'AC Double Blower', 'Audio Steering Switch'].map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <ShieldCheck size={64} className="text-accent" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Garansi Rasyid Mobilindo</h3>
                <p className="text-slate-600">Mobil ini telah lulus inspeksi 175 titik dan berhak mendapatkan garansi mesin & transmisi selama 1 tahun.</p>
              </div>
            </div>
          </div>

          {/* Right: Pricing & CTA */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-black text-primary">{car.brand} {car.model}</h1>
                {car.isSoldOut && (
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    SOLD OUT
                  </span>
                )}
              </div>
              <p className="text-slate-400 font-bold mb-6">{car.year} • {car.transmission} • {car.fuel}</p>
              
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Harga Cash</p>
                <p className={`text-4xl font-black ${car.isSoldOut ? 'text-slate-400 line-through' : 'text-primary'}`}>
                  Rp {(car.price / 1000000).toFixed(1)} Juta
                </p>
              </div>

              {!car.isSoldOut ? (
                <>
                  <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                    <p className="text-sm font-bold text-accent uppercase tracking-widest mb-1">Estimasi Cicilan</p>
                    <p className="text-2xl font-black text-accent">Rp {(car.installment / 1000000).toFixed(1)} Jt<span className="text-sm text-slate-400">/bln</span></p>
                    <p className="text-xs text-slate-400 mt-2">Tenor 60 Bulan • DP 20%</p>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href={`https://wa.me/628123456789?text=Halo Rasyid Mobilindo, saya tertarik dengan ${car.brand} ${car.model} ${car.year}`}
                      className="w-full btn-whatsapp py-4"
                    >
                      <MessageCircle size={24} />
                      Tanya via WhatsApp
                    </a>
                    <button className="w-full btn-primary py-4">
                      Ajukan Kredit
                    </button>
                    <button className="w-full btn-secondary py-4 flex items-center justify-center gap-2">
                      <Phone size={20} />
                      Telepon Dealer
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
                  <p className="text-red-600 font-bold mb-2">Unit Ini Sudah Terjual</p>
                  <p className="text-sm text-slate-500 mb-6">Maaf, unit ini sudah laku. Silakan cek koleksi mobil kami lainnya yang masih tersedia.</p>
                  <Link to="/inventory" className="w-full btn-primary py-4 inline-flex items-center justify-center">
                    Lihat Unit Lainnya
                  </Link>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-primary font-bold">RM</div>
                  <div>
                    <p className="font-bold text-primary">Rasyid Mobilindo</p>
                    <p className="text-xs text-slate-400">Verified Dealer • Jakarta Selatan</p>
                  </div>
                </div>
                <Link to="/contact" className="text-sm font-bold text-accent flex items-center gap-1">
                  Lihat Lokasi Showroom <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
