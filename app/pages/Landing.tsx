'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Newspaper,
  Smartphone,
  Wrench,
  Recycle,
  ArrowRight,
  Leaf,
  TrendingUp,
  Truck,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = [
  {
    icon: Newspaper,
    label: 'Newspaper',
    desc: 'Old newspapers & magazines',
    rate: '₹14/kg',
  },
  {
    icon: Smartphone,
    label: 'Electronics',
    desc: 'Old phones, laptops, wires',
    rate: '₹30/kg',
  },
  {
    icon: Recycle,
    label: 'Plastic',
    desc: 'Bottles, containers, bags',
    rate: '₹10/kg',
  },
  {
    icon: Wrench,
    label: 'Metal',
    desc: 'Iron, aluminium, copper',
    rate: '₹40/kg',
  },
];

const steps = [
  {
    icon: Recycle,
    title: 'Select Scrap',
    desc: 'Choose what you want to sell',
  },
  {
    icon: Truck,
    title: 'Schedule Pickup',
    desc: 'Pick a convenient date & time',
  },
  { icon: TrendingUp, title: 'Get Paid', desc: 'Instant payment on pickup' },
];

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle opacity-60" />
      <div className="container relative py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground mb-4">
              <Leaf className="h-3.5 w-3.5" /> Eco-friendly recycling
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Sell Your Scrap, <span className="text-primary">Earn Cash</span>{' '}
              from Home
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Ascrabe makes it easy to sell newspapers, electronics, plastic,
              metal, and more. Schedule a pickup and get paid instantly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sell">
                <Button size="lg" className="gap-2">
                  Sell Scrap <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login / Signup
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-slide-in-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-recycling.jpg"
              alt="Family sorting recyclable items"
              className="w-full rounded-2xl shadow-elevated"
            />
          </div>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 md:py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground">
          How It Works
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
          Three simple steps to turn your scrap into cash
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-xl border bg-card p-6 shadow-card text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mb-1 text-xs font-semibold text-primary">
                Step {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="py-16 md:py-20 gradient-subtle">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground">
          Scrap Categories
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
          We accept a wide variety of household scrap
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c.label}
              className="group rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1"
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
        <div className="mt-8 text-center">
          <Link href="/categories">
            <Button variant="outline" className="gap-2">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="rounded-2xl gradient-hero px-8 py-12 text-center md:px-16">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
            Start Selling Scrap Today
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Join thousands of households earning from their unused items. It&apos;s
            free, fast, and eco-friendly.
          </p>
          <Link href="/sell">
            <Button size="lg" variant="secondary" className="mt-6 gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;
