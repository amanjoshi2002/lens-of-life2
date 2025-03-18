"use client";
import { QuoteIcon, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Breadcrumb1 from "../../../components/breadcrum1";
import Footer from "../../../components/Footer";

const testimonials = [
  {
    text: "We had a great time shooting with you sir.. It was real fun. I love your work! Thank you so much for amazing pictures and beautiful pre-wedding video.",
    author: "Garima Jaggi",
    location: "India",
    rating: 5,
  },
  {
    text: "Thank you so so so so much!! The photos are absolutely beautiful! We love every single one of them. You have done an incredible job. We are so happy!",
    author: "Ekanshi Tiwana",
    location: "India",
    rating: 5,
  },
  {
    text: "Thank you for capturing these beautiful memories of Rhyler's Baptism party. They were very special to us and our families.",
    author: "Rochelle Picardo",
    location: "India",
    rating: 5,
  },
];

// Function to get initials from the author's name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const TestimonialsPage = () => {
  return (
    <>
 <Navbar/>

    <section className="bg-gray-100 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800">Client Testimonials</h1>
        <p className="text-gray-500 mt-2">See what our clients say about us.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8 mt-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            {/* Quote Icon */}
            <QuoteIcon size={36} className="text-gray-400 mb-4" />

            {/* Testimonial Text */}
            <p className="text-gray-700 italic">"{testimonial.text}"</p>

            {/* Profile Initials in a Circle */}
            <div className="mt-6 w-14 h-14 bg-gray-800 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {getInitials(testimonial.author)}
            </div>

            {/* Author Info */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800">{testimonial.author}</p>
              <p className="text-gray-500 text-sm">{testimonial.location}</p>
            </div>

            {/* Star Ratings */}
            <div className="flex mt-2">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <Star key={i} size={20} className="text-yellow-400" fill="currentColor" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-8">
        <Link href="/">
          <span className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer inline-block">
            Back to Home
          </span>
        </Link>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default TestimonialsPage;
