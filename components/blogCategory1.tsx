'use client';

import { useRef, useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface Blog {
  _id: string;
  category: string;
  title: string;
  headPhotoLink: string;
  date?: string;
}

interface CategoryGroup {
  name: string;
  posts: Blog[];
}

interface Props {
  selectedCategory?: string;
}

export default function CategorySlider({ selectedCategory }: Props) {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const blogs: Blog[] = await response.json();
          const filteredBlogs = selectedCategory 
            ? blogs.filter(blog => blog.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory)
            : blogs;

          const groupedBlogs = filteredBlogs.reduce((acc: { [key: string]: Blog[] }, blog) => {
            if (!acc[blog.category]) {
              acc[blog.category] = [];
            }
            // Add new posts to the beginning of the array
            acc[blog.category].unshift(blog);
            return acc;
          }, {});

          const categoriesArray = Object.entries(groupedBlogs).map(([name, posts]) => ({
            name,
            // Ensure posts are in reverse chronological order
            posts: posts.sort((a, b) => {
              const dateA = a.date ? new Date(a.date).getTime() : 0;
              const dateB = b.date ? new Date(b.date).getTime() : 0;
              return dateB - dateA;
            })
          }));

          setCategories(categoriesArray);
          // Initialize visible posts for each category
          const initialVisiblePosts = categoriesArray.reduce((acc, category) => {
            acc[category.name] = 6; // Show initial 6 posts
            return acc;
          }, {} as { [key: string]: number });
          setVisiblePosts(initialVisiblePosts);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  const loadMore = (categoryName: string) => {
    setVisiblePosts(prev => ({
      ...prev,
      [categoryName]: prev[categoryName] + 6
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16"> {/* Increased padding */}
      {categories.map((category) => (
        <div key={category.name} id={category.name.toLowerCase().replace(/\s+/g, '-')} className="mb-24">
          <h2 className="text-4xl font-light tracking-wide mb-12 text-center">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> {/* Changed to 2 columns */}
            {category.posts.slice(0, visiblePosts[category.name]).map((post, index, array) => (
              <Link key={post._id} href={`/service/${post._id}`} className="block group">
                <div className="hidden md:block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <img
                      src={post.headPhotoLink}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                    {/* Show count overlay on last visible item if there are more items */}
                    {index === array.length - 1 && category.posts.length > visiblePosts[category.name] && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <p className="text-5xl font-light mb-2">+{category.posts.length - visiblePosts[category.name]}</p>
                          <p className="text-xl font-light">
                            {category.name === "Videos" ? "More Videos" : "More Photos"}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white text-3xl font-light mb-3">
                          {post.title}
                        </h3>
                        {post.date && (
                          <div className="flex items-center text-white/90 text-base">
                            <Calendar size={18} className="mr-2" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {category.posts.length > visiblePosts[category.name] && (
            <div className="text-center mt-8">
              <button
                onClick={() => loadMore(category.name)}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 
                         transition-colors duration-300 flex items-center gap-2 mx-auto"
              >
                <span>Show More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
