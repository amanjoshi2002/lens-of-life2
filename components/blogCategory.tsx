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

export default function CategorySlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const blogs: Blog[] = await response.json();
          
          // Group blogs by category
          const groupedBlogs = blogs.reduce((acc: { [key: string]: Blog[] }, blog) => {
            if (!acc[blog.category]) {
              acc[blog.category] = [];
            }
            acc[blog.category].push(blog);
            return acc;
          }, {});

          // Convert to array format needed for rendering
          const categoriesArray = Object.entries(groupedBlogs).map(([name, posts]) => ({
            name,
            posts
          }));

          setCategories(categoriesArray);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const updateScrollButtons = () => {
      if (sliderRef.current) {
        setCanScrollLeft(sliderRef.current.scrollLeft > 0);
        setCanScrollRight(
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth < sliderRef.current.scrollWidth
        );
      }
    };
    
    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }

    const autoScroll = setInterval(() => {
      if (sliderRef.current) {
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        if (sliderRef.current.scrollLeft >= maxScrollLeft) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => {
      sliderRef.current?.removeEventListener("scroll", updateScrollButtons);
      clearInterval(autoScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {categories.map((category) => (
        <div key={category.name} id={category.name.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 z-10"
                suppressHydrationWarning
                id={`${buttonId}-left-${category.name}`}
              >
                &lt;
              </button>
            )}
            <div
              ref={sliderRef}
              className="flex overflow-hidden scrollbar-hide snap-x snap-mandatory space-x-4"
            >
              {category.posts.map((post) => (
                <div key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.05] min-w-full sm:min-w-[calc(100%/3-1rem)] md:min-w-[calc(100%/3-1rem)] snap-start relative group">
                  <Link href={`/blog/${post._id}`} className="block relative h-[35rem]">
                    <img
                      src={post.headPhotoLink}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-2xl">
                      <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white text-lg mb-2">{post.title}</p>
                      {post.date && (
                        <div className="text-white text-sm mb-2">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                      <button className="bg-white text-black font-semibold py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Read More
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 z-10"
                suppressHydrationWarning
                id={`${buttonId}-right-${category.name}`}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
