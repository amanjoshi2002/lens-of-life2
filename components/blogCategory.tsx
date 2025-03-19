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

  // Create a map of refs for each category
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Update scroll functions to use the correct slider ref
  const scrollLeft = (categoryName: string) => {
    if (sliderRefs.current[categoryName]) {
      sliderRefs.current[categoryName]?.scrollBy({ 
        left: -sliderRefs.current[categoryName]!.clientWidth, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = (categoryName: string) => {
    if (sliderRefs.current[categoryName]) {
      sliderRefs.current[categoryName]?.scrollBy({ 
        left: sliderRefs.current[categoryName]!.clientWidth, 
        behavior: 'smooth' 
      });
    }
  };

  // Update the scroll button visibility effect
  useEffect(() => {
    const updateScrollButtons = (categoryName: string) => {
      const currentSlider = sliderRefs.current[categoryName];
      if (currentSlider) {
        setCanScrollLeft(currentSlider.scrollLeft > 0);
        setCanScrollRight(
          currentSlider.scrollLeft + currentSlider.clientWidth < currentSlider.scrollWidth
        );
      }
    };

    // Add scroll listeners to all sliders
    categories.forEach(category => {
      const slider = sliderRefs.current[category.name];
      if (slider) {
        slider.addEventListener("scroll", () => updateScrollButtons(category.name));
        updateScrollButtons(category.name);
      }
    });

    return () => {
      categories.forEach(category => {
        sliderRefs.current[category.name]?.removeEventListener("scroll", 
          () => updateScrollButtons(category.name)
        );
      });
    };
  }, [categories]);

  // Update the ref callback
  const setSliderRef = (el: HTMLDivElement | null, categoryName: string) => {
    if (sliderRefs.current) {
      sliderRefs.current[categoryName] = el;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {categories.map((category) => (
        <div key={category.name} id={category.name.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
          <h2 className="text-3xl font-light tracking-wide mb-8 text-center">{category.name}</h2>
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => scrollLeft(category.name)}
                className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 rounded-full p-2 md:p-3 z-10 transition-all"
                suppressHydrationWarning
                id={`${buttonId}-left-${category.name}`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
            )}
            <div
              ref={(el) => setSliderRef(el, category.name)}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 touch-pan-x no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {category.posts.map((post) => (
                <div key={post._id} className="min-w-full md:min-w-[calc(33.333%-1rem)] snap-start">
                  <Link href={`/blog/${post._id}`} className="block group">
                    {/* Mobile Layout */}
                    <div className="block md:hidden">
                      <div className="bg-black/5 p-4 rounded-lg">
                        <span className="inline-block px-4 py-1 bg-black text-white text-sm font-medium rounded-full mb-3">
                          {category.name}
                        </span>
                        <h3 className="text-xl font-medium mb-2">
                          {post.title}
                        </h3>
                        {post.date && (
                          <div className="flex items-center text-gray-600 text-sm mb-4">
                            <Calendar size={16} className="mr-2" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                        <div className="relative h-[300px] overflow-hidden rounded-lg mt-4">
                          <img
                            src={post.headPhotoLink}
                            alt={post.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <div className="relative h-[500px] overflow-hidden rounded-lg">
                        <img
                          src={post.headPhotoLink}
                          alt={post.title}
                          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="inline-block px-4 py-1 bg-white/90 text-black text-sm font-medium rounded-full mb-3">
                              {category.name}
                            </span>
                            <h3 className="text-white text-xl font-medium mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            {post.date && (
                              <div className="flex items-center text-white/80 text-sm mb-4">
                                <Calendar size={16} className="mr-2" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </div>
                            )}
                            <span className="inline-flex items-center text-white text-sm font-medium">
                              Read More 
                              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={() => scrollRight(category.name)}
                className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 rounded-full p-2 md:p-3 z-10 transition-all"
                suppressHydrationWarning
                id={`${buttonId}-right-${category.name}`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
