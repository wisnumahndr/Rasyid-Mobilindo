import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Inventory Data
  const inventory = [
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
      image: "https://picsum.photos/seed/avanza/800/600",
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
      image: "https://picsum.photos/seed/brio/800/600",
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
      image: "https://picsum.photos/seed/xpander/800/600",
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
      image: "https://picsum.photos/seed/ertiga/800/600",
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
      image: "https://picsum.photos/seed/sigra/800/600",
      featured: false,
      description: "Daihatsu Sigra R Deluxe 2023, seperti baru, km rendah, garansi resmi masih ada."
    }
  ];

  // API Routes
  app.get("/api/inventory", (req, res) => {
    res.json(inventory);
  });

  app.get("/api/inventory/:id", (req, res) => {
    const car = inventory.find(c => c.id === req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  });

  app.post("/api/leads", (req, res) => {
    console.log("New Lead:", req.body);
    res.json({ success: true, message: "Lead captured successfully" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
