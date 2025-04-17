"use client";

import { useEffect, useState, useId } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Loading from "../../../../components/Loading";

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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
        <Loading/>
        <Footer/>
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
        <div className="w-full">
          <div className="relative">
            <div className="w-full aspect-[4/3] md:aspect-[16/9] relative overflow-hidden group">
              <Image
                src={blog.headPhotoLink}
                alt={blog.title}
                fill
                sizes="100vw"
                priority
                className="object-cover object-center shadow-sm grayscale group-hover:grayscale-0 
                         transition-all duration-500 transform group-hover:scale-[1.03]"
                id={`${componentId}-head-image`}
                suppressHydrationWarning
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/fallback-image.jpg";
                }}
              />
              {/* Title Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                <h1 className="text-3xl md:text-5xl font-bold text-white font-serif px-4 text-center mb-12">
                  {blog.title}
                </h1>
                {/* Scroll Down Indicator - moved into title container */}
                <div className="text-white animate-bounce">
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
        </div>

        {/* Content container with max-width */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 mt-20">
          {/* Remove the original title section since it's now in the image */}
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
                  <div className="w-full aspect-square md:aspect-[4/3] relative overflow-hidden rounded-xl group">
                    <Image
                      src={blog.subPhotos[index]}
                      alt={`Sub Photo ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover object-center shadow-sm grayscale group-hover:grayscale-0 
                               transition-all duration-500 transform group-hover:scale-[1.03]"
                      id={`${componentId}-sub-image-${index}`}
                      suppressHydrationWarning
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/fallback-image.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {blog.photos.length > 0 && (
            <div className="mt-10 md:mt-16 mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-light text-center mb-6 md:mb-8">
                More Moments
              </h2>
              <div className="grid grid-cols-4 gap-2 max-w-3xl mx-auto">
                <div 
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setIsGalleryOpen(true);
                  }}
                  className="relative aspect-[3/4] col-span-2 cursor-pointer group overflow-hidden rounded-md"
                >
                  <Image
                    src={blog.photos[0]}
                    alt="Featured photo"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover shadow-sm grayscale hover:grayscale-0 
                             transition-all duration-500 transform group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="col-span-2 grid grid-rows-2 gap-2">
                  <div 
                    onClick={() => {
                      setCurrentImageIndex(1);
                      setIsGalleryOpen(true);
                    }}
                    className="relative aspect-[3/2] cursor-pointer group overflow-hidden rounded-md"
                  >
                    <Image
                      src={blog.photos[1]}
                      alt="Second photo"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover shadow-sm grayscale hover:grayscale-0 
                               transition-all duration-500 transform group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div 
                    onClick={() => {
                      setCurrentImageIndex(2);
                      setIsGalleryOpen(true);
                    }}
                    className="relative aspect-[3/2] cursor-pointer group overflow-hidden rounded-md"
                  >
                    <Image
                      src={blog.photos[2]}
                      alt="Third photo"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover shadow-sm grayscale hover:grayscale-0 
                               transition-all duration-500 transform group-hover:scale-[1.03]"
                    />
                    {blog.photos.length > 3 && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(3);
                          setIsGalleryOpen(true);
                        }}
                        className="absolute inset-0 bg-black/30 flex items-center justify-center 
                                    cursor-pointer backdrop-blur-[2px] opacity-0 
                                    group-hover:opacity-100 transition-all duration-300"
                      >
                        <div className="text-center">
                          <span className="text-white text-sm font-light tracking-wider block">
                            View All
                          </span>
                          <span className="text-white/80 text-xs mt-1 block">
                            +{blog.photos.length - 3} photos
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Gallery Modal */}
              {isGalleryOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 p-4 md:p-8">
                  <button
                    onClick={() => setIsGalleryOpen(false)}
                    className="absolute top-4 right-4 text-white/90 p-2 hover:bg-white/10 rounded-full z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="h-full flex items-center justify-center">
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? blog.photos.length - 1 : prev - 1))}
                      className="absolute left-4 text-white/90 p-2 hover:bg-white/10 rounded-full z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="relative h-[85vh] w-full max-w-5xl mx-auto">
                      <Image
                        src={blog.photos[currentImageIndex]}
                        alt={`Gallery photo ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        quality={100}
                      />
                    </div>

                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === blog.photos.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 text-white/90 p-2 hover:bg-white/10 rounded-full z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="absolute bottom-4 left-0 right-0 overflow-x-auto py-2">
                    <div className="flex gap-2 justify-center">
                      {blog.photos.map((photo, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-16 h-16 cursor-pointer rounded-md overflow-hidden group
                                    ${currentImageIndex === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'}`}
                        >
                          <Image
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {blog.videos.length > 0 && (
            <div className="mt-10 md:mt-16 mb-10 md:mb-16">
            
              <div className="grid grid-cols-4 gap-2 max-w-3xl mx-auto">
                <div 
                  onClick={() => {
                    setCurrentVideoIndex(0);
                    setIsVideoGalleryOpen(true);
                  }}
                  className="relative aspect-[3/4] col-span-2 cursor-pointer group overflow-hidden rounded-md"
                >
                  <video 
                    src={blog.videos[0]} 
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div className="col-span-2 grid grid-rows-2 gap-2">
                  {blog.videos.slice(1, 3).map((video, index) => (
                    <div 
                      key={index}
                      onClick={() => {
                        setCurrentVideoIndex(index + 1);
                        setIsVideoGalleryOpen(true);
                      }}
                      className="relative aspect-[3/2] cursor-pointer group overflow-hidden rounded-md"
                    >
                      <video 
                        src={video} 
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      {index === 1 && blog.videos.length > 3 && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center 
                                    cursor-pointer backdrop-blur-[2px] opacity-0 
                                    group-hover:opacity-100 transition-all duration-300">
                          <div className="text-center">
                            <span className="text-white text-sm font-light tracking-wider block">
                              View All
                            </span>
                            <span className="text-white/80 text-xs mt-1 block">
                              +{blog.videos.length - 3} videos
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Gallery Modal */}
              {isVideoGalleryOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 p-4 md:p-8">
                  <button
                    onClick={() => setIsVideoGalleryOpen(false)}
                    className="absolute top-4 right-4 text-white/90 p-2 hover:bg-white/10 rounded-full z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="h-full flex items-center justify-center">
                    <button
                      onClick={() => setCurrentVideoIndex((prev) => (prev === 0 ? blog.videos.length - 1 : prev - 1))}
                      className="absolute left-4 text-white/90 p-2 hover:bg-white/10 rounded-full z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="relative h-[85vh] w-full max-w-5xl mx-auto">
                      <video
                        src={blog.videos[currentVideoIndex]}
                        className="w-full h-full"
                        controls
                        autoPlay
                      />
                    </div>

                    <button
                      onClick={() => setCurrentVideoIndex((prev) => (prev === blog.videos.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 text-white/90 p-2 hover:bg-white/10 rounded-full z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Video Thumbnails */}
                  <div className="absolute bottom-4 left-0 right-0 overflow-x-auto py-2">
                    <div className="flex gap-2 justify-center">
                      {blog.videos.map((video, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentVideoIndex(index)}
                          className={`relative w-24 h-16 cursor-pointer rounded-md overflow-hidden group
                                    ${currentVideoIndex === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'}`}
                        >
                          <video
                            src={video}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
