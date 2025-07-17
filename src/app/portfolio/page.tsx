'use client';
import { Suspense, useState, useEffect } from "react";
import Hero from "../../../components/Hero1";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import  Loading from '../../../components/Loading';

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
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [allPhotos, setAllPhotos] = useState<{url: string, title: string}[]>([]);

  // Move all useEffect hooks to the top
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch categories first
        const categoriesRes = await fetch("/api/categories");
        if (!categoriesRes.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesRes.json();
        
        // Only fetch portfolios if categories are successful
        const portfoliosRes = await fetch('/api/portfolios');
        if (!portfoliosRes.ok) {
          throw new Error('Failed to fetch portfolios');
        }
        const portfoliosData = await portfoliosRes.json();
        
        // Set data only if both fetches are successful
        setCategories(categoriesData);
        setPortfolios(portfoliosData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load content. Please check your connection and try again.');
        // Important: Set empty arrays to prevent undefined errors
        setCategories([]);
        setPortfolios([]);
      } finally {
        // Remove the timeout to prevent unnecessary waiting
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter portfolios based on selected category
  const filteredPortfolios = selectedCategoryId 
    ? portfolios.filter(portfolio => portfolio.category._id === selectedCategoryId)
    : portfolios;

  // Create flat array of all photos with metadata
  useEffect(() => {
    const photos = filteredPortfolios
      .slice()
      .reverse()
      .flatMap((portfolio) =>
        portfolio.photos.map((photo) => ({
          url: photo,
          title: portfolio.title
        }))
      );
    setAllPhotos(photos);
  }, [filteredPortfolios]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        prevPhoto();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, allPhotos.length]);

  // Modal handlers
  const openModal = (photoIndex: number) => {
    setCurrentPhotoIndex(photoIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  // Modify the loading condition
  if (isLoading) {
    return <Loading />;
  }

  // Show error state even if categories are empty
  if (error || (!isLoading && categories.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600">{error || 'No content available'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Update category selection handlers
  const handleAllClick = () => {
    setSelectedCategoryId('');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const heroSlides = [
    {
      image: '/images/hero/cover1.jpg',
      title: '',
      subtitle: 'Explore Our Work'
    }
  ];

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen">
        <Hero pageTitle="Portfolio" slides={heroSlides} />
        
        {/* Add scroll down mouse icon */}
        <div 
          onClick={() => {
            const contentElement = document.getElementById('portfolio-content');
            if (contentElement) {
              contentElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute inset-x-0 bottom-10 mx-auto w-fit animate-bounce z-50"
        >
          <div className="text-white text-center">
            <span className="text-sm mb-2 block">Scroll Down</span>
            <div className="flex justify-center">
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
      
      <div id="portfolio-content" className="py-17 bg-white">
        <div className="w-full mt-[-18]">
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

          {/* Category Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={handleAllClick}
              className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                !selectedCategoryId ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-800 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                  category._id === selectedCategoryId ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-800 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="w-full">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-0 [column-fill:_balance] w-full">
              {filteredPortfolios
                .slice()
                .reverse()
                .flatMap((portfolio, portfolioIndex) =>
                  portfolio.photos.map((photo, photoIndex) => {
                    // Calculate the actual index in the flattened array
                    const flatIndex = filteredPortfolios
                      .slice()
                      .reverse()
                      .slice(0, portfolioIndex)
                      .reduce((acc, p) => acc + p.photos.length, 0) + photoIndex;
                    
                    return (
                      <div 
                        key={`${portfolio._id}-${photoIndex}`} 
                        className="break-inside-avoid overflow-hidden relative cursor-pointer"
                        onClick={() => openModal(flatIndex)}
                      >
                        <div className="w-full overflow-hidden">
                          <img
                            alt={portfolio.title}
                            className="w-full h-auto object-cover transition-all duration-500 
                                     hover:scale-105 z-10 block"                                       
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
          <div className="text-center mt-20 p-14">
            <h3 className="text-xl sm:text-2xl font-playfair text-gray-900 mb-4">
              Ready to capture your special moments?
            </h3>
            <button 
              onClick={handleContactClick}
              className="px-6 sm:px-8 py-3 bg-black text-white rounded-full hover:bg-primary/90 
                        transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Photo */}
            <img
              src={allPhotos[currentPhotoIndex]?.url}
              alt={allPhotos[currentPhotoIndex]?.title}
              className="max-w-full max-h-full object-contain"
            />

            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentPhotoIndex + 1} / {allPhotos.length}
            </div>
          </div>
        </div>
      )}

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
