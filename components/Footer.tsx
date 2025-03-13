'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Address Section */}
        <div className="mb-8">
          <p>9 Pavilion Business Park</p>
          <p>Royds Hall Road</p>
          <p>LS12 6AJ Leeds</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-4">
          <a href="https://facebook.com" className="hover:opacity-80 transition">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" className="hover:opacity-80 transition">
            <Instagram size={24} />
          </a>
          <a href="https://youtube.com" className="hover:opacity-80 transition">
            <Youtube size={24} />
          </a>
        </div>

        {/* Instagram Handle */}
        <div className="mb-12">
          <a href="https://instagram.com/anjaukphotography" className="text-white hover:opacity-80 transition">
            @anjaukphotography
          </a>
        </div>

       

        {/* Navigation Links - First Column */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12 justify-end">
          <div className="space-y-2">
            <Link href="/" className="block hover:opacity-80 transition">HOME</Link>
            <Link href="/faqs" className="block hover:opacity-80 transition">FAQs</Link>
            <Link href="/portraits" className="block hover:opacity-80 transition">PORTRAITS</Link>
            <Link href="/pricing" className="block hover:opacity-80 transition">PRICING</Link>
            <Link href="/contact" className="block hover:opacity-80 transition">CONTACT</Link>
            <Link href="/details" className="block hover:opacity-80 transition">DETAILS</Link>
          </div>
          
          {/* Navigation Links - Second Column */}
          <div className="space-y-2">
            <Link href="/maternity" className="block hover:opacity-80 transition">MATERNITY</Link>
            <Link href="/motherhood-family" className="block hover:opacity-80 transition">MOTHERHOOD & FAMILY</Link>
            <Link href="/newborn" className="block hover:opacity-80 transition">NEWBORN</Link>
            <Link href="/cake-smash" className="block hover:opacity-80 transition">CAKE SMASH</Link>
            <Link href="/children" className="block hover:opacity-80 transition">CHILDREN</Link>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-sm opacity-80 max-w-3xl mx-auto">
          <p className="mb-4">©2025 Anja UK Photography, Leeds Maternity, Motherhood, Family Portrait Photography Studio. Anja is a celebrated Leeds maternity photographer, specializing in family and baby portraits. Our studio offers timeless pregnancy portraits, artistic motherhood sessions, elegant family photos, sophisticated black & white portraits, and stunning silhouettes. Located in the heart of Leeds, we cater to clients across the UK, celebrating each family's unique story with bespoke photographic art.</p>
          <p>© 2025 Anja UK Photography</p>
        </div>
      </div>
    </footer>
  );
}