"use client";

import { useEffect, useState, useId } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

interface BlogNew {
  _id: string;
  photo: string;
  headline: string;
  date: string;
  body: string;
}

export default function BlogPost() {
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<BlogNew | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blognew/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={blog.photo}
              alt={blog.headline}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{blog.headline}</h1>
          <div className="text-gray-600 mb-8">
            {new Date(blog.date).toLocaleDateString()}
          </div>
          <div className="prose max-w-none">
            {blog.body.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
