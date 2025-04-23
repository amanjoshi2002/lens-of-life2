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
 coupleName?: string;
 weddingDate?: string;

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
      <div className="min-h-screen">
        {/* Hero Section */}
        // For the head photo
        <div className="w-full h-screen relative">
          <div className="w-full h-full relative overflow-hidden group">
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
              <h1 className="text-3xl md:text-5xl font-bold text-white font-serif px-4 text-center mb-4">
                {blog.title}
              </h1>
               {(blog.coupleName || blog.weddingDate) && (
                 <div className="mb-8">
                   {blog.coupleName && (
                     <div className="text-lg md:text-xl font-semibold text-white text-center">
                       {blog.coupleName}
                     </div>
                   )}
                   {blog.weddingDate && (
                     <div className="text-md md:text-lg text-white/90 text-center mt-1">
                       Wedding Date: {new Date(blog.weddingDate).toLocaleDateString("en-US", {
                         year: "numeric",
                         month: "long",
                         day: "numeric",
                       })}
                     </div>
                   )}
                 </div>
               )}
                {/* Scroll Down Indicator */}
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
            {/* Couple Name and Wedding Date */}
            {(blog.coupleName || blog.weddingDate) && (
              <div className="bg-white/80 py-4 px-4 md:px-8 text-center shadow-sm">
                {blog.coupleName && (
                  <div className="text-lg md:text-xl font-semibold text-gray-700">
                    Couple: {blog.coupleName}
                  </div>
                )}
                {blog.weddingDate && (
                  <div className="text-md md:text-lg text-gray-600 mt-1">
                    Wedding Date: {new Date(blog.weddingDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Rest of the content */}
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
                      className="object-contain md:object-cover object-center shadow-sm grayscale group-hover:grayscale-0 
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
                    className="object-cover shadow-sm grayscale group-hover:grayscale-0 
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
                      className="object-cover shadow-sm grayscale group-hover:grayscale-0 
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
                                    cursor-pointer backdrop-blur-[2px]"
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
              <h2 className="text-2xl md:text-3xl font-light text-center mb-6 md:mb-8">
                Featured Videos
              </h2>
              <div className="max-w-3xl mx-auto">
                {/* Main Video Display */}
                {blog.videos.slice(0, 1).map((videoUrl, index) => {
                  const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/)?.[1];
                  
                  return videoId ? (
                    <div 
                      key={index}
                      onClick={() => {
                        setCurrentVideoIndex(0);
                        setIsVideoGalleryOpen(true);
                      }}
                      className="relative aspect-video cursor-pointer group overflow-hidden rounded-lg"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={`Video thumbnail ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      {blog.videos.length > 1 && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentVideoIndex(1);
                            setIsVideoGalleryOpen(true);
                          }}
                          className="absolute bottom-4 right-4 bg-black/70 px-3 py-1.5 rounded-lg 
                                        backdrop-blur-[2px] cursor-pointer hover:bg-black/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <svg 
                              className="w-5 h-5 text-white" 
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M4 8h16v8h-16z" />
                            </svg>
                            <span className="text-white text-sm font-medium">
                              View All {blog.videos.length} Videos
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>

              {/* Rest of the video gallery modal code remains the same */}
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

                    <div className="relative w-full h-0 pb-[56.25%] max-w-5xl mx-auto">
                      {blog.videos[currentVideoIndex] && (
                        <iframe
                          src={`https://www.youtube.com/embed/${blog.videos[currentVideoIndex].match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/)?.[1]}`}
                          title={`YouTube video ${currentVideoIndex + 1}`}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
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
                      {blog.videos.map((videoUrl, index) => {
                        const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/)?.[1];
                        return (
                          <div
                            key={index}
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`relative w-24 h-16 cursor-pointer rounded-md overflow-hidden
                                      ${currentVideoIndex === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'}`}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                              alt={`Video thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      <Footer />
    </>
  );
}
