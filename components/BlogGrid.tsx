'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Comparing Different Wedding Photography Packages: What to Look For',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000',
    date: '02/10/2025',
    excerpt: 'A comprehensive guide to help you choose the perfect wedding photography package for your special day.',
    slug: 'comparing-wedding-photography-packages'
  },
  {
    id: 2,
    title: 'The Impact of Lighting on Wedding Photos: How to Get the Perfect Shots',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    date: '02/03/2025',
    excerpt: 'Understanding the role of lighting in creating stunning wedding photographs.',
    slug: 'impact-of-lighting-wedding-photos'
  },
  {
    id: 3,
    title: 'Comparing Different Wedding Photography Packages: What to Look For',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000',
    date: '02/10/2025',
    excerpt: 'A comprehensive guide to help you choose the perfect wedding photography package for your special day.',
    slug: 'comparing-wedding-photography-packages'
  },
  {
    id: 4,
    title: 'The Impact of Lighting on Wedding Photos: How to Get the Perfect Shots',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    date: '02/03/2025',
    excerpt: 'Understanding the role of lighting in creating stunning wedding photographs.',
    slug: 'impact-of-lighting-wedding-photos'
  },
  {
    id: 5,
    title: 'Comparing Different Wedding Photography Packages: What to Look For',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000',
    date: '02/10/2025',
    excerpt: 'A comprehensive guide to help you choose the perfect wedding photography package for your special day.',
    slug: 'comparing-wedding-photography-packages'
  },
  {
    id: 6,
    title: 'The Impact of Lighting on Wedding Photos: How to Get the Perfect Shots',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    date: '02/03/2025',
    excerpt: 'Understanding the role of lighting in creating stunning wedding photographs.',
    slug: 'impact-of-lighting-wedding-photos'
  },

  // Add more blog posts as needed
];

export default function BlogGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
            <div className="relative h-64">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {post.date}
              </div>
              <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>
                <button className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Load More Posts
        </button>
      </div>
    </div>
  );
}