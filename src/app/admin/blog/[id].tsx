"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";

interface Blog {
  _id: string;
  category: string;
  title: string;
  headPhotoLink: string;
  paragraphs: string[];
  subPhotos: string[];
}

const BlogDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params ? (Array.isArray(params.id) ? params.id[0] : params.id) : null; // Ensure id is a string
  const [blog, setBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const data: Blog = await res.json();
        setBlog(data);
        setForm(data);
      }
    };
    fetchBlog();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index?: number, type?: string) => {
    if (!form) return;
    const { value } = e.target;
    if (type === "paragraphs" && index !== undefined) {
      const newParagraphs = [...form.paragraphs];
      newParagraphs[index] = value;
      setForm({ ...form, paragraphs: newParagraphs });
    } else if (type === "subPhotos" && index !== undefined) {
      const newSubPhotos = [...form.subPhotos];
      newSubPhotos[index] = value;
      setForm({ ...form, subPhotos: newSubPhotos });
    } else {
      setForm({ ...form, [type as keyof Blog]: value });
    }
  };

  const handleSaveChanges = async () => {
    if (!form) return;
    const res = await fetch(`/api/blogs/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin");
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form?.category || ""}
          onChange={(e) => handleInputChange(e, 0, "category")}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form?.title || ""}
          onChange={(e) => handleInputChange(e, 0, "title")}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <input
          type="text"
          name="headPhotoLink"
          placeholder="Head Photo Link"
          value={form?.headPhotoLink || ""}
          onChange={(e) => handleInputChange(e, 0, "headPhotoLink")}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <img src={form?.headPhotoLink} alt="Head Photo" className="mb-4" />
        {form?.paragraphs.map((paragraph, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder={`Paragraph ${index + 1}`}
              value={paragraph}
              onChange={(e) => handleInputChange(e, index, "paragraphs")}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder={`Sub Photo ${index + 1}`}
              value={form.subPhotos[index]}
              onChange={(e) => handleInputChange(e, index, "subPhotos")}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <img src={form.subPhotos[index]} alt={`Sub Photo ${index + 1}`} className="mb-4" />
          </div>
        ))}
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default BlogDetailPage; 