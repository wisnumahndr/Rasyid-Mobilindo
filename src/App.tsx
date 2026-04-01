import React from 'react';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import Kredit from './pages/Kredit';
import TukarTambah from './pages/TukarTambah';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/:id" element={<VehicleDetail />} />
          <Route path="kredit" element={<Kredit />} />
          <Route path="trade-in" element={<TukarTambah />} />
          <Route path="promo" element={<div className="pt-32 text-center">Halaman Promo (Coming Soon)</div>} />
          <Route path="about" element={<div className="pt-32 text-center">Halaman Tentang Kami (Coming Soon)</div>} />
          <Route path="contact" element={<div className="pt-32 text-center">Halaman Kontak (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
