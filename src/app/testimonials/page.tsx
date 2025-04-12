"use client";
import { QuoteIcon, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

interface Testimonial {
  _id: string;
  review: string;
  name: string;
  location: string;
  rating?: number;
}

const TestimonialsPage = () => {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <section className="bg-gray-100 py-20 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white shadow-lg rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto my-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-20 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">Client Testimonials</h1>
          <p className="text-gray-500 mt-2">See what our clients say about us.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8 mt-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <QuoteIcon size={36} className="text-gray-400 mb-4" />
              <p className="text-gray-700 italic">"{testimonial.review}"</p>
              <div className="mt-6 w-14 h-14 bg-gray-800 text-white flex items-center justify-center rounded-full text-lg font-bold">
                {getInitials(testimonial.name)}
              </div>
              <div className="mt-4">
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
              {testimonial.rating && (
                <div className="flex mt-2">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} size={20} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/">
            <span className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer inline-block">
              Back to Home
            </span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TestimonialsPage;
