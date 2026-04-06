'use client';

import { Recycle } from 'lucide-react';
import Link from 'next/link';

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto">
        {/* Logo & description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
              <Recycle className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Ascrabe</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Turn your household scrap into cash. Easy pickups, fair prices,
            eco-friendly recycling.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/categories', label: 'Categories' },
              { href: '/sell', label: 'Sell Scrap' },
              { href: '/dashboard', label: 'Dashboard' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Support</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>help@ascrabe.com</span>
            <span>+91 98765 43210</span>
            <span>FAQ</span>
            <span>Terms & Conditions</span>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
          <div className="flex gap-3">
            {['Twitter', 'Instagram', 'Facebook'].map((s) => (
              <span
                key={s}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {s[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © 2026 Ascrabe. All rights reserved. ♻️ Making recycling rewarding.
      </div>
    </div>
  </footer>
);

export default Footer;
