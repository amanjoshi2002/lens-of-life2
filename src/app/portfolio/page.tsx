  'use client';
  import { Suspense, useState, useEffect } from "react";
  import Hero from "../../../components/Hero1";
  import Footer from "../../../components/Footer";
  import Navbar from "../../../components/Navbar";
  import { useSearchParams } from 'next/navigation';

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
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const searchParams = useSearchParams();
    const categoryId = searchParams?.get('category') || '';

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch("/api/categories");
          const data: Category[] = await res.json();
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      const fetchPortfolios = async () => {
        try {
          const res = await fetch(`/api/portfolios?categoryId=${categoryId}`);
          const data = await res.json();
          setPortfolios(data);
        } catch (error) {
          console.error("Error fetching portfolios:", error);
        }
      };

      fetchCategories(); // Fetch categories
      fetchPortfolios(); // Fetch portfolios based on selected category
    }, [categoryId]);

    // Filter portfolios based on the selected category
    const filteredPortfolios = portfolios.filter(portfolio => portfolio.category._id === categoryId);

    return (
      <>
        <Navbar />
        <Hero title="Portfolio" subtitle="Explore Our Work" />
        
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="w-24 h-1 bg-primary mx-auto mb-20"></div>

            {/* Category Selection */}
            <div className="flex justify-center gap-8 mb-16">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    // Navigate to the portfolio page with the selected category
                    window.location.href = `/portfolio?category=${category._id}`;
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    category._id === categoryId ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Portfolio Grid with Merged Photos */}
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
              <div className="-m-1 flex flex-wrap md:-m-2">
                {filteredPortfolios.length > 0 ? (
                  filteredPortfolios.map((portfolio) => (
                    <div key={portfolio._id} className="flex w-full flex-wrap">
                      {portfolio.photos.map((photo, index) => (
                        <div key={index} className="w-1/2 p-1 md:p-2">
                          <img
                            alt={portfolio.title}
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={photo}
                          />
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No portfolios available for this category.</p>
                )}
              </div>
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
