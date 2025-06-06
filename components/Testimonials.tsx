"use client";
import { QuoteIcon, Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  _id: string;
  review: string;
  name: string;
  location: string;
  rating: number;
}

const MAX_REVIEW_LENGTH = 200; // Maximum characters to show before "Read More"

// Function to get initials from the author's name
const getInitials = (name: string | undefined) => {
  if (!name) return '';
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        // Sort testimonials by most recent first (assuming _id contains timestamp)
        // and take only the top 5
        const recentTestimonials = data
          .sort((a: Testimonial, b: Testimonial) => 
            b._id.localeCompare(a._id))
          .slice(0, 5);
        setTestimonials(recentTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const truncateReview = (review: string) => {
    if (review.length <= MAX_REVIEW_LENGTH) return review;
    return `${review.substring(0, MAX_REVIEW_LENGTH)}...`;
  };

  if (isLoading) {
    return (
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">What our clients say</h2>
          <p className="text-gray-300 mt-2">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-['Limelight'] text-black mb-2">What our clients say</h2>
        <p className="text-black mt-1 font-light tracking-wider uppercase text-xs mb-8">Client Reviews</p>
      </div>

      <div className="relative max-w-6xl mx-auto mt-8 px-4">
        <div className="relative min-h-[400px] md:min-h-[300px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <div className="flex flex-col items-center text-center mx-auto py-8">
                <QuoteIcon size={36} className="text-black mb-6" />

                <div className="mb-8">
                  <p className="text-gray-900 italic text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                    "{truncateReview(testimonials[currentIndex].review)}"
                    {testimonials[currentIndex].review.length > MAX_REVIEW_LENGTH && (
                      <button
                        onClick={() => setSelectedReview(testimonials[currentIndex])}
                        className="text-black font-semibold ml-2 hover:underline"
                      >
                        Read More
                      </button>
                    )}
                  </p>
                </div>

                <div className="mt-4 w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-lg font-bold">
                  {getInitials(testimonials[currentIndex].name)}
                </div>

                <div className="mt-3">
                  <p className="font-semibold text-black text-base">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-900 text-sm mt-0.5">{testimonials[currentIndex].location}</p>
                </div>

                <div className="flex mt-2">
                  {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                    <Star key={i} size={16} className="text-black" fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
                <button 
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-black p-3 rounded-full hover:bg-black hover:text-white transition-all shadow-md"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-black p-3 rounded-full hover:bg-black hover:text-white transition-all shadow-md"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-black w-4" : "bg-black/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="text-center mt-8">
          <Link href="/testimonials">
            <button className="bg-transparent border border-black text-black px-5 py-2 rounded-full font-light tracking-wider hover:bg-black hover:text-white transition-all duration-300 text-xs">
              READ MORE
            </button>
          </Link>
        </div>
      )}

      {/* Modal for full review */}
      {selectedReview && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <QuoteIcon size={36} className="text-gray-900 mb-6" />
              <p className="text-gray-900 italic text-lg mb-6">{selectedReview.review}</p>
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-lg font-bold">
                {getInitials(selectedReview.name)}
              </div>
              <div className="mt-4">
                <p className="font-semibold text-black text-lg">{selectedReview.name}</p>
                <p className="text-gray-700 text-sm">{selectedReview.location}</p>
              </div>
              {selectedReview.rating && (
                <div className="flex mt-3">
                  {Array.from({ length: selectedReview.rating }, (_, i) => (
                    <Star key={i} size={16} className="text-black fill-black" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
