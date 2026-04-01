import React, { useState, useEffect } from 'react';
import { Hero, Features, Testimonials, CreditCalculator, CarCard } from '../components/Sections';
import { Car } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => {
        setFeaturedCars(data.filter((c: Car) => c.featured));
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-primary mb-4">Mobil Unggulan Kami</h2>
              <p className="text-slate-500 text-lg max-w-xl">
                Pilihan mobil terbaik yang sudah melalui inspeksi ketat 175 titik. Siap pakai dan bergaransi.
              </p>
            </div>
            <Link to="/inventory" className="text-accent font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Lihat Semua Stok <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white h-[450px] rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CreditCalculator />
      <Testimonials />
    </div>
  );
}
