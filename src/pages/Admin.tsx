import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  LayoutDashboard, 
  Car as CarIcon, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  ShieldCheck,
  Search,
  Filter,
  ExternalLink,
  Save,
  X,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { db, auth } from '../firebase';
import { Car, Lead } from '../types';
import { MOCK_CARS } from '../constants';

const ADMIN_EMAIL = 'wisnumhndr4@gmail.com';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'leads'>('dashboard');
  
  // Inventory State
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is admin in Firestore or by email
        // For now, we use the email check as defined in rules
        if (currentUser.email === ADMIN_EMAIL) {
          setIsAdmin(true);
          fetchData();
        } else {
          // Check if user has admin role in Firestore
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
              fetchData();
            } else {
              setIsAdmin(false);
            }
          } catch (error) {
            console.error("Error checking admin role:", error);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Cars
      const carsSnap = await getDocs(query(collection(db, 'cars'), orderBy('year', 'desc')));
      const carsData = carsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
      setCars(carsData);

      // Fetch Leads
      const leadsSnap = await getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc')));
      const leadsData = leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
      setLeads(leadsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogin = async () => {
    setLoginError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoginError(error.message || "Gagal login. Silakan coba lagi.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    try {
      // Process images array from newline-separated string if it's a string
      const carData = { ...editingCar };
      if (typeof carData.images === 'string') {
        carData.images = (carData.images as string).split('\n').map(url => url.trim()).filter(url => url !== '');
      }

      if (editingCar.id) {
        // Update
        const carRef = doc(db, 'cars', editingCar.id);
        const { id, ...data } = carData;
        await updateDoc(carRef, data);
      } else {
        // Create
        await addDoc(collection(db, 'cars'), {
          ...carData,
          createdAt: serverTimestamp(),
          isSoldOut: carData.isSoldOut || false,
          featured: carData.featured || false
        });
      }
      setIsModalOpen(false);
      setEditingCar(null);
      fetchData();
    } catch (error) {
      console.error("Error saving car:", error);
      alert("Gagal menyimpan data mobil. Pastikan Anda memiliki akses admin.");
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus mobil ini?")) return;
    try {
      await deleteDoc(doc(db, 'cars', id));
      fetchData();
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Gagal menghapus data mobil.");
    }
  };

  const toggleSoldOut = async (car: Car) => {
    try {
      await updateDoc(doc(db, 'cars', car.id), {
        isSoldOut: !car.isSoldOut
      });
      fetchData();
    } catch (error) {
      console.error("Error toggling sold out:", error);
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm("Apakah Anda ingin mengisi database dengan data contoh (mock data)? Ini akan menambahkan 20 mobil ke Firestore.")) return;
    
    setLoading(true);
    try {
      const carsCollection = collection(db, 'cars');
      for (const car of MOCK_CARS) {
        await addDoc(carsCollection, {
          ...car,
          createdAt: serverTimestamp()
        });
      }
      alert("Berhasil mengisi database dengan data contoh!");
      fetchData();
    } catch (error) {
      console.error("Error seeding data:", error);
      alert("Gagal mengisi data. Pastikan Anda memiliki akses admin.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-accent" size={40} />
          </div>
          <h1 className="text-3xl font-black text-primary mb-4">Admin Portal</h1>
          <p className="text-slate-500 mb-8">
            Halaman ini hanya dapat diakses oleh administrator Rasyid Mobilindo. Silakan login untuk melanjutkan.
          </p>
          <button 
            onClick={handleLogin}
            className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Login dengan Google
          </button>
          {loginError && (
            <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
              Error: {loginError}
            </p>
          )}
          {user && !isAdmin && (
            <p className="mt-4 text-red-500 text-sm font-medium">
              Akun Anda ({user.email}) tidak memiliki akses admin.
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <h2 className="text-2xl font-black italic tracking-tighter">
            RM <span className="text-accent">ADMIN</span>
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-bold">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
          >
            <CarIcon size={20} />
            <span className="font-bold">Inventaris</span>
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
          >
            <Users size={20} />
            <span className="font-bold">Prospek (Leads)</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-4">
            <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-10 h-10 rounded-full border-2 border-accent" />
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user.displayName}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-primary capitalize">{activeTab}</h1>
            <p className="text-slate-500">Selamat datang kembali, Admin Rasyid Mobilindo.</p>
          </div>
          
          {activeTab === 'inventory' && (
            <div className="flex gap-4">
              <button 
                onClick={handleSeedData}
                className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                <Database size={20} />
                Isi Data Contoh
              </button>
              <button 
                onClick={async () => {
                  if (!window.confirm("HAPUS SEMUA DATA MOBIL? Tindakan ini tidak dapat dibatalkan.")) return;
                  setLoading(true);
                  try {
                    // Fetch fresh list of cars to ensure we have all IDs
                    const carsSnap = await getDocs(collection(db, 'cars'));
                    const deletePromises = carsSnap.docs.map(doc => deleteDoc(doc.ref));
                    await Promise.all(deletePromises);
                    
                    alert("Semua data mobil berhasil dihapus.");
                    await fetchData();
                  } catch (error) {
                    console.error("Error clearing database:", error);
                    alert("Gagal menghapus data. Silakan coba lagi.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="bg-red-50 text-red-600 border border-red-100 px-6 py-3 rounded-2xl font-bold hover:bg-red-100 transition-all flex items-center gap-2"
              >
                <Trash2 size={20} />
                Hapus Semua
              </button>
              <button 
                onClick={() => {
                  setEditingCar({});
                  setIsModalOpen(true);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Tambah Mobil
              </button>
            </div>
          )}
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <CarIcon size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Stok</span>
                </div>
                <h3 className="text-4xl font-black text-primary">{cars.length}</h3>
                <p className="text-sm text-slate-500 mt-2">Unit mobil tersedia</p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terjual</span>
                </div>
                <h3 className="text-4xl font-black text-primary">{cars.filter(c => c.isSoldOut).length}</h3>
                <p className="text-sm text-slate-500 mt-2">Unit telah laku</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                    <Users size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
                </div>
                <h3 className="text-4xl font-black text-primary">{leads.length}</h3>
                <p className="text-sm text-slate-500 mt-2">Calon pembeli masuk</p>
              </div>
            </div>

            {cars.length === 0 && (
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl text-center">
                <CarIcon size={48} className="mx-auto text-blue-300 mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">Database Masih Kosong</h3>
                <p className="text-blue-700 mb-6 max-w-md mx-auto">
                  Anda belum memiliki data mobil di Firestore. Anda bisa mulai dengan mengisi data contoh (mock data) agar tampilan website tidak kosong.
                </p>
                <button 
                  onClick={handleSeedData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
                >
                  Isi Database dengan Data Contoh
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="font-black text-primary text-lg">Leads Terbaru</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-accent text-sm font-bold flex items-center gap-1">
                    Lihat Semua <ExternalLink size={14} />
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {leads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-primary">{lead.name}</p>
                        <span className="text-xs text-slate-400">
                          {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Baru saja'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{lead.phone}</p>
                      <p className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block">
                        {lead.type === 'credit' ? 'Simulasi Kredit' : 'Kontak'}
                      </p>
                    </div>
                  ))}
                  {leads.length === 0 && (
                    <div className="p-10 text-center text-slate-400 italic">Belum ada leads masuk.</div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="font-black text-primary text-lg">Stok Terbaru</h3>
                  <button onClick={() => setActiveTab('inventory')} className="text-accent text-sm font-bold flex items-center gap-1">
                    Kelola Stok <ExternalLink size={14} />
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {cars.slice(0, 5).map(car => (
                    <div key={car.id} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <img src={car.image} alt={car.model} className="w-16 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-bold text-primary">{car.brand} {car.model}</p>
                        <p className="text-xs text-slate-500">{car.year} • Rp {(car.price / 1000000).toFixed(1)} Juta</p>
                      </div>
                      {car.isSoldOut ? (
                        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full uppercase">Sold</span>
                      ) : (
                        <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded-full uppercase">Ready</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Mobil</th>
                    <th className="px-6 py-4">Tahun</th>
                    <th className="px-6 py-4">Harga</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {cars.map(car => (
                    <tr key={car.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={car.image} alt={car.model} className="w-16 h-12 object-cover rounded-lg" />
                          <div>
                            <p className="font-bold text-primary">{car.brand} {car.model}</p>
                            <p className="text-xs text-slate-400">{car.transmission} • {car.km.toLocaleString()} KM • {car.images?.length || 0} Foto</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{car.year}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-primary">Rp {(car.price / 1000000).toFixed(1)} Jt</p>
                        <p className="text-[10px] text-slate-400 italic">Cicilan: {(car.installment / 1000000).toFixed(1)} Jt/bln</p>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleSoldOut(car)}
                          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter transition-all ${car.isSoldOut ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                        >
                          {car.isSoldOut ? 'Sold Out' : 'Available'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`w-3 h-3 rounded-full ${car.featured ? 'bg-accent shadow-sm shadow-accent' : 'bg-slate-200'}`}></div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => {
                              setEditingCar(car);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteCar(car.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Nama Pelanggan</th>
                    <th className="px-6 py-4">Kontak</th>
                    <th className="px-6 py-4">Tipe</th>
                    <th className="px-6 py-4">Pesan</th>
                    <th className="px-6 py-4">Tanggal</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{lead.name}</td>
                      <td className="px-6 py-4">
                        <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          {lead.phone} <ExternalLink size={12} />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${lead.type === 'credit' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          {lead.type === 'credit' ? 'Kredit' : 'Kontak'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{lead.message}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={async () => {
                            if(window.confirm("Hapus lead ini?")) {
                              await deleteDoc(doc(db, 'leads', lead.id));
                              fetchData();
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-slate-400 italic">Belum ada data leads.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Car Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-black text-primary">
                  {editingCar?.id ? 'Edit Mobil' : 'Tambah Mobil Baru'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveCar} className="p-8 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Merek</label>
                      <input 
                        required
                        type="text" 
                        value={editingCar?.brand || ''}
                        onChange={e => setEditingCar({...editingCar, brand: e.target.value})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                        placeholder="Contoh: Toyota"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Model</label>
                      <input 
                        required
                        type="text" 
                        value={editingCar?.model || ''}
                        onChange={e => setEditingCar({...editingCar, model: e.target.value})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                        placeholder="Contoh: Avanza 1.3 G"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tahun</label>
                        <input 
                          required
                          type="number" 
                          value={editingCar?.year || ''}
                          onChange={e => setEditingCar({...editingCar, year: Number(e.target.value)})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">KM</label>
                        <input 
                          required
                          type="number" 
                          value={editingCar?.km || ''}
                          onChange={e => setEditingCar({...editingCar, km: Number(e.target.value)})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Harga Cash (Rp)</label>
                      <input 
                        required
                        type="number" 
                        value={editingCar?.price || ''}
                        onChange={e => setEditingCar({...editingCar, price: Number(e.target.value)})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Cicilan / Bln (Rp)</label>
                      <input 
                        required
                        type="number" 
                        value={editingCar?.installment || ''}
                        onChange={e => setEditingCar({...editingCar, installment: Number(e.target.value)})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Transmisi</label>
                        <select 
                          value={editingCar?.transmission || 'Automatic'}
                          onChange={e => setEditingCar({...editingCar, transmission: e.target.value as any})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Bahan Bakar</label>
                        <select 
                          value={editingCar?.fuel || 'Bensin'}
                          onChange={e => setEditingCar({...editingCar, fuel: e.target.value as any})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                        >
                          <option value="Bensin">Bensin</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Listrik">Listrik</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">URL Gambar</label>
                    <input 
                      required
                      type="text" 
                      value={editingCar?.image || ''}
                      onChange={e => setEditingCar({...editingCar, image: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">URL Gambar Tambahan (Satu per baris)</label>
                    <textarea 
                      rows={3}
                      value={Array.isArray(editingCar?.images) ? editingCar?.images.join('\n') : (editingCar?.images || '')}
                      onChange={e => setEditingCar({...editingCar, images: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="https://images.unsplash.com/image1.jpg&#10;https://images.unsplash.com/image2.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Deskripsi</label>
                    <textarea 
                      required
                      rows={3}
                      value={editingCar?.description || ''}
                      onChange={e => setEditingCar({...editingCar, description: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="Kondisi mobil, pajak, dll..."
                    />
                  </div>
                  
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={editingCar?.featured || false}
                        onChange={e => setEditingCar({...editingCar, featured: e.target.checked})}
                        className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent"
                      />
                      <span className="font-bold text-primary group-hover:text-accent transition-colors">Tampilkan di Home (Featured)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={editingCar?.isSoldOut || false}
                        onChange={e => setEditingCar({...editingCar, isSoldOut: e.target.checked})}
                        className="w-5 h-5 rounded border-slate-300 text-red-500 focus:ring-red-500"
                      />
                      <span className="font-bold text-primary group-hover:text-red-500 transition-colors">Sold Out</span>
                    </label>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl border border-slate-200 font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 btn-primary py-4 rounded-2xl flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Simpan Data
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
