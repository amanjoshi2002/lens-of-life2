import { useState, useEffect } from "react";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import { Blog, FormState } from "./types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emptyForm: FormState = {
  category: "",
  title: "",
  headPhotoLink: "",
  headPhotoLinks: [""],
  coupleName: "",
  weddingDate: "",
  paragraphs: [{ heading: "", content: "" }],
  subPhotos: [""],
  photos: [""],
  videos: [""],
};

const BlogComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.map((c: any) => c.name));
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setForm({
      category: blog.category,
      title: blog.title,
      headPhotoLink: blog.headPhotoLink,
      headPhotoLinks: blog.headPhotoLinks?.length ? blog.headPhotoLinks : [""],
      coupleName: blog.coupleName || "",
      weddingDate: blog.weddingDate || "",
      paragraphs: blog.paragraphs,
      subPhotos: blog.subPhotos,
      photos: blog.photos,
      videos: blog.videos,
    });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/blogs/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBlogs();
  };

  const handleSave = async (formData: FormState) => {
    const cleaned = {
      ...formData,
      headPhotoLinks: formData.headPhotoLinks.filter((x) => x.trim()),
      paragraphs: formData.paragraphs.filter((p) => p.heading.trim() || p.content.trim()),
      subPhotos: formData.subPhotos.filter((x) => x.trim()),
      photos: formData.photos.filter((x) => x.trim()),
      videos: formData.videos.filter((x) => x.trim()),
    };
    try {
      if (editingId) {
        await fetch("/api/blogs/edit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...cleaned, _id: editingId }),
        });
        toast.success("Blog updated successfully!");
      } else {
        await fetch("/api/blogs/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleaned),
        });
        toast.success("Blog added successfully!");
      }
      setEditingId(null);
      setForm(emptyForm);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit Blog" : "Add Blog"}</h2>
      <BlogForm
        form={form}
        setForm={setForm}
        categories={categories}
        onSave={handleSave}
        onCancel={handleCancel}
        editing={!!editingId}
      />
      <BlogList
        blogs={blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        search={search}
        setSearch={setSearch}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />
    </div>
  );
};

export default BlogComponent;