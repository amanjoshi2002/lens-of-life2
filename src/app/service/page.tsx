'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CategorySlider from '../../../components/blogCategory1';
import Loading from '../../../components/Loading';

function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') ?? '';

  // Map categories to their respective images
  const getCategoryImage = () => {
    switch(category) {
      case 'destination-wedding':
        return '/images/services/Destination wedding.jpg';
      case 'goan-wedding':
        return '/images/services/GOAN WEDDING.jpg';
      case 'pre-wedding':
        return '/images/services/Pre wedding.jpg';
      case 'live-events-and-conferencce':
        return '/images/services/Conference and Events.jpg';
      default:
        // Default image if no category is selected
        return '/images/services/Conference and Events.jpg';
    }
  };

  // Map categories to their respective titles
  const getCategoryTitle = () => {
    switch(category) {
      case 'destination-wedding':
        return 'Destination Wedding';
      case 'goan-wedding':
        return 'Goan Wedding';
      case 'pre-wedding':
        return 'Pre-Wedding';
      case 'live-events-and-conferencce':
        return 'Live Events and Conference';
      default:
        return 'Live Events and Conference';
    }
  };

  const scrollToContent = () => {
    const contentElement = document.getElementById('category-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (category) {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="pt-[var(--navbar-height)]">
        <div className="relative w-full h-screen">
          <Image 
            src={getCategoryImage()}
            alt="Service Category"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-light text-white text-center mb-8">
              {getCategoryTitle()}
            </h1>
            
            {/* Scroll Down Button */}
            <div 
              onClick={scrollToContent}
              className="absolute bottom-10 cursor-pointer animate-bounce"
            >
              <div className="text-white flex flex-col items-center">
                <span className="text-sm mb-2">Scroll Down</span>
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="category-content">
        <CategorySlider selectedCategory={category} />
      </div>
      <Footer />
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <BlogContent />
    </Suspense>
  );
}
