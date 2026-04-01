import React, { useState, useEffect } from 'react';
import { Hero, Features, Testimonials, CreditCalculator, CarCard } from '../components/Sections';
import { Car } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setFeaturedCars(data.filter((c: Car) => c.featured));
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
          }
        ];
        setFeaturedCars(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
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
