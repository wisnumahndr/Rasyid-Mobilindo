import React from 'react';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import Kredit from './pages/Kredit';
import TukarTambah from './pages/TukarTambah';
import Promo from './pages/Promo';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/:id" element={<VehicleDetail />} />
          <Route path="kredit" element={<Kredit />} />
          <Route path="trade-in" element={<TukarTambah />} />
          <Route path="promo" element={<Promo />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
