'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light tracking-[0.2em]">Lens Of Life</h2>
          <p className="text-xs tracking-[0.3em] text-gray-400">Creations</p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8 text-center text-sm">
          <div className="space-y-3">
            <Link href="/" className="block hover:text-gray-300 transition">HOME</Link>
            <Link href="/portfolio" className="block hover:text-gray-300 transition">PORTFOLIO</Link>
            <Link href="/services" className="block hover:text-gray-300 transition">SERVICES</Link>
          </div>
          <div className="space-y-3">
            <Link href="/blog" className="block hover:text-gray-300 transition">BLOG</Link>
            <Link href="/faq" className="block hover:text-gray-300 transition">FAQs</Link>
            <Link href="/contact" className="block hover:text-gray-300 transition">CONTACT</Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="https://www.facebook.com/LensOfLifeCreations" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Facebook size={24} />
          </a>
          <a href="https://www.instagram.com/lens_of_life_creations/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Instagram size={24} />
          </a>
          <a href="https://www.youtube.com/channel/UCCSyvF805iTIuebb_WqtKuQ" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
            <Youtube size={24} />
          </a>
        </div>

        {/* Copyright Text */}
        <div className="text-center text-sm text-gray-400">
          <p>© 2025 Lens Of Life Creations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
