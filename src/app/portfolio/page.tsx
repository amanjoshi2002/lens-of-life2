'use client';
import { Suspense, useState, useEffect } from "react";
import Hero from "../../../components/Hero1";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import router from "next/router";

interface Category {
  _id: string;
  name: string;
}

interface Portfolio {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  photos: string[];
}

function PortfolioContent() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  const [defaultCategoryId, setDefaultCategoryId] = useState('');
  const categoryId = searchParams?.get('category') || defaultCategoryId;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data: Category[] = await res.json();
        setCategories(data);
        // Set the first category as default if no category is selected
        if (data.length > 0 && !searchParams?.get('category')) {
          setDefaultCategoryId(data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [searchParams]);

  // Update handleAllClick inside component
  const handleAllClick = async () => {
    setDefaultCategoryId('');
    try {
      const res = await fetch('/api/portfolios');
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching all portfolios:", error);
    }
  };

  // Modify the fetchPortfolios effect
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const url = categoryId ? `/api/portfolios?categoryId=${categoryId}` : '/api/portfolios';
        const res = await fetch(url);
        const data = await res.json();
        setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    fetchPortfolios();
  }, [categoryId]);

  const filteredPortfolios = portfolios.filter(portfolio => portfolio.category._id === categoryId);

  const heroSlides = [
    {
      image: '/images/hero/pre wed.jpg',
      title: '',
      subtitle: 'Explore Our Work'
    }
  ];

  return (
    <>
      <Navbar />
      <Hero pageTitle="Portfolio" slides={heroSlides} />
      
      <div className="py-17 bg-white">
        <div className="w-full mt-[-18]">
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

          {/* Category Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={handleAllClick}
              className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                !categoryId ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-800 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => (window.location.href = `/portfolio?category=${category._id}`)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                  category._id === categoryId ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-800 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="w-full">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-0 [column-fill:_balance] w-full">
              {(categoryId ? filteredPortfolios : portfolios)
                .slice()
                .reverse()
                .flatMap((portfolio) =>
                  portfolio.photos.map((photo, index) => {
                    const isLarge = index % 5 === 0;
                    const isWide = index % 7 === 3;
                    
                    return (
                      <div 
                        key={`${portfolio._id}-${index}`} 
                        className={`mb-0 break-inside-avoid ${
                          isLarge ? 'h-[90vh]' : isWide ? 'h-[60vh]' : 'h-[70vh]'
                        }`}
                      >
                        <div className="w-full h-full">
                          <img
                            alt={portfolio.title}
                            className="w-full h-full object-cover transition-all duration-500 
                                     filter grayscale hover:grayscale-0 hover:scale-105"
                            src={photo}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <h3 className="text-xl sm:text-2xl font-playfair text-gray-900 mb-4">
              Ready to capture your special moments?
            </h3>
            <button className="px-6 sm:px-8 py-3 bg-black text-white rounded-full hover:bg-primary/90 
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

