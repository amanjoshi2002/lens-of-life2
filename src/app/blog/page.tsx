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
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const heroSlides = [
    {
      image: '/images/hero/pre wed.jpg',
      title: 'Blog',
      subtitle: 'Wedding Photography Ideas & Tips'
    }
  ];

  return (
    <>
      <Navbar />
      <Hero pageTitle="Blog" slides={heroSlides} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
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
