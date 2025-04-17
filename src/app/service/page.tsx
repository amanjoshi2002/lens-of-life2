'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from '../../../components/Hero1';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CategorySlider from '../../../components/blogCategory1';
import Loading from '../../../components/Loading';

function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') ?? '';

  const heroSlides = [
    {
      image: '/images/hero/pre wed.jpg',
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    },
    {
      image: '/images/hero/destinationwedding.jpg',
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    },
    {
      image: "/images/hero/pre wed.jpg",
    
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    }
  ];

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
      <Hero pageTitle="Services" slides={heroSlides} />
      <CategorySlider selectedCategory={category} />
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
