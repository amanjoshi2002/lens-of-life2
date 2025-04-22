"use client";
import { QuoteIcon, Star, ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
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
    <section className="bg-black py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-5xl md:text-6xl font-['Limelight'] text-white mb-2">What our clients say</h2>
        <p className="text-white mt-2 font-light tracking-wider uppercase text-sm">Client Reviews</p>
      </div>

      <div className="relative max-w-3xl mx-auto mt-12 px-4">
        {/* Testimonial Slider */}
        <div className="relative h-[400px] md:h-[350px]">
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
              <div className="bg-neutral-100 shadow-lg rounded-lg p-8 flex flex-col items-center text-center mx-auto">
                <QuoteIcon size={36} className="text-gray-900 mb-6" />

                <p className="text-gray-900 italic text-lg md:text-xl leading-relaxed">
                  "{testimonials[currentIndex].review}"
                </p>

                <div className="mt-8 w-16 h-16 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold">
                  {getInitials(testimonials[currentIndex].name)}
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-black text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-900 text-sm">{testimonials[currentIndex].location}</p>
                </div>

                <div className="flex mt-3">
                  {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                    <Star key={i} size={20} className="text-black" fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full md:-translate-x-12 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full md:translate-x-12 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-6" : "bg-white/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="text-center mt-10">
          <Link href="/testimonials">
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-light tracking-wider hover:bg-white hover:text-black transition-all duration-300 text-sm">
              VIEW ALL TESTIMONIALS
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
