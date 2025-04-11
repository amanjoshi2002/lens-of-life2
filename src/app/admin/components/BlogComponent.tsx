import { useState, useEffect, ChangeEvent } from "react";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import { Blog, FormState } from "./types";

interface BlogComponentProps {
  blogs: Blog[];
  fetchBlogs: () => void;
  handleDeleteBlog: (id: string) => void;
}

const BlogComponent = ({ blogs, fetchBlogs, handleDeleteBlog }: BlogComponentProps) => {
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    category: "",
    title: "",
    headPhotoLink: "",
    headPhotoLinks: [""],
    paragraphs: [{ heading: "", content: "" }],
    subPhotos: [""],
    photos: [""],
    videos: [""],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data.map((category: { name: string }) => category.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, type: string) => {
    const { value } = e.target;
    if (type === "paragraphs") {
      const newParagraphs = [...form.paragraphs];
      if (e.target.name === "heading") {
        newParagraphs[index] = { ...newParagraphs[index], heading: value };
      } else {
        newParagraphs[index] = { ...newParagraphs[index], content: value };
      }
      setForm({ ...form, paragraphs: newParagraphs });
    } else if (type === "headPhotoLinks") {
      const newHeadPhotoLinks = [...form.headPhotoLinks];
      newHeadPhotoLinks[index] = value;
      setForm({ ...form, headPhotoLinks: newHeadPhotoLinks });
    } else if (type === "subPhotos") {
      const newSubPhotos = [...form.subPhotos];
      newSubPhotos[index] = value;
      setForm({ ...form, subPhotos: newSubPhotos });
    } else if (type === "photos") {
      const newPhotos = [...form.photos];
      newPhotos[index] = value;
      setForm({ ...form, photos: newPhotos });
    } else if (type === "videos") {
      const newVideos = [...form.videos];
      newVideos[index] = value;
      setForm({ ...form, videos: newVideos });
    } else {
      setForm({ ...form, [type]: value });
    }
  };

  const handleRemoveField = (index: number) => {
    const newParagraphs = form.paragraphs.filter((_, i) => i !== index);
    const newSubPhotos = form.subPhotos.filter((_, i) => i !== index);
    const newPhotos = form.photos.filter((_, i) => i !== index);
    const newVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, paragraphs: newParagraphs, subPhotos: newSubPhotos, photos: newPhotos, videos: newVideos });
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog._id);
    setForm({
      category: blog.category,
      title: blog.title,
      headPhotoLink: blog.headPhotoLink,
      headPhotoLinks: blog.headPhotoLinks?.length ? blog.headPhotoLinks : [""],
      paragraphs: blog.paragraphs,
      subPhotos: blog.subPhotos,
      photos: blog.photos,
      videos: blog.videos,
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (!editingBlogId) return;
      
      // Check for empty required fields
      if (!form.category || !form.title) {
        console.error("Missing required fields: category and title must be provided");
        alert("Please fill in all required fields (category and title)");
        return;
      }
      
      // Clean up empty entries in arrays
      const cleanedForm = {
        ...form,
        _id: editingBlogId,
        headPhotoLinks: form.headPhotoLinks.filter(link => link.trim() !== ""),
        paragraphs: form.paragraphs.filter(p => p.heading.trim() !== "" || p.content.trim() !== ""),
        subPhotos: form.subPhotos.filter(link => link.trim() !== ""),
        photos: form.photos.filter(link => link.trim() !== ""),
        videos: form.videos.filter(link => link.trim() !== "")
      };
      
      console.log("Sending update data to API:", JSON.stringify(cleanedForm, null, 2));
      
      const res = await fetch(`/api/blogs/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedForm),
      });
      
      if (res.ok) {
        setEditingBlogId(null);
        fetchBlogs();
        resetForm();
        alert("Blog updated successfully!");
      } else {
        const errorText = await res.text();
        let errorMessage = "Failed to update blog";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If the response isn't valid JSON, use the raw text
          if (errorText) errorMessage += `: ${errorText}`;
        }
        
        console.error("API error:", res.status, errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog");
    }
  };

  const handleAddBlog = async () => {
    try {
      // Check for empty required fields
      if (!form.category || !form.title) {
        console.error("Missing required fields: category and title must be provided");
        alert("Please fill in all required fields (category and title)");
        return;
      }
      
      // Clean up empty entries in arrays
      const cleanedForm = {
        ...form,
        headPhotoLinks: form.headPhotoLinks.filter(link => link.trim() !== ""),
        paragraphs: form.paragraphs.filter(p => p.heading.trim() !== "" || p.content.trim() !== ""),
        subPhotos: form.subPhotos.filter(link => link.trim() !== ""),
        photos: form.photos.filter(link => link.trim() !== ""),
        videos: form.videos.filter(link => link.trim() !== "")
      };
      
      console.log("Sending data to API:", JSON.stringify(cleanedForm, null, 2));
      
      const res = await fetch("/api/blogs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedForm),
      });
      
      if (res.ok) {
        fetchBlogs();
        resetForm();
        alert("Blog added successfully!");
      } else {
        const errorText = await res.text();
        let errorMessage = "Failed to add blog";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If the response isn't valid JSON, use the raw text
          if (errorText) errorMessage += `: ${errorText}`;
        }
        
        console.error("API error:", res.status, errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("An error occurred while adding the blog");
    }
  };

  const resetForm = () => {
    setForm({
      category: "",
      title: "",
      headPhotoLink: "",
      headPhotoLinks: [""],
      paragraphs: [{ heading: "", content: "" }],
      subPhotos: [""],
      photos: [""],
      videos: [""],
    });
  };

  const handleFormSave = () => {
    if (editingBlogId) {
      handleSaveChanges();
    } else {
      handleAddBlog();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Blog</h2>
      <BlogForm 
        initialForm={form}
        categories={categories}
        editingBlogId={editingBlogId}
        onSave={handleFormSave}
      />
      
      <BlogList 
        blogs={blogs}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        editingBlogId={editingBlogId}
        form={form}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onEditBlog={handleEditBlog}
        onDeleteBlog={handleDeleteBlog}
        handleInputChange={handleInputChange}
        handleRemoveField={handleRemoveField}
      />
    </div>
  );
};

export default BlogComponent;