import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    text: "We had a great time shooting with you sir.. It was real funn. i love your work? Thnkyou so much for amazing pictures and beautiful prewedding video",
    author: "GARIMA JAGGI",
    image: "/images/testinomial/garima.png", // Replace with actual image URL
  },
  {
    text: "Thank you so so so so much!! The photos are absolutely beautiful! We love every single one of them. You have done an incredible job we are so happy!!",
    author: "Ekanshi Tiwana",
    image: "/images/testinomial/ekanshi.png", // Replace with actual image URL
  },
  {
    text: "Thank you for capturing these beautiful memories of Rhyler's Baptism party. They were very special to us and our families.",
    author: "Rochelle Picardo",
    image: "/images/testinomial/rochelle.png", // Replace with actual image URL
  },

  // Add more testimonials as needed
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100 p-4 sm:p-8">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-3xl"
      >
        {/* Image in square shape */}
        <div className="flex justify-center">
          <img
            src={testimonials[index].image}
            alt={testimonials[index].author}
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg mb-6"
          />
        </div>

        {/* Star icons */}
        <div className="flex justify-center mt-4 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} size={24} className="w-6 h-6 sm:w-8 sm:h-8" />
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-gray-800 text-base sm:text-xl font-serif mt-6 px-4 sm:px-0">
          {testimonials[index].text}
        </p>

        {/* Author name */}
        <p className="text-gray-500 text-sm sm:text-lg mt-4">
          — {testimonials[index].author}
        </p>
      </motion.div>
    </div>
  );
};

export default TestimonialSlider;