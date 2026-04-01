import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car } from '../types';
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
      try {
        const response = await fetch(`/api/inventory/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car detail:", error);
        // Fallback data if API fails
        const fallbackData = [
          { id: "1", brand: "Toyota", model: "Avanza 1.3 G", year: 2021, price: 185000000, installment: 3500000, km: 25000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800", featured: true, description: "Toyota Avanza 1.3 G 2021, tangan pertama, servis rutin, kondisi sangat terawat." },
          { id: "2", brand: "Honda", model: "Brio RS", year: 2022, price: 165000000, installment: 3100000, km: 12000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800", featured: true, description: "Honda Brio RS 2022, warna merah, pajak panjang, siap pakai." },
          { id: "3", brand: "Mitsubishi", model: "Xpander Ultimate", year: 2020, price: 225000000, installment: 4200000, km: 45000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800", featured: true, description: "Mitsubishi Xpander Ultimate 2020, fitur lengkap, interior bersih, ban tebal.", isSoldOut: true },
          { id: "4", brand: "Suzuki", model: "Ertiga GL", year: 2019, price: 155000000, installment: 2900000, km: 60000, transmission: "Manual", fuel: "Bensin", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", featured: false, description: "Suzuki Ertiga GL 2019, mesin halus, AC dingin, irit bahan bakar." },
          { id: "5", brand: "Daihatsu", model: "Sigra R Deluxe", year: 2023, price: 145000000, installment: 2700000, km: 5000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800", featured: false, description: "Daihatsu Sigra R Deluxe 2023, seperti baru, km rendah, garansi resmi masih ada." },
          { id: "6", brand: "Toyota", model: "Innova Reborn V", year: 2018, price: 310000000, installment: 5800000, km: 75000, transmission: "Automatic", fuel: "Diesel", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800", featured: true, description: "Toyota Innova Reborn V Diesel 2018, mesin bertenaga, interior mewah, sangat nyaman." },
          { id: "7", brand: "Honda", model: "HR-V SE", year: 2022, price: 365000000, installment: 6900000, km: 15000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800", featured: true, description: "Honda HR-V SE 2022, desain modern, panoramic roof, fitur keselamatan lengkap.", isSoldOut: true },
          { id: "8", brand: "Mitsubishi", model: "Pajero Sport Dakar", year: 2019, price: 485000000, installment: 9200000, km: 55000, transmission: "Automatic", fuel: "Diesel", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800", featured: false, description: "Mitsubishi Pajero Sport Dakar 2019, gagah, sunroof, mesin diesel powerfull." },
          { id: "9", brand: "Hyundai", model: "Stargazer Prime", year: 2023, price: 275000000, installment: 5200000, km: 8000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=800", featured: true, description: "Hyundai Stargazer Prime 2023, futuristik, fitur canggih, garansi panjang." },
          { id: "10", brand: "Wuling", model: "Almaz RS", year: 2021, price: 295000000, installment: 5600000, km: 22000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800", featured: false, description: "Wuling Almaz RS 2021, fitur voice command, kamera 360, panoramic sunroof." },
          { id: "11", brand: "Toyota", model: "Fortuner VRZ", year: 2020, price: 465000000, installment: 8800000, km: 40000, transmission: "Automatic", fuel: "Diesel", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800", featured: false, description: "Toyota Fortuner VRZ 2020, kondisi istimewa, servis record Auto2000." },
          { id: "12", brand: "Honda", model: "City Hatchback RS", year: 2021, price: 255000000, installment: 4800000, km: 18000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800", featured: false, description: "Honda City Hatchback RS 2021, sporty, fitur ultra seat, sangat praktis." },
          { id: "13", brand: "Suzuki", model: "XL7 Alpha", year: 2022, price: 235000000, installment: 4400000, km: 12000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", featured: false, description: "Suzuki XL7 Alpha 2022, SUV keluarga, irit, fitur smart e-mirror." },
          { id: "14", brand: "Daihatsu", model: "Rocky 1.0 Turbo", year: 2021, price: 215000000, installment: 4100000, km: 20000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800", featured: false, description: "Daihatsu Rocky 1.0 Turbo 2021, bertenaga, desain compact, fitur ASA." },
          { id: "15", brand: "Mazda", model: "CX-5 Elite", year: 2018, price: 385000000, installment: 7300000, km: 50000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800", featured: false, description: "Mazda CX-5 Elite 2018, handling terbaik, audio Bose, interior premium." },
          { id: "16", brand: "Nissan", model: "Livina VL", year: 2019, price: 195000000, installment: 3700000, km: 48000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", featured: false, description: "Nissan Livina VL 2019, basis Xpander, suspensi empuk, interior kulit." },
          { id: "17", brand: "Hyundai", model: "Creta Trend", year: 2022, price: 285000000, installment: 5400000, km: 10000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=800", featured: false, description: "Hyundai Creta Trend 2022, fitur bluelink, desain unik, nyaman dikendarai." },
          { id: "18", brand: "Toyota", model: "Raize 1.0 Turbo GR", year: 2022, price: 245000000, installment: 4600000, km: 12000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800", featured: false, description: "Toyota Raize GR Sport 2022, sporty, fitur TSS, turbo bertenaga." },
          { id: "19", brand: "Honda", model: "Civic Turbo", year: 2017, price: 345000000, installment: 6500000, km: 65000, transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800", featured: false, description: "Honda Civic Turbo 2017, performa kencang, desain abadi, kondisi sangat baik." },
          { id: "20", brand: "Wuling", model: "Air EV Long Range", year: 2022, price: 235000000, installment: 4400000, km: 5000, transmission: "Automatic", fuel: "Listrik", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800", featured: true, description: "Wuling Air EV Long Range 2022, mobil listrik mungil, bebas ganjil genap, irit biaya operasional." }
        ];
        const foundCar = fallbackData.find(c => c.id === id);
        if (foundCar) setCar(foundCar);
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
              <img 
                src={car.image} 
                alt={car.model} 
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
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
