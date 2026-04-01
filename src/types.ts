export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  installment: number;
  km: number;
  transmission: string;
  fuel: string;
  image: string;
  featured: boolean;
  description: string;
}

export interface Lead {
  name: string;
  phone: string;
  carId?: string;
  type: 'inquiry' | 'credit' | 'trade-in';
  message?: string;
}
