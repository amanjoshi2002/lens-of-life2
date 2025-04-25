"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const slides = [
    {
      image: "/images/hero/cover1.jpg",
      title: "Luxury in Capture",
      subtitle: "",
      text: "Crafting breathtaking memories of your beach wedding with refined elegance and artistry."
    },
    {
      image: "/images/hero/cover2.jpg",
      subtitle: "MOMENTS",
      text: "As your love story unfolds, We capture each golden moment, preserving every step you take towards forever."
    },
    {
      image: "/images/hero/cover3.jpg",
      title: "Cherished Moments",
      subtitle: "",
      text: "Capturing your love’s reflection as the sun sets on a new chapter together."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[current].image}
            alt="Hero background"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-serif mb-4">
                {slides[current].title}
                <br />
                {slides[current].subtitle}
              </h1>
              <p className="text-xl md:text-2xl italic max-w-3xl mx-auto">
                {slides[current].text}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-black/20 rounded-full transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-black/20 rounded-full transition-colors"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
