import React, { useState, useEffect } from 'react';
import { Hero, Features, Testimonials, CreditCalculator, CarCard } from '../components/Sections';
import { Car } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { MOCK_CARS } from '../constants';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Rasyid Mobilindo - Dealer Mobil Bekas Berkualitas Jakarta Selatan";
    const fetchCars = async () => {
      try {
        const carsCollection = collection(db, 'cars');
        const q = query(carsCollection, where('featured', '==', true), limit(6));
        const querySnapshot = await getDocs(q);
        
        let data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Car[];

        if (data.length === 0) {
          // Fallback data if Firestore is empty
          data = MOCK_CARS.filter(c => c.featured).slice(0, 6).map((c, i) => ({ id: String(i + 1), ...c })) as Car[];
        }
        setFeaturedCars(data);
      } catch (error) {
        console.error("Error fetching featured cars from Firestore:", error);
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
