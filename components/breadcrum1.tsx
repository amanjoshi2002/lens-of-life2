'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function Breadcrumb1() {
  return (
    <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 max-w-7xl mx-auto my-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-pink-600">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Blog</span>
          </div>
        </li>
      </ol>
    </nav>
  );
}