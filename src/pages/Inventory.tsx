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
          {
            id: "1",
            brand: "Toyota",
            model: "Avanza 1.3 G",
            year: 2021,
            price: 185000000,
            installment: 3500000,
            km: 25000,
            transmission: "Automatic",
            fuel: "Bensin",
            image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800",
            featured: true,
            description: "Toyota Avanza 1.3 G 2021, tangan pertama, servis rutin, kondisi sangat terawat."
          },
          {
            id: "2",
            brand: "Honda",
            model: "Brio RS",
            year: 2022,
            price: 165000000,
            installment: 3100000,
            km: 12000,
            transmission: "Automatic",
            fuel: "Bensin",
            image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
            featured: true,
            description: "Honda Brio RS 2022, warna merah, pajak panjang, siap pakai."
          },
          {
            id: "3",
            brand: "Mitsubishi",
            model: "Xpander Ultimate",
            year: 2020,
            price: 225000000,
            installment: 4200000,
            km: 45000,
            transmission: "Automatic",
            fuel: "Bensin",
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
            featured: true,
            description: "Mitsubishi Xpander Ultimate 2020, fitur lengkap, interior bersih, ban tebal."
          },
          {
            id: "4",
            brand: "Suzuki",
            model: "Ertiga GL",
            year: 2019,
            price: 155000000,
            installment: 2900000,
            km: 60000,
            transmission: "Manual",
            fuel: "Bensin",
            image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
            featured: false,
            description: "Suzuki Ertiga GL 2019, mesin halus, AC dingin, irit bahan bakar."
          },
          {
            id: "5",
            brand: "Daihatsu",
            model: "Sigra R Deluxe",
            year: 2023,
            price: 145000000,
            installment: 2700000,
            km: 5000,
            transmission: "Automatic",
            fuel: "Bensin",
            image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800",
            featured: false,
            description: "Daihatsu Sigra R Deluxe 2023, seperti baru, km rendah, garansi resmi masih ada."
          }
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
