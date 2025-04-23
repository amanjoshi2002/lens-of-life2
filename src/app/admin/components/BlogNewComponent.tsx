'use client';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BlogNew {
  _id: string;
  photo: string;
  headline: string;
  date: string;
  body: string;
}

interface BlogNewComponentProps {
  blogs: BlogNew[];
  fetchBlogs: () => void;
  handleDeleteBlog: (id: string) => void;
}

const BlogNewComponent = ({ blogs, fetchBlogs, handleDeleteBlog }: BlogNewComponentProps) => {
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [form, setForm] = useState({
    photo: "",
    headline: "",
    body: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async () => {
    try {
      const res = await fetch("/api/blognew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ photo: "", headline: "", body: "" });
        fetchBlogs();
        toast.success("Blog added successfully!");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to add blog.");
    }
  };

  const handleEditBlog = (blog: BlogNew) => {
    setEditingBlogId(blog._id);
    setForm({
      photo: blog.photo,
      headline: blog.headline,
      body: blog.body,
    });
  };

  const handleSaveChanges = async () => {
    if (!editingBlogId) return;
    try {
      const res = await fetch(`/api/blognew/${editingBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setEditingBlogId(null);
        setForm({ photo: "", headline: "", body: "" });
        fetchBlogs();
        toast.success("Blog updated successfully!");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingBlogId ? "Edit Blog" : "Add New Blog"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={form.photo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={form.headline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="body"
            placeholder="Body"
            value={form.body}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-32"
          />
          <div className="flex justify-end gap-2">
            {editingBlogId ? (
              <>
                <button
                  onClick={() => {
                    setEditingBlogId(null);
                    setForm({ photo: "", headline: "", body: "" });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={handleAddBlog}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Blog
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow">
            <img src={blog.photo} alt={blog.headline} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold">{blog.headline}</h3>
            <p className="text-gray-600 text-sm mb-2">{new Date(blog.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">{blog.body}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEditBlog(blog)}
                className="text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogNewComponent;