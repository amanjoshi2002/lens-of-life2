"use client";

import { useEffect, useState, useId } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  headPhotoLink: string;
  paragraphs: { heading: string; content: string }[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}

export default function BlogPost() {
  const params = useParams();
  const id = params?.id as string;
  const componentId = useId();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add lightbox control functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (blog?.photos.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + (blog?.photos.length || 1)) % (blog?.photos.length || 1)
    );
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-[var(--navbar-height)] min-h-screen">
          <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!blog || !id) {
    return (
      <>
        <Navbar />
        <main className="pt-[var(--navbar-height)] min-h-screen">
          <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Blog post not found
            </h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[var(--navbar-height)] min-h-screen">
        <div className="max-w-4xl mx-auto py-10 px-4 md:px-6">
          <div className="mb-10 text-center py-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">
              {blog.title}
            </h1>
          </div>

          <div className="mb-10">
            <div className="w-full aspect-[4/3] md:aspect-[16/9] relative overflow-hidden rounded-xl">
              <Image
                src={blog.headPhotoLink}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
                className="object-cover object-center shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
                id={`${componentId}-head-image`}
                suppressHydrationWarning
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/fallback-image.jpg";
                }}
              />
            </div>
          </div>

          {blog.paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"} gap-6 md:gap-8 mb-12 md:mb-16 items-center`}
            >
              <div className="w-full md:w-1/2">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {paragraph.heading}
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {paragraph.content}
                </p>
              </div>
              {blog.subPhotos[index] && (
                <div className="w-full md:w-1/2">
                  <div className="w-full aspect-square md:aspect-[4/3] relative overflow-hidden rounded-xl">
                    <Image
                      src={blog.subPhotos[index]}
                      alt={`Sub Photo ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover object-center shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
                      id={`${componentId}-sub-image-${index}`}
                      suppressHydrationWarning
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/fallback-image.jpg";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* More Moments section */}
          {blog.photos.length > 0 && (
            <div className="mt-10 md:mt-20 mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-light text-center mb-8 md:mb-12">
                More Moments
              </h2>
              <div 
                className="relative cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <div className="grid grid-cols-3 gap-2 aspect-[16/9] relative overflow-hidden rounded-xl">
                  {/* Main large image */}
                  <div className="col-span-2 row-span-2 relative">
                    <Image
                      src={blog.photos[0]}
                      alt="Gallery Preview"
                      fill
                      className="object-cover rounded-l-xl"
                      priority
                    />
                  </div>
                  {/* Side images */}
                  <div className="relative">
                    {blog.photos[1] && (
                      <Image
                        src={blog.photos[1]}
                        alt="Preview 2"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="relative">
                    {blog.photos[2] && (
                      <Image
                        src={blog.photos[2]}
                        alt="Preview 3"
                        fill
                        className="object-cover rounded-tr-xl"
                      />
                    )}
                  </div>
                </div>

                {/* Overlay with count */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                              transition-all duration-300 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xl font-semibold">{blog.photos.length} Photos</p>
                    <p className="text-sm">Click to view all</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {blog.videos.length > 0 && (
            <div className="mt-10 md:mt-20 mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-light text-center mb-8 md:mb-12">
                Behind The Scenes
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {blog.videos.map((video, index) => (
                  <div key={index} className="rounded-xl shadow-lg overflow-hidden">
                    <video controls className="w-full">
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {lightboxOpen && blog?.photos.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            >
              ×
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            >
              ›
            </button>
            <Image
              src={blog.photos[currentImageIndex]}
              alt={`Photo ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-contain"
              quality={100}
              priority
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
              {currentImageIndex + 1} / {blog.photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
