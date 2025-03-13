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
  paragraphs: string[];
  subPhotos: string[];
}

export default function BlogPost() {
  const params = useParams();
  const id = params?.id as string;
  const componentId = useId();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

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
          <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
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
          <div className="max-w-4xl mx-auto py-12 px-6 text-center">
            <h1 className="text-3xl font-semibold text-gray-800">Blog post not found</h1>
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
        <div className="max-w-4xl mx-auto py-20 px-6">
          <div className="mb-12 text-center ">
            <h1 className="text-5xl font-bold mb-4 text-gray-900 font-serif">
              {blog.title}
            </h1>
          </div>

          <div className="mb-12">
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
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 mb-16 items-center`}
            >
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg leading-relaxed font-sans">
                  {paragraph}
                </p>
              </div>
              {blog.subPhotos[index] && (
  <div className="md:w-1/2">
    <div className="w-full aspect-square md:aspect-[4/3] relative overflow-hidden rounded-xl">
      <Image
        src={blog.subPhotos[index]}
        alt={`Image ${index + 1}`}
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
        </div>
      </main>
      <Footer />
    </>
  );
}