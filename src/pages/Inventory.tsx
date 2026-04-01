import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { CarCard } from '../components/Sections';
import { Filter, Search, ChevronDown } from 'lucide-react';

export default function Inventory() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('All');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
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
        setCars(fallbackData);
        setFilteredCars(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let result = cars;
    if (search) {
      result = result.filter(c => 
        c.model.toLowerCase().includes(search.toLowerCase()) || 
        c.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (brandFilter !== 'All') {
      result = result.filter(c => c.brand === brandFilter);
    }
    setFilteredCars(result);
  }, [search, brandFilter, cars]);

  const brands = ['All', ...new Set(cars.map(c => c.brand))];

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="bg-primary py-16 text-white mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Daftar Mobil Tersedia</h1>
          <p className="text-slate-300 text-lg">Temukan mobil impian Anda dari koleksi terbaik kami.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                <Filter size={20} />
                <span>Filter</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Cari Mobil</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Model, merek..." 
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-accent"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Merek</label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="brand" 
                          checked={brandFilter === brand}
                          onChange={() => setBrandFilter(brand)}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className={`font-medium ${brandFilter === brand ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`}>
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-500 font-medium">Menampilkan <span className="text-primary font-bold">{filteredCars.length}</span> mobil</p>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                Urutkan: 
                <button className="flex items-center gap-1 text-primary">Terbaru <ChevronDown size={16} /></button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white h-[400px] rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-slate-200">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Mobil Tidak Ditemukan</h3>
                <p className="text-slate-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
