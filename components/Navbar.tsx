'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Recycle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/sell', label: 'Sell Scrap' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
            <Recycle className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Ascrabe</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                pathname === l.href
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-4 md:hidden animate-fade-in">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="flex-1"
            >
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
