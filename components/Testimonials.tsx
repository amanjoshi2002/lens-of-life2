"use client";
import { QuoteIcon, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  review: string;  // changed from 'text'
  name: string;    // changed from 'author'
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

  if (isLoading) {
    return (
      <section className="bg-black py-12 mt-2 sm:mt-[-80]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">What our clients say</h2>
          <p className="text-gray-300 mt-2">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  // Get only the first 3 testimonials for display
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="bg-black py-12 mt-2 sm:mt-[-80]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white">What our clients say</h2>
        <p className="text-gray-300 mt-2">Client Reviews</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8 mt-8">
        {displayedTestimonials.map((testimonial) => (
          <div key={testimonial._id} className="bg-neutral-100 shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <QuoteIcon size={36} className="text-gray-900 mb-4" />

            <p className="text-gray-900 italic">"{testimonial.review}"</p>

            <div className="mt-6 w-14 h-14 bg-black text-white flex items-center justify-center rounded-full text-lg font-bold">
              {getInitials(testimonial.name)}
            </div>

            <div className="mt-4">
              <p className="font-semibold text-black">{testimonial.name}</p>
              <p className="text-gray-900 text-sm">{testimonial.location}</p>
            </div>

            <div className="flex mt-2">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <Star key={i} size={20} className="text-yellow-400" fill="currentColor" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {testimonials.length > 3 && (
        <div className="text-center mt-8">
          <Link href="/testimonials">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition">
              View More ({testimonials.length - 3} more reviews)
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
