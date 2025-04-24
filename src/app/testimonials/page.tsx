"use client";
import { QuoteIcon, Star, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Loading from "../../../components/Loading";

interface Testimonial {
  _id: string;
  review: string;
  name: string;
  location: string;
  rating?: number;
}

const MAX_REVIEW_LENGTH = 150; // Maximum characters to show before "Read More"

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);

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

  const truncateReview = (review: string) => {
    if (review.length <= MAX_REVIEW_LENGTH) return review;
    return `${review.substring(0, MAX_REVIEW_LENGTH)}...`;
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading/>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-20 min-h-screen">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <h1 className="text-5xl md:text-6xl font-['Limelight'] text-gray-900">Client Testimonials</h1>
          <p className="text-gray-600 mt-2 font-['Limelight'] tracking-wider text-2xl">What Our Clients Say</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8 mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center">
              <QuoteIcon size={36} className="text-gray-900 mb-6" />
              <div className="hidden md:block"> {/* Only show truncated version on medium and larger screens */}
                <p className="text-gray-900 italic text-lg">
                  {truncateReview(testimonial.review)}
                  {testimonial.review.length > MAX_REVIEW_LENGTH && (
                    <button
                      onClick={() => setSelectedReview(testimonial)}
                      className="text-black font-semibold ml-2 hover:underline"
                    >
                      Read More
                    </button>
                  )}
                </p>
              </div>
              <div className="md:hidden"> {/* Show full review on small screens */}
                <p className="text-gray-900 italic text-lg">{testimonial.review}</p>
              </div>
              <div className="mt-8 w-16 h-16 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold">
                {getInitials(testimonial.name)}
              </div>
              <div className="mt-4">
                <p className="font-semibold text-black text-lg">{testimonial.name}</p>
                <p className="text-gray-700 text-sm">{testimonial.location}</p>
              </div>
              {testimonial.rating && (
                <div className="flex mt-3">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} size={20} className="text-black fill-black" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

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
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold">
                  {getInitials(selectedReview.name)}
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-black text-lg">{selectedReview.name}</p>
                  <p className="text-gray-700 text-sm">{selectedReview.location}</p>
                </div>
                {selectedReview.rating && (
                  <div className="flex mt-3">
                    {Array.from({ length: selectedReview.rating }, (_, i) => (
                      <Star key={i} size={20} className="text-black fill-black" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/">
            <span className="bg-transparent border border-gray-900 text-gray-900 px-6 py-3 rounded-full font-light tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm inline-block">
              BACK TO HOME
            </span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TestimonialsPage;
