'use client';
import { Suspense, useState, useEffect } from "react";
import Hero from "../../../components/Hero1";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';

interface Subcategory {
  _id: string;
  name: string;
  categoryId: string;
}

interface Portfolio {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  subcategory: {
    _id: string;
    name: string;
  };
  photos: string[];
}

function PortfolioContent() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get('category') || '';

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch(`/api/portfolios?categoryId=${categoryId}`);
        const data = await res.json();
        setPortfolios(data);
        if (data.length > 0) {
          setActiveSubcategory(data[0].subcategory._id);
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    if (categoryId) {
      fetchPortfolios();
    }
  }, [categoryId]);

  const filteredPortfolios = activeSubcategory
    ? portfolios.filter(portfolio => portfolio.subcategory._id === activeSubcategory)
    : portfolios;

  const selectedCategory = portfolios.find(portfolio => portfolio.category._id === categoryId);

  return (
    <>
      <Navbar />
      <Hero title="Portfolio" subtitle="Explore Our Work" />
      
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl font-playfair text-gray-900 mb-6">Our Photography Portfolio</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We value everything that our clients stand for, and we take pride in the fact that we are trusted by our clients time and again for their Wedding Photography.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          {/* Selected Category Display */}
          {selectedCategory && (
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedCategory.category.name}</h2>
            </div>
          )}

          {/* Subcategories */}
          <div className="flex justify-center gap-8 mb-16 overflow-x-auto pb-4">
            {portfolios.map((portfolio) => (
              <button
                key={portfolio.subcategory._id}
                onClick={() => setActiveSubcategory(portfolio.subcategory._id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSubcategory === portfolio.subcategory._id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {portfolio.subcategory.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="max-w-7xl mx-auto mb-20">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-4 md:gap-6"
              layout
            >
              {filteredPortfolios.map((portfolio) => (
                portfolio.photos.map((photo, index) => (
                  <motion.div 
                    key={index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl shadow-lg group"
                  >
                    <img 
                      src={photo} 
                      alt={portfolio.title} 
                      className="w-full h-full object-cover transition-all duration-700 
                               filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                    
                    {/* Image Overlay with Gradient */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                        transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    >
                    </div>
                  </motion.div>
                ))
              ))}
            </motion.div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-20">
            <h3 className="text-2xl font-playfair text-gray-900 mb-4">Ready to capture your special moments?</h3>
            <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-primary/90 
                             transition-colors duration-300 shadow-md hover:shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}