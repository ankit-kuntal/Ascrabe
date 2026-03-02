import {
  Newspaper,
  Smartphone,
  Wrench,
  Recycle,
  Lightbulb,
  Wine,
  Shirt,
  Package,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = [
  {
    icon: Newspaper,
    label: 'Newspaper & Paper',
    desc: 'Old newspapers, books, cardboard, magazines',
    rate: '₹14/kg',
  },
  {
    icon: Smartphone,
    label: 'Electronics',
    desc: 'Phones, chargers, laptops, cables, PCBs',
    rate: '₹30/kg',
  },
  {
    icon: Recycle,
    label: 'Plastic',
    desc: 'PET bottles, containers, HDPE, bags',
    rate: '₹10/kg',
  },
  {
    icon: Wrench,
    label: 'Metal',
    desc: 'Iron, aluminium, copper, brass, steel',
    rate: '₹40/kg',
  },
  {
    icon: Lightbulb,
    label: 'E-Waste',
    desc: 'Batteries, bulbs, wires, circuit boards',
    rate: '₹25/kg',
  },
  {
    icon: Wine,
    label: 'Glass',
    desc: 'Bottles, jars, broken glass items',
    rate: '₹8/kg',
  },
  {
    icon: Shirt,
    label: 'Clothing',
    desc: 'Old clothes, fabric, textiles',
    rate: '₹5/kg',
  },
  {
    icon: Package,
    label: 'Other',
    desc: 'Furniture, appliances, miscellaneous items',
    rate: 'Varies',
  },
];

const Categories = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-foreground">Scrap Categories</h1>
      <p className="mt-1 text-sm text-muted-foreground mb-8">
        Browse all the scrap types we accept with current rates.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <div
            key={c.label}
            className="group rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <c.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{c.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            <div className="mt-3 text-sm font-semibold text-primary">
              {c.rate}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Categories;
