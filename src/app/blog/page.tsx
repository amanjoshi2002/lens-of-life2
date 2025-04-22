'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Hero from '../../../components/Hero1';

interface BlogNew {
  _id: string;
  photo: string;
  headline: string;
  date: string;
  body: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogNew[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blognew');
        const data = await res.json();
        // Sort blogs by date in descending order (newest first)
        const sortedBlogs = data.sort((a: BlogNew, b: BlogNew) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const heroSlides = [
    {
      image: '/images/services/Destination wedding.jpg',
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    },
    {
      image: '/images/services/Goan Wedding.jpg',
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    },
    {
      image: "/images/services/Pre wedding.jpg",
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    },
    {
      image: "/images/services/Conference and Events.jpg",
      title: '',
      subtitle: 'Stories, Tips, and Photography Insights'
    },
  ];

  // Add scroll function to scroll to content
  const scrollToContent = () => {
    const contentElement = document.getElementById('blog-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen">
        <Hero pageTitle="Blog" slides={heroSlides} />
        
        {/* Add scroll down mouse icon */}
        <div 
          onClick={scrollToContent}
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
      
      <div id="blog-content" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="relative h-64">
                <Image
                  src={blog.photo}
                  alt={blog.headline}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(blog.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold mb-3">{blog.headline}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.body}</p>
                <Link href={`/blog/${blog._id}`}>
                  <button className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
