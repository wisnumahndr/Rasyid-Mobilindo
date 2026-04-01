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
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
        setLoading(false);
      });
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
